import React, { useState } from 'react'
import { Button, Carousel, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { userStoreReport } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import { USER_LOGIN } from '../../../services/UserRoutePath';
import '../../Css/ReportItem.css'

const ReportItem = ({ show, setShow ,item}) => {

    const [selectedReason, setSelectedReason] = useState('');
    const [comment, setComment] = useState('');
    const [radioError,setRadioError] = useState('');
    const [commentError,setCommentError] = useState('');

    const handleClose = () => {setShow(false);setComment('');setSelectedReason('');};
    const handleShow = () => setShow(true);
    const loggedInUser = getLoggedInUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigation = () => {
        navigate(USER_LOGIN)
    }

    let radio_values = [{name:'Offensive content',value:'offensive_content'}, {name:'Fraud',value:'fraud'}, {name:'Duplicate product',value:'duplicate_ad'}, {name:'Product already sold',value:'product_already_sold'}, {name:'Other',value:'other'}];

    const handleSubmit = () => {
        if(comment == '') setCommentError('Please add a comment to help us understand what is wrong with this item.')
        if(selectedReason == '')setRadioError('Please select a report reason')

        if(comment != '' && selectedReason != '')
        {
            const formdata = new FormData();
            formdata.append('item_id',item?.id)
            formdata.append('report',selectedReason);
            formdata.append('report_reason',comment);
            dispatch(userStoreReport(formdata,handleClose));   
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                {
                    !loggedInUser ?
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    <p className='report-modal-heading'>Report Product</p>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <img src="images/dental-vig-images/Report-item/report-item-user.webp" style={{ height: '100px', width: '100px' }} />
                                <p className='login-text'>First login/signup and explore your sell and buy experience with us .</p>
                            </Modal.Body>
                        </> :
                        <Modal.Body>
                            <h3>Item report</h3>
                            <ul className='checkbox-list'>
                                {
                                    radio_values?.map((r, index) => <li key={index}><input type="radio" value={r} name="report-reason" className='radio-input' onChange={() => setSelectedReason(r.value)} /> {r.name}</li>)
                                }
                            </ul>
                            <span className='error'>{radioError}</span>
                            <ul className='checkbox-list border p-2'>
                                <li>
                                    <textarea value={comment}
                                        placeholder={'comment'}
                                        onChange={(e) => setComment(e.target.value)}
                                        rows={4}
                                        className='w-100'
                                    />
                                </li>
                            </ul>
                            <span className='error'>{commentError}</span>
                        </Modal.Body>
                }

                <Modal.Footer>
                <button style={{ padding: '10px 20px' }} onClick={handleClose} className='btn btn-secondary'>
                        Close
                    </button>
                    {loggedInUser ?
                        <button style={{ padding: '10px 20px' }} className='btn btn-inline' onClick={() => handleSubmit()}>
                            Submit
                        </button>
                        : <button style={{ padding: '10px 20px' }} className='btn btn-inline' onClick={() => handleNavigation()}>
                            Login
                        </button>}
                 
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(ReportItem)
