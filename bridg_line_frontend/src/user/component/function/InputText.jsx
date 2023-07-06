import React from 'react'
import ClassNames from 'classnames';
import { useLocation, useParams } from 'react-router';
import { HOME, INVOICE, INVOICE_VIEW, REPORT } from '../../../services/UserRoutePath'
const InputText = ({type,className,placeholder,name,error,touch,value,handleBlur, handleChange,multi}) => {
    const {pathname}=useLocation();
    const {slug_id} = useParams();
    return (
        <>
        {
            type == 'file' ? 
            (pathname == HOME || pathname == INVOICE || pathname == REPORT || pathname == `/invoice/${slug_id}` || pathname == `/admin/write-invoice-estimate/${slug_id}`) ?  <input type={type} multiple={multi} className={ClassNames(className, { 'is-invalid': error && touch })} placeholder={placeholder} name={name}  onChange={handleChange} onBlur={handleBlur}/> :
            <input type={type} className={ClassNames(className, { 'is-invalid': error && touch })} placeholder={placeholder} name={name}  onChange={handleChange} onBlur={handleBlur}/>
            :
             name == 'postal_code'? <input type={type} className={ClassNames(className, { 'is-invalid': error && touch })} maxLength={5} placeholder={placeholder} name={name} value={value} onChange={handleChange} onBlur={handleBlur}/>: 
             <input type={type} className={ClassNames(className, { 'is-invalid': error && touch })} placeholder={placeholder} name={name} value={value} onChange={handleChange} onBlur={handleBlur}/>
        }
        
      </>
    )
}

export default InputText