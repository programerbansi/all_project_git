import React from 'react'
import ClassNames from 'classnames';
const InputTextArea = ({className,placeholder,name,error,touch,value,handleBlur, handleChange}) => {
    return (
        <>
            <textarea name={name} rows="4" cols="50" className={ClassNames(className, { 'is-invalid': error && touch })} placeholder={placeholder} value={value} onChange={handleChange} onBlur={handleBlur}/>
        </>
    )
}

export default InputTextArea