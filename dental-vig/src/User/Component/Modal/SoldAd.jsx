import React, { useContext, useEffect, useState } from 'react'
import { GET_USER_MESSAGE_LIST, getCoversationList, getDatasPost, markAsSold, userDeleteProduct } from '../../../redux/actions/UserEcommerceAction';
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import { Modal } from 'react-bootstrap';
import { UserValAuthContext } from '../Context/UserValContext';
import Avatar from '@mui/material/Avatar';
const SoldAd = ({ product, setProduct, setOpenSoldAdModal, openSoldAdModal }) => {
    console.log(product,"--------")
    const dispatch = useDispatch();
    const val = useContext(UserValAuthContext);
    const [selectedUserFlag, setSelectedUserFlag] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [quantity,setQuantity] = useState();
    const [error,setError] = useState('');

    let loggedInUser = getLoggedInUser();
    let pageLoaded = false;
    let userList = useSelector((state) => state.UserEcommerceReducer.message_List);

    useEffect(() => {
        if (!pageLoaded) {
            dispatch(getDatasPost(`user/get_all_messages`,GET_USER_MESSAGE_LIST))
            pageLoaded = true;
        }
    }, [dispatch])

    const handleMarkAsSold = () => {
        const formdata = new FormData();
        formdata.append('item_id', selectedUser?.item_id);
        formdata.append('buyer_id', selectedUser?.receiver_id == loggedInUser?.id ? selectedUser?.sender?.id : selectedUser?.receiver?.id);
        formdata.append('status', 3)

        val.setSoldProduct({buyer_id:selectedUser?.receiver_id == loggedInUser?.id ? selectedUser?.sender?.id : selectedUser?.receiver?.id,
        seller_id:selectedUser?.receiver_id == loggedInUser?.id ? selectedUser?.receiver?.id : selectedUser?.sender?.id ,items:product,seller_seen:0,buyer_seen:0})
        if(product?.quantity < quantity || quantity < 1)
        {
            setError(`only ${product?.quantity} are availabel`);
        }
        else if(!quantity)
        {
            setError('sold quantities are required');
        }
        else
        {
            formdata.append('quantity',quantity);
            dispatch(markAsSold(formdata,handleCloseModal,loggedInUser?.id,setError,setQuantity))
        }
    }
    const handleCloseModal = () => {
        setProduct({});
        setOpenSoldAdModal(false);
        setSelectedUserFlag(false);
        setSelectedUser();
    }

    const handleSelectedUser = (id, user) => {
        var spanId = document.getElementById(`${id}`);
        var imageId = document.getElementById(`image${id}`);

        for (let i = 1; i <= userList?.length + 1; i++) {
            if (id != i) {
                var sId = document.getElementById(`${i}`);
                var image = document.getElementById(`image${i}`);

                if (sId && image && sId.classList.contains('d-block')) {
                    setSelectedUserFlag(true)
                    sId.classList.remove('d-block');
                    sId.classList.add('d-none');

                    image.classList.remove('d-none');
                    image.classList.add('d-block');
                }
            }
        }
        if (spanId.classList.contains('d-none')) {
            setSelectedUserFlag(true);
            setSelectedUser(user)
            spanId.classList.remove('d-none');
            spanId.classList.add('d-block');

            imageId.classList.remove('d-block');
            imageId.classList.add('d-none');
        }
    }

    let users = userList && userList.filter((item) => item?.item_id == product?.id).length;

    return (
        <>
            <Modal show={openSoldAdModal} onHide={handleCloseModal} backdrop="static" keyboard={false} centered>
                <Modal.Header>
                    <Modal.Title>
                        <div style={{ height: '100px' }}>
                            <div className="row w-100 h-100 m-0">
                                <div className="col-4 h-100 pt-1 px-0 w-100">
                                    {product?.itemimage?.length > 0 && <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}${product?.itemimage[0]?.image}`} className='w-100 h-100' style={{ border: '1px solid #e9ecef' }} />}
                                </div>
                                <div className="col-8 h-100 pt-1">
                                    <h4>
                                        ₹ {new Intl.NumberFormat('en-IN').format(product?.price)}
                                    </h4>
                                    <h5>{product?.name}</h5>
                                </div>
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className='mb-2'>
                        Who bought your Ad ?
                    </h4>
                    <ul className="message-list" style={{ height: 'fit-content', maxHeight: '300px' }}>
                        {
                            users > 0 ?
                                userList.filter((item) => item?.item_id == product?.id).map((item, index) => {                                
                                    return <li key={index} className="message-item mt-2" onClick={() => handleSelectedUser(index + 1, item)} style={{ cursor: 'pointer' }}>
                                        <div className="message-link">
                                            <div style={{ border: 'none', marginRight: '10px', cursor: 'pointer' }}>
                                                <span id={index + 1} className='d-none'>
                                                    <i className="fas fa-check-circle" style={{ color: '#0044bb', fontSize: '40px' }} />
                                                </span>
                                                {
                                                   item?.receiver_id == loggedInUser.id ? item.sender.image?
                                                   <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${item.sender.image}`} alt="avatar" style={{ borderRadius: '50px', height: '40px', width: '40px' }} id={`image${index + 1}`} className='d-block' />:<Avatar id={`image${index + 1}`}>
                                                    {item?.sender?.name.charAt(0).toUpperCase()}</Avatar> :item.receiver.image? <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${item.receiver.image}`} alt="avatar" style={{ borderRadius: '50px', height: '40px', width: '40px' }} id={`image${index + 1}`} className='d-block' /> :<Avatar id={`image${index + 1}`}>{item?.receiver?.name.charAt(0).toUpperCase()}</Avatar>
                                                }
                                                {
                                                    
                                                }
                                            </div>
                                            <div className="message-text">
                                                {
                                                    item?.receiver_id == loggedInUser.id ?
                                                        <h6>{item?.sender?.name}</h6> :
                                                        <h6>{item?.name}</h6>
                                                     
                                                }
                                              </div>
                                        </div>
                                    </li>
                                }) :
                                <p className='text-center mt-2'>-- No Users --</p>
                        }
                      
                    </ul>
                </Modal.Body>
                <Modal.Body>
                    <input type="number" min={1} max={product?.quantity} onChange={(e)=>setQuantity(e.target.value)} className='form-control' placeholder='enter sold quantity' style={{padding:'0px 15px'}}/>
                    <span className='text-danger p-2 m-1'>{error}</span>
                </Modal.Body>
                <Modal.Footer>
                    <button type='button' className='btn btn-secondary' onClick={handleCloseModal}>Close</button>
                    <button type="button" disabled={users > 0 && selectedUserFlag ? false : true} className="btn btn-primary" style={{ backgroundColor: '#0044bb', cursor: users > 0 && selectedUserFlag ? 'pointer' : 'not-allowed' }} onClick={() => handleMarkAsSold()}>Mark as sold</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(SoldAd)