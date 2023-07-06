import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import InputButton from '../../../user/component/function/InputButton';
import { GET_INVOICE_BY_ID, getDataWithLoading} from '../../../redux/action/Action';
import { HOME} from '../../../services/UserRoutePath';
import PhotoPage from '../page/PhotoPage';
import DocumentPage from '../page/DocumentPage';
import { UserValAuthContext } from '../context/UserAuthProvider';
import ActivityPage from '../page/ActivityPage';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import StripePage from '../page/StripePage';
import { BiArrowBack } from 'react-icons/bi';
import BackDrop from '../function/BackDrop';
import '../../../admin/css/AdminSidebar.css'
const ViewModel = () => {
    const val = useContext(UserValAuthContext)
    const { slug_id } = useParams();
    const [loading, setLoading] = useState(false);
    const [clickTab, setClickTab] = useState(1);
    const [getLoading,setGetLoading]=useState(false);
    const [getTitle,setGetTitle]=useState('');
    const getLoadingFun=(d,t)=>{
        setGetLoading(d);
        setGetTitle(t);
    }
    let load = false;
    useEffect(() => {
        if (!load) {
            setLoading(true);
            dispatch(getDataWithLoading(`/user/get-invoice-id/${slug_id}`, GET_INVOICE_BY_ID, setLoading))
        }
        return () => { load = true }
    }, [])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const item = useSelector((state) => state.Reducer.invoiceId);
    
    const arr_tab = [
        { tabId: "#Activity", class: "active", title: "Activity",hr:0,estimate:0 },
        { tabId: "#Photo", class: "", title: "Photos",hr:"0",estimate:item.estimate },
        { tabId: "#Document", class: "", title: "Documents",hr:(item.status == 'Completed' || item.status == 'Invoice Ready/Make Payment')?"0":"1",estimate:0} ,
        (item.status == 'Completed' || item.status == 'Invoice Ready/Make Payment') && { tabId: "#Payment", class: "", title: "Payment" ,hr:"1",estimate:0}]
    const arr = [
        [{ title: "Main Phone:", data: `${item.main_phone ? item.main_phone : '-'}` }, { title: "Mobile Phone:", data: `${item.mobile_phone ? item.mobile_phone : "-"}` }, { title: "Address Line1:", data: `${item.address_1 ? item.address_1 : "-"}` }, { title: "Address Line2:", data: `${item.address_2 ? item.address_2 : "-"}` }],
        [{ title: "State:", data: `${item.state}` }, { title: "City:", data: <span className='text-capitalize'>{`${item.city}`}</span> }, { title: "Postal code:", data: `${item.postal_code}` }],
        [{ title: "Email:", data: `${item.email ? item?.email : "-"}` }, { title: "Job Type:", data: <span className='text-capitalize'>{`${item.job_type}`}</span> }, { title: "Status:", data: `${item.status}` }, item.status == "Invoice Ready/Make Payment" && { title: "Outstanding Amount:", data: <b>{`$${item?.amount ? item.amount : "00"}`}</b> }]]
    return (
        <>
            {loading ? <BackDrop /> : null}
            <section className="content p-2 mt-4">
                <div className="card">
                    <div className="card-header">
                        <InputButton name={`Back`} className='nav-plus-btn btn text-white bg-blue' icon={<BiArrowBack />} event={() => { val?.setsearchArray([]); navigate(HOME) }} />
                    </div>
                    <div className='todo-content'>
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-12 d-flex align-items-stretch flex-column">
                                    <div className="card  d-flex flex-fill">
                                        <div className="card-header fs-5 border-bottom-0">
                                            <div className='d-md-flex d-inline-block justify-content-between align-items-center'>
                                                <span>Task Information</span>
                                                <div className='d-flex'>
                                                {item?.estimate == 1 ? <small className="badge badge-danger d-block me-2">Estimate</small>:null}
                                                {item.status == 'Completed' ? <small className="badge badge-success d-block">{item?.status}</small> : <small className="badge badge-dark-blue  d-block">{item?.status}</small>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body pt-0 ">
                                            <div className="row">
                                                <h5 className="text-capitalize mt-2"><b>{item.firstname} {item.lastname}</b></h5>
                                                {arr && arr.map((nestedArr, idx1) => {
                                                    return <div className="col-12 col-md-4" key={idx1}> <ul className="ml-4 mb-0 fa-ul">
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
                                            <ul className="nav nav-pills d-md-flex d-inline-block">
                                                {arr_tab && arr_tab.map((i, idx) => {
                                                    return  i != false && i.estimate == "0" && <>
                                                    <li className="nav-item" onClick={()=>{setClickTab(idx + 1)}} key={idx}><a className={`nav-link ${i.class}`} href={i.tabId} data-toggle="tab" style={{ backgroundColor: "rgb(0 0 0 / 10%)" }}>{getTitle === i.title && getLoading ? "Loading...":i.title}</a></li>
                                                      {i.hr == "0" &&<><div className='d-md-none' style={{ width: "4px", backgroundColor: "lightblue", height: "50px", marginLeft: "20px" }}></div>
                                                      <hr className=' d-none d-md-block border border-primary border-2' style={{ width: "50px", marginTop: "20px" }} /></> } 
                                                    </>
                                                })}                                           
                                            </ul>
                                        </div>
                                        <div className="card-body p-0 my-2">
                                            
                                            <div className="tab-content">
                                                <div className="active tab-pane" id="Activity">
                                                    {item && clickTab == 1 && <ActivityPage invoice_id={slug_id} getLoadingFun={getLoadingFun}/>}
                                                </div>
                                                <div className=" tab-pane" id="Photo">
                                                    {item && item.estimate == 0 && clickTab == 2 && <PhotoPage invoice_id={slug_id} getLoadingFun={getLoadingFun}/>}
                                                </div>
                                                <div className="tab-pane" id="Document">
                                                    {item && clickTab == 3 && <DocumentPage invoice_id={slug_id} getLoadingFun={getLoadingFun}/>}
                                                </div>
                                                <div className="tab-pane p-2" id="Payment">

                                                    {item.status != 'Completed' &&  clickTab == 4? <StripePage s={item} getLoadingFun={getLoadingFun}/> : item.amount ?
                                                        <div className="card shadow-none border-0">
                                                            <div className="card-body">
                                                                <div className="text-center">
                                                                    <AiOutlineCheckCircle className='fs-130 text-success' />
                                                                </div>
                                                                <h3 className="profile-username text-center">Successfull!</h3>
                                                                <p className="text-muted text-center p-2">We received your purchase request,
                                                                    we'll be in touch shortly!</p>
                                                            </div>
                                                        </div> : <h5>It's Free!</h5>}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default ViewModel