import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Table } from 'react-bootstrap'
import '../../css/CurdPage.css'
import { ADMIN_COMPLETED_INVOICE, ADMIN_INVOICE, ADMIN_INVOICE_VIEW, ADMIN_JOB_TYPE, ADMIN_NOTIFICATION, ADMIN_ORDERS, ADMIN_PAYMENT, ADMIN_STATUS, ADMIN_TEAM, ADMIN_USER, ADMIN_VIEW_ORDERS } from '../../../services/AdminRoutePath';
import { useLocation, useNavigate } from 'react-router';
import Pagination from 'react-js-pagination';
import InputButton from '../../../user/component/function/InputButton';
import { AdminValAuthContext } from '../../context/AdminAuthProvider';
import AddEditModel from '../modal/AddEditModel';
import { useDispatch, useSelector } from 'react-redux';
import { GET_INVOICE_COMPLETED_LIST, GET_INVOICE_LIST, GET_JOB_TYPE_LIST, GET_NOTIFY_ADMIN, GET_ORDER_LIST, GET_PAYMENT_LIST, GET_PROFIT_LENGTH, GET_STATUS_LIST, GET_TEAM_LIST, GET_USER_LIST, addRemaindEmail, getAdminDataLength, getAdminDataList, getAdminDatas, getInvoiceList, getJobTypesList, getNotifyAdmin, getOrderList, getPaymentList, getStatusList, getTeamList, getUserList, makeAsDefaultPayment, updateInvoiceStatus } from '../../../redux/action/AdminAction';
import { ToastContainer } from 'react-toastify';
import DeleteModel from '../modal/DeleteModel';
import ViewUserModel from '../modal/ViewUserModel';
import { AiOutlineEye, AiOutlineMail } from 'react-icons/ai';
import { FaRegCopy, FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { HiPlus } from 'react-icons/hi';
import copy from 'copy-to-clipboard';
import { getStatus, removeStatus } from '../../../services/UserLocalStorage';
import SearchByName from '../../../user/component/function/SearchByName';
import '../../../user/css/Table.css'
import FilterStatus from './FilterStatus';
import { useCallback } from 'react';
const parse = require('html-react-parser');
const CurdPage = () => {
    const [heading, setHeading] = useState();
    const [tbhead, setTBHead] = useState([]);
    const [copys, setCopys] = useState(false);
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const val = useContext(AdminValAuthContext);
    const status = getStatus();
    let load = false;
    useEffect(() => {
        if (!load) {
            switch (pathname) {
                case ADMIN_USER:
                    setHeading("Client")
                    setTBHead([{ key: "ID", width: "5%" }, { key: "Company name", width: "" }, { key: "Name", width: "" }, { key: "Email", width: "" }, { key: "Phone", width: "" }, { key: "Password", width: "" }, { key: "Action", width: "12%" }])
                    break
                case ADMIN_INVOICE:
                    setHeading("Task")
                    setTBHead([{ key: "ID", width: "5%" }, { key: "Company Name", width: "" }, { key: "Name", width: "" }, { key: "Job Type", width: "" }, { key: "Message", width: "35%" }, { key: "Status", width: "" }, { key: "Amount", width: "" }, { key: "Action", width: "20px" }])
                    break
                case ADMIN_COMPLETED_INVOICE:
                    setHeading("Completed Task")
                    setTBHead([{ key: "ID", width: "5%" }, { key: "Company Name", width: "" }, { key: "Name", width: "" }, { key: "Job Type", width: "" }, { key: "Message", width: "35%" }, { key: "Status", width: "" }, { key: "Amount", width: "" }, { key: "Action", width: "20px" }])
                    break
                case ADMIN_ORDERS:
                    setHeading("Orders")
                    setTBHead([{ key: "ID", width: "5%" }, { key: "Company name", width: "" }, { key: "Name", width: "" }, { key: "Amount", width: "" }, { key: "Email", width: "" }, { key: "Phone", width: "" }, { key: "Password", width: "" }])

                    // setTBHead([{ key: "ID", width: "5%" }, { key: "Name", width: "" }, { key: "Amount", width: "" }, { key: "Email", width: "" }, { key: "Type", width: "" }, { key: "Status", width: "" }, { key: "Order Id", width: "" }, { key: "Date", width: "" }])
                    break
                case ADMIN_JOB_TYPE:
                    setHeading("Job Type")
                    setTBHead([{ key: "ID", width: "5%" }, { key: "Type", width: "" }, { key: "Action", width: "20px" }])
                    break
                case ADMIN_STATUS:
                    setHeading("Status")
                    setTBHead([{ key: "ID", width: "5%" }, { key: "Status", width: "" }, { key: "Action", width: "20px" }])
                    break
                case ADMIN_PAYMENT:
                    setHeading("Payment")
                    setTBHead([{ key: "ID", width: "5%" }, { key: "Name", width: "" }, { key: "Publish_key", width: "" }, { key: "Secret_key", width: "" }, { key: "Status", width: "" }, { key: "Action", width: "20px" }])
                    break
                case ADMIN_TEAM:
                    setHeading("Team")
                    setTBHead([{ key: "ID", width: "5%" }, { key: "Name", width: "" }, { key: "Email", width: "" }, { key: "Password", width: "" }, { key: "Access", width: "" }, { key: "Action", width: "12%" }])
                    break
                case ADMIN_NOTIFICATION:
                    setHeading("Email Notification")
                    setTBHead([{ key: "ID", width: "5%" }, { key: "Message Type", width: "" }, { key: "Subject", width: "20%" }, { key: "Body", width: "" }, { key: "Action", width: "12%" }])
                    break
                default:
                    break
            }
        }
        return () => { load = true }
    }, [])
    useEffect(() => {
        switch (pathname) {
            case ADMIN_USER:
                val?.setLoading(true);
                dispatch(getAdminDataList(`/admin/get-account/?page=${val?.currentPage}`, GET_USER_LIST, val?.setLoading));
                break;
            case ADMIN_INVOICE:
                val?.setLoading(true);
                dispatch(getAdminDataList(`/admin/get-invoice/${status}/?page=${val?.currentPage}`, GET_INVOICE_LIST, val?.setLoading));
                break;
            case ADMIN_COMPLETED_INVOICE:
                val?.setLoading(true);
                dispatch(getAdminDataList(`/admin/get-invoice-completed/?page=${val?.currentPage}`, GET_INVOICE_COMPLETED_LIST, val?.setLoading));
                break;
            case ADMIN_JOB_TYPE:
                val?.setLoading(true);
                dispatch(getAdminDataList(`/admin/get-job-type-list/?page=${val?.currentPage}`, GET_JOB_TYPE_LIST, val?.setLoading));
                break;
            case ADMIN_STATUS:
                val?.setLoading(true);
                dispatch(getAdminDataList(`/admin/get-status-list/?page=${val?.currentPage}`, GET_STATUS_LIST, val?.setLoading));
                break;
            case ADMIN_PAYMENT:
                val?.setLoading(true);
                dispatch(getAdminDataList(`/admin/get-payment-list/?page=${val?.currentPage}`, GET_PAYMENT_LIST, val?.setLoading));
                break;
            case ADMIN_ORDERS:
                val?.setLoading(true);
                dispatch(getAdminDataList(`/admin/get-account/?page=${val?.currentPage}`, GET_USER_LIST, val?.setLoading));
                dispatch(getAdminDataLength(`/admin/get-profit-length`, GET_PROFIT_LENGTH, val?.setLoading))
                // dispatch(getAdminDataList(`/admin/get-orders/?page=${val?.currentPage}`, GET_ORDER_LIST, val?.setLoading));
                break;
            case ADMIN_TEAM:
                val?.setLoading(true);
                dispatch(getAdminDataList(`/admin/get-team-account/?page=${val?.currentPage}`, GET_TEAM_LIST, val?.setLoading));
                break;
            case ADMIN_NOTIFICATION:
                val?.setLoading(true);
                dispatch(getAdminDataList(`/admin/get-notify-admin/?page=${val?.currentPage}`, GET_NOTIFY_ADMIN, val?.setLoading));
                break;
            default:
                break
        }
    }, [pathname, val?.currentPage]);
    const handlePageChange = (pageNumber) => {
        val?.setCurrentPage(pageNumber)
    }
    const handleAdd = () => {
        val?.setAction("add");
        val?.setShowModal(true);
        // val?.setFilteredArray([]);
        // removeStatus("");
    }
    const handleEdit = (item) => {

        val?.setAction("edit");
        val?.setShowModal(true)
        val?.setEditItem(item)
        // val?.setFilteredArray([]);
        // removeStatus("");

    }
    const handleDelete = (id) => {
        // val?.setFilteredArray([]);
        val?.setAction("delete");
        val?.setShowDeleteModal(true)
        val?.setdeleteId(id)
        // removeStatus("");
    }
    const handleView = (item, title) => {
        // val?.setFilteredArray([]);
        // removeStatus("");
        if (pathname == ADMIN_INVOICE) {
            navigate(`/admin/write-invoice-estimate/${item.id}`, { state: { viewItem: item, title: title } })
        }
        else {
            navigate(`/admin/completed-jobs/${item.id}`, { state: { viewItem: item, title: title } })

        }
    }
    const handleViewModel = (item) => {
        // val?.setFilteredArray([]);
        // removeStatus("");
        val?.setShowViewModal(true)
        val?.setViewItem(item)
    }
    const handlePaymentStatus = (e, item) => {
        // val?.setFilteredArray([]);
        // removeStatus("");
        const formdata = new FormData();
        formdata.append('status', 1);
        dispatch(makeAsDefaultPayment(item?.id, formdata, val?.setLoading, val?.currentPage, val?.setCurrentPage, `/admin/get-payment-list/?page=${val?.currentPage}`, GET_PAYMENT_LIST));
    }
    const userPerPageList = useSelector((state) => state.AdminReducer.userPerPageList);
    const userTotalItemCount = useSelector((state) => state.AdminReducer.userTotalItemCount);

    const invoicePerPageList = useSelector((state) => state.AdminReducer.invoicePerPageList);
    const invoiceTotalItemCount = useSelector((state) => state.AdminReducer.invoiceTotalItemCount);

    const invoiceCompPerPageList = useSelector((state) => state.AdminReducer.invoiceCompPerPageList);
    const invoiceCompTotalItemCount = useSelector((state) => state.AdminReducer.invoiceCompTotalItemCount);

    const jobTypePerPageList = useSelector((state) => state.AdminReducer.jobTypePerPageList);
    const jobTypeTotalItemCount = useSelector((state) => state.AdminReducer.jobTypeTotalItemCount);

    const statusPerPageList = useSelector((state) => state.AdminReducer.statusPerPageList);
    const statusTotalItemCount = useSelector((state) => state.AdminReducer.statusTotalItemCount);

    const paymentPerPageList = useSelector((state) => state.AdminReducer.paymentPerPageList);
    const paymentTotalItemCount = useSelector((state) => state.AdminReducer.paymentTotalItemCount);

    const orderPerPageList = useSelector((state) => state.AdminReducer.orderPerPageList);
    const orderTotalItemCount = useSelector((state) => state.AdminReducer.orderTotalItemCount);

    const teamPerPageList = useSelector((state) => state.AdminReducer.teamPerPageList);
    const teamTotalItemCount = useSelector((state) => state.AdminReducer.teamTotalItemCount);
    const profitLength = useSelector((state) => state.AdminReducer.profitLength);
    const notify = useSelector((state) => state.AdminReducer.notify);
    const notifyTotalItemCount = useSelector((state) => state.AdminReducer.notifyTotalItemCount);
    const handleCopyToClipBorad = (text) => {
        setCopys(true);
        copy(text, {
            debug: true,
        });
        setTimeout(() => { setCopys(false) }, 1000)
    }
    const viewOrders = (id, amt) => {
        navigate(`/admin/view/orders/${id}`, { state: { amount: amt } })
    }
    const remainderEmail = (i) => {
        const formdata = new FormData();
        formdata.append('name', `${i.firstname} ${i.lastname}`);
        formdata.append('user_id', i.user_id);
        formdata.append('status', i.status);
        dispatch(addRemaindEmail(formdata))
    }
    const getFilterStatus=useCallback((status)=>{
        val?.setLoading(true);
        dispatch(getAdminDataList(`/admin/get-invoice/${status}/?page=${val?.currentPage}`, GET_INVOICE_LIST, val?.setLoading));
    },[status])
    return (
        <>
            {val?.showModal ? <AddEditModel heading={heading} /> : null}
            {val?.showDeleteModal ? <DeleteModel heading={heading} /> : null}
            {val?.showViewModal ? <ViewUserModel heading={heading} /> : null}
            {copys && <div className='px-2'><Alert key="success" variant="success" className='p-2'>
                Copied to Clipboard!
            </Alert></div>}
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <div className='d-flex justify-content-between'>
                            
                            <div>
                                {heading == "Task" || heading == 'Completed Task' || heading == 'Client' ? <SearchByName list={heading == "Task" ? invoicePerPageList : heading == 'Client' ? userPerPageList : heading == 'Completed Task' ? invoiceCompPerPageList : null} /> : null}
                            </div>
                  

                            {heading == "Orders" ? <div className='d-flex'><span className='me-2'>Total Revenue:</span><h5> {profitLength}</h5></div> :  heading == "Task" ? <FilterStatus state={status} getFilterStatus={getFilterStatus}/> : heading == "Completed Task" || heading == 'Orders' ? <div className='my-3'></div> : <InputButton tooltipName={`Add ${heading}`} name={`Add ${heading}`} className='btn-blue btn text-white' icon={<HiPlus className='text-white ' />} event={() => { handleAdd() }} />}
                        </div>
                    </div>
                    <div className='todo-content'>
                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead className='table-header'>
                                    <tr>
                                        {tbhead.map((t, index) => {
                                            return <th className="" key={index} style={{ width: t?.width }}>{t?.key}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {heading == 'Client' && val?.filteredArray && val?.filteredArray.length > 0 ? val?.filteredArray.map((i, idx) => {
                                        return <tr key={idx} className='pointer'>
                                            <td onClick={() => { handleViewModel(i) }}>{idx + 1}</td>
                                            <td onClick={() => { handleViewModel(i) }} className='qcont'>{i.comp_name}</td>
                                            <td onClick={() => { handleViewModel(i) }} className='text-capitalize'>{i.firstname} {i.lastname}</td>
                                            <td><span onClick={() => { handleViewModel(i) }}>{i.email}</span>
                                                <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.email) }}><FaRegCopy /></button></td>
                                            <td onClick={() => { handleViewModel(i) }} >{i.phone}</td>
                                            <td><span onClick={() => { handleViewModel(i) }}>{i.visible_password}</span>
                                                <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.visible_password) }}><FaRegCopy /></button></td>

                                            <td>
                                                <div className="d-flex gap-2 ">
                                                    <InputButton tooltipName="View" className="btn btn-sm btn-secondary edit-item-btn" name="" event={() => { handleViewModel(i) }} icon={<AiOutlineEye className='icon-all' />} ></InputButton>
                                                    <InputButton tooltipName="Edit" className="btn btn-sm btn-success edit-item-btn" name="" event={() => { handleEdit(i) }} icon={<FaRegEdit className='icon-all' />}></InputButton>
                                                    <InputButton tooltipName="Delete" className="btn btn-sm btn-danger remove-item-btn" name="" event={() => { handleDelete(i?.id) }} icon={<RiDeleteBinLine className='icon-all' />}></InputButton>
                                                </div>
                                            </td>
                                        </tr>
                                    }) : heading == 'Client' && userPerPageList && userPerPageList.map((i, idx) => {
                                        return <tr key={idx} className='pointer'>
                                            <td onClick={() => { handleViewModel(i) }}>{idx + 1}</td>
                                            <td onClick={() => { handleViewModel(i) }} className='qcont'>{i.comp_name}</td>
                                            <td onClick={() => { handleViewModel(i) }} className='text-capitalize'>{i.firstname} {i.lastname}</td>

                                            <td><span onClick={() => { handleViewModel(i) }}>{i.email}</span>
                                                <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.email) }}><FaRegCopy /></button></td>
                                            <td onClick={() => { handleViewModel(i) }} >{i.phone}</td>
                                            <td><span onClick={() => { handleViewModel(i) }}>{i.visible_password}</span>
                                                <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.visible_password) }}><FaRegCopy /></button></td>

                                            <td>
                                                <div className="d-flex gap-2 ">
                                                    <InputButton tooltipName="View" className="btn btn-sm btn-secondary edit-item-btn" name="" event={() => { handleViewModel(i) }} icon={<AiOutlineEye className='icon-all' />} ></InputButton>
                                                    <InputButton tooltipName="Edit" className="btn btn-sm btn-success edit-item-btn" name="" event={() => { handleEdit(i) }} icon={<FaRegEdit className='icon-all' />}></InputButton>
                                                    <InputButton tooltipName="Delete" className="btn btn-sm btn-danger remove-item-btn" name="" event={() => { handleDelete(i?.id) }} icon={<RiDeleteBinLine className='icon-all' />}></InputButton>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                    {heading == 'Team' && teamPerPageList && teamPerPageList.map((i, idx) => {
                                        return <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td className='text-capitalize'>{i.firstname} {i.lastname}</td>
                                            <td>{i.email}
                                                <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.email) }}><FaRegCopy /></button></td>
                                            <td>{i.visible_password}
                                                <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.visible_password) }}><FaRegCopy /></button></td>
                                            <td>
                                                {i.status?.length === 0 && "-"}
                                                {i.status?.includes(1) && "Dashboard , "}
                                                {i.status?.includes(2) && "Write Invoice/Estimate , "}
                                                {i.status?.includes(3) && "Order , "}
                                                {i.status?.includes(4) && "Client , "}
                                                {i.status?.includes(5) && "Team , "}
                                                {i.status?.includes(6) && "Payment Method , "}
                                                {i.status?.includes(7) && "Job Type , "}
                                                {i.status?.includes(8) && "Notification , "}
                                                {i.status?.includes(9) && "Completed Jobs , "}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2 ">
                                                    <InputButton tooltipName="Edit" className="btn btn-sm btn-success edit-item-btn" name="" event={() => { handleEdit(i) }} icon={<FaRegEdit className='icon-all' />}></InputButton>
                                                    <InputButton tooltipName="Delete" className="btn btn-sm btn-danger remove-item-btn" name="" event={() => { handleDelete(i?.id) }} icon={<RiDeleteBinLine className='icon-all' />}></InputButton>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                    {
                                        heading == 'Task' && val?.filteredArray && val?.filteredArray.length > 0 ? val?.filteredArray.map((i, idx) => {
                                            return <tr key={idx} className='pointer'>
                                                <td>{idx + 1}</td>
                                                <td className='text-capitalize' onClick={() => { handleView(i) }}>{i.ucomp_name}</td>
                                                <td className='text-capitalize' onClick={() => { handleView(i) }}>{i.firstname} {i.lastname}</td>
                                                <td className='text-capitalize' onClick={() => { handleView(i) }}>{i.job_type}</td>
                                                <td onClick={() => { handleView(i) }}><span className='text-ellipsis-pre d-block' >{i.message ? i.message : "-"}</span></td>
                                                <td onClick={() => { handleView(i) }}>{i.status ? i.status : "-"}</td>
                                                <td onClick={() => { handleView(i) }} className='text-bold'>{i.amount ? `$${i.amount}` : "-"}</td>
                                                <td>
                                                    <div className="d-flex gap-2 ">
                                                        <InputButton event={() => { handleView(i) }} tooltipName="View" className="btn btn-sm btn-secondary edit-item-btn" name="" icon={<AiOutlineEye className='icon-all' />} ></InputButton>
                                                        {(i.status == "Need more photos") || (i.status == "Need more documents") || (i.status == "Invoice Ready/Make Payment") ? <InputButton event={() => { remainderEmail(i) }} tooltipName="Reminder email" className="btn btn-sm btn-success edit-item-btn" name="" icon={<AiOutlineMail className='icon-all' />} ></InputButton> : null}

                                                    </div>
                                                </td>
                                            </tr>
                                        }) :
                                        heading == 'Task' && invoicePerPageList && invoicePerPageList.map((i, idx) => {
                                            return <tr key={idx} className='pointer'>
                                                <td>{idx + 1}</td>
                                                <td className='text-capitalize' onClick={() => { handleView(i) }}>{i.ucomp_name}</td>
                                                <td className='text-capitalize' onClick={() => { handleView(i) }}>{i.firstname} {i.lastname}</td>
                                                <td className='text-capitalize' onClick={() => { handleView(i) }}>{i.job_type}</td>
                                                <td onClick={() => { handleView(i) }}><span className='text-ellipsis-pre d-block' >{i.message ? i.message : "-"}</span></td>
                                                <td onClick={() => { handleView(i) }}>{i.status ? i.status : "-"}</td>
                                                <td onClick={() => { handleView(i) }} className='text-bold'>{i.amount ? `$${i.amount}` : "-"}</td>
                                                <td>
                                                    <div className="d-flex gap-2 ">
                                                        <InputButton event={() => { handleView(i) }} tooltipName="View" className="btn btn-sm btn-secondary edit-item-btn" name="" icon={<AiOutlineEye className='icon-all' />} ></InputButton>
                                                        {(i.status == "Need more photos") || (i.status == "Need more documents") || (i.status == "Invoice Ready/Make Payment") ? <InputButton event={() => { remainderEmail(i) }} tooltipName="Reminder email" className="btn btn-sm btn-success edit-item-btn" name="" icon={<AiOutlineMail className='icon-all' />} ></InputButton> : null}
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    {
                                        heading == 'Completed Task' && val?.filteredArray && val?.filteredArray.length > 0 ? val?.filteredArray.map((i, idx) => {
                                            return <tr key={idx} className='pointer' onClick={() => { handleView(i) }}>
                                                <td>{idx + 1}</td>
                                                <td className='text-capitalize' onClick={() => { handleView(i) }}>{i.ucomp_name}</td>
                                                <td className='text-capitalize'>{i.ufname} {i.ulname}</td>
                                                <td className='text-capitalize'>{i.job_type}</td>
                                                <td ><span className='text-ellipsis-pre d-block'>{i.message ? i.message : "-"}</span></td>
                                                <td>{i.status ? i.status : "-"}</td>
                                                <td className='text-bold'>{i.amount ? `$${i.amount}` : "$00"}</td>
                                                <td>
                                                    <div className="d-flex gap-2 ">
                                                        <InputButton tooltipName="View" className="btn btn-sm btn-secondary edit-item-btn" name="" icon={<AiOutlineEye className='icon-all' />} ></InputButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        }) : heading == 'Completed Task' && invoiceCompPerPageList && invoiceCompPerPageList.map((i, idx) => {
                                            return <tr key={idx} className='pointer' onClick={() => { handleView(i) }}>
                                                <td>{idx + 1}</td>
                                                <td className='text-capitalize' onClick={() => { handleView(i) }}>{i.ucomp_name}</td>
                                                <td className='text-capitalize'>{i.firstname} {i.lastname}</td>
                                                <td className='text-capitalize'>{i.job_type}</td>
                                                <td ><span className='text-ellipsis-pre d-block'>{i.message ? i.message : "-"}</span></td>
                                                <td>{i.status ? i.status : "-"}</td>
                                                <td className='text-bold'>{i.amount ? `$${i.amount}` : "$00"}</td>
                                                <td>
                                                    <div className="d-flex gap-2 ">
                                                        <InputButton tooltipName="View" className="btn btn-sm btn-secondary edit-item-btn" name="" icon={<AiOutlineEye className='icon-all' />} ></InputButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    {heading == 'Job Type' && jobTypePerPageList && jobTypePerPageList.map((i, idx) => {
                                        return <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td className='text-capitalize'>{i.type}</td>
                                            <td>
                                                <div className="d-flex gap-2 ">
                                                    <InputButton tooltipName="Edit" className="btn btn-sm btn-success edit-item-btn" name="" event={() => { handleEdit(i) }} icon={<FaRegEdit className='icon-all' />}></InputButton>
                                                    <InputButton tooltipName="Delete" className="btn btn-sm btn-danger remove-item-btn" name="" event={() => { handleDelete(i?.id) }} icon={<RiDeleteBinLine className='icon-all' />}></InputButton>
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                    {
                                        heading == 'Status' && statusPerPageList && statusPerPageList.map((i, idx) => {
                                            return <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td >{i.status}</td>
                                                <td>
                                                    <div className="d-flex gap-2 ">
                                                        <InputButton tooltipName="Edit" className="btn btn-sm btn-success edit-item-btn" name="" event={() => { handleEdit(i) }} icon={<FaRegEdit className='icon-all' />}></InputButton>
                                                        <InputButton tooltipName="Delete" className="btn btn-sm btn-danger remove-item-btn" name="" event={() => { handleDelete(i?.id) }} icon={<RiDeleteBinLine className='icon-all' />}></InputButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    {
                                        heading == 'Payment' && paymentPerPageList && paymentPerPageList.map((i, idx) => {
                                            return <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td className='text-capitalize'>{i.name}</td>
                                                <td><div className='text-ellipsis-290'>{i.publish_key}</div></td>
                                                <td><div className='text-ellipsis-290'>{i.secret_key}</div></td>
                                                <td><div className="custom-control custom-switch">
                                                    <input type="checkbox" className="custom-control-input" id={`checked${idx}`} checked={i?.status == 1 ? true : false} onClick={i.status == 0 ? (e) => { handlePaymentStatus(e, i) } : () => { }} />
                                                    <label className="custom-control-label" htmlFor={`checked${idx}`}></label>
                                                </div></td>
                                                <td>
                                                    <div className="d-flex gap-2 ">

                                                        <InputButton tooltipName="Edit" className="btn btn-sm btn-success edit-item-btn" name="" event={() => { handleEdit(i) }} icon={<FaRegEdit className='icon-all' />}></InputButton>
                                                        <InputButton tooltipName="Delete" className="btn btn-sm btn-danger remove-item-btn" name="" event={() => { handleDelete(i?.id) }} icon={<RiDeleteBinLine className='icon-all' />}></InputButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    {
                                        heading == 'Email Notification' && notify && notify.map((i, idx) => {
                                            return <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{i.msg_type}</td>
                                                <td className='text-capitalize'>{i.subject}</td>
                                                <td><span className='text-ellipsis-290'>{parse(i.html1)}</span></td>
                                                <td>
                                                    <div className="d-flex gap-2 ">
                                                        <InputButton tooltipName="Edit" className="btn btn-sm btn-success edit-item-btn" name="" event={() => { handleEdit(i) }} icon={<FaRegEdit className='icon-all' />}></InputButton>
                                                        <InputButton tooltipName="Delete" className="btn btn-sm btn-danger remove-item-btn" name="" event={() => { handleDelete(i?.id) }} icon={<RiDeleteBinLine className='icon-all' />}></InputButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    {heading == 'Orders' && userPerPageList && userPerPageList.map((i, idx) => {
                                        return <tr key={idx} className='pointer'>
                                            <td onClick={() => { viewOrders(i.id, i.amount) }}>{idx + 1}</td>
                                            <td onClick={() => { viewOrders(i.id, i.amount) }} className='qcont'>{i.comp_name}</td>
                                            <td onClick={() => { viewOrders(i.id, i.amount) }} className='text-capitalize'>{i.firstname} {i.lastname}</td>
                                            <td onClick={() => { viewOrders(i.id, i.amount) }} className='text-capitalize text-bold'>{i.amount ? `$${i.amount}` : "-"}</td>
                                            <td><span onClick={() => { }}>{i.email}</span>
                                                <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.email) }}><FaRegCopy /></button></td>
                                            <td onClick={() => { viewOrders(i.id, i.amount) }} >{i.phone}</td>
                                            <td><span onClick={() => { }}>{i.visible_password}</span>
                                                <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.visible_password) }}><FaRegCopy /></button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="my-2 me-2">
                            {heading != "Payment" && val?.filteredArray < 1 && <Pagination
                                activePage={val?.currentPage}
                                itemsCountPerPage={10}
                                totalItemsCount={pathname == ADMIN_NOTIFICATION ? notifyTotalItemCount : pathname == ADMIN_USER ? userTotalItemCount : pathname == ADMIN_TEAM ? teamTotalItemCount : pathname == ADMIN_INVOICE ? invoiceTotalItemCount : pathname == ADMIN_JOB_TYPE ? jobTypeTotalItemCount : pathname == ADMIN_STATUS ? statusTotalItemCount : pathname == ADMIN_PAYMENT ? paymentTotalItemCount : pathname == ADMIN_ORDERS ? userTotalItemCount : pathname == ADMIN_COMPLETED_INVOICE ? invoiceCompTotalItemCount : null}
                                pageRangeDisplayed={5}
                                innerClass="pagination listjs-pagination "
                                activeClass="page-item-active"
                                activeLinkClass="page-item-active"
                                linkClass="page-item"
                                onChange={(value) => { handlePageChange(value) }}
                            />}
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />

        </>
    )
}

export default CurdPage