import React, { useContext } from 'react'
import '../../css/TablePage.css'
import UserTable from '../layout/UserTable'
import { UserValAuthContext } from '../context/UserAuthProvider'
const SearchPage = ({invoicePerPageList}) => {
    const val =useContext(UserValAuthContext)
    const tableArray = [
        {
            id: 1,
            title: "Search Invoice",
            header:[{ key: "ID", width: "5%" }, { key: "Name", width: "" }, { key: "Email", width: "" },{ key: "Main Phone", width: "" }, { key: "Mobile Phone", width: "" }, { key: "Address Line1", width: "" }, { key: "Address Line2", width: "" },{ key: "State", width: "" }, { key: "City", width: "" },{ key: "Postal Code", width: "" }, { key: "Job Type", width: "" },{ key: "Status", width: "" },{ key: "Download", width: "" }],  
            data:val?.searchArray,
        },
    ]

    return (
        <>
            <div className='main-content'>
                {tableArray && tableArray.map((i, idx) => {
                    return <UserTable id={i.id} title={i.title} header={i.header} data={i.data} key={idx} totalItem={1} currentPage={1} setCurrentPage={val?.setCurrentPage}/>
                })}
            </div>
        </>
    )
}

export default SearchPage