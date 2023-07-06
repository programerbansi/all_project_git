import React, { useContext } from 'react'
import { ValAuthContext } from '../context/ValContext'

const TextField = ({ type, placeholder, classname, name, value, setFieldValue }) => {
  const val = useContext(ValAuthContext);

  const handleChange = (value) => {
    setFieldValue(name, value)

    switch (name) {
      case 'skill':
        val.setSkill(value);
        break;
      case 'degree':
        val.setDegree(value)
        break;
      case 'university':
        val.setUniversity(value)
        break;
      case 'work_as':
        val.setWork_as(value)
        break;
      case 'duration':
        val.setDuration(value)
        break;
      case 'company':
        val.setCompany(value)
        break;
      case 'work_detail':
        val.setWork_detail(value)
        break;
      default:
        val.setUserObj({ ...val.userObj, [name]: value })
        break;
    }
    // if(name == 'skill'){val.setSkill(value);}
    // else if(name == 'degree'){val.setDegree(value)}
    // else if(name == 'university'){val.setUniversity(value)}
    // else if(name == 'work_as'){val.setWork_as(value)}
    // else if(name == 'duration'){val.setDuration(value)}
    // else if(name == 'company'){val.setCompany(value)}
    // else if(name == 'work_detail'){val.setWork_detail(value)}
    // else{val.setUserObj({...val.userObj,[name]:value})}
  }

  const handleFileChange = (e) =>{
    setFieldValue(URL.createObjectURL(e.target.files[0])); val.setUserObj({ ...val.userObj, [name]: URL.createObjectURL(e.target.files[0]) })
  }

  return (
    <>
      {
        type == 'file' ?

        <input type={type} name={name} className={`form-control ${classname}`} value={value} id={name} placeholder={placeholder} accept="image/png, image/gif,image/webp,image/jpeg"  onChange={(e) => handleFileChange(e)} /> :

         <input type={type} name={name} className={`form-control ${classname}`} value={value} id={name} placeholder={placeholder} onChange={(e) => handleChange(e.target.value)} />
      }

    </>
  )
}

export default TextField