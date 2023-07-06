import { React, useContext, useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { GET_CATEGORY_LIST, GET_TYPE_LIST, getCategoryList, getDataList, getSubCategoryList, getTypeList } from '../../redux/actions/EcommerceAction';
import { ValAuthContext } from '../context/ValContext';
import { Box } from '@material-ui/core';
import '../css/Search-Select.css';
import { useLocation } from 'react-router-dom';
import { ADVERTISEMENTS, ALL_BRANDS, ALL_CATEGORIES, SUB_CATEGORIES } from '../../services/AdminRoutePath';

const SearchSelectDropdown = ({ obj }) => {
    let props = obj;
    const dispatch = useDispatch();
    const location = useLocation();
    let val = useContext(ValAuthContext);
    const typeList = useSelector((state) => state.EcommerceReducer.typeList);
    const categoryList = useSelector((state) => state.EcommerceReducer.categoryList);
    const subcategoryList = useSelector((state)=>state.EcommerceReducer.subcategoryList);

    const [page, setPage] = useState(0);

    let typeListLoaded = false;
    useEffect(() => {
        if (!typeListLoaded && !props?.options) {
            switch (props.name) {
                case 'Type':
                    dispatch(getDataList(`gettype?page=${page}`,GET_TYPE_LIST, val.setOpenLoader))
                    break;
                case 'category' || 'subcategory':
                    dispatch(getDataList(`getcat?page=${page}`,GET_CATEGORY_LIST, val.setOpenLoader));
                    break;
                default:
                    break;
            }
            // dispatch(getTypeList(page, val.setOpenLoader));
           return(()=>{ typeListLoaded = true;})
        }
    }, [])

    const updatedTypeList = props.name == 'Type' ? typeList.map((type) => ({ label: type.name, value: type.id, name: type.name, ...type })) : categoryList.map((category) => ({ label: category.name, value: category.id, name: category.name, ...category }))

    const colourStyles = {
        menuList: styles => ({
            ...styles,
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            color: isFocused
                ? 'black'
                : isSelected
                    ? 'black'
                    : 'black',
            background: isFocused
                ? 'rgb(245 250 255)'
                : isSelected
                    ? 'white'
                    : undefined,
            zIndex: 1
        }),
        menu: base => ({
            ...base,
            zIndex: 100
        })
    }

    function handleSelect(data) {
        switch (location.pathname) {
            case ADVERTISEMENTS:
                props.setFieldValue(`${props?.name}`, data)
                break;
            case SUB_CATEGORIES:
                props.setFieldValue(`category`, data)
                props.setErrors({ 'category': '' });
                break;
            case ALL_CATEGORIES:
                props.setFieldValue(`Type`, data);
                props.setErrors({ 'Type': '' });
                break;

            default:
                break;
        }
        // if (location.pathname == ADVERTISEMENTS) {
        //     props.setFieldValue(`${props?.name}`, data)
        // }
        // else {
        //     
        //         props.setFieldValue(`Type`, data);
        //         props.setErrors({ 'Type': '' });
        //     
        // }
    }

    return (
        <>
            <div className="mt-3">
                <div className="dropdown-container">
                    {
                        props?.editType ?
                            <Select
                                value={props?.value}
                                options={props?.options || updatedTypeList}
                                // defaultValue={{ label: props?.editType?.name, value: props?.editType?.id }}
                                name={props?.name}
                                placeholder={`${props?.editType?.name || props?.editType}`}
                                onChange={handleSelect}
                                onBlur={props?.handleBlur}
                                isSearchable={true}
                                isMulti={false}
                                styles={colourStyles}
                            /> :
                            <Select
                                value={props?.value}
                                options={props?.options || updatedTypeList}
                                name={props?.name}
                                placeholder={`Select ${props?.name}...`}
                                onChange={handleSelect}
                                onBlur={props?.handleBlur}
                                isSearchable={true}
                                isMulti={false}
                                styles={colourStyles}
                            />
                    }

                </div>
                {props?.error && props?.touch ? (<Box component="div" display="inline" style={{ color: 'red' }}>{props.error}</Box>) : null}
            </div>
        </>
    )
}

export default memo(SearchSelectDropdown)