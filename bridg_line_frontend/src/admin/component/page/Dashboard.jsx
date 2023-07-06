import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_COMPLETED_LENGTH, GET_JOB_LENGTH, GET_NEEDDOC_LENGTH, GET_NEEDPHOTO_LENGTH, GET_NOTIFICATION_LENGTH, GET_ORDER_LENGTH, GET_OTHER_LENGTH, GET_PENDING_LENGTH, GET_PROFIT_LENGTH, GET_REDYINVOICE_LENGTH, GET_STRIPAC_LENGTH, GET_TASK_LENGTH, GET_TEAM_LENGTH, GET_USERS_LENGTH, getAdminDataLength} from '../../../redux/action/AdminAction';
import { useContext } from 'react';
import { AdminValAuthContext } from '../../context/AdminAuthProvider';
import { useNavigate } from 'react-router';
import { ADMIN_COMPLETED_INVOICE, ADMIN_INVOICE, ADMIN_JOB_TYPE, ADMIN_NOTIFICATION, ADMIN_ORDERS, ADMIN_PAYMENT, ADMIN_TEAM, ADMIN_USER } from '../../../services/AdminRoutePath';
import { storeStatus } from '../../../services/UserLocalStorage';

const Dashboard = () => {
    let load = false;
    const dispatch = useDispatch();
    const val = useContext(AdminValAuthContext);
    const navigate = useNavigate();
    useEffect(() => {

        if (!load) {
            val?.setLoading(true)
            dispatch(getAdminDataLength(`/admin/get-user-length`,GET_USERS_LENGTH,val?.setLoading))
            // dispatch(getAdminDataLength(`/admin/get-invoice-length`,GET_TASK_LENGTH,val?.setLoading))
            dispatch(getAdminDataLength(`/admin/get-needphotodoc-invoice-length`,GET_NEEDPHOTO_LENGTH,val?.setLoading))
            dispatch(getAdminDataLength(`/admin/get-profit-length`,GET_PROFIT_LENGTH,val?.setLoading))
            dispatch(getAdminDataLength(`/admin/get-completed-invoice-length`,GET_COMPLETED_LENGTH,val?.setLoading))
            dispatch(getAdminDataLength(`/admin/get-pending-invoice-length`,GET_PENDING_LENGTH,val?.setLoading))
            dispatch(getAdminDataLength(`/admin/get-redy-invoice-length`,GET_REDYINVOICE_LENGTH,val?.setLoading))
            dispatch(getAdminDataLength(`/admin/get-stripAc-length`,GET_STRIPAC_LENGTH,val?.setLoading))
            dispatch(getAdminDataLength(`/admin/get-job-length`,GET_JOB_LENGTH,val?.setLoading))
            dispatch(getAdminDataLength(`/admin/get-other-invoice-length`,GET_OTHER_LENGTH,val?.setLoading))
            dispatch(getAdminDataLength(`/admin/get-team-length`,GET_TEAM_LENGTH,val?.setLoading))
            dispatch(getAdminDataLength(`/admin/get-email-notification`,GET_NOTIFICATION_LENGTH,val?.setLoading))
        }
        return () => { load = true }
    }, [])
    const userLength = useSelector((state) => state.AdminReducer.userLength);
    const jobLength = useSelector((state) => state.AdminReducer.jobLength);
    const taskLength = useSelector((state) => state.AdminReducer.taskLength);
    const stripacLength = useSelector((state) => state.AdminReducer.stripacLength);
    const pendingLength = useSelector((state) => state.AdminReducer.pendingLength);
    const needphotoLength = useSelector((state) => state.AdminReducer.needphotoLength);
    const redyLength = useSelector((state) => state.AdminReducer.redyLength);
    const completedLength = useSelector((state) => state.AdminReducer.completedLength);
    const profitLength = useSelector((state) => state.AdminReducer.profitLength);
    const otherLength = useSelector((state) => state.AdminReducer.otherLength);
    const teamLength = useSelector((state) => state.AdminReducer.teamLength);
    const notificationLength = useSelector((state) => state.AdminReducer.notificationLength);

    let obj = [
        { title: "Clients", length: userLength, color:'bg-info',icon: "ion ion-person-add", link: ADMIN_USER },
        { title: "Write Invoice/Estimate", length: pendingLength, color:'bg-success',icon: "fas fa-solid fa-clipboard", link: ADMIN_INVOICE,state:"Pending" },
        // { title: "Write Invoice/Estimate", length: taskLength, color:'bg-success',icon: "fas fa-solid fa-clipboard", link: ADMIN_INVOICE },
        { title: "Revenue", length: profitLength,color:'bg-blue', icon: "fas fa-solid fa-dollar-sign", link: ADMIN_ORDERS },
        { title: "Team", length: teamLength, color:'bg-maroon',icon: "fas fa-users", link: ADMIN_TEAM },
        { title: "Job Type", length: jobLength, color:'bg-purple',icon: "fas fa-solid fa-table", link: ADMIN_JOB_TYPE },
        // { title: "Pending", length: pendingLength, color:'bg-gray',icon: "fas fa-solid fa-clock", link: ADMIN_INVOICE,state:"Pending" },
        { title: "Needs More Documents/Needs More Photos", length: needphotoLength, color:'bg-red',icon: "fas fa-solid fa-images", link: ADMIN_INVOICE ,state:"PhotoDoc"},
        { title: "Invoice Ready/Make Payment", length: redyLength, color:'bg-teal',icon: "fas fa-solid fa-file-invoice-dollar", link: ADMIN_INVOICE,state:"Redy" },
        { title: "Completed Jobs", length: completedLength, color:'bg-pink',icon: "fas fa-solid fa-check", link: ADMIN_COMPLETED_INVOICE },
        { title: "Others", length: otherLength,color:'bg-navy', icon: "fas fa-list", link: ADMIN_INVOICE ,state:"Other"},
        { title: "Payment Method", length: stripacLength,color:'bg-olive', icon: "fas fa-money-check", link: ADMIN_PAYMENT },
        { title: "Manage Email Notifications", length: notificationLength,color:'bg-secondary', icon: "fas fa-envelope", link: ADMIN_NOTIFICATION },
    ]
    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        {
                            obj && obj.map((i, idx) => {
                                return <div className="col-lg-4 col-xl-3 col-md-4 col-sm-6 col-12" key={idx} onClick={()=>{storeStatus(i.state ? i.state:null);val?.setCurrentPage(1);navigate(i.link,{state:i.state ? i.state:""})}}>
                                <div className="info-box pointer">
                                    <span className={`info-box-icon ${i.color}`}><i className={`${i.icon}`} /></span>
                                    <div className="info-box-content overflow-hidden">
                                        <span className="info-box-text" >{i.title}</span>
                                        <span className="info-box-number">{i.length}</span>
                                    </div>                                  
                                </div>                           
                             </div>
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard