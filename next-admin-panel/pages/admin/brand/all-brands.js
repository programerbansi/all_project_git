import { Box, Button, Container, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../app/header-sidebar/Header';
import Sidebar from '../../../app/header-sidebar/Sidebar';
import { APP_URL, getBrands } from '../../../app/redux/actions/dataAction';
import { danger, primary } from '../../../app/services/variables';
import BreadcrumbComp from '../../../components/BreadcrumbComp';
import { Inter } from '@next/font/google'
import DeletePopover from '../../../app/popovers/DeletePopover';
import AddButton from '../../../components/AddButton';
import Dialogue from '../../../components/Dialogue';
import PaginationComp from '../../../components/PaginationComp';

const inter = Inter({ subsets: ['latin'] })

const AllBrands = ({ brandList, lastpage }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const slice = useSelector((state) => state.dataSlice);

    const [brands, setBrands] = useState(brandList);
    const [brandLastPage, setBrandLastPage] = useState(lastpage);
    const [openModel, setOpenModel] = useState(false);
    const [deleteBrand, setDeleteBrand] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    let pageLoaded = false;
    useEffect(() => {
        if (currentPage > 1) { if (!pageLoaded) { dispatch(getBrands(currentPage)) } }
        return () => pageLoaded = true;
    }, [currentPage, pageLoaded])

    useEffect(() => {
        if (currentPage > 1 && slice.brands.length > 0) { setBrands(slice.brands); setBrandLastPage(slice.brandlastpage) }
        else setBrands(brandList)
    }, [currentPage, slice.brands])

    return (
        <>
            <Header onOpen={onOpen} />
            <Sidebar onClose={onClose} isOpen={isOpen} />
            <BreadcrumbComp />
            <DeletePopover isOpen={openModel} setOpenModel={setOpenModel} deleteItem={deleteBrand} setDeleteItem={setDeleteBrand} currentPage={currentPage} setCurrentPage={setCurrentPage} name='brand'/>
            <Container maxW='80%' marginTop={'30px'} className={inter.className}>
                <AddButton />
                <TableContainer p={2}>
                    <Table size='sm' variant={'striped'}>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Logo</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                brands && brands.map((item) => <Tr key={item.id}>
                                    <Td>{item.name}</Td>
                                    <Td>
                                        <img src={`${process.env.NEXT_PUBLIC_BRAND_IMAGE_URL}${item.image}`} />
                                    </Td>
                                    <Td>
                                        <Box w={'100%'} py={2}>
                                            <Button variant='link'><RiDeleteBinLine color={danger} onClick={() => { setOpenModel(true); setDeleteBrand(item) }} /></Button>
                                            <Button variant='link'><RiEditLine color={primary} /></Button>
                                        </Box>
                                    </Td>
                                </Tr>)
                            }
                        </Tbody>
                        {
                            brandLastPage > 1 && <Tfoot>
                                <Tr>
                                    <Td>
                                        <PaginationComp currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={brandLastPage} />
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
    const resBrand = await fetch(`${APP_URL}getbrand?page=1`)
    const brands = await resBrand.json()

    return {
        props: { brandList: brands.data.data, lastpage: brands.data.last_page }
    }
}

export default AllBrands