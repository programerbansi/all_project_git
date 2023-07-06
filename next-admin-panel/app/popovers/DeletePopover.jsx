import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { OverlayTwo } from '../../components/Dialogue'
import { deleteBrand, deleteCategory, deleteType } from '../redux/actions/dataAction'
import { danger, gray } from '../services/variables'

const DeletePopover = ({ isOpen, setOpenModel ,deleteItem,setDeleteItem,setArray,array,currentPage,setCurrentPage,setLastPage,lastPage,name}) => {
    const dispatch = useDispatch();
    const handleDelete =() =>{
            if(array.length < 2){setCurrentPage(currentPage-1);setLastPage(lastPage-1)}
            else if(array.length > 1) setArray(array.filter((item)=>item.id != deleteItem.id))
            
            switch (name) {
                case 'brand':
                    dispatch(deleteBrand(deleteItem.id))
                    break;
                case 'category':
                    dispatch(deleteCategory(deleteItem.id))
                    break;
                case 'type':
                    dispatch(deleteType(deleteItem.id))
                    break;
                default:
                    break;
            } 
            setDeleteItem({});
            setOpenModel(false);
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setOpenModel(false)} isCentered closeOnOverlayClick={false}>
                {<OverlayTwo />}
                <ModalContent>
                    <ModalHeader>Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='normal' mb='1rem'>
                            Are you sure you want to delete ?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' color={gray} mr={3} onClick={() => setOpenModel(false)}>
                            Close
                        </Button>
                        <Button variant='ghost' color={danger} onClick={()=>handleDelete()}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeletePopover
