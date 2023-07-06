import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router';
import { HOME } from '../../../services/UserRoutePath';
const CanclePage = () => {
    const navigate=useNavigate()
    return (
        <div className='container' style={{ minHeight: "100vh" }}>
            <div className='row justify-content-center m-0 align-items-center' style={{ minHeight: "100vh" }}>
                <div className='col-4'>

                    <div className="card card-danger card-outline">
                        <div className="card-body box-profile">
                            <div className="text-center">
                                <RxCrossCircled className='fs-130 text-danger' />
                            </div>
                            <h3 className="profile-username text-center">Cancle!</h3>
                            <p className="text-muted text-center p-2">We don't receive your purchase request,
                                Please try agin later!</p>

                            <a className="btn btn-danger btn-block pointer text-white" onClick={() => { navigate(HOME) }} ><b>Back</b></a>
                        </div>
                    </div>

                </div>

            </div>

        </div>


    )
}

export default CanclePage