import '../../Styles/Sidebar.css';
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import "../../Styles/Header.css";
import { removeRole, getToken, removeToken, getRole, storeLocation, removeLocation, getLocation, removeProjectId, storeProjectId, getProjectId } from '../../../Services/LocalStorage'
import { signOut } from "firebase/auth";
import { auth } from '../../../Services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { LoadAdmin, LoadUserProjects, LoadUsers } from '../../redux/Actions';

function SideBar() {

    const [flag, setFlag] = useState(false);
    const [backlog, setBacklog] = useState(false);
    const [ticket, setTicket] = useState(false);
    const [projectFlag, setProjectFlag] = useState(false);
    const [user, setUser] = useState();

    let location = getLocation();
    const dispatch = useDispatch();

    let admin = useSelector((state) => state.projectReducer.admin);
    let users = useSelector((state) => state.projectReducer.users);
    let userProjects = useSelector((state) => state.projectReducer.userProjects);

    const navigate = useNavigate();
    let selectedProject = getProjectId();

    useEffect(() => {
        dispatch(LoadAdmin());
        dispatch(LoadUsers());
        users && users.map((user) => {
            if (user.uid === auth.currentUser.uid) {
                setUser(user)
                dispatch(LoadUserProjects(user.name));
            }
        })
    }, [dispatch, location, projectFlag])

    const handleLogOut = () => {
        signOut(auth).then(() => {
            removeToken();
            removeRole();
            removeLocation();
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    let token = getToken();
    let role = getRole();
    useEffect(() => {
        if (!token && !role) {
            navigate('/');
        }
    }, [token, role]);

    const handleToggleProjects = () => {
        removeLocation();
        if (flag) {
            document.getElementById('submenu').style.display = 'block';
            setFlag(false)
            navigate('/adminDashboard');
        }
        else {
            document.getElementById('submenu').style.display = 'none';
            setFlag(true);
            navigate('/adminDashboard');
        }

    }

    const handleToggleTickets = () => {
        if (ticket) {
            document.getElementById('ticket-submenu').style.display = 'block';
            setTicket(false)
        }
        else {
            document.getElementById('ticket-submenu').style.display = 'none';
            setTicket(true);
        }
    }

    return (
        <div className=''>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light ps-2">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link toggle-button" data-widget="pushmenu" role="button"><i className="fas fa-bars text-dark d-block mb-auto" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a className="nav-link">Home</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a className="nav-link">Contact</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto justify-content-between">
                    <li className="nav-item justify-content-center ">
                        <a className="nav-link" data-widget="navbar-search" role="button">
                            <i className="fas fa-search d-block mb-auto" />
                        </a>
                        <div className="navbar-search-block">
                            <form className="form-inline">
                                <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search" />
                                        </button>
                                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                            <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" >
                            <i className="far fa-comments mx-2" />
                            <span className="badge badge-danger navbar-badge mx-2">3</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <a className="dropdown-item">
                                <div className="media">
                                    <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            Brad Diesel
                                            <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                                        </h3>
                                        <p className="text-sm">Call me whenever you can...</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item">
                                <div className="media">
                                    <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            John Pierce
                                            <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                                        </h3>
                                        <p className="text-sm">I got your message bro</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item">
                                <div className="media">
                                    <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            Nora Silvester
                                            <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                                        </h3>
                                        <p className="text-sm">The subject goes here</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item dropdown-footer">See All Messages</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" >
                            <i className="far fa-bell" />
                            <span className="badge badge-warning navbar-badge">15</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">15 Notifications</span>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item">
                                <i className="fas fa-envelope mr-2" /> 4 new messages
                                <span className="float-right text-muted text-sm">3 mins</span>
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item">
                                <i className="fas fa-users mr-2" /> 8 friend requests
                                <span className="float-right text-muted text-sm">12 hours</span>
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item">
                                <i className="fas fa-file mr-2" /> 3 new reports
                                <span className="float-right text-muted text-sm">2 days</span>
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" role="button">
                            <i className="fas fa-expand-arrows-alt" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" role="button">
                            <i className="fas fa-th-large" />
                        </a>
                    </li>
                    {/* <li className="nav-item me-2">
                        <a className="nav-link toggle-button" data-widget="pushmenu" role="button">
                            <i className="fas fa-bars text-dark" />
                        </a>
                    </li> */}
                </ul>
            </nav>

            {role === 'user' ?
                <aside className="main-sidebar sidebar-white-primary elevation-4 aside px-2">
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src={require('../../Assets/user2.jpg')} className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a className="d-block text-dark">{user && user.name}</a>
                            </div>
                        </div>
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item menu-open">
                                    <a className="nav-link active" id='backlog' onClick={() => {
                                        if (!backlog) {
                                            document.getElementById('backlog').classList.add('active');
                                            setBacklog(true);
                                        }
                                        navigate('/userDashboard/backlog')
                                    }
                                    }>
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            BackLog
                                            {/* <i className="right fas fa-angle-left" /> */}
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item menu-open" onClick={() => {
                                    removeLocation();
                                    storeLocation('ticket')
                                }}>
                                    <a className='nav-link active' onClick={() => handleToggleTickets()}>
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Tickets
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview" id='ticket-submenu' >
                                        <li className="nav-item" onClick={() => {
                                            navigate('/userDashboard/viewTickets');
                                        }}>
                                            <a className={`nav-link text-muted d-flex align-items-center ${location === 'viewTickets' ? 'active' : null}`}>
                                                <i className="far fa-circle nav-icon" />
                                                <p>View Tickets</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                {/*  User Projects  */}

                                <li className="nav-item menu-open">
                                    <a className='nav-link active' onClick={() => {
                                        if (projectFlag === false) {
                                            setProjectFlag(true);
                                        }
                                        else if (projectFlag === true) {
                                            setProjectFlag(false);
                                        }
                                    }}>
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Projects
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className={`nav nav-treeview ${!projectFlag ? 'd-none' : null}`} id='project-submenu' >
                                        {
                                            userProjects && userProjects.map((project, index) =>
                                                <li className={`nav-item text-muted ${project?.project_name === selectedProject?.project_name ? 'bg-active-project' : null}`} key={index} onClick={() => {
                                                    storeLocation('viewProjectDetail');
                                                    storeProjectId(JSON.stringify(project))
                                                    window.location.reload(false);
                                                    setTimeout(() => { navigate('/userDashboard/viewProjectDetail', { state: project }); }, 1000)
                                                }}>
                                                    <a className={`nav-link d-flex align-items-center`}>
                                                        <i className="far fa-circle nav-icon" />
                                                        <p>{project.project_name}</p>
                                                    </a>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </li>

                                {/* End User Projects */}

                                <li className="nav-item" onClick={() => {
                                    navigate('/userDashboard/profile');
                                    removeLocation();
                                    storeLocation('profile');
                                }}>
                                    <a href='#' className={`nav-link  text-white active ${location === 'profile' ? 'active' : null}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <p className='ms-2'>
                                            Profile
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item logout mt-2" onClick={() => handleLogOut()}>
                                    <button className="nav-link d-flex align-items-center ">
                                        {/* <i className="far fa-circle nav-icon" /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <p className='ms-2'>LogOut</p>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
                :
                <aside className="main-sidebar sidebar-white-primary elevation-4 aside px-2">
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src={require('../../Assets/user2.jpg')} className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a className="d-block">{admin && admin.name}</a>
                            </div>
                        </div>
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item menu-open">
                                    <a className="nav-link active" onClick={() => handleToggleProjects()}>
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Project
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview" id='submenu' >
                                        <li className="nav-item active" onClick={() => {
                                            navigate('/adminDashboard/addProject');
                                            removeLocation();
                                            storeLocation('addProject');
                                        }}>
                                            <a className={`nav-link d-flex align-items-center ${location === 'addProject' ? 'background' : null}`}>
                                                <i className="far fa-circle nav-icon" />
                                                <p>Add Project</p>
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={() => {
                                            navigate('/adminDashboard/viewProjects');
                                            removeLocation();
                                            storeLocation('viewProjects');
                                        }}>
                                            <a className={`nav-link d-flex align-items-center ${location === 'viewProjects' ? 'background' : null}`}>
                                                <i className="far fa-circle nav-icon" />
                                                <p>View Projects</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item menu-open" onClick={() => {
                                    removeLocation();
                                    storeLocation('ticket')
                                }}>
                                    <a className={`nav-link  ${location === 'ticket' ? 'active' : null}`} onClick={() => handleToggleTickets()}>
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Tickets
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview" id='ticket-submenu' >
                                        <li className="nav-item" onClick={() => {
                                            navigate('/adminDashboard/viewTickets');
                                        }}>
                                            <a className={`nav-link d-flex align-items-center ${location === 'viewTickets' ? 'active' : null}`}>
                                                <i className="far fa-circle nav-icon" />
                                                <p>View Tickets</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item" onClick={() => {
                                    navigate('/adminDashboard/profile');
                                    removeLocation();
                                    storeLocation('profile');
                                }}>
                                    <a href='#' className={`nav-link ${location === 'profile' ? 'active' : null}`}>
                                        {/* <i className="far fa-circle nav-icon" /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <p className='ms-2'>
                                            Profile
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item logout mt-2" onClick={() => handleLogOut()}>
                                    <button className="nav-link d-flex align-items-center ">
                                        {/* <i className="far fa-circle nav-icon" /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <p className='ms-2'>LogOut</p>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            }

        </div>
    )
}

export default SideBar