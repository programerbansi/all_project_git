import React, { useContext, useState } from 'react'
import Select from 'react-select';
import { UserValAuthContext } from '../context/UserAuthProvider';
import classNames from 'classnames';
import '../../css/InputSelectBox.css'
import { AdminValAuthContext } from '../../../admin/context/AdminAuthProvider';
const InputSelectBox = ({opt,name,handleBlur,value,editPlaceholder,placeholder,error,touch,className,setFieldValue}) => {
    const val=useContext(UserValAuthContext);
    const val1=useContext(AdminValAuthContext);
    function handleSelect(data) {
        setFieldValue(`${name}`, data)
        if(name == "status")
        {
            val1?.setSelectStatus(data.value)
        }
      }
    return (
        <>
        <div className='user-select'>
        <Select
                onChange={handleSelect}
                options={opt}
                name={name}
                onBlur={handleBlur}                 
                value={value}
                isSearchable={true}
                isMulti={false}
                placeholder={val?.userAction == 'edit' ? editPlaceholder : placeholder}
                className={classNames(`${className}`, { 'is-invalid': error && touch })}
            />
        </div>
            
        </>
    )
}

export default InputSelectBox