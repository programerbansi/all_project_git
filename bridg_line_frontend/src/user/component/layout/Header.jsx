import React, { useCallback, useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../css/Header.css'
import { HiHome } from "react-icons/hi2";
import { BiNetworkChart, BiPlus } from "react-icons/bi";
import { RiFileListLine } from "react-icons/ri";
import { RxCounterClockwiseClock } from "react-icons/rx";
import Avatar from 'react-avatar';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Dropdown, Spinner } from 'react-bootstrap';
import BackDrop from '../function/BackDrop';
import { useDispatch, useSelector } from 'react-redux';
import CurdModal from '../modal/CurdModal';
import { GET_HISTORY, GET_SEARCH_LIST, GET_SEARCH_LIST_ARRAY, getData, getHistoryData, getSearchList, getSearchListArray, logout } from '../../../redux/action/Action';
import { BILL_HISTORY, CARD, HISTORY, HOME, INVOICE, NOTIFY, REPORT, TEAM } from '../../../services/UserRoutePath';
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { UserValAuthContext } from '../context/UserAuthProvider';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { debounce } from "lodash";
import { AiOutlineHome } from "react-icons/ai";
import { BsFileEarmarkCheck } from "react-icons/bs";
import moment from 'moment';
import Autocomplete from 'react-autocomplete';
import SearchAutoComplete from '../function/SearchAutoComplete';

const Header = () => {
    const { pathname } = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedUser = getLoggedInUser();
    const val = useContext(UserValAuthContext)
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState();
    const [action, setAction] = useState('');
    const [editItem, seteditItem] = useState('');
    const [searchData, setsearchData] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const { slug_id } = useParams();

    const handleLogout = () => {
        setLoading(true);
        dispatch(logout(navigate, setLoading))
    }
    const handleHistoryClick = () => {
        setLoadingHistory(true)
        dispatch(getHistoryData(`/user/get-history/${loggedUser?.id}`, GET_HISTORY, setLoadingHistory))
    }

    const history = useSelector((state) => state.Reducer.history);
    const searchListArray = useSelector((state) => state.Reducer.searchListArray);

    useEffect(() => {
        if (!val?.clear) {
            val?.setsearchArray(searchListArray)
            setLoading(false);
        }
        // return()=>{val?.setClear(true);}
    }, [searchListArray])
    useEffect(() => {

    }, [val?.searchArray])
    return (
        <>
            {show ? <CurdModal title={"Invoice"} show={show} setShow={setShow} action={action} setAction={setAction} loading={loading} setLoading={setLoading} editItem={editItem} seteditItem={seteditItem} status={status} setStatus={setStatus} /> : null}
            {loading ? <BackDrop /> : null}
            <div className='header'>
                <Navbar expand="lg" className=''>
                    <Container fluid className='header-fixed nav-border'>
                        <Navbar.Brand onClick={() => { navigate(HOME) }} > <img
                            // src={require("../../../assets/logo.png")}
                            src={`${process.env.REACT_APP_COMPANY_IMAGE_URL}${loggedUser?.comp_logo}`}
                            className='logo px-lg-0 px-1'
                            alt='...'
                            style={{ height: "60px", width: "100%", cursor: "pointer" }}
                        /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                {loggedUser?.status?.includes(1) && <Link to={HOME} className={`text-decoration-none nav-menu-item mx-2 ${pathname == HOME ? 'activte-menu' : ""}`}><h6 className='d-inline-block d-lg-flex justify-content-center m-0'><AiOutlineHome className='fs-4' /></h6> <span>Home</span></Link>}
                                {loggedUser?.status?.includes(2) && <Link to={INVOICE} className={`text-decoration-none nav-menu-item mx-2 ${(pathname == INVOICE) || (pathname == `/invoice/${slug_id}`) ? 'activte-menu' : ""}`}><h6 className='d-inline-block d-lg-flex justify-content-center m-0'><RiFileListLine className='fs-4' /></h6> <span>Invoice</span></Link>}
                                {loggedUser?.status?.includes(3) && <Link to={REPORT} className={`text-decoration-none nav-menu-item mx-2 ${pathname == REPORT ? 'activte-menu' : ""}`}><h6 className='d-inline-block d-lg-flex justify-content-center m-0'><BsFileEarmarkCheck className='fs-4' /></h6> <span>Completed</span></Link>}
                            </Nav>
                            <div className='row mb-1 mb-lg-0'>
                                <div className='col-lg-10 col-md-6 col-12'>
                                    <div className='d-flex'>
                                        {/* {loggedUser?.status?.includes(2) &&     <Button className='nav-plus-btn ms-1' onClick={() => { handleClick("") }}><BiPlus className='d-grid justify-content-center' /></Button>} */}
                                        <div className="px-1 mt-1 header-right">    
                                        <SearchAutoComplete loading={loading} setLoading={setLoading}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-2 col-md-6 col-12 d-flex justify-content-lg-end'>
                                {/* className='avtar-dropdown p-0 mt-md-0 mt-1'  */}

                                    <Dropdown>
                                        <Dropdown.Toggle  className='nav-clock p-0 mt-2 me-2 ms-1' id="dropdown-basic">
                                           
                                                <RxCounterClockwiseClock onClick={() => { handleHistoryClick() }} className='d-grid justify-content-center align-items-center text-body fs-4' />
                                          
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='avtar-dropdown-menu p-1'>

                                            {loggedUser?.status?.includes(7) && <div className='d-flex justify-content-between text-blue'>
                                                {loadingHistory ? <Spinner animation="border" size="sm" className='mt-1 ms-1' /> : <div></div>}
                                                <span className='pointer' onClick={() => { navigate(HISTORY) }}>View All </span>
                                            </div>}
                                            {/* {loadingHistory && <Spinner/>} */}
                                            {history && history.map((i, idx) => {
                                                if (i.form_name == "card" && i.action == 'add') {
                                                    return <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(CARD) }}>

                                                        <small className='m-0 p-0'>
                                                            {moment(i.created_at).format('LLLL')}<br />
                                                            <b>{i.card_number_text}</b> card added.
                                                        </small>
                                                    </Dropdown.Item>
                                                }
                                                else if (i.form_name == "card" && i.action == 'edit') {
                                                    return <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(CARD) }}>

                                                        <small className='m-0 p-0'>{moment(i.created_at).format('LLLL')}<br /><b>{i.card_number_text}</b> card updated.</small>

                                                    </Dropdown.Item>
                                                }
                                                else if (i.form_name == "card" && i.action == 'edit card status') {
                                                    return <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(CARD) }}>
                                                        {/* <p className='m-0'> */}
                                                        <small className='p-0 m-0'>{moment(i.created_at).format('LLLL')}<br />
                                                            <b>{i.card_number_text}</b> set as deafult card.</small>

                                                        {/* </p> */}
                                                    </Dropdown.Item>
                                                }
                                                else if (i.form_name == "invoice" && i.action == 'add') {
                                                    return <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(`/invoice/${i.form_field_id}`) }}>
                                                        <small className='m-0 p-0'>
                                                            {moment(i.created_at).format('LLLL')}<br />
                                                            <b>{i.i_fname} {i.i_lname}</b> invoice added.
                                                        </small>
                                                    </Dropdown.Item>
                                                }
                                                else if (i.form_name == "invoice" && i.action == 'edit') {
                                                    return <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(`/invoice/${i.form_field_id}`) }}>
                                                        <small className='m-0 p-0'>
                                                            {moment(i.created_at).format('LLLL')}<br />
                                                            <b>{i.i_fname} {i.i_lname}</b> invoice updated.
                                                        </small>
                                                    </Dropdown.Item>
                                                }
                                                else if (i.form_name == "photo" && i.action == 'upload photo') {
                                                    return <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(`/invoice/${i.form_field_id}`) }}>
                                                        <small className='m-0 p-0'>
                                                            {moment(i.created_at).format('LLLL')}<br />
                                                            <b>{i.i_fname} {i.i_lname}</b> invoice in photos uploaded.
                                                        </small>
                                                    </Dropdown.Item>
                                                }
                                                else if (i.form_name == "document" && i.action == 'upload document') {
                                                    return <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(`/invoice/${i.form_field_id}`) }}>
                                                        <small className='m-0 p-0'>
                                                            {moment(i.created_at).format('LLLL')}<br />
                                                            <b>{i.i_fname} {i.i_lname}</b> invoice in documents uploaded.
                                                        </small>
                                                    </Dropdown.Item>
                                                }
                                                else if (i.form_name == "activity" && i.action == 'add') {
                                                    return <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(`/invoice/${i.form_field_id}`) }}>
                                                        <small className='m-0 p-0'>
                                                            {moment(i.created_at).format('LLLL')}<br />
                                                            <b>{i.i_fname} {i.i_lname}</b> invoice in note added.
                                                        </small>
                                                    </Dropdown.Item>
                                                }
                                                else if (i.form_name == "user_team" && i.action == 'add') {
                                                    return <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(TEAM) }}>
                                                        <small className='m-0 p-0'>
                                                            {moment(i.created_at).format('LLLL')}<br />
                                                            <b>{i.u_fname} {i.u_lname}</b> team member added.
                                                        </small>
                                                    </Dropdown.Item>
                                                }
                                                else if (i.form_name == "user_team" && i.action == 'edit') {
                                                    return <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(TEAM) }}>
                                                        <small> {moment(i.created_at).format('LLLL')}<br />
                                                            <b>{i.u_fname} {i.u_lname}</b> team member updated.</small>
                                                    </Dropdown.Item>
                                                }
                                            })}

                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown>
                                        <Dropdown.Toggle className='avtar-dropdown p-0 mt-md-0 mt-1' id="dropdown-basic">
                                            <Avatar name={`${loggedUser?.firstname} ${loggedUser?.lastname}`} size="40" round={true} className='ms-2' id="basic-nav-dropdown" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='avtar-dropdown-menu p-1'>
                                            <h6 className='text-muted d-flex justify-content-center m-0 text-capitalize'>{`Welcome ${loggedUser?.firstname}!`}</h6>
                                            {loggedUser?.status?.includes(4) && <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(TEAM) }}>Manage Team</Dropdown.Item>}
                                            {loggedUser?.status?.includes(5) && <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(CARD) }}>Manage Card</Dropdown.Item>}
                                            {loggedUser?.status?.includes(6) && <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(BILL_HISTORY) }}>Manage Bill History</Dropdown.Item>}
                                            {loggedUser?.status?.includes(7) && <Dropdown.Item className='btn-blue-dropdown' onClick={() => { navigate(HISTORY) }}>Manage Logs</Dropdown.Item>}
                                            <Dropdown.Item onClick={() => { handleLogout() }}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

        </>
    )
}

export default Header