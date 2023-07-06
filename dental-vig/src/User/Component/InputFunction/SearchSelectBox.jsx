import { React, useContext, useState, useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { GET_USER_TYPE_TO_CAT, getCityList, getDatas, getDatasPost, GetUserCattoBrand, GetUserCattoSubCat, GetUserTypetoCat } from '../../../redux/actions/UserEcommerceAction';
import { UserValAuthContext } from '../Context/UserValContext';
const SearchSelectBox = ({ filter, setFilter, option, value, event, event2, select, name, error, touch, setFieldValue, disable }) => {

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
    const val = useContext(UserValAuthContext);
    const dispatch = useDispatch();
    function handleSelect(data) {
        if (name == 'Type') {
            if (data) {
                val.setHidecategory(false)
                dispatch(getDatasPost(`gettype_category/${data.value}`,GET_USER_TYPE_TO_CAT))
                setFieldValue(`Category`, '');
            }
        }
        else if (name == 'Category') {
            if (data) {
                val.setHideSubCategory(false);
                dispatch(GetUserCattoSubCat(data.value))
                setFieldValue('subcategory', '')
            }
        }
        setFieldValue(`${name}`, data)
    }

    function handleFilterAd(data) {
        setFilter(data);
    }
    const category = useSelector((d) => d.UserEcommerceReducer.usertypetocat)
    const subcategoryList = useSelector((state)=>state.UserEcommerceReducer.usercattosubcat);

    const cat_option = category[0];

    const cat_finalop = cat_option?.category?.map((item, index) => {
        return {
            label: item.name, value: item.id
        }
    })

    const subcategory = subcategoryList?.map((item)=>{return {label:item.name,value:item.id}})

    return (
        <>
            <div className="app">
                <div className="dropdown-container">
                    {name == "Category" ? <Select
                        value={value}
                        options={cat_finalop?.length === 0 ? [{ label: "-", value: 0 }] : cat_finalop}
                        name={name}
                        placeholder={`Select ${name}...`}
                        onChange={handleSelect}
                        onBlur={event2}

                        isSearchable={true}
                        isMulti={select}
                        styles={colourStyles}
                        isDisabled={val.hideCategory}
                    /> : name == 'subcategory' ? <Select
                        value={value}
                        options={subcategory?.length === 0 ? [{ label: "-", value: 0 }] : subcategory}
                        name={name}
                        placeholder={`Select ${name}...`}
                        onChange={handleSelect}
                        onBlur={event2}
                        isSearchable={true}
                        isMulti={select}
                        styles={colourStyles}
                        isDisabled={val.hideSubCategory}
                    />  :<Select
                        value={value}
                        options={option}
                        name={name}
                        placeholder={`Select ${name}...`}
                        onChange={name == 'Ad' ? handleFilterAd : handleSelect}
                        onBlur={event2}
                        isSearchable={true}
                        isMulti={select}
                        styles={colourStyles}
                    />}

                </div>
                {error && touch ? (<span className='text-danger'>{error}</span>) : null}
            </div>
        </>
    )
}

export default memo(SearchSelectBox)
