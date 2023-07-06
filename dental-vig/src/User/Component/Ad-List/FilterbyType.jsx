import React from 'react'
import {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_TYPE, GetUserCategory, GetUserType, getDatas } from '../../../redux/actions/UserEcommerceAction';
import '../../Css/FilterByCategory.css';
import { useLocation } from 'react-router-dom';
import { LIST_PAGE } from '../../../services/UserRoutePath';
import Filterby from './Filterby';
import { useQuery } from 'react-query';

const FilterbyType = ({ filterState }) => {
    let props = filterState;
    let typeList = useSelector((state) => state.UserEcommerceReducer.usertype);
    const dispatch = useDispatch();
    const location = useLocation();
    const fetchData = async () => {
        dispatch(getDatas(`gettype`,GET_USER_TYPE));
    };
    const query = useQuery('type', fetchData);
    if (query.isLoading) {
        return console.log("Loading..")
    }
    if (query.error) {
        return console.log(query.error.message)
    }
    const handleClick = (item,e) => {
        const checked = e.target.checked;
        if (checked) {
            props.setFilterTypeId([...props.filterTypeId, item.id])
        }
        else {
            props.setFilterTypeId(props.filterTypeId.filter((typeId) => { return typeId !== item?.id }))
        }
    }
    const handleCheckbox = (item,index) => {
        var items = document.getElementsByName('type');
        for (var i = 1; i < items.length; i++) {
            if (items[i].type == 'checkbox' && i == index)
            {
                if(!items[i].checked) {
                    items[i].checked = true;
                    props.setFilterTypeId([...props.filterTypeId, item.id])
                }
                else {
                    items[i].checked = false;
                    props.setFilterTypeId(props.filterTypeId.filter((typeId) => { return typeId !== item?.id }))
                }
            }
        }
    }
    const handleSubmit = () => {
        props.setFilterTypeId([]);
        var items = document.getElementsByName('type');
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'checkbox')
                items[i].checked = false;
        }
    }
    return (
        <>
            {
                location.pathname == LIST_PAGE && !typeList ? null : 
                typeList.length > 0 &&  <Filterby array={typeList} handleCheckbox={handleCheckbox} handleSubmit={handleSubmit} handleClick={handleClick} checkName='type' checkId='type' title='Filter by Type' /> 
            }
        </>
    )
}

export default React.memo(FilterbyType)