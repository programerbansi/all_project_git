import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { DeleteProject, loadProjects } from '../Redux/Action/adminAction';

function DeleteModel({ showDeleteModel, setDeleteShowModel, action, deleteitem }) {
    const dispatch=useDispatch();
    const handleDelete = (item) => {
        if (action == 'project') {
            dispatch(DeleteProject(item.id));
            dispatch(loadProjects());
            setDeleteShowModel(false);
            // console.log(item,"---------delete item model")
        }
    }
    const handleClose = () => {
        setDeleteShowModel(false);
    }
    return (
        <>
            <Modal
                show={showDeleteModel}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                       {action == 'project' ?'Delete Project':'Delete'} 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-2 text-center">
                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{ width: 100, height: 100 }} />
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you Sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-secondary'onClick={() => { handleClose() }}>Close</Button>
                    <Button className='btn btn-danger'onClick={() => { handleDelete(deleteitem) }}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModel