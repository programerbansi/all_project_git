import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { AdminValAuthContext } from '../../context/AdminAuthProvider';
import { ADD_USER, DELETE_JOB_TYPE, DELETE_NOTIFY, DELETE_PAYMENT, DELETE_STATUS, DELETE_USER, GET_JOB_TYPE_LIST, GET_NOTIFY_ADMIN, GET_PAYMENT_LIST, GET_STATUS_LIST, GET_TEAM_LIST, GET_USER_LIST, deleteAdminData, deleteJobType, deletePayment, deleteStatus, deleteTeam, deleteUser } from '../../../redux/action/AdminAction';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputButtonLoad from '../../../user/component/function/InputButtonLoad';
import InputButton from '../../../user/component/function/InputButton';
import { ADMIN_JOB_TYPE, ADMIN_NOTIFICATION, ADMIN_PAYMENT, ADMIN_STATUS, ADMIN_TEAM, ADMIN_USER } from '../../../services/AdminRoutePath';
import { DELETE_TEAM } from '../../../redux/action/Action';
const DeleteModel = ({ heading }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const val = useContext(AdminValAuthContext)
    const handleDelete = (id) => {
        switch (pathname) {
            case ADMIN_USER:
                val?.setLoading(true);
                dispatch(deleteAdminData(`/admin/delete-account/${id}`, DELETE_USER, val?.setLoading, val?.setShowDeleteModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setdeleteId, `/admin/get-account/?page=${val?.currentPage}`, GET_USER_LIST, "User deleted successful."));
                break;
            case ADMIN_JOB_TYPE:
                val?.setLoading(true);
                dispatch(deleteAdminData(`/admin/delete-job-type/${id}`, DELETE_JOB_TYPE, val?.setLoading, val?.setShowDeleteModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setdeleteId, `/admin/get-job-type-list/?page=${val?.currentPage}`, GET_JOB_TYPE_LIST, "Job type deleted successful."));
                break;
            case ADMIN_STATUS:
                val?.setLoading(true);
                dispatch(deleteAdminData(`/admin/delete-status/${id}`, DELETE_STATUS, val?.setLoading, val?.setShowDeleteModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setdeleteId, `/admin/get-status-list/?page=${val?.currentPage}`, GET_STATUS_LIST, "Status deleted successful."));
                break;
            case ADMIN_PAYMENT:
                val?.setLoading(true);
                dispatch(deleteAdminData(`/admin/delete-payment/${id}`, DELETE_PAYMENT, val?.setLoading, val?.setShowDeleteModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setdeleteId, `/admin/get-payment-list/?page=${val?.currentPage}`, GET_PAYMENT_LIST, "Payment Method deleted successful."));
                break;
            case ADMIN_TEAM:
                val?.setLoading(true);
                dispatch(deleteAdminData(`/admin/delete-account/${id}`, DELETE_TEAM, val?.setLoading, val?.setShowDeleteModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setdeleteId, `/admin/get-team-account/?page=${val?.currentPage}`, GET_TEAM_LIST, "Team user deleted successful."));
                break;
            case ADMIN_NOTIFICATION:
                val?.setLoading(true);
                dispatch(deleteAdminData(`/admin/delete-notify/${id}`, DELETE_NOTIFY, val?.setLoading, val?.setShowDeleteModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setdeleteId, `/admin/get-notify-admin/?page=${val?.currentPage}`, GET_NOTIFY_ADMIN, "Notification deleted successful."));
                break;
            default:
                break;
        }
    }
    const handleClose = () => {
        val?.setShowDeleteModal(false);
        val?.setAction(false);
    }
    return (
        <>
            <Modal
                show={val?.showDeleteModal}
                onHide={() => { handleClose() }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className='py-2'>
                    <Modal.Title id="contained-modal-title-vcenter fs-5">
                        Delete {heading}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure ?</h4>
                    <p className="text-muted ms-3 mb-0">Are you sure you want to remove this record ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <InputButton name={`Close`} className='btn btn-outline-secondary' event={() => { handleClose() }} />
                    {val?.loading ? <InputButtonLoad classname={'btn btn-danger'} name={"Deleting..."} /> : <InputButton name={`Yes, Delete It!`} className='btn btn-danger' event={() => { handleDelete(val?.deleteId) }} />}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModel