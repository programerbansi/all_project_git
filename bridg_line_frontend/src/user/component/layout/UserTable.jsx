import React, { useContext, useState } from 'react'
import '../../css/Table.css'
import CurdModal from '../modal/CurdModal'
import { Alert,Container, Table, Tooltip } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import { BILL_HISTORY, CARD, HOME, INVOICE, LOGIN, NOTIFY } from '../../../services/UserRoutePath'
import { useLocation, useNavigate } from 'react-router'
import InputButton from '../function/InputButton'
import { UserValAuthContext } from '../context/UserAuthProvider'
import BackDrop from '../function/BackDrop'
import { ToastContainer } from 'react-toastify';
import DeleteModel from '../modal/DeleteModel'
import moment from 'moment'
import { BsFillArrowDownCircleFill } from 'react-icons/bs'
import TeamModel from '../modal/TeamModel'
import { getLoggedInUser } from '../../../services/UserLocalStorage'
import CardModel from '../modal/CardModel'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_HISTORY_ALL, GET_HISTORY_LIST, curdData, getPaymentAmount, makeAsDefaultCard } from '../../../redux/action/Action'
import { AiOutlineStar, AiOutlineEye} from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegCopy, FaRegEdit } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import copy from 'copy-to-clipboard'
import { issuerImages } from '../json/arrayJson'
const parse = require('html-react-parser');
const UserTable = ({ id, title, header, data, totalItem, currentPage, setCurrentPage }) => {
    const { pathname } = useLocation();
    const [show1, setShow1] = useState(false);
    const [action1, setAction1] = useState('');
    const [loading1, setLoading1] = useState(false);
    const [copys, setCopys] = useState(false);
    const [editItem, seteditItem] = useState();
    const [showdelete, setShowDelete] = useState(false);
    const [deleteItem, setDeleteItem] = useState();
    const [showTeam, setShowTeam] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const val = useContext(UserValAuthContext);
    let user = getLoggedInUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    let load_amt = false;
    useEffect(() => {
        if (pathname == BILL_HISTORY && !load_amt) {
            dispatch(getPaymentAmount(user?.id, setLoading1))
        }
        return () => { load_amt = true }
    }, [pathname == BILL_HISTORY])
    const handleClick = (s) => {
        if (pathname == INVOICE) {
            setShow1(true);
        }
        else if (pathname == CARD) {
            setShowCard(true);
        }
        else {
            setShowTeam(true);
        }
        setAction1('add');
    }
    const handleEdit = (item, s) => {
        if (pathname == INVOICE) {
            setShow1(true);
        }
        else if (pathname == CARD) {
            setShowCard(true);
        }
        else {
            setShowTeam(true);
        }
        setAction1('edit');
        seteditItem(item)


    }
    const handleDelete = (id) => {
        setShowDelete(true);
        setAction1('delete');
        setDeleteItem(id)

    }
    const handleView = (item, path) => {
        val?.setsearchArray([]);
        if (user?.status?.includes(2)) {
            navigate(`/invoice/${item.id}`, { state: { viewItem: item, lastRoute: path } })
        }
        else {

            navigate(LOGIN)
        }

    }
    const downloadPDF = (i) => {
        fetch(`${process.env.REACT_APP_INVOICE_URL}${i?.file}`).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `Invoice_${i.firstname}_${i.lastname}`;
                alink.click();
            })
        })
    }
    const pay_amount = useSelector((state) => state.Reducer.pay_amount);
    const handleCardStatus = (e, item, idx) => {
        const formdata = new FormData();
        formdata.append('status', 1);
        formdata.append('user_id', item.user_id);
        setLoading1(true);
        dispatch(makeAsDefaultCard(item?.id, formdata, item.user_id, setLoading1, currentPage, setCurrentPage, `checked${idx}`));
        document.getElementById(`checked${idx}`).disabled = true;
    }
    const handleCopyToClipBorad = (text) => {
        setCopys(true);
        copy(text, {
            debug: true,
        });
        setTimeout(() => { setCopys(false) }, 1000)
    }
    const handleClearLogs=()=>{
        setLoading1(true);
        dispatch(curdData({user_id:user?.id},setLoading1, setShowDelete, setAction1, `/user/delete-history-all/${user?.id}`,DELETE_HISTORY_ALL,`/user/get-history-list/${user?.id}/?page=${currentPage}`,GET_HISTORY_LIST,"All Logs deleted successful."));
    
    }
    return (
        <>
            {loading1 && <BackDrop />}
            {copys && <div className='px-2'><Alert key="success" variant="success" className='p-2'>
                Copied to Clipboard!
            </Alert></div>}
            {show1 ? <CurdModal title={title} show={show1} setShow={setShow1} action={action1} setAction={setAction1} loading={loading1} setLoading={setLoading1} editItem={editItem} seteditItem={seteditItem} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}
            {showdelete ? <DeleteModel title={title} show={showdelete} setShow={setShowDelete} action={action1} setAction={setAction1} loading={loading1} setLoading={setLoading1} deleteItem={deleteItem} setDeleteItem={setDeleteItem} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}
            {showTeam ? <TeamModel title={title} show={showTeam} setShow={setShowTeam} action={action1} setAction={setAction1} loading={loading1} setLoading={setLoading1} editItem={editItem} seteditItem={seteditItem} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}
            {showCard ? <CardModel title={title} show={showCard} setShow={setShowCard} action={action1} setAction={setAction1} loading={loading1} setLoading={setLoading1} editItem={editItem} seteditItem={seteditItem} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : null}
            <Container fluid>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">{title}</h3>
                        <div className="card-tools">
                            {title == 'Logs' ? <InputButton tooltipName={`Clear ${title}`} className='btn btn-blue' event={() => { handleClearLogs() }} icon={<RiDeleteBinLine className='text-white ' />} name={`Clear ${title}`} />:null}
                            {title == 'Bill History' ? <div className='d-flex'><span className='me-2'>Total Amount:</span><h5> {pay_amount}</h5></div> : null}
                            {title == 'Invoice' || title == 'Team' || title == 'Card' || (title == 'Email Notification' && data.length === 0) ? <InputButton tooltipName={`Add ${title}`} className='btn btn-blue' event={() => { handleClick("") }} icon={<HiPlus className='text-white ' />} name={`Add ${title}`} /> : null}
                        </div>
                    </div>
                    <div className='todo-content'>
                        <div className="card-body table-responsive p-0">
                            <table className="table text-nowrap">
                                <thead>
                                    <tr>
                                        {header.map((t, index) => {
                                            return <th className="" key={index} style={{ width: t?.width }}>{t?.key}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        title == 'Needs Attention' && data && data.map((i, idx) => {
                                            return <tr key={idx} className='pointer' onClick={() => { handleView(i, HOME) }}>
                                                <td>{idx + 1}</td>
                                                <td className='text-capitalize'>{i.firstname} {i.lastname}</td>
                                                <td><span className='text-ellipsis-pre d-block'>{i.message ? i.message : "-"}</span></td>
                                                <td>{i.status}</td>
                                                <td className='text-bold'>{i.amount ? `$${i.amount}` : "-"}</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                            </tr>
                                        })
                                    }
                                    {
                                        title == 'Invoice' && data && data.map((i, idx) => {
                                            return <tr key={idx} className="pointer" >
                                                <td onClick={() => { handleView(i, INVOICE) }}>{idx + 1}</td>
                                                <td onClick={() => { handleView(i, INVOICE) }} className='text-capitalize'>{i.firstname} {i.lastname}</td>
                                                <td onClick={() => { handleView(i, INVOICE) }}>{i.status}</td>
                                                <td onClick={() => { handleView(i, INVOICE) }} className='text-capitalize'>{i.job_type}</td>
                                                <td>
                                                    <div className='d-flex'>

                                                        <InputButton tooltipName="View" className='btn btn-secondary py-1 me-2 btn-sm' event={() => { handleView(i, INVOICE) }} name={``} icon={<AiOutlineEye className='icon-all' />} />
                                                        <InputButton tooltipName="Edit" className='btn btn-success me-2 py-1 btn-sm' event={() => { handleEdit(i) }} name={``} icon={<FaRegEdit className='icon-all' />} />
                                                        <InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    {
                                        title == 'Team' && data && data.map((i, idx) => {
                                            return <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td className='text-capitalize'>{i.firstname} {i.lastname}</td>
                                                <td>{i.email}
                                                    <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.email) }}><FaRegCopy /></button></td>
                                                <td>{i.visible_password}
                                                    <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.visible_password) }}><FaRegCopy /></button></td>
                                                <td>
                                                    {i.status.length === 0 && "-"}
                                                    {i.status.includes(1) && "Home , "}
                                                    {i.status.includes(2) && "Invoice , "}
                                                    {i.status.includes(3) && "Completed , "}
                                                    {i.status.includes(4) && "Team , "}
                                                    {i.status.includes(5) && "Card , "}
                                                    {i.status.includes(6) && "Bill History , "}
                                                    {i.status.includes(7) && "Logs , "}

                                                </td>
                                                <td>
                                                    <div className='d-flex'>
                                                        <InputButton tooltipName="Edit" className='btn btn-success me-2 py-1 btn-sm' event={() => { handleEdit(i) }} name={``} icon={<FaRegEdit className='icon-all' />} />
                                                        <InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.main_id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    {
                                        title == 'Card' && data && data.map((i, idx) => {
                                            const issuerImage = issuerImages[i.issuer];
                                            return <tr key={idx}>
                                                {/* <td>{idx + 1}</td> */}
                                                <td>
                                                    <div className='d-flex align-items-center'>
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
                                                        <div className="custom-control custom-switch ms-2">
                                                            <input type="checkbox" className="custom-control-input" id={`checked${idx}`} checked={i?.status == 1 ? true : false} onClick={i.status == 0 ? (e) => { handleCardStatus(e, i, idx) } : () => { }} />
                                                            <label className="custom-control-label" htmlFor={`checked${idx}`}></label>
                                                        </div>
                                                        {i?.status == 1 ? <AiOutlineStar className='text-blue fs-5' /> : null}
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <span>Credit Card</span>
                                                        <span className='mx-1'> | </span>
                                                        <span>Expries {moment(`${i.expiry.substr(0, 2)}/01/${i.expiry.substr(4, 5)}`, "MM/DD/YY").format('YYYY-MM-DD')}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex'>
                                                        <InputButton tooltipName="Edit" className='btn btn-success me-2 py-1 btn-sm' event={() => { handleEdit(i) }} name={``} icon={<FaRegEdit className='icon-all' />} />
                                                        <InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    {
                                        title == 'Bill History' && data && data.map((i, idx) => {
                                            return <tr key={idx} >
                                                <td>{idx + 1}</td>
                                                <td className='text-capitalize'>{i.o_name}</td>
                                                <td>{i.o_email}
                                                    <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.o_email) }}><FaRegCopy /></button></td>
                                                <td className='text-capitalize'>{i.payment_type}</td>
                                                <td className='text-capitalize'>{i.payment_status}</td>
                                                <td className='text-bold'>${i.pay_amount}</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                            </tr>
                                        })
                                    }
                                    {
                                        title == 'Search Invoice' && data && data.map((i, idx) => {
                                            return <tr key={idx} className='pointer'>
                                                <td onClick={() => { handleView(i, HOME) }}>{idx + 1}</td>
                                                <td onClick={() => { handleView(i, HOME) }} className='text-capitalize'>{i.firstname} {i.lastname}</td>
                                                <td>{i.email ? i.email : "-"}
                                                    <button className='border-0' style={{ backgroundColor: "transparent" }} onClick={() => { handleCopyToClipBorad(i.email) }}><FaRegCopy /></button></td>
                                                <td onClick={() => { handleView(i, HOME) }}>{i.main_phone ? i.main_phone : "-"}</td>
                                                <td onClick={() => { handleView(i, HOME) }}>{i.mobile_phone ? i.mobile_phone : "-"}</td>
                                                <td onClick={() => { handleView(i, HOME) }}>{i.address_1}</td>
                                                <td onClick={() => { handleView(i, HOME) }}>{i.address_2 ? i.address_2 : "-"}</td>
                                                <td onClick={() => { handleView(i, HOME) }}>{i.state}</td>
                                                <td onClick={() => { handleView(i, HOME) }} className='text-capitalize'>{i.city}</td>
                                                <td onClick={() => { handleView(i, HOME) }}>{i.postal_code}</td>
                                                <td onClick={() => { handleView(i, HOME) }} className='text-capitalize'>{i.type}</td>
                                                <td onClick={() => { handleView(i, HOME) }} className='text-capitalize'>{i.status}</td>
                                                <td>
                                                     <div className='d-flex justify-content-center'>
                                                     {i.file != null && i.status == "Completed" ? <InputButton tooltipName="Download" className="btn bg-transparent border-0 p-0" icon={<BsFillArrowDownCircleFill className='download-icon fs-3 text-blue' />} event={() => { downloadPDF(i) }} /> :"-"}
                                                </div>
                                                
                                            </td>
                                            </tr>
                                        })
                                    }
                                    {title == 'Completed' && data && data.map((i, idx) => {
                                        return <tr key={idx}>
                                            <td><span className='text-capitalize'>{i.firstname} {i.lastname}</span></td>
                                            <td className='text-capitalize'>{i.type}</td>
                                            <td>{i.status}</td>
                                            <td className='text-bold'>${i.amount ? i.amount : "00"}</td>
                                            <td>
                                                <div className='d-flex'>
                                                    <InputButton tooltipName="Download" className="btn bg-transparent border-0 p-0" icon={<BsFillArrowDownCircleFill className='download-icon fs-3 text-blue' />} event={() => { downloadPDF(i) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                    {title == 'Logs' && data && data.map((i, idx) => {
                                        if (i.form_name == "card" && i.action == 'add') {
                                            return <tr key={idx}>
                                                <td><b>{i.card_number_text}</b> card added.</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                                <td><InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                             </td>
                                            </tr>
                                        }
                                        else if (i.form_name == "card" && i.action == 'edit') {
                                            return <tr key={idx}>
                                                <td><b>{i.card_number_text}</b> card updated.</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                                <td><InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} /></td>
                                            </tr>
                                        }
                                        else if (i.form_name == "card" && i.action == 'edit card status') {
                                            return <tr>
                                                <td><b>{i.card_number_text}</b> set as deafult card.</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                                <td><InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                             </td>
                                            </tr>
                                        }
                                        else if (i.form_name == "invoice" && i.action == 'add') {
                                            return <tr>
                                                <td><b>{i.i_fname} {i.i_lname}</b> invoice added.</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                                <td><InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                             </td>
                                            </tr>
                                        }
                                        else if (i.form_name == "invoice" && i.action == 'edit') {
                                            return <tr>
                                                <td><b>{i.i_fname} {i.i_lname}</b> invoice updated.</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                                <td><InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                             </td>
                                            </tr>
                                        }
                                        else if (i.form_name == "photo" && i.action == 'upload photo') {
                                            return <tr>
                                                <td><b>{i.i_fname} {i.i_lname}</b> invoice in photos uploaded.</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                                <td><InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                             </td>
                                            </tr>
                                        }
                                        else if (i.form_name == "document" && i.action == 'upload document') {
                                            return <tr>
                                                <td><b>{i.i_fname} {i.i_lname}</b> invoice in documents uploaded.</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                                <td><InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                             </td>
                                            </tr>
                                        }
                                        else if (i.form_name == "activity" && i.action == 'add') {
                                            return <tr>
                                                <td><b>{i.i_fname} {i.i_lname}</b> invoice in note added.</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                                <td><InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                             </td>
                                            </tr>
                                        }
                                        else if (i.form_name == "user_team" && i.action == 'add') {
                                            return <tr>
                                                <td><b>{i.u_fname} {i.u_lname}</b> team member added.</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                                <td><InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                             </td>
                                            </tr>
                                        }
                                        else if (i.form_name == "user_team" && i.action == 'edit') {
                                            return <tr>
                                                <td> <b>{i.u_fname} {i.u_lname}</b> team member updated.</td>
                                                <td>{moment(i.created_at).format('LLLL')}</td>
                                                <td><InputButton tooltipName="Delete" className='btn btn-danger py-1  btn-sm' event={() => { handleDelete(i.id) }} name={``} icon={<RiDeleteBinLine className='icon-all' />} />
                                             </td>
                                            </tr>
                                        }

                                    })}
                                </tbody>
                            </table>
                            <div className="justify-content-end mt-2 me-2">
                                {title != 'Email Template' && <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={10}
                                    totalItemsCount={totalItem}
                                    pageRangeDisplayed={5}
                                    innerClass="pagination listjs-pagination "
                                    activeClass="page-item-active"
                                    activeLinkClass="page-item-active"
                                    linkClass="page-item"
                                    onChange={(value) => { handlePageChange(value) }}
                                />}

                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <ToastContainer />
        </>
    )
}

export default UserTable