import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { ADMIN_COMPLETED_INVOICE, ADMIN_DASHBOARD, ADMIN_INVOICE, ADMIN_INVOICE_VIEW, ADMIN_JOB_TYPE, ADMIN_NOTIFICATION, ADMIN_ORDERS, ADMIN_PAYMENT, ADMIN_STATUS, ADMIN_TEAM, ADMIN_USER, ADMIN_VIEW_ORDERS } from '../../../services/AdminRoutePath';

const AdminStater = () => {
    const { pathname } = useLocation();
    const {slug_id}=useParams();
    const [data, setData] = useState({ top: "", center: "", bottom: "" });
    useEffect(() => {
        switch (pathname) {
            case ADMIN_DASHBOARD:
                setData({ top: "Dashboard", center: "", bottom: "Dashboard" })
                break;
            case ADMIN_USER:
                setData({ top: "Manage Clients", center: "", bottom: "Clients" })
                break;
            case ADMIN_INVOICE:
                setData({ top: "Write Invoice/Estimate", center: "", bottom: "Task" })
                break;
            case ADMIN_COMPLETED_INVOICE:
                setData({ top: "Completed Jobs", center: "", bottom: "" })
                break;
            case ADMIN_ORDERS:
                setData({ top: "Manage Revenue", center: "", bottom: "" })
                break;
            case ADMIN_PAYMENT:
                setData({ top: "Manage Payment Method", center: "Settings", bottom: "Payment Method" })
                break;
            case ADMIN_JOB_TYPE:
                setData({ top: "Manage Job Type", center: "Settings", bottom: "Job Type" })
                break;
            case ADMIN_TEAM:
                setData({ top: "Manage Team", center: "", bottom: "" })
                break;
            case ADMIN_NOTIFICATION:
                setData({ top: "Manage Email Notifications", center: "", bottom: "" })
                break;
            case `/admin/view/orders/${slug_id}`:
                setData({ top: "View Revenue", center: "", bottom: "" })
                break;
            default:
                break;
        }
    }, [pathname])
    return (
        <>
            <div className="content-header py-2">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <h4 className="m-0 text-dark">{data?.top}</h4>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                {(pathname == ADMIN_JOB_TYPE) || (pathname == ADMIN_PAYMENT)? <><li className="breadcrumb-item" >{data?.center}</li>
                                    <li className="breadcrumb-item ">{data?.bottom}</li></> : null}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminStater