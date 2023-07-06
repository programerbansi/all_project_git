import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { BILL_HISTORY, CARD, HISTORY, HOME, INVOICE, INVOICE_VIEW, LOGIN, NOTIFY, REPORT, STRIPE, TEAM } from '../../../services/UserRoutePath';
import { getLoggedInUser, getUserRole, getUserToken } from '../../../services/UserLocalStorage';
import swal from 'sweetalert';
import { ADMIN_DASHBOARD, ADMIN_LOGIN } from '../../../services/AdminRoutePath';
import { getAdminToken } from '../../../services/AdminLocalStorage';

const UserProtected = ({ Component }) => {

    let userToken = getUserToken();
    let userRole = getUserRole();
    let adminToken = getAdminToken();
    const navigate = useNavigate();
    let user = getLoggedInUser();
    const { slug_id } = useParams();
    const { pathname } = useLocation();
    useEffect(() => {
        switch (pathname) {
            case HOME:
                (userRole == "user" && userToken && user?.status?.includes(1)) ? navigate(HOME) : navigate(LOGIN)
                break;
            case INVOICE:
                (userRole == "user" && userToken && user?.status?.includes(2)) ? navigate(INVOICE) : navigate(LOGIN);
                break;
            case REPORT:
                (userRole == "user" && userToken && user?.status?.includes(3)) ? navigate(REPORT) : navigate(LOGIN);
                break;
            case TEAM:
                (userRole == "user" && userToken && user?.status?.includes(4)) ? navigate(TEAM) : navigate(LOGIN);
                break;
            case CARD:
                (userRole == "user" && userToken && user?.status?.includes(5)) ? navigate(CARD) : navigate(LOGIN);
                break;
            case BILL_HISTORY:
                (userRole == "user" && userToken && user?.status?.includes(6)) ? navigate(BILL_HISTORY) : navigate(LOGIN);
                break;
            case `/invoice/${slug_id}`:
                (userRole == "user" && userToken && user?.status?.includes(2)) ? navigate(`/invoice/${slug_id}`) : navigate(LOGIN);
                break;
            case STRIPE:
                (userRole == "user" && userToken && user?.status?.includes(2)) ? navigate(STRIPE) : navigate(LOGIN);
                break;
            case HISTORY:
                (userRole == "user" && userToken && user?.status?.includes(7)) ? navigate(HISTORY) : navigate(LOGIN);
                break;
            default:
                break;
        }
        if (adminToken && (pathname == LOGIN)) {
            swal({
                icon: "info",
                text: "currently you're logged in admin-panel, first logout then login in user-panel!",
                // confirmButtonColor: '#0044bb',  
                // closeOnConfirm: false,
                closeOnClickOutside: false,
            }).then(function () {
                navigate(ADMIN_DASHBOARD)
            });
            if (!userToken && !userRole) {
                navigate(LOGIN)
            }
            // if (!userToken) {
            //   navigate(LOGIN)
            // }
        }
    }, [])

    return (
        <>
            <Component />
        </>
    )
}

export default UserProtected