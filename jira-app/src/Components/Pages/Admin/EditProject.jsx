import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import classNames from 'classnames'
import { ToastContainer, toast } from "react-toastify";
import { Timestamp } from 'firebase/firestore';
import { useDispatch } from 'react-redux/es/exports';
import { DeleteField, LoadUsers, UpdateProject, UploadProjectFile, UploadProjectImage } from '../../redux/Actions';
import { useSelector } from 'react-redux';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import { auth } from '../../../Services/firebase';

function EditProject({ editId, editItem, setEditId, setEditItem }) {

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, unregister, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [value,setvalue] = useState([]);

    let users = useSelector((state) => state.projectReducer.users);

    useEffect(()=>{dispatch(LoadUsers())},[dispatch])

    useEffect(() => {
        if (editItem) {

            setValue('pname', editItem.project_name);
            setValue('description', editItem.project_description);
            document.getElementById('file-name').innerHTML = editItem?.project_urls &&  editItem?.project_urls.map((file)=>
                file.file_name || file.image_name) || '';
            unregister('pname');
            unregister('description');
            unregister('fileInput');
            setvalue(editItem?.assigned_users);
        }
    }, [editItem]);

    let btnId = document.getElementsByClassName('btn-close')[0]?.id;

    const options = users && users.map((user) => {
        return { label: user.name, value: user.name }
    });

    const handleOnchange = val => {
        setvalue(val.split(',') || val);
        document.getElementById('users').style.display = 'none';
    }

    const onSubmit = (data) => {
        data.fileInput ? document.getElementById('file-name').innerHTML = '' : 
        setLoading(true);
        let fileArray = [];
        if (data.fileInput) {
            for (let i = 0; i < data.fileInput.length; i++) {
                fileArray.push(data.fileInput[i]);
            }
            dispatch(DeleteField(editId));
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
            dispatch(UpdateProject({ project_name: data.pname, project_description: data.description, createdAt: Timestamp.fromDate(new Date) , assigned_users: value}, editId, setLoading, reset, btnId));
        }, 6000)
        setEditId('');
        setEditItem('');
    }

    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Update Project</h5>
                            <button type="button" className="btn-close" id='closemodel' data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
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
                                            <input type="text" name='pname' className={classNames("form-control", { 'is-invalid': errors.pname })} placeholder="Enter project name"
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
                                            <textarea rows={4}
                                                className={classNames("form-control", { 'is-invalid': errors.description })} id="description" placeholder="Enter project description" name='description'
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
                                        <div className="form-group text-start">
                                            <div className="input-group">
                                                <div className="mb-3 ">
                                                    <label htmlFor="fileInput" className="form-label">Project Files</label>
                                                    <input type="file" multiple id="fileInput" className={classNames("form-control", { 'is-invalid': errors.fileInput })} name='fileInput'
                                                        {...register("fileInput", {
                                                            required: '** Please select atleast one file!!',
                                                        })} />
                                                    {errors.fileInput && (<span className='text-danger form-text invalid-feedback'>{errors.fileInput.message}</span>)}

                                                </div>
                                            </div>
                                        </div>

                                        {/* file names */}

                                        <div className='text-dark' id='file-name'>
                                        </div>

                                        <div className="form-group">
                                            <label>Assign user</label>
                                            {editItem && editItem?.assigned_users && <div className="form-group" id='users'>
                                                {
                                                    editItem?.assigned_users.map((user) => <span className='border rounded-1 px-2 py-1'>{user}</span>)
                                                }
                                            </div>}
                                            <MultiSelect
                                                onChange={handleOnchange}
                                                options={options}
                                            />
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" id='closeModal' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button className='btn btn-outline-success' type='submit'>{loading ? 'Updating..' : 'Update Project'}</button>
                                        <ToastContainer autoClose={5000} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProject