import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ResumeForm from '../inputs/ResumeForm'
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';

const ResumeTemplate = () => {

  const {pathname} = useLocation();
  const [templateId,setTemplateId] = useState(pathname.split(':').pop())
  
  return (
    <>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-lg-5 col-12 py-3 my-3">
            <ResumeForm />
          </div>
          <div className="col-lg-7 col-12 p-0">
            {templateId == 1 && <Template1/> }
            {templateId == 2 && <Template2/>}
            {templateId == 3 && <Template3/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ResumeTemplate