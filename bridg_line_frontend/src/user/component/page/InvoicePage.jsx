import React, { useContext, useEffect, useState } from 'react'
import '../../css/TablePage.css'
import UserTable from '../layout/UserTable'
import { useDispatch, useSelector } from 'react-redux'
import { GET_INVOICE_LIST, getDataList, getInvoiceList } from '../../../redux/action/Action'
import { UserValAuthContext } from '../context/UserAuthProvider'
import { getLoggedInUser } from '../../../services/UserLocalStorage'
import BackDrop from '../function/BackDrop'
const InvoicePage = () => {
    let load=false;
    const dispatch=useDispatch();

    const user=getLoggedInUser();
    const [loading,setLoading]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    useEffect(()=>{
         if(!load){
            setLoading(true);
            dispatch(getDataList(`/user/get-invoice/${user.id}/?page=${currentPage}`,GET_INVOICE_LIST,setLoading))
         }
         return () => { load = true }
    },[currentPage])
    const invoicePerPageList = useSelector((state) => state.Reducer.invoicePerPageList);
    const invoiceTotalItemCount = useSelector((state) => state.Reducer.invoiceTotalItemCount);
    const tableArray = [
        {
            id: 1,
            title: "Invoice",
            header:[{ key: "ID", width: "5%" }, { key: "Name", width: "" },{ key: "Status", width: "" },{ key: "Job Type", width: "" },{ key: "Action", width: "12%" }],  
            data:invoicePerPageList,
            totalItem:invoiceTotalItemCount,
            currentPage:currentPage,
            setCurrentPage:setCurrentPage,
        },
    ]
    return (
        <>
        {loading ? <BackDrop/>:null}
            <div className='main-content'>
                {tableArray && tableArray.map((i, idx) => {
                    return <UserTable id={i.id} title={i.title} header={i.header} data={i.data} key={idx} totalItem={i.totalItem} currentPage={i.currentPage} setCurrentPage={i.setCurrentPage}/>
                })}
            </div>
        </>
    )
}

export default InvoicePage