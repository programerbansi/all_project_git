import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import InputTextField from '../user/inputFunction/InputTextField';
import * as yup from 'yup'
import { debounce } from "lodash";
const parse = require('html-react-parser');
import dynamic from 'next/dynamic'
import Select from 'react-select';
import { Timestamp } from 'firebase/firestore';
import { CreateProject, loadProjects, LoadUsers, UpdateProject } from '../Redux/Action/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import EditorField from '../user/inputFunction/EditorField';
const SunEditor = dynamic(import("suneditor-react"), { ssr: false })
function ProjectModel(props) {
    const { showModel, setShowModel,action,edititem } = props;
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const handleClose = () => {
        setShowModel(false);
    }
    useEffect(() => {
        // dispatch(loadProjects());
        dispatch(LoadUsers());
    }, [dispatch])
// console.log(edititem.project_description,"----------------edititem---------------")
    
    let users = useSelector((state) => state.userReducer.users);
    
    const user_options = users.map((user) => {
        return { label: user.name, value: user.name }
    });
    const { values, errors, setErrors,handleBlur, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
        initialValues: {
            pname: "",
            project_description:edititem && action == "update" ? edititem.project_description :'',
            assign_user:"",
        },
        validationSchema: yup.object({
            pname: yup.string().required("Project name is required"),
            project_description: yup.string().required("Project description is required"),
            assign_user: yup.array().of(yup.object()).required('please select assign user'),
        }),

        onSubmit: async (data, { resetForm }) => {
            // console.log(data, "==============")
            setLoading(true);
            if(action == 'add')
            {
                dispatch(CreateProject({ project_name: data.pname, project_description: data. project_description, createdAt: Timestamp.fromDate(new Date),assigned_users: data.assign_user }),setLoading,setShowModel);
                setTimeout(() => {
                    setLoading(false);
                    setShowModel(false);
                    resetForm({ values: "" })
                }, 1000);
               
            }
            else{
                dispatch(UpdateProject({ project_name: data.pname, project_description: data.project_description, createdAt: Timestamp.fromDate(new Date) , assigned_users: data.assign_user},edititem.id,setLoading,setShowModel ));
                setTimeout(() => {
                    setLoading(false);
                    setShowModel(false);
                    resetForm({ values: "" })
                }, 1000);
            }
            dispatch(loadProjects());
        }
    })

    useEffect(()=>{
        if(edititem && action == "update")
        {
            setErrors({}, '');
            setFieldValue('pname',edititem.project_name);
            setFieldValue('project_description',edititem.project_description);
            setFieldValue('assign_user',edititem?.assigned_users
            ?.map((item) => {
                return { label: item?.label, value: item?.value }
            }))
        }
    },[])
    // const request = debounce(value => {
    //     setFieldValue('project_description', value)
    // }, 1000)

    // const debouceRequest = useCallback(value => request(value), []);
    // const handleEditorContentChange = useCallback((editor) => {
    //     // console.log(editor,"=====editor=====")
    //     let doc=editor?._cache?.markdown;
    //     debouceRequest(doc);
    //     // let doc = parse(editor?._cache?.html);
    //     // debouceRequest(doc?.props?.children);
    //     // setFieldValue('tdescription', value)
    // }, []);
    const handleEditorContentChange=(value)=>{
        setFieldValue('project_description', value)
    }
    
      const handleSelect=(data)=>{
        // console.log(data);
        setFieldValue('assign_user', data);
      }
    return (
        <>
            <Modal
                show={showModel}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Project
                    </Modal.Title>
                </Modal.Header>
                <form action="javascript:void(0);" onSubmit={handleSubmit}>
                <Modal.Body>
                   
                        <div className="mb-3">
                            <InputTextField
                                name="pname"
                                label="Project Name"
                                type="text"
                                placeholder="Enter Project Name"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                error={errors.pname}
                                touch={touched.pname}
                                value={values.pname}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="VertimeassageInput" className="form-label">Project Description</label>
                            {/* <EditorField name={"project_description"} handleEditorContentChange={handleEditorContentChange}/> */}
                            <textarea className="form-control" 
                            name='project_description' 
                            id="project_description" 
                            rows={3} 
                            placeholder="Enter your Project Description" 
                            onChange={(e)=>handleEditorContentChange(e.target.value)} 
                            value={values.project_description}
                            onBlur={handleBlur}/>
                             {errors.project_description && touched.project_description&&(<span className='text-danger'>{errors.project_description}</span>)}
                        </div>
                        <div className="mb-3">
                            <label for="ForminputState" className="form-label">Assign user</label>
                            <Select
                                // defaultValue={selectedOption}
                                onChange={handleSelect}
                                options={user_options}
                                value={values.assign_user}
                                onBlur={handleBlur}
                                name="assign_user"
                                isMulti={true}

                            />
                             {errors.assign_user && touched.assign_user&&(<span className='text-danger'>{errors.assign_user}</span>)}
                        </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-danger' onClick={() => { handleClose() }}>Close</Button>
                    <div className="text-end">
                        <button type="submit" className="btn btn-success">{loading ? <div> <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />{action == "add"?"Adding in...":"Updating in..."}</div>:action == 'add' ? 'Add Project':'Update Project'}</button>
                    </div>
                </Modal.Footer>
                </form>
            </Modal>
            {/* <div className="modal fade" id="showModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-light p-3">
                            <h5 className="modal-title" id="exampleModalLabel" />
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-modal" />
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="mb-3" id="modal-id" style={{ display: 'none' }}>
                                    <label htmlFor="id-field" className="form-label">ID</label>
                                    <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="customername-field" className="form-label">Customer Name</label>
                                    <input type="text" id="customername-field" className="form-control" placeholder="Enter Name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email-field" className="form-label">Email</label>
                                    <input type="email" id="email-field" className="form-control" placeholder="Enter Email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone-field" className="form-label">Phone</label>
                                    <input type="text" id="phone-field" className="form-control" placeholder="Enter Phone no." required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date-field" className="form-label">Joining Date</label>
                                    <input type="text" id="date-field" className="form-control" placeholder="Select Date" required />
                                </div>
                                <div>
                                    <label htmlFor="status-field" className="form-label">Status</label>
                                    <select className="form-control" data-trigger name="status-field" id="status-field">
                                        <option value>Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Block">Block</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" id="add-btn">Add Customer</button>
                                    <button type="button" className="btn btn-success" id="edit-btn">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default ProjectModel