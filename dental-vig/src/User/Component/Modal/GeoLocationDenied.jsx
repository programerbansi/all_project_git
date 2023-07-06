import React, { useContext, useEffect } from 'react'
import { userDeleteProduct } from '../../../redux/actions/UserEcommerceAction';
import { useDispatch } from 'react-redux'
import $ from 'jquery';
import { Modal } from 'react-bootstrap';
import { UserValAuthContext } from '../Context/UserValContext';
const GeoLocationDenied = ({ setOpenRemoveAdModal, openRemoveAdModal }) => {

    const valContext = useContext(UserValAuthContext);
    const handleCloseModal = () => {
        setOpenRemoveAdModal(false);
        valContext?.setGeoLocationModel(false);
        valContext?.setDependentLocationState();
    }
    return (
        <>
            <Modal show={openRemoveAdModal} backdrop="static" keyboard={false} centered>
                <Modal.Header>
                    <Modal.Title>
                        <h3>Geolocation is blocked</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>Looks like your geolocation permissions are blocked. Please, provide geolocation access in your browser settings.</h6>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={handleCloseModal}>OK</button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default React.memo(GeoLocationDenied)