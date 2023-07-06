import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { getAdminRole, getAdminToken, getLoggedInAdmin } from '../../../services/AdminLocalStorage';
import { ADMIN, ADMIN_COMPLETED_INVOICE, ADMIN_DASHBOARD, ADMIN_INVOICE, ADMIN_JOB_TYPE, ADMIN_LOGIN, ADMIN_NOTIFICATION, ADMIN_ORDERS, ADMIN_PAYMENT, ADMIN_TEAM, ADMIN_USER } from '../../../services/AdminRoutePath';
import { HOME, LOGIN } from '../../../services/UserRoutePath';
import swal from 'sweetalert';
import { getUserToken } from '../../../services/UserLocalStorage';

const AdminProtected = ({ Component }) => {

    let adminToken = getAdminToken();
    let adminRole = getAdminRole();
    let admin = getLoggedInAdmin();
    let userToken = getUserToken();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { slug_id } = useParams();

    useEffect(() => {
        switch (pathname) {
            case ADMIN_DASHBOARD:
                (adminRole == "admin" && adminToken && admin?.status?.includes(1)) ? navigate(ADMIN_DASHBOARD) : navigate(ADMIN_LOGIN)
                break;
            case ADMIN_INVOICE:
                (adminRole == "admin" && adminToken && admin?.status?.includes(2)) ? navigate(ADMIN_INVOICE) : navigate(ADMIN_LOGIN)
                break;
            case ADMIN_ORDERS:
                (adminRole == "admin" && adminToken && admin?.status?.includes(3)) ? navigate(ADMIN_ORDERS) : navigate(ADMIN_LOGIN)
                break;
            case ADMIN_USER:
                (adminRole == "admin" && adminToken && admin?.status?.includes(4)) ? navigate(ADMIN_USER) : navigate(ADMIN_LOGIN)
                break;
            case ADMIN_TEAM:
                (adminRole == "admin" && adminToken && admin?.status?.includes(5)) ? navigate(ADMIN_TEAM) : navigate(ADMIN_LOGIN)
                break;
            case ADMIN_PAYMENT:
                (adminRole == "admin" && adminToken && admin?.status?.includes(6)) ? navigate(ADMIN_PAYMENT) : navigate(ADMIN_LOGIN)
                break;
            case ADMIN_JOB_TYPE:
                (adminRole == "admin" && adminToken && admin?.status?.includes(7)) ? navigate(ADMIN_JOB_TYPE) : navigate(ADMIN_LOGIN);
                break;
            case ADMIN_NOTIFICATION:
                (adminRole == "admin" && adminToken && admin?.status?.includes(8)) ? navigate(ADMIN_NOTIFICATION) : navigate(ADMIN_LOGIN);
                break;
            case ADMIN_COMPLETED_INVOICE:
                (adminRole == "admin" && adminToken && admin?.status?.includes(9)) ? navigate(ADMIN_COMPLETED_INVOICE) : navigate(ADMIN_LOGIN);
                break;
            case `/admin/write-invoice-estimate/${slug_id}`:
                (adminRole == "admin" && adminToken && admin?.status?.includes(2)) ? navigate(`/admin/write-invoice-estimate/${slug_id}`) : navigate(ADMIN_LOGIN);
                break;
            case `/admin/completed-jobs/${slug_id}`:
                (adminRole == "admin" && adminToken && admin?.status?.includes(9)) ? navigate(`/admin/completed-jobs/${slug_id}`) : navigate(ADMIN_LOGIN);
                break;
            case ADMIN:
                (adminRole == "admin" && adminToken) ? navigate(ADMIN_DASHBOARD) : navigate(ADMIN_LOGIN);
                break;
            case ADMIN_LOGIN:
                (adminRole == "admin" && adminToken) ? navigate(ADMIN_DASHBOARD) : navigate(ADMIN_LOGIN);
                break;
            default:
                break;
        }
        if (userToken && (pathname == ADMIN_LOGIN)) {
            swal({
                icon: "info",
                text: "currently you're logged in user-panel, first logout then login in admin-panel!",
                // confirmButtonColor: '#0044bb',  
                // closeOnConfirm: false,
                closeOnClickOutside: false,
            }).then(function () {
                navigate(HOME)
            });
            if (!adminToken && !adminRole) {
                navigate(ADMIN_LOGIN)
            }
        }
    }, [pathname == ADMIN])

    return (
        <>
            <Component />
        </>
    )
}

export default AdminProtected