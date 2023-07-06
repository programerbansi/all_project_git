import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import "../../css/BackDrop.css"
const BackDrop = () => {
    return (
        <>
            <div className='back-drop'/>
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            {/* <Spinner animation="border" className='loader-center'></Spinner> */}
            
        </>
    )
}

export default BackDrop