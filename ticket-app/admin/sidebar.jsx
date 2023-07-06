import React, { useContext, useState } from 'react'
import { valAuthContext } from '../Context/valContext'
import { useRouter } from 'next/router'
function sidebar() {
    const val=useContext(valAuthContext);
    const[page,setPage]=useState(false);
    const [ticket,setTicket]=useState(false);
    const router=useRouter();
    const addProject=()=>{
        router.push('/admin/AllProject')
    }
    const addTicket=()=>{
        router.push('/admin/AllTickets')
    }
    return (
        <div>
            <div className="app-menu navbar-menu" data-sidebar-size={val?.sidebarSize}>
                {/* LOGO */}
                <div className="navbar-brand-box">
                    {/* Dark Logo*/}
                    <a href="index.html" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src="/assets/images/logo-sm.png" alt height={22} />
                        </span>
                        <span className="logo-lg">
                            <img src="/assets/images/logo-dark.png" alt height={17} />
                        </span>
                    </a>
                    {/* Light Logo*/}
                    <a href="index.html" className="logo logo-light">
                        <span className="logo-sm">
                            <img src="/assets/images/logo-sm.png" alt height={22} />
                        </span>
                        <span className="logo-lg">
                            <img src="/assets/images/logo-light.png" alt height={17} />
                        </span>
                    </a>
                    <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                        <i className="ri-record-circle-line" />
                    </button>
                </div>
                <div id="scrollbar">
                    <div className="container-fluid">
                        <div id="two-column-menu">
                        </div>
                        <ul className="navbar-nav" id="navbar-nav">
                           
                            <li className="menu-title"><i className="ri-more-fill" /> <span data-key="t-pages">Pages</span></li>
                            <li className="nav-item">
                                
                                <a className="nav-link menu-link" onClick={()=>{setPage(!page)}} data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarPages">
                                    <i className="ri-pages-line" /> <span data-key="t-pages">Project</span>
                                </a>
                                <div className="collapse menu-dropdown" id="sidebarPages" style={{display:page?"block":"none"}}>
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" data-key="t-starter" onClick={()=>addProject()} style={{cursor:"pointer"}}> All Project </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link menu-link" onClick={()=>{setTicket(!ticket)}} data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarPages">
                                    <i className="ri-pages-line" /> <span data-key="t-pages">Ticket</span>
                                </a>
                                <div className="collapse menu-dropdown" id="sidebarticket" style={{display:ticket?"block":"none"}}>
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" data-key="t-starter" onClick={()=>addTicket()} style={{cursor:"pointer"}}> All Ticket </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Sidebar */}
                </div>
                <div className="sidebar-background" />
            </div>
            <div className="vertical-overlay" />
        </div>

    )
}

export default sidebar