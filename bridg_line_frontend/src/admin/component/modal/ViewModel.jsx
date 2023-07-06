import React, { useContext, useEffect, useState } from 'react'
import InputButton from '../../../user/component/function/InputButton';
import { useDispatch, useSelector } from 'react-redux';
import { AdminValAuthContext } from '../../context/AdminAuthProvider';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ADMIN_COMPLETED_INVOICE, ADMIN_INVOICE } from '../../../services/AdminRoutePath';
import PhotoPage from '../../../user/component/page/PhotoPage';
import DocumentPage from '../../../user/component/page/DocumentPage';
import ManageTask from '../page/ManageTask';
import ActivityPage from '../../../user/component/page/ActivityPage';
import { getInvoiceById } from '../../../redux/action/AdminAction';
import { ToastContainer } from 'react-toastify';
import { BiArrowBack } from 'react-icons/bi';
import BackDrop from '../../../user/component/function/BackDrop';
import DownloadInvoice from '../../../user/component/page/DownloadInvoice';
import { getStatus } from '../../../services/UserLocalStorage';

const ViewModel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [clickTab, setClickTab] = useState(1);
    const { slug_id } = useParams();
    const [loading, setLoading] = useState(false);
    const val = useContext(AdminValAuthContext)
    const { pathname } = useLocation();
    const [getLoading,setGetLoading]=useState(false);
    const [getTitle,setGetTitle]=useState('');
    const status=getStatus();
    const getLoadingFun=(d,t)=>{
        setGetLoading(d);
        setGetTitle(t);
    }
    let load = false;
    useEffect(() => {
        if (!load) {
            setLoading(true);
            dispatch(getInvoiceById(slug_id, setLoading))
        }
        return () => { load = true }
    }, [])
    const item = useSelector((state) => state.AdminReducer.invoiceId);
    const arr_tab = [
        { tabId: "#activity", class: "active", title: "Activity",hr:'0',estimate:0 },
        { tabId: "#Photo", class: "", title: "Photos",hr:"0",estimate:item.estimate},
        { tabId: "#Document", class: "", title: "Documents",hr:"0",estimate:0} ,
        pathname == `/admin/completed-jobs/${slug_id}` && { tabId: "#InvoiceDown", class: "", title: "Invoice" ,hr:"1",estimate:0},
        pathname != `/admin/completed-jobs/${slug_id}` && { tabId: "#Invoice", class: "", title: "Manage Task" ,hr:"1",estimate:0}]
    const arr = [
        [{ title: "Main Phone:", data: `${item.main_phone ? item.main_phone : '-'}` }, { title: "Mobile Phone:", data: `${item.mobile_phone ? item.mobile_phone : "-"}` }, { title: "Address Line1:", data: `${item.address_1 ? item.address_1 : "-"}` }, { title: "Address Line2:", data: `${item.address_2 ? item.address_2 : "-"}` }],
        [{ title: "State:", data: `${item.state}` }, { title: "City:", data: <span className='text-capitalize'>{`${item.city}`}</span> }, { title: "Postal code:", data: `${item.postal_code}` }],
        [{ title: "Email:", data: `${item.email ? item?.email : "-"}` }, { title: "Job Type:", data: <span className='text-capitalize'>{`${item.job_type}`}</span> }, { title: "Status:", data: `${item.status}` }, item.status == "Invoice Ready/Make Payment" && { title: "Outstanding Amount:", data: <b>{`$${item?.amount ? item.amount : "00"}`}</b> }]]
      
        const handelBack=()=>{
            navigate(ADMIN_INVOICE);
        }
        return (
        <>
            {loading ? <BackDrop /> : null}
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <InputButton tooltipName="Back" name={`Back`} className='nav-plus-btn btn text-white' icon={<BiArrowBack />} event={() => { pathname == `/admin/write-invoice-estimate/${slug_id}` ? handelBack() : navigate(ADMIN_COMPLETED_INVOICE); val?.setSelectStatus(''); }} />
                    </div>
                    <div className='todo-content'>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-12 d-flex align-items-stretch flex-column">
                                    <div className="card  d-flex flex-fill">
                                        <div className="card-header fs-5 border-bottom-0">
                                            <div className='d-md-flex d-inline-block justify-content-between align-items-center'>
                                                <span> Task Information</span>
                                                <div className='d-flex'> {item?.estimate == 1 ? <small className="badge badge-danger d-block me-2">Estimate</small>:null}                                           
                                                {item.status == 'Completed' ? <small className="badge badge-success d-block">{item?.status}</small> : <small className="badge badge-dark-blue d-block">{item?.status}</small>}
                                            </div>
                                               </div>
                                        </div>
                                        <div className="card-body pt-0 ">
                                            <div className="row">
                                                <h5 className="text-capitalize mt-2"><b>{item.firstname} {item.lastname}</b></h5>
                                                {arr && arr.map((nestedArr, idx1) => {
                                                    return <div className="col-md-4" key={idx1}> <ul className="ml-4 mb-0 fa-ul">
                                                        {nestedArr.map((obj, idx2) => {
                                                            return <div key={idx2}><li className="small my-1"><span className="fa-li">
                                                            </span> <span className='bold-500'>{obj?.title}</span> <span className=''> {obj?.data}</span>
                                                            </li></div>
                                                        })}
                                                    </ul>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header bg-white">
                                            <ul className="nav nav-pills d-md-flex d-inline-block ">
                                            {arr_tab && arr_tab.map((i, idx) => {
                                                    return  i != false && i.estimate == "0" && <>                                                
                                                    <li className="nav-item" onClick={()=>{setClickTab(idx + 1);val?.setSelectStatus('');}}><a className={`nav-link ${i.class}`} href={i.tabId} data-toggle="tab" style={{ backgroundColor: "rgb(0 0 0 / 10%)" }}>{getTitle === i.title && getLoading ? "Loading...":i.title}</a></li>
                                                      {i.hr == "0" && <><div className='d-md-none' style={{ width: "4px", backgroundColor: "lightblue", height: "50px", marginLeft: "20px" }}></div>
                                                      <hr className=' d-none d-md-block border border-primary border-2' style={{ width: "50px", marginTop: "20px" }} /></> } 
                                                    </>
                                                })}            
                                            </ul>
                                        </div>
                                        <div className="card-body p-0 my-2">
                                            <div className="tab-content">
                                                <div className="active tab-pane" id="activity">
                                                    {item && clickTab == 1 && <ActivityPage invoice_id={slug_id} getLoadingFun={getLoadingFun}/>}
                                                </div>
                                                <div className="tab-pane" id="Photo">
                                                    {item && item.estimate == 0 && clickTab == 2 && <PhotoPage invoice_id={slug_id} getLoadingFun={getLoadingFun} fname={item.firstname} lname={item.lastname} />}

                                                </div>
                                                <div className="tab-pane" id="Document">
                                                    {item && clickTab == 3 && <DocumentPage invoice_id={slug_id} getLoadingFun={getLoadingFun} fname={item.firstname} lname={item.lastname} />}
                                                </div>
                                                <div className="tab-pane" id="Invoice">
                                                    {item && clickTab == 5 && <ManageTask s={item} />}
                                                    <div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="InvoiceDown">
                                                    {item && clickTab == 4 && <DownloadInvoice s={item} />}
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
            <ToastContainer />
        </>
    )
}

export default ViewModel