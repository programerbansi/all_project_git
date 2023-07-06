import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsDash } from 'react-icons/bs'
import { background_color, black, primary } from '../services/variables'
import styles from '../../styles/Header.module.css'
import { options } from '../services/sidebar_options'
import { useRouter } from 'next/router'

const Sidebar = ({ onClose, isOpen }) => {

    const [defaultIndex, setDefaultIndex] = useState([])

    const router = useRouter();
    useEffect(() => {
        options.map((item, index) => item.option.map((op) => {
            if (op.path == router.pathname) setDefaultIndex([index]);
        }))
    }, [router.pathname])

    return (
        <>
            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Logo</DrawerHeader>
                    <DrawerBody>
                        <Box w='100%'>
                            <Accordion allowMultiple defaultIndex={defaultIndex}>
                                {
                                    options.map((item, index) => <AccordionItem border={'0px'} key={index}>
                                        <h2>
                                            <AccordionButton _expanded={{ bg: background_color, color: black, borderLeft: `3px solid ${primary}` }}>
                                                <Box flex='1' textAlign='left' display={'flex'}>
                                                    {item.icon}
                                                    <h5 className={styles.h5}>{item.name}</h5>
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel>
                                            {
                                                item.option.map((op, index) => <Box display={'flex'} key={index}>
                                                    <Button variant='ghost' display={'flex'} w='100%' justifyContent={'start'} onClick={() => router.push(op.path)}>
                                                        <BsDash />
                                                        <p style={{ marginLeft: '10px' }}>{op.name}</p>
                                                    </Button>
                                                </Box>)
                                            }
                                        </AccordionPanel>
                                    </AccordionItem>)
                                }
                            </Accordion>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sidebar