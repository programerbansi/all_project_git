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
const DownloadInvoice = ({ s }) => {
    
    const [numPages, setNumPages] = useState(null);
    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const downloadPDF = (i) => {
        fetch(`${process.env.REACT_APP_INVOICE_URL}${i?.invoice_file}`).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `Invoice_${i.invoice_file}`;
                alink.click();
            })
        })
    }
    const openDocument = (p) => {
        window.open(`${process.env.REACT_APP_INVOICE_URL}${p?.invoice_file}`, "_blank");
    }

    return (
        <>

            <Container fluid>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Invoice</h3>
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
                                <tr>
                                    {s?.invoice_file?.type == "application/pdf" ? <td onClick={() => { openDocument(s?.invoice_file) }} className='pointer' style={{ width: '150px', height: '150px', cursor: "pointer" }}>
                                        <Document
                                            file={`${process.env.REACT_APP_INVOICE_URL}${s?.invoice_file?.invoice_file}`}
                                            onLoadSuccess={onDocumentLoadSuccess}
                                            style={{ width: 'inherit', height: 'inherit' }}
                                        >
                                            <Page pageNumber={1} />
                                        </Document>
                                    </td> : <td onClick={() => { openDocument(s?.invoice_file) }} style={{ width: '150px', height: '150px', cursor: "pointer" }} className='document-user'><DocViewer
                                        documents={[{ uri: `${process.env.REACT_APP_INVOICE_URL}${s?.invoice_file?.invoice_file}` }]}
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
                                        <pre className='p-0 m-0'>{moment(s?.invoice_file?.created_at).format('L')}, {s?.invoice_file?.invoice_file}<br />
                                            Type: Document<br />
                                            Size: {prettyBytes(s?.invoice_file?.size, { minimumFractionDigits: 2 })}<br />
                                            {moment(s?.invoice_file?.created_at).format('LLLL')}<br />
                                            Uploaded by {s?.invoice_file?.firstname} {s?.invoice_file?.lastname} </pre>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <InputButton tooltipName="Download" className="btn bg-transparent border-0 " icon={<BsFillArrowDownCircleFill className='download-icon fs-3 text-blue' />} event={() => { downloadPDF(s?.invoice_file) }} />
                                        </div>
                                    </td>
                                </tr>



                            </tbody>
                        </table>
                    </div>
                    {/* </div> */}
                </div>
            </Container>
            {/* <ToastContainer /> */}
        </>
    )
}

export default DownloadInvoice