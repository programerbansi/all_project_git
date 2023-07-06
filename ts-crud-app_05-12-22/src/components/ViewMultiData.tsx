import React, { useEffect, useState } from 'react'
import Checkbox from './Checkbox'
import { MultiData } from './model'

interface Props {
  array: MultiData[]
}

const ViewMultiData = ({ array }: Props) => {

  const [selectedRows,setSelectedRows] = useState<string[]>([]);
  const [selected,setSelected] = useState<boolean>(false);

  const handleSingleCheckBox =(e:React.ChangeEvent<HTMLInputElement>):void=>{
    if(selectedRows.includes(e.target.value)) setSelectedRows(selectedRows.filter((r)=>r != e.target.value));
    else setSelectedRows([...selectedRows,e.target.value]);
  }

  useEffect(()=>{
    if(selected)
    {
      let arr:string[] = []
      array.map((r)=>arr.push(String(r.id)))
      setSelectedRows(arr)
    }
    else setSelectedRows([])
  },[selected])

  const handleAllSelect = () =>{
    setSelected(!selected)
  }
  
  return (
    <div className='container mt-3 pt-3'>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th><Checkbox id='select_all'  name='select_all' handleAllSelect={handleAllSelect} checked={selected}/></th>
              <th>id</th>
              <th>title</th>
              <th>date</th>
              <th>destination</th>
              <th>link</th>
              <th>label</th>
            </tr>
          </thead>
          <tbody>
            {
              array && array.map((item)=><tr className='g-3' key={item.id}  style={{backgroundColor:selectedRows.includes(String(item.id))?'#eaf0f7':'white'}}>
                <td><Checkbox checked={selectedRows.includes(String(item.id))?true:false} handleSingleCheckBox={handleSingleCheckBox} id={`${item.id}`} setSelectedRows={setSelectedRows} selectedRows={selectedRows}/></td>
                <td>{item?.id}</td>
                <td>{item?.title}</td>
                <td>{item?.date}</td>
                <td>{item?.destination}</td>
                <td>{item?.link}</td>
                <td>{item?.label.map((label,index)=><span key={index} className={`badge bg-${label.color}`}>{label.value}</span>)}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewMultiData