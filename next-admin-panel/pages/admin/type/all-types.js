import { Box, Button, Container, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, useEditable } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../app/header-sidebar/Header'
import Sidebar from '../../../app/header-sidebar/Sidebar'
import { APP_URL, getTypes } from '../../../app/redux/actions/dataAction'
import { danger, primary } from '../../../app/services/variables'
import BreadcrumbComp from '../../../components/BreadcrumbComp'
import { Inter } from '@next/font/google'
import DeletePopover from '../../../app/popovers/DeletePopover'
import AddButton from '../../../components/AddButton'
import PaginationComp from '../../../components/PaginationComp'

const inter = Inter({ subsets: ['latin'] })

const AllTypes = ({ typeList, lastpage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();
    const slice = useSelector((state) => state.dataSlice);

    const [openModel, setOpenModel] = useState(false);
    const [deleteType, setDeleteType] = useState({});
    const [types, setTypes] = useState(typeList);
    const [typeLastPage, setTypeLastPage] = useState(lastpage);
    const [currentPage, setCurrentPage] = useState(1);


    let pageLoaded = false;
    useEffect(() => {
        if (currentPage > 1) { if (!pageLoaded) dispatch(getTypes(currentPage)) }
        return () => pageLoaded = true
    }, [currentPage])

    useEffect(() => {
        if (currentPage > 1 && slice.types.length > 0) setTypes(slice.types)
        else if(currentPage == 1) setTypes(typeList)
    }, [currentPage, slice.types])

    return (
        <>
            <Header onOpen={onOpen} />
            <Sidebar onClose={onClose} isOpen={isOpen} />
            <BreadcrumbComp />
            <DeletePopover isOpen={openModel} setOpenModel={setOpenModel} deleteItem={deleteType} setDeleteItem={setDeleteType} currentPage={currentPage} setCurrentPage={setCurrentPage} setArray={setTypes} array={types} lastPage={typeLastPage} setLastPage={setTypeLastPage} name='type'/>
            <Container maxW='80%' marginTop={'30px'} className={inter.className}>
                <AddButton currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                <TableContainer p={2}>
                    <Table size='sm' variant={'striped'}>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                types && types.map((item) => <Tr key={item.id}>
                                    <Td>{item.name}</Td>
                                    <Td>
                                        <Box py={2} w='100%'>
                                            <Button variant='link'><RiDeleteBinLine color={danger} onClick={() => { setOpenModel(true); setDeleteType(item) }} /></Button>
                                            <Button variant='link'><RiEditLine color={primary} /></Button>
                                        </Box>
                                    </Td>
                                </Tr>)
                            }
                        </Tbody>
                        {
                            typeLastPage > 1 && <Tfoot>
                                <Tr>
                                    <Td>
                                        <PaginationComp currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={typeLastPage} />
                                    </Td>
                                </Tr>
                            </Tfoot>
                        }

                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${APP_URL}gettype?page=1`)
    const types = await res.json();

    return {
        props: { typeList: types.data.data, lastpage: types.data.last_page }
    }
}

export default AllTypes
