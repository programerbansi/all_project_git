import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteProject, loadProjects } from '../../redux/Actions';
import SideBar from '../AuthPages/SideBar'
import '../../Styles/ViewProjects.css';
import EditProject from './EditProject';
import { useNavigate } from 'react-router-dom';

function ViewProjects() {

    const [editId, setEditId] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let projects = useSelector((state) => state.projectReducer.projects);
    let dId = document.getElementsByClassName('btn-close')[0]?.id;

    useEffect(() => {
        dispatch(loadProjects());
    }, [dispatch])

    const handleDelete = (id, dId) => {
        dispatch(DeleteProject(id, dId))
        dispatch(loadProjects());
    }

    const handleEdit = (id, item) => {
        setEditId(id);
        setEditItem(item);
    }

    return (
        <>
            <SideBar />
            <div className="content-wrapper bg-white">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Projects</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Projects</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped  d-block mx-auto w-100">
                                <thead>
                                    <tr>
                                        <th style={{ width: '1%' }}>
                                            #
                                        </th>
                                        <th style={{ width: '20%' }}>
                                            Project Name
                                        </th>
                                        <th style={{ width: '20%' }}>
                                            Project Description
                                        </th>
                                        <th style={{ width: '15%' }}>
                                            Assigned Users
                                        </th>
                                        <th style={{ width: '20%' }}>
                                            Project Files
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        projects.map((item, index) =>
                                            <tr key={index}>
                                                <td className='text-dark'>
                                                    <h6 className='d-inline-block text-center text-secondary'>{index + 1}.</h6>
                                                </td>
                                                <td >
                                                    <h6 className='m-0 p-0 d-inline-block'>
                                                        {item.project_name}
                                                    </h6>
                                                    <br />
                                                    <small className='text-secondary'>
                                                        {item.createdAt.toDate().toDateString()}
                                                    </small>
                                                </td>
                                                <td>
                                                    {item.project_description}
                                                </td>
                                                <td>
                                                    {
                                                        item?.assigned_users ?
                                                            item.assigned_users.map((user, index) =>
                                                                <span key={index}>
                                                                    <span className='d-block'>
                                                                        <h6 className='m-0 p-0 d-inline-block'>({index + 1}) {user} </h6>
                                                                    </span>
                                                                    <br />
                                                                </span>
                                                            ) :
                                                            null
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item?.project_urls ?
                                                            item.project_urls.map((file, index) =>
                                                                <span key={index}>
                                                                    <span className='d-block'>
                                                                        <h6 className='m-0 p-0 d-inline-block'>({index + 1}) </h6>
                                                                        <a href={file.url} className='text-blue'> {file?.file_name || file?.image_name}</a>
                                                                    </span>
                                                                    <br />
                                                                </span>
                                                            ) :
                                                            null
                                                    }
                                                </td>
                                                <td className="project-actions text-center">
                                                    <button className="btn btn-warning btn-sm me-2" onClick={() => { navigate('/adminDashboard/addTicket', { state: { at: item?.createdAt.toDate().toDateString(), id: item?.id } }) }}>
                                                        <i className="fas fa-folder">
                                                        </i>
                                                        Add Ticket
                                                    </button>
                                                    <button className="btn btn-info btn-sm me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleEdit(item.id, item)}>
                                                        <i className="fas fa-pencil-alt">
                                                        </i>
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setDeleteId(item.id)}>
                                                        <i className="fas fa-trash">
                                                        </i>
                                                        Delete
                                                    </button>z
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            {
                                <EditProject editId={editId} editItem={editItem} setEditId={setEditId} setEditItem={setEditItem} />
                            }

                            {/* Confirm Delete */}

                            <div className="modal" tabIndex={-1} id='deleteModal'>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Delete Project</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure , you want to delete?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" id='closeDeleteModal' className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(deleteId, dId)}>Delete</button>
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

export default ViewProjects