import { Modal, ModalOverlay, Spinner } from '@chakra-ui/react'
import React from 'react'

const SpinnerComp = () => {
    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    )
    return (
        <>
            <Modal isOpen={true}>
                {<OverlayTwo />}
                <Spinner/>
            </Modal>
        </>
    )
}

export default SpinnerComp
