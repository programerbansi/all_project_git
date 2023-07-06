import React, { useState } from 'react'
import { GET_USER_CARDS, getCards, getDataWithLoading, getStripePayment, getUserCardList } from '../../../redux/action/Action';
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import InputText from '../function/InputText';
import InputLabel from '../function/InputLabel';
import '../../css/StripePage.css'
import CreditCardInput from 'react-credit-card-input';
import InputButtonLoad from '../function/InputButtonLoad';
import InputButton from '../function/InputButton';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { CARD } from '../../../services/UserRoutePath';
import CardModel from '../modal/CardModel';
import BackDrop from '../function/BackDrop';
import { issuerImages } from '../json/arrayJson';
const StripePage = ({ s,getLoadingFun }) => {
    let load = false;
    const [loading, setLoading] = useState(false)
    const [loadingPay, setLoadingPay] = useState(false);
    const [selected, setSelected] = useState('');
    const [showCard1, setShowCard1] = useState(false);
    const cards = useSelector((state) => state.Reducer.cards);
    let selectedcard = cards && cards.find(({ status }) => status === 1)
    const [selectedItem, setSelectedItem] = useState();
    const navigate = useNavigate();
    useEffect(() => { setSelectedItem(selectedcard) }, [selectedcard])
    let user = getLoggedInUser();
    const dispatch = useDispatch()
    useEffect(()=>{
        if(loading == true) getLoadingFun(true,"Payment");
        else getLoadingFun(false,"Payment");
    },[loading])
    useEffect(() => {
        if (!load) {
            setLoading(true);
            dispatch(getDataWithLoading(`/user/get-user-cards/${user.id}`, GET_USER_CARDS, setLoading))
        }
        return () => { load = true }
    }, [])
    const [action, setAction] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [editItem, setEditItem] = useState();
    const handleClickCard = (i, idx) => {
        setSelected(idx);
        setSelectedItem(i);
    }
    const handlePay = (item, card) => {
        console.log(item)
        const month = moment(`${card.expiry.substr(0, 2)}/01/${card.expiry.substr(4, 5)}`).format('MM')
        const year = moment(`${card.expiry.substr(0, 2)}/01/${card.expiry.substr(4, 5)}`).format('YYYY')
        const formdata = new FormData();

        formdata.append(`user_id`, item.user_id)
        formdata.append(`invoice_id`, item.id)
        formdata.append(`name`, `${user?.firstname} ${user?.lastname}`)
        formdata.append(`email`, user?.email)
        formdata.append(`amount`, item.amount)
        formdata.append(`card_number`, card.card_number)
        formdata.append(`exp_month`, month)
        formdata.append(`exp_year`, year)
        formdata.append(`status`, "Completed")
        formdata.append(`cvc`, `${card.cvc}`)
        formdata.append(`invoice_name`, `${item.firstname} ${item.lastname}`)
        setLoadingPay(true)
        dispatch(getStripePayment(formdata, setLoadingPay, navigate))
    }
    const handleAddCard = () => {
        setShowCard1(true);
        setAction('add')
    }
    const selectedIssuerImage = issuerImages[selectedItem?.issuer];

    return (
        <>
        {/* {loading?<BackDrop/>:null} */}
            {showCard1 ? <CardModel title={"Card"} show={showCard1} setShow={setShowCard1} action={action} setAction={setAction} loading={loading} setLoading={setLoading} editItem={editItem} seteditItem={setEditItem} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}
            <div className='d-flex justify-content-center'>
                <div className='main-stripe-width'>
                    <div className="card" >
                        <div className="card-body py-0">
                            <div className='row '>
                                <div className='col-md-6 col-12 bg-light'>
                                    <div className='py-2'>
                                        <span className='text-capitalize fs-5'>{`${s.firstname}_${s.lastname}_Invoice`}</span>
                                        <h4 className=''>${s?.amount}</h4>
                                    </div>
                                    <ul className='card-list'>
                                        {
                                            cards && cards.map((i, idx) => {
                                                const issuerImage = issuerImages[i.issuer];
                                                return <li className={`${selected === idx ? "active" : (selected === '' && i?.status === 1) ? 'active' : ''}`} key={idx} onClick={() => { handleClickCard(i, idx) }}>
                                                    <div className='d-flex align-items-center ps-2 '>
                                                        {issuerImage && (
                                                            <img
                                                                key={idx}
                                                                className={issuerImage.className}
                                                                src={issuerImage.src}
                                                                style={{
                                                                    width: issuerImage.width,
                                                                    height: issuerImage.height,
                                                                    objectFit: "contain",
                                                                }}
                                                                alt={i.issuer}
                                                            />
                                                        )}
                                                        <small><b>{i.card_number_text}</b></small>
                                                    </div>
                                                    <div className='d-flex align-items-center ps-2'>
                                                        <span>Credit Card</span>
                                                        <span className='mx-1'> | </span>


                                                        <span>Expries {moment(`${i.expiry.substr(0, 2)}/01/${i.expiry.substr(4, 5)}`, "MM/DD/YY").format('YYYY-MM-DD')}</span>
                                                    </div>
                                                </li>

                                            })
                                        }
                                    </ul>
                                    <InputButton name={`Add Card`} className='nav-plus-btn btn text-white d-inline-block w-100 mb-2' event={() => { handleAddCard() }} />
                                </div>
                                <div className='col-md-6 col-12'>
                                    <h5 className='py-2'>Pay with card</h5>
                                    <div className='bg-lavender'>
                                        <div className=''>
                                            <h6 className='p-0 ms-2 mb-0 text-capitalize '>{`${user?.firstname} ${user?.lastname}`}</h6>
                                            <span className='ms-2'>{`${user?.email}`}</span>
                                        </div>
                                        <div className='d-flex align-items-center ps-2'>                            
                                            {selectedIssuerImage && (
                                                <img
                                                    className={selectedIssuerImage.className}
                                                    src={selectedIssuerImage.src}
                                                    style={{
                                                        width: selectedIssuerImage.width,
                                                        height: selectedIssuerImage.height,
                                                        objectFit: "contain",
                                                    }}
                                                    alt={selectedIssuerImage}
                                                />
                                            )}                                       
                                         <small><b>{selectedItem?.card_number_text}</b></small>
                                        </div>
                                        {cards && cards.length > 0 ? <div className='d-flex align-items-center ps-2'>
                                            <span>Credit Card</span>
                                            <span className='mx-1'> | </span>
                                            <span>Expries {moment(`${selectedItem?.expiry.substr(0, 2)}/01/${selectedItem?.expiry.substr(4, 5)}`, "MM/DD/YY").format('YYYY-MM-DD')}</span>
                                        </div> : null}
                                    </div>
                                    {loadingPay ? <InputButtonLoad classname={'nav-plus-btn btn text-white d-inline-block w-100 my-2'} name={"paying..."} /> : cards?.length > 0 ? <InputButton name={`Pay $${s?.amount}`} className='nav-plus-btn btn text-white d-inline-block w-100 my-2' event={() => { handlePay(s, selectedItem) }} /> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StripePage