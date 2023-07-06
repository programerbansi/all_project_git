import React from 'react'
import { Container, Grid, GridItem,Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import {  HamburgerIcon } from '@chakra-ui/icons';
import {MdModeEditOutline} from 'react-icons/md';
import { CgProfile } from 'react-icons/cg'
import {BiLogOutCircle} from 'react-icons/bi'
import styles from '../../styles/Header.module.css'
import { danger, primary } from '../services/variables';
import { white } from '../services/variables';

const Header = ({ onOpen }) => {
    return (
        <>
            <Container maxW='100%' bg={primary} color='#262626'>
                <Grid templateColumns='repeat(5, 1fr)' p={4} gap={4}>
                    <GridItem colSpan={2} h='10'><HamburgerIcon color={white} boxSize={6} marginTop={'8px'} onClick={onOpen} cursor='pointer' /></GridItem>
                    <GridItem colStart={4} colEnd={6} h='10'>
                        <Menu>
                            <MenuButton display={'block'} marginLeft={'auto'} marginTop={'8px'} fontSize='20px'><CgProfile color={white}/></MenuButton>
                            <MenuList>
                                <MenuItem minH='48px'>
                                    <MdModeEditOutline color={primary}/>
                                    <span className={styles.span}>Edit Profile</span>
                                </MenuItem>
                                <MenuItem minH='40px'>
                                    <BiLogOutCircle color={danger}/>
                                    <span className={styles.span} >Log Out</span>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </GridItem>
                </Grid>
            </Container>
        </>
    )
}

export default Header