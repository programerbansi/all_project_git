import React, { useEffect, useState } from 'react'
import SideBar from '../AuthPages/SideBar'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, loadProjects, UploadProjectFile, UploadProjectImage } from '../../redux/Actions';
import { Timestamp } from 'firebase/firestore';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import {LoadUsers} from '../../redux/Actions';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function AddProject() {

    const [loading,setLoading] = useState(false);
    const [value, setvalue] = useState([]);
    const dispatch = useDispatch();

    const admin = useSelector((state) => state.projectReducer.admin);
    let users = useSelector((state) => state.projectReducer.users);

    useEffect(() => {
        dispatch(loadProjects());
        dispatch(LoadUsers());
    }, [dispatch])

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const options = users.map((user) => {
        return { label: user.name, value: user.name }
    });
    const handleOnchange = val => {
        setvalue(val.split(',') || val);
    }

    const onSubmit = (data) => {
        setLoading(true);
        let fileArray = [];
        for (let i = 0; i < data.fileInput.length; i++) {
            fileArray.push(data.fileInput[i]);
        }
        fileArray.forEach((file) => {
            if (file.type == 'image/webp' || file.type == 'image/png') {
                dispatch(UploadProjectImage(file));
            }
            else {
                dispatch(UploadProjectFile(file));
            }
        })
        setTimeout(() => {
            dispatch(CreateProject({ project_name: data.pname, project_description: data.description, createdAt: Timestamp.fromDate(new Date),assigned_users: value },reset,setLoading));
            dispatch(loadProjects());
        }, 7000);
        reset();
    }

    return (
        <>
            <SideBar />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="content-wrapper bg-white px-3">
                <section className="content-header">
                    <div className="container-fluid p-0">
                        <div className="row mb-2 p-0">
                            <div className="col-sm-6">
                                <h1>Create Project</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">AdminDashboard</a></li>
                                    <li className="breadcrumb-item active">Add Project</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content container-fluid p-0">
                    <div className="row w-100 justify-content-center">
                        <div className="col-md-6">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Project</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="pname">Project Name</label>
                                            <input type="text" className={classNames("form-control", { 'is-invalid': errors.pname })} id="pname" placeholder="Enter project name"
                                                {...register("pname", {
                                                    required: '** This field is required !!',
                                                    minLength: {
                                                        value: 3,
                                                        message: '** Name requires atleast 3 characters !!'
                                                    }
                                                })} />
                                            {errors.pname && (<span className='text-danger form-text invalid-feedback'>{errors.pname.message}</span>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Project Description</label>
                                            <textarea rows={4} defaultValue={""}
                                                className={classNames("form-control", { 'is-invalid': errors.description })} id="description" placeholder="Enter project description"
                                                {...register("description", {
                                                    required: '** This field is required !!',
                                                    minLength: {
                                                        value: 10,
                                                        message: '** Name requires atleast 10 characters !!'
                                                    }
                                                })}
                                            />
                                            {errors.description && (<span className='text-danger form-text invalid-feedback'>{errors.description.message}</span>)}
                                        </div>
                                        <div className="form-group text-start mb-3">
                                            <div className="input-group">
                                                <div className="mb-3 ">
                                                    <label htmlFor="image" className="form-label">Image</label>
                                                    <input type="file" multiple id="fileInput" className={classNames("form-control", { 'is-invalid': errors.fileInput })} name='fileInput'
                                                        {...register("fileInput", {
                                                            required: '** Please select atleast one file!!',
                                                        })} />
                                                    {errors.fileInput && (<span className='text-danger form-text invalid-feedback'>{errors.fileInput.message}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Assign user</label>
                                            <MultiSelect
                                                onChange={handleOnchange}
                                                options={options}
                                            />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className='btn btn-outline-success px-3 mb-3' type='submit'>{loading ? 'Creating..' : 'Create Project'}</button>
                                        <ToastContainer />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AddProject
