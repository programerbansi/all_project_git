import React, { memo, useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ValAuthContext } from '../../../admin/context/ValContext';
const EditorField = ({id,name,value,handleChange,error,touch,event2,ref}) => {
  
  const val = useContext(ValAuthContext);
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'link'],
     
    ],
  }
  return (
    <>
      <ReactQuill theme="snow"  
          id={id} 
          ref={ref}
          name={name} 
          onChange={handleChange}
          modules={modules} 
          onBlur={event2} 
          value={value}/>
         {error && touch ?(<span className='text-danger'>{error}</span>): null}
    </>
  )
}

export default memo(EditorField)