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
import { CreateProject, CreateTicket, loadProjects, loadTickets, LoadUsers, UpdateProject } from '../Redux/Action/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebase-config';
import { valAuthContext } from '../Context/valContext';
import { Spinner } from 'react-bootstrap';

// import  {storage } from '../firebase/firebase-config';
import EditorField from '../user/inputFunction/EditorField';
const SunEditor = dynamic(import("suneditor-react"), { ssr: false })
function TicketModel(props) {
    const { showModel, setShowModel, action, edititem } = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [imgArray, setImgArray] = useState([]);
    const [imgtrue, setImgTrue] = useState(false);
    const [urls, setUrls] = useState([]);
    const [editorVal, setEditorVal] = useState('write somethig...');
    const val = useContext(valAuthContext);
    const handleClose = () => {
        setShowModel(false);
    }
    useEffect(() => {
        dispatch(loadProjects());
        dispatch(LoadUsers());

    }, [dispatch])
    // console.log(edititem.project_description,"----------------edititem---------------")

    let users = useSelector((state) => state.userReducer.users);
    let projects = useSelector((state) => state.userReducer.projects);
    const user_options = users.map((user) => {
        return { label: user.name, value: user.name }
    });
    const projects_options = projects.map((project) => {
        return { label: project.project_name, value: project.id }
    });
    const status_options = [
        { label: "Todo", value: "Todo" },
        { label: "In progress", value: "In progress" },
        { label: "Ready For Testing", value: "Ready For Testing" },
        { label: "Done", value: "Done" },
    ]
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'link'],
        ],
    }

    // useEffect(()=>{
    //     if(edititem && action == "update")
    //     {
    //         setErrors({}, '');
    //         setFieldValue('pname',edititem.project_name);
    //         setFieldValue('project_description',edititem.project_description);
    //         setFieldValue('assign_user',edititem?.assigned_users
    //         ?.map((item) => {
    //             return { label: item?.label, value: item?.value }
    //         }))
    //     }
    // },[])


    const handleSelect = (data) => {
        // console.log(data);
        setFieldValue('assign_user', data);
    }
    const handleSelectStatus = (data) => {
        setFieldValue('status', data);
    }
    const handleSelectProject = (data) => {
        setFieldValue('project_id', data);
    }
    const handleFileChange = (e) => {
        // setErrormsg('');
        setErrors('');
        if (e.target.files) {
            setImgArray((prv) => prv.concat(Array.from(e.target.files)))
        }
        setFieldValue('image', imgArray);
    }
    // const request = debounce(value => {
    //     // console.log(value,'==================editor value debounce-================================')
    //     setFieldValue('tdescription', value)
    // }, 1000)
    // let tdref = useRef();
    // const debouceRequest = useCallback(value => {
    //     request(value);
    //     // console.log(value,'-----------------------------req--------------------')
    // }, []);
    // const handleEditorContentChange = useCallback((editor) => {
    //     let doc = editor?._cache?.markdown;

    //     // let doc = parse(editor?._cache?.html);
    //     debouceRequest(doc);
    //     // console.log(doc,"-----doc")
    //     // debouceRequest(doc?.props?.children);
    // }, []);

    // const request = debounce(value => {
    //     setFieldValue('tdescription', value)
    // }, 1000)

    const { values, errors, setErrors, handleBlur, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
        initialValues: {
            tname: "",
            tdescription: "",
            project_id: '',
            assign_user: "",
            image: "",
            status: ""
        },
        validationSchema: yup.object({
            tname: yup.string().required("Ticket name is required"),
            tdescription: yup.string().required("Ticket description is required"),
            project_id: yup.object().required("please select project"),
            image: yup.array().required("Please select images"),
            status: yup.object().required("please select status"),
            assign_user: yup.array().of(yup.object()).required('please select assign user'),
        }),

        onSubmit: (data, { resetForm }) => {
            setImgTrue(true);
            let array = []
            imgArray?.map(async (image) => {
                const imgRef = ref(storage, `image/${image.name}`);
                const snap = await uploadBytes(imgRef, image);
                const dlurl = await getDownloadURL(ref(storage, snap?.metadata.ref._location.path_));
                // console.log(dlurl,'========================dlurl==================')
                setUrls((previousImage) => [...previousImage, dlurl])

                array.push(dlurl);

                // return dlurl
            });
            // setFieldValue('tdescription', "sdsdcsdcsd")
            // setTimeout(() => {
            //     setFieldValue('image', array)

            // }, 5000);
            setLoading(true);
            setTimeout(() => {
                // console.log(array,"-------array------")
                // console.log(urlArray,"-------call")
                dispatch(CreateTicket({ ticket_name: data.tname, ticket_description: values.tdescription, ticket_status: data.status, assigned_users: data.assign_user, ticket_Urls: array, createdAt: Timestamp.fromDate(new Date) }, data.project_id));
                setLoading(false);
                dispatch(loadTickets());
                resetForm({ values: "" })
                setShowModel(false);

            }, 2000);


        }
    })
    const tdref = useRef();
    //   useEffect(()=>{
    // console.log(tdref, "asdfasd")
    //   },[tdref])
    const request = useMemo(() => debounce(value => {
    
        setFieldValue('tdescription', value)
        // const fullNameEle = document.getElementById('tdescription');
        // tdref.current =fullNameEle;
        //     console.log(tdref, "asdfasd")
        // const len = tdref.current.innerText.length;
        // const selection = { index: len, length: len };
        // // tdref.current.setEditorSelection( tdref.current.editor, selection);
        // tdref.current.focus();

            // Move the cursor to the end
            // const length = fullNameEle.value.length;
            // fullNameEle.setSelectionRange(length, length);
    
    }, 1000), [])
    const debouceRequest = useCallback(value => request(value), []);
    const handleEditorContentChange = useCallback((editor) => {
        let doc = parse(editor);
        debouceRequest(doc.props.children);
    }, []);
    // const handleEditorContentChange=(value)=>{
    //     setFieldValue('tdescription', value)
    // }
    // console.log(values, '=======================================erf=ew===')
    let tickets = useSelector((state) => state.userReducer.tickets);
    // console.log(tickets,"----------------tickets-")

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
                                name="tname"
                                label="Ticket Name"
                                type="text"
                                placeholder="Enter Ticket Name"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                error={errors.tname}
                                touch={touched.tname}
                                value={values.tname}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="VertimeassageInput" className="form-label">Ticket Description</label>
                            <EditorField
                                id='tdescription'
                                tdref={tdref}
                                // name='tdescription'
                                value={values.tdescription}
                                // value={state?.description}
                                handleChange={handleEditorContentChange}

                                // error={errors.tdescription}
                                // touch={touched.tdescription}
                                event2={handleBlur} />
                            {/* <EditorField/> */}
                            {/* <textarea className="form-control" 
                            name='tdescription' 
                            id="tdescription" 
                            rows={3} 
                            placeholder="Enter your Ticket Description" 
                            onChange={(e)=>handleEditorContentChange(e.target.value)} 
                            value={values.project_description}
                            onBlur={handleBlur}/> */}

                            {errors.tdescription && touched.tdescription && (<span className='text-danger'>{errors.tdescription}</span>)}
                        </div>
                        <div className="mb-3">
                            <label for="ForminputState1" className="form-label">Project</label>
                            <Select
                                // defaultValue={selectedOption}
                                onChange={handleSelectProject}
                                options={projects_options}
                                value={values.project_id}
                                onBlur={handleBlur}
                                name="project_id"
                            />
                            {errors.project_id && touched.project_id && (<span className='text-danger'>{errors.project_id}</span>)}
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
                            {errors.assign_user && touched.assign_user && (<span className='text-danger'>{errors.assign_user}</span>)}
                        </div>
                        <div className="mb-3">
                            <label for="ForminputState3" className="form-label">Status</label>
                            <Select
                                // defaultValue={selectedOption}
                                onChange={handleSelectStatus}
                                options={status_options}
                                value={values.status}
                                onBlur={handleBlur}
                                name="status"
                            />
                            {errors.status && touched.status && (<span className='text-danger'>{errors.status}</span>)}
                        </div>
                        <div className="mb-3">
                            <label for="ForminputState4" className="form-label">Image</label>
                            <input type="file"
                                className="form-control"
                                id="img"
                                accept='image/*'
                                multiple
                                name='image'
                                onChange={handleFileChange}
                                onBlur={handleBlur}
                            // value={values.image}
                            />
                            {errors.image && touched.image && (<span className='text-danger'>{errors.image}</span>)}
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
                            />{action == "add" ? "Adding in..." : "Updating in..."}</div> : action == 'add' ? 'Add Ticket' : 'Update Ticket'}</button>

                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default TicketModel