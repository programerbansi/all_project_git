import React, { useState } from 'react'
import '../../Css/Advertisement.css';
import ContactUsForm from '../Modal/ContactUsForm';

const ContactUs = () => {

  const [show, setShow] = useState(false);

  return (
    <>
      {show && <ContactUsForm show={show} setShow={setShow}/>}
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='contact-us'>
              <div className='contact-us-logo' onClick={()=>setShow(!show)}>
                <i className={`${show ? 'fas fa-times' : 'fas fa-comment'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
