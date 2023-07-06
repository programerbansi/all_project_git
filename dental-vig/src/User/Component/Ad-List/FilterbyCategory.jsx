import React from 'react'
import {useEffect, useState } from 'react'
import CheckBoxField from '../InputFunction/CheckBoxField'
import TextField from '../InputFunction/TextField'
import Button from '../InputFunction/Button';
import Lable from '../InputFunction/Lable';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_CATEGORY, GetUserCategory, getDatas } from '../../../redux/actions/UserEcommerceAction';
import '../../Css/FilterByCategory.css';
import { useLocation } from 'react-router-dom';
import { LIST_PAGE } from '../../../services/UserRoutePath';
import Filterby from './Filterby';
import { useQuery } from 'react-query';

const FilterbyCategory = ({filterState}) => {

    let props = filterState;
    let categoryList = useSelector((state) => state.UserEcommerceReducer.usercategory);
    const dispatch = useDispatch();
    const location = useLocation();
    const fetchData = async () => {
        dispatch(getDatas(`getsubcat`,GET_USER_CATEGORY));
    };
    const query = useQuery('category', fetchData);
    if (query.isLoading) {
        return console.log("Loading..")
    }
    if (query.error) {
        return console.log(query.error.message)
    }
    const handleClick = (item,e) =>{
        const checked = e.target.checked;
        if (checked) {
            props.setFilterCategoryId([...props.filterCategoryId, item.id])
        }
        else {
            props.setFilterCategoryId(props.filterCategoryId.filter((categoryId) => { return categoryId !== item?.id }))
        }
    }
    const handleCheckbox = (item,index) => {
        var items = document.getElementsByName('category');
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'checkbox' && i == index)
            {
                if(!items[i].checked) {
                    items[i].checked = true;
                    props.setFilterCategoryId([...props.filterCategoryId, item.id])                }
                else {
                    items[i].checked = false;
                    props.setFilterCategoryId(props.filterCategoryId.filter((categoryId) => { return categoryId !== item?.id }))                }
            }
        }
    }
    const handleSubmit = () =>{
        props.setFilterCategoryId([]);
        var items = document.getElementsByName('category');
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'checkbox')
                items[i].checked = false;
        }
    }
    return (
        
        <>
        {
            location.pathname == LIST_PAGE ? null :  
                categoryList.length >0 && <Filterby array={categoryList} handleCheckbox={handleCheckbox} handleSubmit={handleSubmit} handleClick={handleClick} checkName='category' checkId='category' title='Filter by category'/> 
        }
          
        </>
    )
}

export default React.memo(FilterbyCategory)