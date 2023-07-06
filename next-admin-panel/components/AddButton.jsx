import { Button, Grid, GridItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ALL_BRANDS, ALL_CATEGORIES } from '../app/services/routes';
import { primary } from '../app/services/variables';
import Dialogue from './Dialogue';

const AddButton = ({types,currentPage,setCurrentPage}) => {
    const [openDialogue, setOpenDialogue] = useState(false);

    const { pathname } = useRouter();

    return (
        <>
            <Dialogue types={types} isOpen={openDialogue} setOpenDialogue={setOpenDialogue} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <Grid templateColumns='repeat(1, 1fr)' gap={4} mb={3} pb={3}>
                <GridItem colStart={4} colEnd={6} h='10'>
                    <Button color={primary} variant='outline' display={'block'} marginLeft='auto' onClick={() => setOpenDialogue(true)}>
                        Add {pathname.split('/').at(-2)}
                    </Button>
                </GridItem>
            </Grid>
        </>
    )
}

export default AddButton
