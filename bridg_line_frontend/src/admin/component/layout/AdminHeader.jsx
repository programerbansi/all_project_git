import React, { useContext } from 'react'
import { AdminValAuthContext } from '../../context/AdminAuthProvider'
import Avatar from 'react-avatar';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../../redux/action/AdminAction';
import BackDrop from '../../../user/component/function/BackDrop';
import { useNavigate } from 'react-router';
import { getLoggedInAdmin } from '../../../services/AdminLocalStorage';
import moment from 'moment';
import '../../../user/css/Header.css'
const AdminHeader = () => {
  const val = useContext(AdminValAuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = getLoggedInAdmin();
  const handleLogout = () => {
    val?.setLoading(true);
    dispatch(adminLogout(navigate, val?.setLoading))
  }
  const date = Date();
  return (
    <>
      {val?.loading ? <BackDrop /> : null}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link fs-5" data-widget="pushmenu" role="button" onClick={() => { val?.setToggleSidebar(!val?.toggleSidebar) }}><i className="fas fa-bars" /></a>
          </li>
        </ul>
       

        <ul className="navbar-nav ml-auto">
        <li className="nav-item d-flex align-items-center me-2"><p className='my-2'>{moment(date).format('LL')}</p></li>
          <Dropdown>
            <Dropdown.Toggle className='avtar-dropdown p-0' id="dropdown-basic">
              <Avatar name={`${admin?.firstname} ${admin?.lastname}`} size="38" round={true} className='me-1' id="basic-nav-dropdown" />
            </Dropdown.Toggle>
            <Dropdown.Menu className='avtar-dropdown-menu p-1 me-1'>
              <h6 className='text-muted d-flex justify-content-center m-0 text-capitalize'>Welcome {admin?.firstname}!</h6>
              <Dropdown.Item className='btn-blue-dropdown' onClick={() => { handleLogout() }}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ul>
      </nav>

    </>
  )
}

export default AdminHeader