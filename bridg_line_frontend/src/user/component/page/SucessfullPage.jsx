import React from 'react'
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from 'react-router';
import { HOME, INVOICE } from '../../../services/UserRoutePath';
const SucessfullPage = () => {
    const navigate=useNavigate()
    return (
        <>

            <div className='container' style={{ minHeight: "100vh" }}>
                <div className='row justify-content-center m-0 align-items-center' style={{ minHeight: "100vh" }}>
                    <div className='col-4'>

                        <div className="card card-success card-outline">
                            <div className="card-body box-profile">
                                <div className="text-center">
                                    <AiOutlineCheckCircle className='fs-130 text-success' />
                                </div>
                                <h3 className="profile-username text-center">Successfull!</h3>
                                <p className="text-muted text-center p-2">We received your invoice request,
                                    we'll be in touch shortly!</p>
                                <a className="btn btn-success btn-block pointer text-white" onClick={()=>{navigate(HOME)}} ><b>Back</b></a>
                            </div>                   
                        </div>

                    </div>

                </div>

            </div>


        </>
    )
}

export default SucessfullPage