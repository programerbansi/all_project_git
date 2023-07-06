import React from 'react'
import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { ALL_CATEGORIES } from '../app/services/routes'


const PaginationComp = ({currentPage,setCurrentPage,totalPages,router}) => {
  return (
    <div>
      <Pagination style={{marginTop:'20px'}} defaultActivePage={currentPage} totalPages={totalPages} onPageChange={(event,{activePage})=>setCurrentPage(activePage)}/>
    </div>
  )
}

export default PaginationComp
