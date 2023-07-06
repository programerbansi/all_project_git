import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import Modal from 'react-bootstrap/Modal';
import InputButtonLoad from '../../../user/component/function/InputButtonLoad';
import InputButton from '../../../user/component/function/InputButton';
import { DELETE_CARD, DELETE_HISTORY, DELETE_INVOICE, DELETE_TEAM, GET_HISTORY_LIST, GET_INVOICE_LIST, GET_USER_CARDLIST, GET_USER_TEAM_LIST, curdData, deleteInvoice, deleteUserCard, deleteUserTeam } from '../../../redux/action/Action';
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { CARD, HISTORY, INVOICE, TEAM } from '../../../services/UserRoutePath';
const DeleteModel = ({ title, loading, setLoading, show, setShow, action, setAction, deleteItem, setDeleteItem, currentPage, setCurrentPage }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const user = getLoggedInUser()
    const handleDelete = (id) => {
        setLoading(true);
        if(pathname == INVOICE)
        {
            
            dispatch(curdData({user_id:user?.id},setLoading, setShow, setAction, `/user/delete-invoice/${id}`,DELETE_INVOICE,`/user/get-invoice/${user?.id}/?page=${currentPage}`,GET_INVOICE_LIST,"Invoice deleted successful."));
        }
        else if(pathname == CARD)
        {

            dispatch(curdData({user_id:user?.id},setLoading, setShow, setAction, `/user/delete-card/${id}`,DELETE_CARD,`/user/get-user-card/${user?.id}/?page=${currentPage}`,GET_USER_CARDLIST,"Card deleted successful."));
        }
        else if(pathname == HISTORY)
        {

            dispatch(curdData({user_id:user?.id},setLoading, setShow, setAction, `/user/delete-history/${id}`,DELETE_HISTORY,`/user/get-history-list/${user?.id}/?page=${currentPage}`,GET_HISTORY_LIST,"Log deleted successful."));
        }
        else
        {

            dispatch(curdData({user_id:user?.id},setLoading, setShow, setAction,`/user/delete-user-team/${id}`,DELETE_TEAM,`/user/get-user-team/${user?.id}/?page=${currentPage}`,GET_USER_TEAM_LIST,"Team member deleted successful."));
        }
    }
    const handleClose = () => {
        setShow(false);
        setAction(false);
    }
    return (
        <>
            <Modal
                show={show}
                onHide={() => { handleClose() }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className='py-2'>
                    <Modal.Title id="contained-modal-title-vcenter fs-5">
                       
                        {pathname == TEAM ? ` Delete ${title} Member`:` Delete ${title}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure ?</h4>
                    {pathname == TEAM ?  <p className="text-muted ms-3 mb-0">Are you sure you want to remove this team member ?</p>: <p className="text-muted ms-3 mb-0">Are you sure you want to remove this record ?</p>}
                   
                </Modal.Body>
                <Modal.Footer>
                    <InputButton name={`Close`} className='btn btn-outline-secondary' event={() => { handleClose() }} />
                    {loading ? <InputButtonLoad classname={'btn btn-danger'} name={"Deleting..."} /> : <InputButton name={`Yes, Delete It!`} className='btn btn-danger' event={() => { handleDelete(deleteItem) }} />}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModel