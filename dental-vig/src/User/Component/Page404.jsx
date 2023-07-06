import React from 'react'
import { NavLink } from 'react-router-dom'

const Page404 = () => {
    return (
        <>
            <section className="error-part">
                <div className="container">
                    <div className="error">
                        <h1>404</h1>
                        <h2>Oops! Something Went Wrong?</h2><NavLink to={'/'} className="btn btn-outline"><i className="fas fa-home" /><span>go to homepage</span></NavLink>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Page404