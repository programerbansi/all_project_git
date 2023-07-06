import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { DETAIL_PAGE, LIST_PAGE } from '../../../services/UserRoutePath'

const Banner = () => {
    const location = useLocation("")
    const [heading, setHeading] = useState();
    useEffect(() => {
        switch (location.pathname) {
            case DETAIL_PAGE:
                setHeading("DetailPage")
                break;
            case LIST_PAGE:
                setHeading("ListPage")
                break;
            default:
                break;
        }
    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="single-content">
                            <h2>{heading}</h2>              
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner