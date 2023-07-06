import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { getProjectId } from '../../../Services/LocalStorage';
import { LoadProjectTickets } from '../../redux/Actions';
import SideBar from '../AuthPages/SideBar'

function ViewProjectDetail() {

    const location = useLocation();
    const dispatch = useDispatch();
    // const [project,setProject] = useState(location.state);
    const navigate = useNavigate();

    // let project = location.state;
    let project = getProjectId();
        
    return (
        <>
            <SideBar />
            <div className="content-wrapper bg-white">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                {/* <h1>{project?.project_name} Detail</h1> */}
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Project Detail</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content ticket-detail">
                    <div className="card w-75 mx-auto">
                        <div className="card-header bg-primary">
                            <h3 className="card-title">{project?.project_name} Detail</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-12 col-md-12 col-lg-10 order-2 order-md-1">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="info-box bg-light">
                                                <div className="info-box-content">
                                                    <span className="info-box-text text-muted">Name </span>
                                                    <span className="info-box-number text-muted mb-0">
                                                        {project?.project_name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="info-box bg-light">
                                                <div className="info-box-content">
                                                    <span className="info-box-text text-muted">Description</span>
                                                    <span className="info-box-number text-muted mb-0">
                                                        {project?.project_description}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="info-box bg-light">
                                                <div className="info-box-content">
                                                    <span className="info-box-text text-muted">Assigned to</span>
                                                    {
                                                        project && project?.assigned_users.map((user,index)=>
                                                            <span className="info-box-number text-muted mb-0" key={index}>{user}</span>
                                                        )
                                                    }
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="info-box bg-light">
                                                <div className="info-box-content">
                                                    <h5 className="mt-1 text-muted">Attechments</h5>
                                                    <ul className="list-unstyled">
                                                        {
                                                            project && project?.project_urls.map((item, index) => <li key={index}>
                                                                <a href={item.url} className="btn-link text-secondary"><i className="far fa fa-paperclip" />  {item.file_name}</a>
                                                            </li>)
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className='btn btn-outline-secondary' onClick={()=>{
                                                navigate('/userDashboard/viewTickets',{state:project.project_id})}}>View Tickets</button>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ViewProjectDetail