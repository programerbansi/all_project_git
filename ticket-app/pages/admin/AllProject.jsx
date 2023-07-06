import React, { useEffect, useState } from 'react'
import ProjectModel from '../../Models/ProjectModel'
import InputButton from '../../user/inputFunction/InputButton';
import Layout from '../../admin/layout';
import { loadProjects } from '../../Redux/Action/adminAction';
import { useDispatch,useSelector } from 'react-redux';
import DeleteModel from '../../Models/DeleteModel';
import { useRouter } from 'next/router';
function AllProject() {
    const [showModel, setShowModel] = useState(false);
    const [showDeleteModel, setDeleteShowModel] = useState(false);
    const [action,setAction]=useState('');
    const [edititem,setEditItem]=useState();
    const [deleteitem,setDeleteItem]=useState();
    const Router=useRouter();
    const dispatch=useDispatch();
    const handleAdd = () => {
        setShowModel(true);
        setAction('add')
    }
    let projects = useSelector((state) => state.userReducer.projects);
    useEffect(() => {
        dispatch(loadProjects());
    }, [dispatch])

    const handleEdit=(item)=>{
        setAction('update');
        setEditItem(item);
        setShowModel(true);
    //   console.log(item,"--------edit------")
    }
    const handleDelete=(item)=>{
        setDeleteShowModel(true);
        setDeleteItem(item);
    //   console.log(item,"----------delete----------")
    }
    // console.log(projects,"=========project=================")
    return (
        <>
            {
                showModel ? <ProjectModel showModel={showModel} setShowModel={setShowModel} action={action} edititem={edititem}/> : null
            }
            {
                showDeleteModel? <DeleteModel showDeleteModel={showDeleteModel} setDeleteShowModel={setDeleteShowModel} action="project" deleteitem={deleteitem}/>:null
            }
            <div className={Router.pathname == "/project"?"":"main-content"}>
                <div className={Router.pathname == "/project"?"":"page-content"}>
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row" style={{display:Router.pathname == "/project"?"none":"block"}}>
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">All Project</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Project</a></li>
                                            <li className="breadcrumb-item active">All Project</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title mb-0">All Project</h4>
                                    </div>{/* end card header */}
                                    <div className="card-body">
                                        <div id="customerList">
                                            <div className="row g-4 mb-3">
                                                <div className="col-sm-auto">
                                                    <div>
                                                        <InputButton name="Add" className="btn btn-success add-btn" handleClick={handleAdd} />
                                                        {/* <button type="button" onClick={()=>{handleAdd()}}className="btn btn-success add-btn" data-bs-toggle="modal" id="create-btn" data-bs-target="#showModal"><i className="ri-add-line align-bottom me-1" /> Add</button> */}
                                                        {/* <button className="btn btn-soft-danger" onclick="deleteMultiple()"><i className="ri-delete-bin-2-line" /></button> */}
                                                    </div>
                                                </div>
                                                <div className="col-sm">
                                                    <div className="d-flex justify-content-sm-end">
                                                        <div className="search-box ms-2">
                                                            <input type="text" className="form-control search" placeholder="Search..." />
                                                            <i className="ri-search-line search-icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive table-card mt-3 mb-1">
                                                <table className="table align-middle table-nowrap" id="customerTable">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th className="sort" data-sort="customer_name">#</th>
                                                            <th className="sort" data-sort="email">Project Name</th>
                                                            <th className="sort" data-sort="phone">Project Description</th>
                                                            <th className="sort" data-sort="date">Assign Users</th>
                                                            <th className="sort" data-sort="action">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="list form-check-all">
                                                    {projects && projects?.map((item,index)=>{
                                                           return <tr key={index}>
                                                               <td>{index+1}</td>
                                                               <td >{item?.project_name}</td>
                                                               <td>{item?.project_description}</td>
                                                               <td>{item?.assigned_users.map((item,index)=><span key={index}>{item?.value} {" , "}</span>)}</td>
                                                               <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-success edit-item-btn"  onClick={()=>{handleEdit(item)}}>Edit</button>
                                                                    </div>
                                                                    <div className="remove">
                                                                        <button className="btn btn-sm btn-danger remove-item-btn" onClick={()=>{handleDelete(item)}}>Remove</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                           </tr>
                                                    })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* <div className="d-flex justify-content-end">
                                                <div className="pagination-wrap hstack gap-2">
                                                    <a className="page-item pagination-prev disabled" href="#">
                                                        Previous
                                                    </a>
                                                    <ul className="pagination listjs-pagination mb-0" />
                                                    <a className="page-item pagination-next" href="#">
                                                        Next
                                                    </a>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>{/* end card */}
                                </div>
                                {/* end col */}
                            </div>
                            {/* end col */}
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>



        </>
    )
}

export default AllProject