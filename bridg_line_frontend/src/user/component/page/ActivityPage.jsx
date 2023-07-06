import React from 'react'
import { Container } from 'react-bootstrap'
import InputButton from '../function/InputButton'
import EditPhotoModel from '../modal/EditPhotoModel'
import { useState } from 'react'
import { useEffect } from 'react'
import { getInvoiceList, getMessageAdminList } from '../../../redux/action/AdminAction'
import { getLoggedInUser } from '../../../services/UserLocalStorage'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'
import { GET_MESSAGE_LIST, getDataList, getDocumentList, getMessageList, getPhotoList } from '../../../redux/action/Action'
import prettyBytes from 'pretty-bytes';
import moment from 'moment/moment'
import EditDocumentModel from '../modal/EditDocumentModel'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import '../../css/DocumentPage.css'
import { ToastContainer } from 'react-toastify';
import { useLocation, useParams } from 'react-router'
import { INVOICE_VIEW } from '../../../services/UserRoutePath'
import MessageModel from '../modal/MessageModel'
import { ADMIN_INVOICE_VIEW } from '../../../services/AdminRoutePath'
import { HiPlus } from 'react-icons/hi'
import { useQuery } from 'react-query'
const ActivityPage = ({ invoice_id ,getLoadingFun}) => {
    let load = false;
    const [show, setShow] = useState(false);
    const [editItem, seteditItem] = useState();
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const user = getLoggedInUser();
    const { pathname } = useLocation();
    const { slug_id } = useParams();
    useEffect(()=>{
        if(loading == true) getLoadingFun(true,"Activity");
        else getLoadingFun(false,"Activity");
    },[loading])
    const msgPerPageList = useSelector((state) => state.Reducer.msgPerPageList);
    const msgTotalItemCount = useSelector((state) => state.Reducer.msgTotalItemCount);
    const msgAPerPageList = useSelector((state) => state.AdminReducer.msgAPerPageList);
    const msgATotalItemCount = useSelector((state) => state.AdminReducer.msgATotalItemCount);
    const fetchData = async () => {
        setLoading(true);
        if (pathname == `/admin/write-invoice-estimate/${slug_id}` || pathname == `/admin/completed-jobs/${slug_id}`) {
            dispatch(getMessageAdminList(setLoading, currentPage, invoice_id))
        }
        else {
            dispatch(getDataList(`/user/get-message/${invoice_id}/?page=${currentPage}`, GET_MESSAGE_LIST, setLoading))
        }
      };
      const query = useQuery(['activity',currentPage], fetchData);
      if (query.isLoading) {
        return console.log("Loading..")
      }
    
      if (query.error) {
        return <div>Error: {query.error.message}</div>;
      }

    // useEffect(() => {
    //     if (!load) {
    //         setLoading(true);
    //         if (pathname == `/admin/write-invoice-estimate/${slug_id}` || pathname == `/admin/completed-jobs/${slug_id}`) {
    //             dispatch(getMessageAdminList(setLoading, currentPage, invoice_id))
    //         }
    //         else {
    //             dispatch(getDataList(`/user/get-message/${invoice_id}/?page=${currentPage}`, GET_MESSAGE_LIST, setLoading))
    //         }
    //     }
    //     return () => { load = true }
    // }, [currentPage])
   
    const handleClick = () => {
        setShow(true);
    }
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const renderTableRow = (p, idx) => {
        return (
            <tr key={idx}>
                <td style={{ width: "300px" }}>
                    <pre className='p-0 m-0'>
                        {moment(p.created_at).format('L')}<br />
                        <p className='text-blue'>
                            {p?.firstname && p?.lastname != null ? `${p.firstname} ${p.lastname}` : p?.name}
                        </p>
                    </pre>
                </td>
                <td className=''>
                    <pre className='p-0 m-0'>
                        <b className='fs-6 mb-1'>Note</b><br />
                        {p?.message}
                        <div className='d-flex'>
                            {p?.document.map((i, idx) => (
                                <a key={idx} target="_blank" className='text-blue me-2' href={`${process.env.REACT_APP_ACTIVITY_URL}${i?.document}`}>
                                    {i.name}
                                </a>
                            ))}
                        </div>
                    </pre>
                </td>
            </tr>
        );
    };

    return (
        <>
            {show ? <MessageModel show={show} setShow={setShow} loading={loading} setLoading={setLoading} editItem={editItem} seteditItem={seteditItem} action={action} setAction={setAction} invoice_id={invoice_id} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}

            <Container fluid>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Activity</h3>
                        <div className="card-tools">
                            <InputButton tooltipName="Add" className='btn nav-plus-btn text-white' event={() => { handleClick() }} icon={<HiPlus />} name={`Add Note`} />
                        </div>
                    </div>
                    {/* <div className='todo-content'> */}
                    <div className="card-body table-responsive p-0">
                        <table className="table table-hover table-striped text-nowrap">
                            <thead>
                                <tr>
                                    <th>Post On</th>
                                    <th>Text</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pathname === INVOICE_VIEW
                                    ? msgPerPageList && msgPerPageList.map(renderTableRow)
                                    : msgAPerPageList && msgAPerPageList.map(renderTableRow)
                                }
                            </tbody>
                        </table>
                        <div className="justify-content-end my-2 me-2">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={5}
                                totalItemsCount={pathname == INVOICE_VIEW ? msgTotalItemCount : msgATotalItemCount}
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

export default ActivityPage