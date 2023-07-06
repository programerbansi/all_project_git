import React from 'react'
import { useEffect } from 'react'
import CheckBoxField from '../InputFunction/CheckBoxField'
import Button from '../InputFunction/Button';
import Lable from '../InputFunction/Lable';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_BRAND, GetUserBrand, getDatas } from '../../../redux/actions/UserEcommerceAction';
import '../../Css/FilterByCategory.css';
import Filterby from './Filterby';
import { useQuery } from 'react-query';

const FilterbyBrand = ({ filterState }) => {
    let props = filterState;
    let brandList = useSelector((state) => state.UserEcommerceReducer.userbrand);
    const dispatch = useDispatch();
    const fetchData = async () => {
        dispatch(getDatas(`getbrand`,GET_USER_BRAND));
    };
    const query = useQuery('brand', fetchData);
    if (query.isLoading) {
        return console.log("Loading..")
    }
    if (query.error) {
        return console.log(query.error.message)
    }
    const handleClick = (item, e) => {
        const checked = e.target.checked;
        if (checked) {
            props.setFilterBrandId([...props.filterBrandId, item.id])
        }
        else {
            props.setFilterBrandId(props.filterBrandId.filter((brandId) => { return brandId !== item?.id }))
        }
    }
    const handleCheckbox = (item, index) => {
        var items = document.getElementsByName('brand');
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'checkbox' && i == index) {
                if (!items[i].checked) {
                    items[i].checked = true;
                    props.setFilterBrandId([...props.filterBrandId, item.id])
                }
                else {
                    items[i].checked = false;
                    props.setFilterBrandId(props.filterBrandId.filter((brandId) => { return brandId !== item?.id }))
                }
            }
        }
    }
    const handleSubmit = () => {
        props.setFilterBrandId([]);
        var items = document.getElementsByName('brand');
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'checkbox')
                items[i].checked = false;
        }
    }
    return (
        <>
            {
                brandList.length > 0 && <Filterby array={brandList} handleCheckbox={handleCheckbox} handleSubmit={handleSubmit} handleClick={handleClick} checkName='brand' checkId='brand' title={'Filter by brand'} />
            }
        </>
    )
}

export default React.memo(FilterbyBrand);