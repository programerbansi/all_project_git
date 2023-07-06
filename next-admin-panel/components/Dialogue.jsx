import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ALL_BRANDS, ALL_CATEGORIES, ALL_TYPES } from '../app/services/routes';
import { primary } from '../app/services/variables';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { ErrorComp, InputNameComp } from './InputField';
import { useDispatch } from 'react-redux';
import { addBrand, addCategory, addType } from '../app/redux/actions/dataAction';

export const OverlayTwo = () => (
    <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'
    />)

const Dialogue = ({ types, isOpen, setOpenDialogue,currentPage,setCurrentPage}) => {

    const removeErrorsAndValues = () => {
        setTouched({}, false);
        setErrors({}, '');
        setFieldValue('name', '')
        setFieldValue('file', '');
        setFieldValue('type', '');
    }
    
    const handleClose = () => {
        setOpenDialogue(false);
        removeErrorsAndValues();
    }

    const { pathname } = useRouter()
    const dispatch = useDispatch();
    const [routeName, setRouteName] = useState(pathname.split('/').at(-2))

    const SUPPORTED_FORMATS = ["jpg", "jpeg", "gif", "png", "svg", "webp"];
    const { values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue, setErrors, setTouched, setFieldError } = useFormik({

        initialValues: pathname == ALL_BRANDS ? { name: '', file: '' } : pathname == ALL_CATEGORIES ? { name: '', type: '' } : { name: '' },
        validationSchema: pathname == ALL_BRANDS ?
            yup.object({
                name: yup.string().required("Name is required"),
                file: yup.mixed().required('Image is required').test('Unsupported format', (value) => { return value && SUPPORTED_FORMATS.includes(value.split('.').pop().toLowerCase()) })
            }) :
            pathname == ALL_CATEGORIES ?
                yup.object({
                    name: yup.string().required("name is required"),
                    type: yup.string().required("type is required"),
                }) : yup.object({
                    name: yup.string().required("Name is required"),
                }),
        onSubmit: (values, { resetForm }) => {
            switch (pathname) {
                case ALL_CATEGORIES:
                    dispatch(addCategory({name:values.name,'type_id':values?.type,handleClose}))
                    break;
                case ALL_BRANDS:
                    dispatch(addBrand({name:values.name,image:values.file,handleClose}))
                    break;
                case ALL_TYPES:
                    dispatch(addType({name:values.name,handleClose}))
                    break;
                default:
                    break;
            }
            resetForm({ values: '' });
            removeErrorsAndValues();
        }
    })

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setOpenDialogue(false)} isCentered closeOnOverlayClick={false}>
                {<OverlayTwo />}
                <ModalContent>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody mt={5}>
                            {
                                pathname == ALL_CATEGORIES ?
                                    <>
                                        <FormControl>
                                            <FormLabel>{routeName}</FormLabel>
                                            <InputNameComp handleBlur={handleBlur} handleChange={handleChange} value={values.name} placeholder={routeName} name='name' />
                                        </FormControl>
                                        <ErrorComp error={errors.name} touch={touched.name} />
                                        <FormControl my={2}>
                                            <FormLabel>Types</FormLabel>
                                            <Select placeholder='select type' name='type' onChange={handleChange} onBlur={handleBlur} value={values.type}>
                                                {
                                                    types && types.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)
                                                }
                                            </Select>
                                        </FormControl>
                                        <ErrorComp error={errors.type} touch={touched.type} />
                                    </> : pathname == ALL_BRANDS ?
                                        <>
                                            <FormControl>
                                                <FormLabel>{routeName}</FormLabel>
                                                <InputNameComp handleBlur={handleBlur} handleChange={handleChange} value={values.name} placeholder={routeName} name='name' />
                                            </FormControl>
                                            <ErrorComp error={errors.name} touch={touched.name} />
                                            <FormControl my={2}>
                                                <FormLabel>logo</FormLabel>
                                                <InputNameComp handleBlur={handleBlur} handleChange={handleChange} value={values.filr} placeholder={routeName} name='file' type='file' />
                                            </FormControl>
                                            <ErrorComp error={errors.file} touch={touched.file} />
                                        </>
                                        : pathname == ALL_TYPES ?
                                            <>
                                                <FormControl>
                                                    <FormLabel>{routeName}</FormLabel>
                                                    <InputNameComp handleBlur={handleBlur} handleChange={handleChange} value={values.name} placeholder={routeName} name='name' />
                                                </FormControl>
                                                <ErrorComp error={errors.name} touch={touched.name} />
                                            </>
                                            : null
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => handleClose()} variant={'ghost'}>Close</Button>
                            <Button mx={2} color={primary} variant={'ghost'} type='submit'>Add</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Dialogue
