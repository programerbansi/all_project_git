import { Box, Button, Container, Grid, GridItem, Spinner, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../app/header-sidebar/Header'
import Sidebar from '../../../app/header-sidebar/Sidebar'
import { APP_URL, getCategories } from '../../../app/redux/actions/dataAction'
import { Inter } from '@next/font/google'
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri'
import { danger, primary } from '../../../app/services/variables'
import DeletePopover from '../../../app/popovers/DeletePopover'
import BreadcrumbComp from '../../../components/BreadcrumbComp'
import SpinnerComp from '../../../components/SpinnerComp'
import AddButton from '../../../components/AddButton'
import Dialogue from '../../../components/Dialogue'
import 'semantic-ui-css/semantic.min.css'
import PaginationComp from '../../../components/PaginationComp'

const inter = Inter({ subsets: ['latin'] })

const AllCategories = ({ categoryList, types, lastpage }) => {


  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [openModel, setOpenModel] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({});
  const [categories, setCategories] = useState(categoryList);
  const [categoryLastPage, setCategoryLastPage] = useState(lastpage);

  const slice = useSelector((state) => state.dataSlice);
  
  const dispatch = useDispatch();

  let pageLoaded = false;
  useEffect(()=>{
    if(currentPage > 1){if(!pageLoaded) dispatch(getCategories(currentPage))}
    return ()=>pageLoaded = true
  },[currentPage,pageLoaded])

  useEffect(()=>{
    if(currentPage>1 && slice.categories.length > 0) {setCategories(slice.categories);setCategoryLastPage(slice.categorylastpage)}
    else if(currentPage == 1 ) setCategories(categoryList)
  },[currentPage,slice.categories])

  return (
    <>
      <Header onOpen={onOpen} />
      <Sidebar onClose={onClose} isOpen={isOpen} />
      <BreadcrumbComp />
      <DeletePopover isOpen={openModel} setOpenModel={setOpenModel} deleteItem={deleteCategory} setDeleteItem={setDeleteCategory} setArray={setCategories} array={categories} currentPage={currentPage} setCurrentPage={setCurrentPage} setLastPage={setCategoryLastPage} lastPage={categoryLastPage} name='category'/>
      <Container maxW='80%' marginTop={'30px'} className={inter.className}>
        <AddButton types={types} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        {
          categories && <TableContainer p={2}>
            <Table size='sm' variant='striped' >
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  categories.map((item) => <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{item.type}</Td>
                    <Td>
                      <Box w='100%' p={2}>
                        <Button variant='link' onClick={() => { setOpenModel(true); setDeleteCategory(item) }}><RiDeleteBinLine color={danger} /></Button>
                        <Button variant='link'><RiEditLine color={primary} /></Button>
                      </Box>
                    </Td>
                  </Tr>)
                }
              </Tbody>
              {
                categoryLastPage > 1 && <Tfoot>
                <Tr justifyContent={'end'}>
                  <Td>
                    <PaginationComp router={router} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={categoryLastPage} />
                  </Td>
                </Tr>
              </Tfoot>
              }
              
            </Table>
          </TableContainer>
        }

      </Container>
    </>
  )
}

export async function getServerSideProps({query}) {
  const res = await fetch(`${APP_URL}gettype?page=0`)
  const types = await res.json()

  const resCat = await fetch(`${APP_URL}getcat?page=${1}`)
  const categories = await resCat.json();

  return {
    props: {
      types: types.data, categoryList: categories.data.data, lastpage: categories.data.last_page
    }
  }
}

export default AllCategories