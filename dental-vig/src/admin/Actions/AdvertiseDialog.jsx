import { React, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextFieldInput from '../input-function/TextFieldInput';
import ButtonInput from '../input-function/ButtonInput';
import SearchSelectDropdown from '../input-function/SearchSelectDropdown'
import { useDispatch } from 'react-redux';
import { ADD_ADVERTISE, GET_ADVERTISE_LIST, UPDATE_ADVERTISE, curdData} from '../../redux/actions/EcommerceAction';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useContext } from 'react';
import { ValAuthContext } from '../context/ValContext';

const AdvertiseDialog = (props) => {

    const [editfile, setEditFile] = useState({});
    const val = useContext(ValAuthContext);
    const obj = props.obj;

    const positionOptions = [
        { label: 'header', value: 'header', name: 'header' },
        { label: 'footer', value: 'footer', name: 'footer' },
        { label: 'left', value: 'left', name: 'left' },
        { label: 'right', value: 'right', name: 'right' },
    ]
    useEffect(() => {
        if (obj.action == 'edit') {
            setFieldValue('title', obj?.editItem?.title);
            setFieldValue('url',obj?.editItem?.url);
            setFieldValue('Position', { name: obj?.editItem?.position, label: obj?.editItem?.position, value: obj?.editItem?.position })
        }
        else {
            setFieldValue('title', '');
            setFieldValue('url','');
            setFieldValue('Position','');
        }
    }, [obj]);

    const dispatch = useDispatch();
    const handleClose = () => {
        var elelist = document.getElementsByTagName("input");
        for (var i = 0; i < elelist.length; i++) {
            elelist[i].blur();
        }
        obj.setOpen(false);
        setTouched({}, false);
        setFieldValue('name', '')
        setFieldValue('file', '');
    };

    const handleFileChange = (e) => {
        setFieldValue('file', e.target.files[0]);
        if (obj.action == 'edit') {
            setEditFile(e.target.files[0]);
        }
    }

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/svg", "image/webp"];
    const { values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue, setErrors, setTouched } = useFormik({

        initialValues:
            { title: '', file: '', Position: '' , url:''},
        validationSchema: obj.action == 'add' ? yup.object({
            title: yup.string().required("Name is required"),
            file: yup.mixed().required('Image is required').test('Unsupported format', (value) => { return value && SUPPORTED_FORMATS.includes(value?.type) }),
            Position: yup.object().required("Position is required"),
            url: yup.string().required("Url is required")
        }) : 
        yup.object({
            title: yup.string().required("Name is required"),
            Position: yup.object().required("Position is required"),
            url: yup.string().required("Url is required"),
            Position: yup.object().required("Position is required")}),

        onSubmit: (values, { resetForm }) => {
            const formdata = new FormData();
            formdata.append('title', values.title);
            formdata.append('image', values.file);
            formdata.append('position', values.Position.value);
            formdata.append('url',values.url)

            const editFormData = new FormData();
            editFormData.append('title', values.title);
            editFormData.append('image', editfile);
            editFormData.append('position', values?.Position.value);
            editFormData.append('url',values.url)
     
            switch (obj?.action) {
                case 'edit':
                    dispatch(curdData(editFormData, `admin/update_ads/${obj?.editItem?.id}`,UPDATE_ADVERTISE, `admin/get_all_ads?page=${obj?.currentPage}`,GET_ADVERTISE_LIST,'Advertise updated successfully !',val.setMessage, val.setError, val.setStatus, val.setOpenLoader))
                    break;
                case 'add':
                    dispatch(curdData(formdata, 'admin/store_add', ADD_ADVERTISE,`admin/get_all_ads?page=${obj?.currentPage}`,GET_ADVERTISE_LIST,'Advertise added successfully !', val.setMessage, val.setError, val.setStatus, val.setOpenLoader))
                    break;
                default:
                    break;
            }

            handleClose();
            resetForm({ values: '' });
            setEditFile({});
        }
    })
    return (
        <>
            <div>
                <Dialog open={obj.open} fullWidth>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>{obj.name}</DialogTitle>
                        <DialogContent>
                            {
                                <>
                                    <TextFieldInput obj={{
                                        label: 'Title', type: 'text',
                                        handleChange: handleChange,
                                        handleBlur: handleBlur,
                                        value: values.title,
                                        error: errors.title,
                                        touch: touched.title,
                                        name: 'title',
                                        autoFocus:true
                                    }} />
                                    <TextFieldInput obj={{
                                        label: 'Navigation url', type: 'text',
                                        handleChange: handleChange,
                                        handleBlur: handleBlur,
                                        value: values.url,
                                        error: errors.url,
                                        touch: touched.url,
                                        name: 'url',
                                        autoFocus:false
                                    }} />
                                    <Grid container spacing={1} sx={{ justifyContent: 'flex-start' }}>
                                        <Grid item sm={10} xs={12} sx={{ width: '100%' }}>
                                            <TextFieldInput
                                                obj={{
                                                    label: 'Image', type: 'file',
                                                    handleBlur: handleBlur,
                                                    handleChange: handleFileChange,
                                                    value: values.file,
                                                    error: errors.file,
                                                    touch: touched.file,
                                                }} />
                                        </Grid>
                                        <Grid item sm={2} xs={12} sx={{ display: obj?.editItem?.image && obj.action == 'edit' ? 'block' : 'none' }}>
                                            <Avatar alt={obj?.editItem?.title} src={`${process.env.REACT_APP_ADVERTISE_IMAGE_URL}${obj?.editItem?.image}`} sx={{ marginTop: '10px' }}>
                                            </Avatar>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} sx={{ justifyContent: 'flex-start', marginTop: '20px' }}>
                                        <Grid item sm={10} xs={12} sx={{ width: '100%' }}>
                                            <SearchSelectDropdown obj={{ name: 'Position', values: values.Position, setFieldValue: setFieldValue, error: errors.Position, handleBlur: handleBlur, touch: touched.Position, setErrors: setErrors, editType: obj?.editItem?.position ,options:positionOptions,action:'edit'}} />
                                        </Grid>
                                    </Grid>
                                </>
                            }
                        </DialogContent>
                        <DialogActions>
                            <ButtonInput obj={{ buttonName: 'Cancel', handleClose: handleClose }} />
                            <ButtonInput obj={{ buttonName: obj.action == 'edit' ? 'Edit' : 'Add', type: 'submit' }} />
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </>
    )
}

export default AdvertiseDialog

