import ClassNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../css/InputEditor.css'
const InputEditor = ({ id, name, value, handleChange, error, touch, event2 }) => {

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'link'],
    ],
  }
  
  return (
    <>
      <ReactQuill theme="snow"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        modules={modules}
        onBlur={event2}
        className={ClassNames({ 'is-invalid': error && touch })}
      />
      {/* {error && touch ?(<span className='text-danger'>{error}</span>): null} */}
    </>
  )
}

export default InputEditor