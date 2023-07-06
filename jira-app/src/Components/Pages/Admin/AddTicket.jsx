import React, { useEffect, useState } from 'react'
import SideBar from '../AuthPages/SideBar'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import "react-toastify/dist/ReactToastify.css";
import '../../Styles/AddTicket.css';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { UploadTicketImage, UploadTicketFile, CreateTicket, LoadUsers, loadProjects } from '../../redux/Actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function AddTicket() {

    const dispatch = useDispatch();
    let location = useLocation();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [value, setvalue] = useState([]);
    const [project,setProject] = useState(null);
    const [status, setStatus] = useState('');
    const [projectId, setProjectId] = useState(location?.state?.id);

    let users = useSelector((state) => state.projectReducer.users);
    let projects = useSelector((state) => state.projectReducer.projects);

    useEffect(() => {
        dispatch(LoadUsers());
        dispatch(loadProjects());
        document.getElementById('ddlViewBy').value = 'select';

        let obj;
        projects && projects.map((project)=>{
            if(project.createdAt.toDate().toDateString() === location?.state?.at)
            {
                obj = project
            }
        })
        setProject(obj);
    }, [dispatch])
    
    const options = project && project?.assigned_users.map((user) =>{
        return {label:user,value:user}
    })

    const handleOnchange = val => {
        setvalue(val.split(',') || val);
    }
    
    const onSubmit = (data) => {
        let statusId = document.getElementById('ddlViewBy');

        setLoading(true);
        let fileArray = [];
        for (let i = 0; i < data.fileInput.length; i++) {
            fileArray.push(data.fileInput[i]);
        }
        fileArray.forEach((file) => {
            if (file.type == 'image/webp' || file.type == 'image/png') {
                dispatch(UploadTicketImage(file));
            }
            else {
                dispatch(UploadTicketFile(file));
            }
        })

        setTimeout(() => {
            dispatch(CreateTicket({ ticket_name: data.ticket_name, ticket_description: data.description, ticket_status: status, assigned_users: value, createdAt: Timestamp.fromDate(new Date) }, projectId, setLoading, reset, statusId,navigate,users));
        }, 7000)
        setvalue('');
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
                                <h1>Create Ticket</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">AdminDashboard</a></li>
                                    <li className="breadcrumb-item active">Add Ticket</li>
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
                                    <h3 className="card-title">Ticket</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="ticket_name">Ticket Name</label>
                                            <input type="text" className={classNames("form-control mb-0", { 'is-invalid': errors.ticket_name })} id="ticket_name" placeholder="Enter project name" name='ticket_name'
                                                {...register("ticket_name", {
                                                    required: 'This field is required',
                                                    minLength: {
                                                        value: 3,
                                                        message: 'Name requires atleast 3 characters'
                                                    }
                                                })} />
                                            {errors.ticket_name && (<span className='text-danger form-text invalid-feedback'>{errors.ticket_name.message}</span>)}
                                        </div>
                                        <div className="form-group mt-4">
                                            <label htmlFor="description">Ticket Description</label>
                                            <textarea rows={4} defaultValue={""}
                                                className={classNames("form-control mb-0", { 'is-invalid': errors.description })} id="description" placeholder="Enter project description" name='description'
                                                {...register("description", {
                                                    required: 'This field is required',
                                                    minLength: {
                                                        value: 10,
                                                        message: 'Description requires atleast 10 characters'
                                                    }
                                                })}
                                            />
                                            {errors.description && (<span className='text-danger form-text invalid-feedback'>{errors.description.message}</span>)}
                                        </div>
                                        <div className="form-group text-start mb-3 mt-4">
                                            <div className="input-group">
                                                <div className="mb-3">
                                                    <label htmlFor="image" className="form-label">Attechments</label>
                                                    <input type="file" multiple id="fileInput" className={classNames("form-control mb-0", { 'is-invalid': errors.fileInput })} name='fileInput'
                                                        {...register("fileInput", {
                                                            required: 'Please select atleast one file',
                                                        })} />
                                                    {errors.fileInput && (<span className='text-danger form-text invalid-feedback mt-0'>{errors.fileInput.message}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Assign user</label>
                                            <MultiSelect
                                                onChange={handleOnchange}
                                                options={options || ''}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Ticket Status</label>
                                            <br />
                                            <div className="btn-group">
                                                <select id="ddlViewBy" className='status' onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="select" defaultValue={'Select'} disabled>Select</option>
                                                    <option value="TO-DO">TO-DO</option>
                                                    <option value="COMPLETED">COMPLETED</option>
                                                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className='btn btn-outline-primary px-3 mb-3' type='submit'>{loading ? 'Creating..' : 'Create Ticket'}</button>
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

export default AddTicket