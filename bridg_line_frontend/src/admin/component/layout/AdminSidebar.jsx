import React, { useContext } from 'react'
import '../../css/AdminSidebar.css'
import { AdminValAuthContext } from '../../context/AdminAuthProvider'
import { useLocation, useNavigate, useParams } from 'react-router';
import { ADMIN_COMPLETED_INVOICE, ADMIN_DASHBOARD, ADMIN_INVOICE, ADMIN_INVOICE_VIEW, ADMIN_JOB_TYPE, ADMIN_NOTIFICATION, ADMIN_ORDERS, ADMIN_PAYMENT, ADMIN_STATUS, ADMIN_TEAM, ADMIN_USER } from '../../../services/AdminRoutePath';
import { useState } from 'react';
import { getLoggedInAdmin } from '../../../services/AdminLocalStorage';
import { removeStatus, storeStatus } from '../../../services/UserLocalStorage';

const AdminSidebar = () => {
  const val = useContext(AdminValAuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { slug_id } = useParams();
  const [selected, setSelected] = useState(false);
  const admin = getLoggedInAdmin()
  const obj = [
    { menu: "Settings", subMenu: [{ subMenuItem: "Payment Method", path: ADMIN_PAYMENT, "access": 6 }, { subMenuItem: "Manage Job Types", path: ADMIN_JOB_TYPE, "access": 7 }], path: [ADMIN_JOB_TYPE, ADMIN_PAYMENT], key: 1, icon: "bx bx-collection" },
  ]
  return (
    <>
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        <a className="brand-link py-1">
          <img
            className='logo-img'
            src={require("../../../assets/logo.png")}
            alt='logo'
            style={{ height: val?.toggleSidebar ? "30px" : "60px", width: "100%", cursor: "pointer", objectFit: "contain" }}
          />
        </a>
        <div className="sidebar" >
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {admin?.status?.includes(1) ? <li className="nav-item pointer bg-hover" onClick={() => { navigate(ADMIN_DASHBOARD); setSelected(false) }}>
                <a className={`nav-link px-2 ${(pathname == ADMIN_DASHBOARD) ? 'active' : ""}`}>
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                  </p>
                </a>
              </li> : null}
              {admin?.status?.includes(2) ? <li className="nav-item pointer" onClick={() => { val?.setCurrentPage(1);storeStatus("Pending"); navigate(ADMIN_INVOICE); setSelected(false) }}>
                <a className={`nav-link px-2 ${(pathname == ADMIN_INVOICE || pathname == `/admin/write-invoice-estimate/${slug_id}`) ? 'active' : ""}`}>
                  <i className="nav-icon fas fa-solid fa-clipboard" />
                  <p>
                    Write Invoice/Estimate
                  </p>
                </a>
              </li> : null}
              {admin?.status?.includes(9) ? <li className="nav-item pointer" onClick={() => { val?.setCurrentPage(1);navigate(ADMIN_COMPLETED_INVOICE); setSelected(false) }}>
                <a className={`nav-link px-2 ${(pathname == ADMIN_COMPLETED_INVOICE || pathname == `/admin/completed-jobs/${slug_id}`) ? 'active' : ""}`}>
                  <i className="nav-icon fas fa-solid fa-check" />
                  <p>
                     Completed Jobs
                  </p>
                </a>
              </li> : null}
             
              {admin?.status?.includes(4) ?
                <li className="nav-item pointer" onClick={() => { val?.setCurrentPage(1);navigate(ADMIN_USER); setSelected(false) ; val?.setFilteredArray([]);}}>
                  <a className={`nav-link px-2 ${(pathname == ADMIN_USER) ? 'active' : ""}`}>
                    <i className="nav-icon fas fa-solid fa-user" />
                    <p>
                      Manage Clients
                    </p>
                  </a>
                </li> : null}
              {admin?.status?.includes(5) ?
                <li className="nav-item pointer" onClick={() => { val?.setCurrentPage(1);navigate(ADMIN_TEAM); setSelected(false);val?.setFilteredArray([]); }}>
                  <a className={`nav-link px-2 ${(pathname == ADMIN_TEAM) ? 'active' : ""}`}>
                    <i className="nav-icon fas fa-solid fa-users" />
                    <p>
                      Manage Teams
                    </p>
                  </a>
                </li> : null}
              {obj && obj?.map((o, idx) => {
                return <li key={idx} className={`nav-item pointer has-treeview ${o?.path.includes(pathname) || selected ? 'menu-open' : ''}`} onClick={() => { setSelected(true);val?.setFilteredArray([]); }}>
                  <a className={`nav-link px-2 ${o?.path.includes(pathname) || selected ? 'active' : ""}`}>
                    <i className="nav-icon fas fa-wrench" />
                    <p>
                      Settings
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    {o?.subMenu && o?.subMenu?.map((o1, index) => {
                      return <>{admin?.status?.includes(o1?.access) ? <li key={index} className="nav-item pointer" onClick={() => { val?.setCurrentPage(1);navigate(o1?.path); setSelected(true);val?.setFilteredArray([]); }}>
                        <a className={`nav-link  ${o1?.path == pathname ? 'active' : ""}`}>
                          <i className="nav-icon fas fa-minus" />
                          <p>{o1?.subMenuItem}</p>          
                        </a>
                      </li> : null}</>
                    })}
                  </ul>
                </li>
              })}
               {admin?.status?.includes(3) ? <li className="nav-item pointer" onClick={() => {val?.setCurrentPage(1); navigate(ADMIN_ORDERS); setSelected(false);val?.setFilteredArray([]); }}>
                <a className={`nav-link px-2 ${(pathname == ADMIN_ORDERS) ? 'active' : ""}`}>
                  <i className="nav-icon fas fa-book" />
                  <p>
                    Manage Revenue
                  </p>
                </a>
              </li> : null}
              {admin?.status?.includes(8) ?
                <li className="nav-item pointer" onClick={() => { val?.setCurrentPage(1);navigate(ADMIN_NOTIFICATION); setSelected(false);val?.setFilteredArray([]); }}>
                  <a className={`px-2 nav-link ${(pathname == ADMIN_NOTIFICATION) ? 'active' : ""}`}>
                    <i className="nav-icon fas fa-solid fa-envelope" />
                    <p>
                      Manage Email Notifications
                    </p>
                  </a>
                </li> : null}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar