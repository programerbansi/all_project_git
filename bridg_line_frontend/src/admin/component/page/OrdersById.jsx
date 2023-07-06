import React, { useContext, useEffect } from 'react'
import { GET_ORDER_LIST, getAdminDataList } from '../../../redux/action/AdminAction';
import { AdminValAuthContext } from '../../context/AdminAuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import { FaRegCopy } from 'react-icons/fa';
import copy from 'copy-to-clipboard';
import moment from 'moment';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ADMIN_ORDERS } from '../../../services/AdminRoutePath';
import InputButton from '../../../user/component/function/InputButton';
import { BiArrowBack } from 'react-icons/bi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
const OrdersById = () => {
    const val = useContext(AdminValAuthContext);
    const [copys, setCopys] = useState(false);
    const { state } = useLocation();
    const { slug_id } = useParams();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        val?.setLoading(true);
        dispatch(getAdminDataList(`/admin/get-orders/${slug_id}?page=${val?.currentPage}`, GET_ORDER_LIST, val?.setLoading));
    }, [])

    const orderPerPageList = useSelector((state) => state.AdminReducer.orderPerPageList);
    const orderTotalItemCount = useSelector((state) => state.AdminReducer.orderTotalItemCount);
    const handlePageChange = (pageNumber) => {
        val?.setCurrentPage(pageNumber)
    }
    const handleCopyToClipBorad = (text) => {
        setCopys(true);
        copy(text, {
            debug: true,
        });
        setTimeout(() => { setCopys(false) }, 1000)
    }
    const handelBack = () => {
        navigate(ADMIN_ORDERS); val?.setFilteredArray([])
    }
const [filteredDates,setfilteredDates]=useState([])
useEffect(()=>{
    if(startDate && endDate)
    {
        setfilteredDates(orderPerPageList && orderPerPageList.filter(date => {
            const currentDate = new Date(date?.created_at);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return currentDate >= start && currentDate <= end;
        }))
    }
    else
    {
        setfilteredDates('')
    }
},[startDate,endDate])

    return (
        <>

            {copys && <div className='px-2'><Alert key="success" variant="success" className='p-2'>
                Copied to Clipboard!
            </Alert></div>}
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <div className='row'>
                            <div className='col-9'>
                                <div className='d-md-flex d-sm-block'>

                                    <InputButton tooltipName="Back" name={`Back`} className='nav-plus-btn btn text-white' icon={<BiArrowBack />} event={() => { handelBack() }} />

                                    <div className='d-md-flex d-sm-block justify-content-center ms-md-2 me-2 mt-md-0 mt-2 '>
                                        <DatePicker
                                            isClearable={startDate? true :false}
                                            placeholderText="MM-DD-YYYY"
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            dateFormat='MM-dd-yyyy'
                                            className='rounded border p-2'
                                        />
                                         <span className='mt-2 mx-md-2 d-md-block d-none'>To</span><span className='my-2 d-md-none d-block'>To</span>
                                        <DatePicker
                                            selected={endDate}
                                            placeholderText="MM-DD-YYYY"
                                            isClearable={endDate? true :false}
                                            onChange={(date) => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            dateFormat='MM-dd-yyyy'
                                            className='rounded border p-2  '
                                        />                                      
                                    </div>


                                </div>

                            </div>
                            <div className='col-3 d-flex justify-content-end'><span className='d-flex'>Total Amount: <h5> {state?.amount ? `$${state?.amount}` : "-"}</h5></span></div>

                        </div>
                    </div>
                    <div className='todo-content'>
                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead className='table-header'>
                                    <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Order Id</th>
                                    <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredDates && filteredDates?.length > 0 ? filteredDates && filteredDates.map((i, idx) => {
                                            return <tr key={idx} >
                                                <td>{idx + 1}</td>
                                                <td className='text-capitalize'>{i.o_name}</td>
                                                <td className='text-bold'>${i.pay_amount}</td>
                                                <td>{i.o_email} <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.o_email) }}><FaRegCopy /></button></td>
                                                <td className='text-capitalize'>{i.payment_type}</td>
                                                <td className='text-capitalize'>{i.payment_status}</td>
                                                <td>{i.payment_id}</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                            </tr>
                                        }) : orderPerPageList && orderPerPageList.map((i, idx) => {
                                            return <tr key={idx} >
                                                <td>{idx + 1}</td>
                                                <td className='text-capitalize'>{i.o_name}</td>
                                                <td className='text-bold'>${i.pay_amount}</td>
                                                <td>{i.o_email} <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.o_email) }}><FaRegCopy /></button></td>
                                                <td className='text-capitalize'>{i.payment_type}</td>
                                                <td className='text-capitalize'>{i.payment_status}</td>
                                                <td>{i.payment_id}</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>

                        <div className="my-2 me-2">
                            {(filteredDates?.length < 1) && <Pagination
                                activePage={val?.currentPage}
                                itemsCountPerPage={10}
                                totalItemsCount={orderTotalItemCount}
                                pageRangeDisplayed={5}
                                innerClass="pagination listjs-pagination "
                                activeClass="page-item-active"
                                activeLinkClass="page-item-active"
                                linkClass="page-item"
                                onChange={(value) => { handlePageChange(value) }}
                            />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrdersById

// import React, { useState } from 'react';

// function App() {
//   const [dates, setDates] = useState(['2023-06-10', '2023-06-12', '2023-06-14']);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };

//   const filteredDates = dates.filter(date => {
//     const currentDate = new Date(date);
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     return currentDate >= start && currentDate <= end;
//   });

//   return (
//     <div>
//       <h1>Filter Dates</h1>
//       <div>
//         <label>Start Date:</label>
//         <input type="date" value={startDate} onChange={handleStartDateChange} />
//       </div>
//       <div>
//         <label>End Date:</label>
//         <input type="date" value={endDate} onChange={handleEndDateChange} />
//       </div>
//       <h2>Filtered Dates:</h2>
//       <ul>
//         {filteredDates.map((date, index) => (
//           <li key={index}>{date}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;