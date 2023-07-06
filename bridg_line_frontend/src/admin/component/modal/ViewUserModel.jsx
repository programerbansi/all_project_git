import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { AdminValAuthContext } from '../../context/AdminAuthProvider';
import { ADD_USER, deleteUser } from '../../../redux/action/AdminAction';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputButtonLoad from '../../../user/component/function/InputButtonLoad';
import InputButton from '../../../user/component/function/InputButton';
import { ADMIN_USER } from '../../../services/AdminRoutePath';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';

const ViewUserModel = ({ heading }) => {

    const val = useContext(AdminValAuthContext)
    let itemArray = [{ key: "Company name", val: val?.viewItem.comp_name }, { key: "Name", val: `${val?.viewItem.firstname} ${val?.viewItem.lastname}` }, { key: "Email", val: val?.viewItem.email }, { key: "Password", val: val?.viewItem.visible_password }, { key: "Phone", val: val?.viewItem.phone }, { key: "Company address", val: val?.viewItem.comp_address }, { key: "Company website", val: val?.viewItem.comp_website },
    ]
    const handleClose = () => {
        val?.setShowViewModal(false);
        val?.setAction('');
    }
    const downloadPDF = () => {
        fetch(`${process.env.REACT_APP_COMPANY_IMAGE_URL}/${val?.viewItem?.comp_logo}`).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `logo_${val?.viewItem?.comp_logo}`;
                alink.click();
            })
        })
    }
    return (
        <>
            <Modal
                show={val?.showViewModal}
                onHide={() => { handleClose() }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className='py-2'>
                    <Modal.Title id="contained-modal-title-vcenter fs-5">
                        View {heading}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card card-primary shadow-none border-0">
                        <div className="card-body p-0">
                            <div className='row'>
                                {itemArray && itemArray.map((i, idx) => {
                                    return <div className="col-12 col-md-6 py-1" key={idx}>
                                        <strong>{i.key}</strong>
                                        {i.key == 'Email' ? <p className="text-muted m-0 p-0 ">
                                            {i.val ? i.val : "-"}
                                        </p> : <p className="text-muted m-0 p-0 qcont">
                                            {i.val ? i.val : "-"}
                                        </p>}
                                    </div>
                                })}
                            </div>
                            <strong className='d-block'>Company Logo</strong>
                            <div className='d-flex'>
                                <img src={`${process.env.REACT_APP_COMPANY_IMAGE_URL}/${val?.viewItem?.comp_logo}`} alt="image" className='' style={{ height: "50px", width: "100px", objectFit: "contain" }} />
                                <InputButton tooltipName="Download" className="btn bg-transparent border-0 p-0 ms-3" icon={<BsFillArrowDownCircleFill className='download-icon fs-3 text-blue' />} event={() => { downloadPDF() }} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <InputButton name={`Close`} className='btn btn-outline-secondary' event={() => { handleClose() }} />
                    <InputButton name={`Ok`} className='btn btn-blue' event={() => { handleClose() }} />
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewUserModel