import React from 'react'
import { Container } from 'react-bootstrap'
import InputButton from '../function/InputButton'
import EditPhotoModel from '../modal/EditPhotoModel'
import { useState } from 'react'
import { useEffect } from 'react'
import { getInvoiceList } from '../../../redux/action/AdminAction'
import { getLoggedInUser } from '../../../services/UserLocalStorage'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'
import { GET_PHOTOS, GET_PHOTO_LIST, getData, getDataList, getDataWithLoading, getPhotoList } from '../../../redux/action/Action'
import prettyBytes from 'pretty-bytes';
import moment from 'moment/moment'
import { ToastContainer } from 'react-toastify';
import { getLoggedInAdmin } from '../../../services/AdminLocalStorage'
import { INVOICE_VIEW } from '../../../services/UserRoutePath'
import { useLocation, useParams } from 'react-router'
import { HiPlus } from 'react-icons/hi'
import { BsFillArrowDownCircleFill, BsArrowDown } from 'react-icons/bs'
import { AiOutlineDownload } from "react-icons/ai";
import JSZip from 'jszip'
import { saveAs } from 'file-saver';
import BackDrop from '../function/BackDrop'
const PhotoPage = ({ invoice_id, getLoadingFun,fname, lname }) => {
    let load = false;
    const [show, setShow] = useState(false);
    const [editItem, seteditItem] = useState();
    let admin = getLoggedInAdmin();
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { slug_id } = useParams();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    useEffect(() => {
        if (!load) {
            setLoading(true);         
            dispatch(getDataList(`/get-photo/${invoice_id}/?page=${currentPage}`, GET_PHOTO_LIST, setLoading))
            dispatch(getDataWithLoading(`/get-photos/${invoice_id}`, GET_PHOTOS, setLoading))
        }
        return () => { load = true }
    }, [currentPage])
    useEffect(()=>{
        if(loading == true) getLoadingFun(true,"Photos");
        else getLoadingFun(false,"Photos");
    },[loading])
    const handleClick = () => {
        setShow(true);
    }
    const photoPerPageList = useSelector((state) => state.Reducer.photoPerPageList);
    const photos = useSelector((state) => state.Reducer.photos);
    const photoTotalItemCount = useSelector((state) => state.Reducer.photoTotalItemCount);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const downloadPDF = (i) => {
        fetch(`${process.env.REACT_APP_PHOTO_IMAGE_URL}${i?.photo}`).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `Photo_${i.photo}`;
                alink.click();
            })
        })
    }
    const handleDownloadAll = async () => {
        var zip = new JSZip();
        const promises = photos && photos.map(async (i, index) => {
            const response = await fetch(`${process.env.REACT_APP_PHOTO_IMAGE_URL}${i?.photo}`);
            const blob = await response.blob();
            zip.file(`${i?.photo}`, blob);
        });
        await Promise.all(promises);
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, `Photos_${invoice_id}`);
            });
    }
    const openDocument = (p) => {
        window.open(`${process.env.REACT_APP_PHOTO_IMAGE_URL}${p?.photo}`, "_blank");
    }


    return (
        <>
            {show ? <EditPhotoModel show={show} setShow={setShow} loading={loading} setLoading={setLoading} editItem={editItem} seteditItem={seteditItem} action={action} setAction={setAction} invoice_id={invoice_id} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}
            <Container fluid>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Photos</h3>
                        <div className="card-tools">
                            <InputButton tooltipName="Download All" className='btn nav-plus-btn text-white' event={() => { handleDownloadAll() }} icon={<BsArrowDown />} name={`Download All`} />
                            {pathname != `/admin/write-invoice-estimate/${slug_id}` && pathname != `/admin/completed-jobs/${slug_id}` && <InputButton tooltipName="Upload" className='btn nav-plus-btn text-white ms-2' event={() => { handleClick() }} icon={<HiPlus />} name={`Upload`} />}
                        </div>
                    </div>
                    {/* <div className='todo-content'> */}
                    <div className="card-body table-responsive p-0">
                        <table className="table table-hover table-striped text-nowrap">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Post On</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    photoPerPageList && photoPerPageList.map((p, idx) => {
                                        return <tr key={idx}>
                                            <td onClick={() => { openDocument(p) }} className='p-2 pointer' style={{ width: "100px" }}><div style={{ height: "150px", width: "150px"}} ><img src={`${process.env.REACT_APP_PHOTO_IMAGE_URL}${p?.photo}`} alt="image" className='' style={{ height: "inherit", width: "inherit",objectFit:"contain" }} ></img></div></td>
                                            <td className='p-2'>
                                                <pre className='p-0 m-0'>{moment(p.created_at).format('L')}, {p.photo}<br />
                                                    Type: Photo<br />
                                                    Size: {prettyBytes(p.size, { minimumFractionDigits: 2 })}<br />
                                                    {moment(p.created_at).format('LLLL')}<br />
                                                    Uploaded by {p?.firstname} {p?.lastname} </pre>
                                            </td>
                                            <td>
                                                <div className='d-flex'>
                                                    <InputButton tooltipName="Download" className="btn bg-transparent border-0 " icon={<BsFillArrowDownCircleFill className='download-icon fs-3 text-blue' />} event={() => { downloadPDF(p) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }


                            </tbody>
                        </table>
                        <div className="justify-content-end my-2 me-2">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={5}
                                totalItemsCount={photoTotalItemCount}
                                pageRangeDisplayed={5}
                                innerClass="pagination listjs-pagination "
                                activeClass="page-item-active"
                                activeLinkClass="page-item-active"
                                linkClass="page-item"
                                onChange={(value) => { handlePageChange(value) }}
                            />

                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </Container>
            {/* <ToastContainer /> */}
        </>
    )
}

export default PhotoPage