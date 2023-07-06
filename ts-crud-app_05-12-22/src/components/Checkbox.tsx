import React from 'react'

interface Props{
    id:string,
    selectedRows?:string[],
    setSelectedRows?:React.Dispatch<React.SetStateAction<string[]>>,
    handleSingleCheckBox?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    handleAllSelect?:()=>void
    name?:string,
    selected?:boolean,
    checked?:boolean
}

const Checkbox:React.FC<Props> = ({id,handleSingleCheckBox,handleAllSelect,name,selectedRows,selected,checked}) => {
  return (
    <input type="checkbox" checked={checked} id={id} value={id} onChange={name ? handleAllSelect: handleSingleCheckBox}/>
  )
}

export default Checkbox