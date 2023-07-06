import React from 'react'
import '../../styles/footer.css'

const Footer = () => {
    return (
        <div className='container-fluid mt-3 pt-4 footer-part'>
            <div className="container">
                <div className="row">
                    <div className="col-md-9  col-12">
                        <p className='footer-text'>*The names and logos of the companies referred to above are all trademarks of their respective holders. Unless specifically stated otherwise, such references are not intended to imply any affiliation or association with us.</p>
                    </div>
                    <div className="col-md-3  col-12">
                        <p className='footer-call-text'>Call Us
                            800-985-7561</p>
                    </div>
                </div>
                <div className="row mb-2" style={{ borderBottom: '1px solid gray' }}>
                    <div className="col-lg-8 offset-lg-2 col-md-12">
                        <ul className='d-flex ul'>
                            <a href="#"><li>About | </li></a>
                            <a href="#"><li>Contact | </li></a>
                            <a href="#"><li>Accessibility | </li></a>
                            <a href="#"><li>Terms of Service | </li></a>
                            <a href="#"><li>Privacy Policy </li></a>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <p className='text-start mt-2 pb-2 mb-2'>© 2022 Works Limited. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer