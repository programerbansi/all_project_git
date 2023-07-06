import React from 'react'

const SelectDropdown = ({name,className,event}) => {
  return (
    <>
      <select className={`form-select ${className}`} name={name} aria-label="Default select example">
        <option selected>select </option>
        <option value={1}>higher secondary school</option>
        <option value={2}></option>
        <option value={3}>Three</option>
      </select>
    </>
  )
}

export default SelectDropdown