import React from 'react'
import Form from 'react-bootstrap/Form';
function InputTextField(props) {
    const {type,placeholder,label,error,touch,value,name,handleBlur,handleChange}=props;
    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} onChange={handleChange} onBlur={handleBlur} name={name} value={value}/>

            {error && touch ? (<span className='text-danger'>{error}</span>) : null}
        </>
    )
}

export default InputTextField