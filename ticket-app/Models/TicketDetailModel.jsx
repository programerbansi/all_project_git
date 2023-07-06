import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function TicketDetailModel({showTicketDetailModel,setShowTicketDetailModel,detail}) {
    // console.log(detail,"------------detail------------")
    const handleClose=()=>{
        setShowTicketDetailModel(false);
    }
  return (
   <>
      <Modal
      
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showTicketDetailModel}
      onHide={() => handleClose()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='text-dark'>
        Ticket Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='fs-5'>Ticket Name: {detail?.ticket_name}</p>
        <p>
         Ticket Description: {detail?.ticket_description}
        </p>
        <div>
            Images:
        {    detail?.ticket_url?.map((i)=>{
                 return <img src={i} className="mx-2"></img>
            }) 
        }
        </div>
        <p>Assign Users: 
        {    detail?.assigned_users?.map((i)=>{
                 return <li>{i?.value}</li>
            }) 
        }
        </p>
        <p>Project Name: { detail?.key?.label}</p>
        <p>Ticket Status: { detail?.ticket_status?.label}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{handleClose()}} className="px-4">Ok</Button>
      </Modal.Footer>
    </Modal>
   </>
  )
}

export default TicketDetailModel