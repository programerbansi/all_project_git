import React from 'react'
import {NavLink } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <div>
                <footer className="footer-part">
                    <div className="container">                    
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="footer-card-content" style={{border:'none'}}>
                                    <div className="footer-payment"><a href="#"><img src="images/pay-card/01.jpg" alt={""} /></a><a href="#"><img src="images/pay-card/02.jpg" alt={""} /></a><a href="#"><img src="images/pay-card/03.jpg" alt={""} /></a><a href="#"><img src="images/pay-card/04.jpg" alt={""} /></a></div>
                                    <div className="footer-option"><button type="button" data-toggle="modal" data-target="#language"><i className="fas fa-globe" />English</button><button type="button" data-toggle="modal" data-target="#currency"><i className="fas fa-dollar-sign" />USD</button></div>
                                    <div className="footer-app"><a href="#"><img src="images/play-store.png" alt="play-store" /></a><a href="#"><img src="images/app-store.png" alt="app-store" /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-end">
                        <div className="container">
                            <div className="footer-end-content">
                                <p>All Copyrights Reserved © 2021 - Developed by <a href="https://cuotainfotech.com/"  target="_blank" rel="noopener noreferrer">Cuotainfotech</a></p>
                                <ul className="footer-social">
                                    <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                                    <li><a href="#"><i className="fab fa-twitter" /></a></li>
                                    <li><a href="#"><i className="fab fa-linkedin-in" /></a></li>
                                    <li><a href="#"><i className="fab fa-google-plus-g" /></a></li>
                                    <li><a href="#"><i className="fab fa-youtube" /></a></li>
                                    <li><a href="#"><i className="fab fa-pinterest-p" /></a></li>
                                    <li><a href="#"><i className="fab fa-instagram" /></a></li>
                                    <li><a href="#"><i className="fab fa-dribbble" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
                <div className="modal fade" id="currency">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>Choose a Currency</h4><button className="fas fa-times" data-dismiss="modal" />
                            </div>
                            <div className="modal-body"><button className="modal-link active">United States Doller (USD) - $</button><button className="modal-link">Euro (EUR) - €</button><button className="modal-link">British Pound (GBP) -
                                £</button><button className="modal-link">Australian Dollar (AUD) - A$</button><button className="modal-link">Canadian Dollar (CAD) - C$</button></div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="language">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>Choose a Language</h4><button className="fas fa-times" data-dismiss="modal" />
                            </div>
                            <div className="modal-body"><button className="modal-link active">English</button><button className="modal-link">bangali</button><button className="modal-link">arabic</button><button className="modal-link">germany</button><button className="modal-link">spanish</button></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer