// ,deleteItem.lastPage
import { React, useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../css/Pagination.css';
import { useDispatch } from 'react-redux';
import { deleteCategory, deleteBrand, deleteTag, getCategoryList, deleteType, deleteUser, deleteAdvertise, deleteSubCategory, curdData, DELETE_BRAND, GET_BRAND_LIST, deleteData, DELETE_CATEGORY, GET_CATEGORY_LIST, DELETE_SUB_CATEGORY, GET_SUB_CATEGORY_LIST, DELETE_TAG, DELETE_TYPE, GET_TYPE_LIST, GET_TAG_LIST, DELETE_USER, DELETE_ADVERTISE, GET_ADVERTISE_LIST, GET_USER_LIST } from '../../redux/actions/EcommerceAction';
import { useLocation } from 'react-router-dom';
import { ValAuthContext } from '../context/ValContext';
import Loader from './Loader';
import { ADVERTISEMENTS, ALL_BRANDS, ALL_CATEGORIES, ALL_TAGS, ALL_TYPES, ALL_USERS, SUB_CATEGORIES } from '../../services/AdminRoutePath';

const DeleteDialog = ({ deleteItem, setDeleteItem, setCurrentPage }) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const val = useContext(ValAuthContext);

    const handleClose = () => {
        setDeleteItem({ id: '', openDeleteDialog: false })
    };

    const deleteApi = [
        { path: ALL_BRANDS, url: `admin/delete-brand/${deleteItem.id}`, type: DELETE_BRAND, gurl: `getbrand?page=${deleteItem.lastPage}`, gtype: GET_BRAND_LIST, msg: 'Brand deleted successfully !' },
        { path: ALL_CATEGORIES, url: `admin/delete-cat/${deleteItem.id}`, type: DELETE_CATEGORY, gurl: `getcat?page=${deleteItem.lastPage}`, gtype: GET_CATEGORY_LIST, msg: 'Category deleted successfully !' },
        { path: SUB_CATEGORIES, url: `admin/delete-sub-category/${deleteItem.id}`, type: DELETE_SUB_CATEGORY, gurl: `getsubcat?page=${deleteItem.lastPage}`, gtype: GET_SUB_CATEGORY_LIST, msg: 'Sub-category deleted successfully !' },
        { path: ALL_TAGS, url: `admin/delete-tag/${deleteItem.id}`, type: DELETE_TAG, gurl: `gettag?page=${deleteItem.lastPage}`, gtype: GET_TAG_LIST, msg: 'Tag deleted successfully !' },
        { path: ALL_TYPES, url: `admin/delete-type/${deleteItem.id}`, type: DELETE_TYPE, gurl: `gettype?page=${deleteItem.lastPage}`, gtype: GET_TYPE_LIST, msg: 'Type deleted successfully !' },
        { path: ALL_USERS, url: `admin/deleteuser/${deleteItem.id}`, type: DELETE_USER, gurl: `admin/getuser?page=${deleteItem.lastPage}`, gtype: GET_USER_LIST, msg: 'User deleted successfully !' },
        { path: ADVERTISEMENTS, url: `admin/delete_ads/${deleteItem.id}`, type: DELETE_ADVERTISE, gurl: `admin/get_all_ads?page=${deleteItem.lastPage}`, gtype: GET_ADVERTISE_LIST, msg: 'Advertise deleted successfully !' },
    ]
    const handleDeleteItem = () => {
        deleteApi && deleteApi.find((i, idx) => {
            if (i.path == location.pathname) {
                dispatch(deleteData('', i.url, i.type, i.gurl, i.gtype, i.msg, val.setMessage, val.setError, val.setStatus, val.setOpenLoader));
            }
        })
    }

    return (
        <div>
            <Loader obj={{ openLoader: val.openLoader, setOpenLoader: val.setOpenLoader }} />
            <Dialog
                open={deleteItem.openDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete {deleteItem?.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose();
                        handleDeleteItem();
                    }} autoFocus sx={{ color: 'red' }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteDialog
