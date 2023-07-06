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
import { GET_DOCUMENTS, GET_DOCUMENT_LIST, getDataList, getDataWithLoading, getDocumentList, getPhotoList } from '../../../redux/action/Action'
import prettyBytes from 'pretty-bytes';
import moment from 'moment/moment'
import EditDocumentModel from '../modal/EditDocumentModel'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import '../../css/DocumentPage.css'
import { ToastContainer } from 'react-toastify';
import { useLocation, useParams } from 'react-router'
import { INVOICE_VIEW } from '../../../services/UserRoutePath'
import { HiPlus } from 'react-icons/hi'
import { BsArrowDown, BsFillArrowDownCircleFill } from 'react-icons/bs'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import JSZip from 'jszip'
import { saveAs } from 'file-saver';
const DocumentPage = ({ invoice_id, getLoadingFun,fname, lname }) => {
    let load = false;
    const [show, setShow] = useState(false);
    const [editItem, seteditItem] = useState();
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { slug_id } = useParams();
    const user = getLoggedInUser();
    const { pathname } = useLocation();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    useEffect(() => {
        if (!load) {
            setLoading(true);
            dispatch(getDataList(`/get-document/${invoice_id}/?page=${currentPage}`, GET_DOCUMENT_LIST, setLoading))
            dispatch(getDataWithLoading(`/get-documents/${invoice_id}`, GET_DOCUMENTS, setLoading))
        }
        return () => { load = true }
    }, [currentPage])

    const handleClick = () => {
        setShow(true);
    }
    const docPerPageList = useSelector((state) => state.Reducer.docPerPageList);
    const documents = useSelector((state) => state.Reducer.documents);
    const docTotalItemCount = useSelector((state) => state.Reducer.docTotalItemCount);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const downloadPDF = (i) => {
        fetch(`${process.env.REACT_APP_DOCUMENT_URL}${i?.document}`).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `Document_${i.document}`;
                alink.click();
            })
        })
    }
    const openDocument = (p) => {
        window.open(`${process.env.REACT_APP_DOCUMENT_URL}${p?.document}`, "_blank");
    }

    const handleDownloadAll = async () => {
        var zip = new JSZip();
        const promises = documents && documents.map(async (i, index) => {
            const response = await fetch(`${process.env.REACT_APP_DOCUMENT_URL}${i?.document}`);
            const blob = await response.blob();
            zip.file(`${i?.document}`, blob);
        });
        await Promise.all(promises);
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, `Document_${invoice_id}`);
            });
    }
    useEffect(()=>{
        if(loading == true) getLoadingFun(true,"Documents");
        else getLoadingFun(false,"Documents");
    },[loading])
    return (
        <>
            {show ? <EditDocumentModel show={show} setShow={setShow} loading={loading} setLoading={setLoading} editItem={editItem} seteditItem={seteditItem} action={action} setAction={setAction} invoice_id={invoice_id} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}

            <Container fluid>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Documents</h3>
                        <div className="card-tools">
                            <InputButton tooltipName="Download All" className='btn nav-plus-btn text-white' event={() => { handleDownloadAll() }} icon={<BsArrowDown />} name={`Download All`} />
                            {pathname != `/admin/write-invoice-estimate/${slug_id}` && pathname != `/admin/completed-jobs/${slug_id}` && <InputButton tooltipName="Upload" className='btn ms-2 nav-plus-btn text-white' event={() => { handleClick() }} icon={<HiPlus />} name={`Upload`} />}
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
                                    docPerPageList && docPerPageList.map((p, idx) => {
                                        return <tr key={idx}>
                                            {p?.type == "application/pdf" ? <td onClick={() => { openDocument(p) }} className='pointer' style={{ width: '150px', height: '150px', cursor: "pointer" }}>
                                                <Document
                                                    file={`${process.env.REACT_APP_DOCUMENT_URL}${p?.document}`}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                    style={{ width: 'inherit', height: 'inherit' }}
                                                >
                                                    <Page pageNumber={1} />
                                                </Document>
                                            </td> : <td onClick={() => { openDocument(p) }} style={{ width: '150px', height: '150px', cursor: "pointer" }} className='document-user'><DocViewer
                                                documents={[{ uri: `${process.env.REACT_APP_DOCUMENT_URL}${p?.document}` }]}
                                                style={{ width: 'inherit', height: 'inherit' }}
                                                pluginRenderers={DocViewerRenderers}
                                                config={{
                                                    header: {
                                                        disableHeader: true,
                                                        disableFileName: true,
                                                        retainURLParams: false,

                                                    }
                                                }} /></td>
                                                }

                                            <td className=''>
                                                <pre className='p-0 m-0'>{moment(p.created_at).format('L')}, {p.document}<br />
                                                    Type: Document<br />
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
                                totalItemsCount={docTotalItemCount}
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

export default DocumentPage