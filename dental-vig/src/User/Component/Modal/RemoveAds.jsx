import React, { useContext, useEffect } from 'react'
import { deleteConversationSeen, userDeleteProduct } from '../../../redux/actions/UserEcommerceAction';
import { useDispatch } from 'react-redux'
import $ from 'jquery';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../../../services/UserRoutePath';
import { UserValAuthContext } from '../Context/UserValContext';
import "../../Css/ReportItem.css"
const RemoveAds = ({ setSelectedUser, setShowdelete, setSelected, item_id, userid, action, setOpenRemoveAdModal, openRemoveAdModal, likemodel, setLikeModel, stateconvFromItem, setStateconvFromItem }) => {
    const dispatch = useDispatch();
    const val = useContext(UserValAuthContext)
    const navigate = useNavigate();
    const handleDelete = () => {
        if (action == 'remove') {
            dispatch(userDeleteProduct(item_id, userid));
            setOpenRemoveAdModal(false);
        }
        if (action == 'removeConv') {
            setShowdelete(false)
            setSelected(false);
            const formdata = new FormData();
            formdata.append('id', item_id);
            formdata.append('user_id', userid);
            dispatch(deleteConversationSeen(formdata));
            setOpenRemoveAdModal(false);
            setSelectedUser({});
            val?.setStateconvFromItem({});
        }

    }
    const handleCloseModal = () => {
        setOpenRemoveAdModal(false);
    }
    const handleLogin = () => {
        setOpenRemoveAdModal(false);
        navigate(USER_LOGIN);
        setLikeModel("");
    }
    return (
        <>
            <Modal show={openRemoveAdModal} backdrop="static" keyboard={false} centered>
                {action == 'remove' ? <Modal.Body>
                    you are about to delete your ad. you won't be able to undo this!!
                </Modal.Body> :
                    action == 'likeheart' ? <Modal.Body className=''>
                        <img src="images/dental-vig-images/Report-item/report-item-user.webp" style={{ height: '100px', width: '100px' }} />
                        <p className='login-text'>you are about to like this ad. Please,you have to log in!!</p>
                    </Modal.Body> :
                        <Modal.Body>
                            you are about to delete your conversation. you won't be able to undo this!!
                        </Modal.Body>}
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary"  style={{ padding: '10px 20px' }}onClick={handleCloseModal}>Close</button>
                    {action == 'likeheart' ? <button type="button"  style={{ padding: '10px 20px' }}className="btn btn-inline" onClick={handleLogin}>Login</button> : <button type="button"  style={{ padding: '10px 20px' }} className="btn btn-danger" onClick={handleDelete}>Delete</button>}
                </Modal.Footer>
            </Modal>
          
        </>
    )
}

export default React.memo(RemoveAds)