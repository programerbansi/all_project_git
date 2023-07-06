import React, { useContext, useEffect, useState } from 'react'
import '../../css/TablePage.css'
import UserTable from '../layout/UserTable'
import { useDispatch, useSelector } from 'react-redux'
import {  GET_USER_CARDLIST, getDataList, getUserCardList, getUserTeamList } from '../../../redux/action/Action'
import { UserValAuthContext } from '../context/UserAuthProvider'
import { getLoggedInUser } from '../../../services/UserLocalStorage'
import BackDrop from '../function/BackDrop'

const CardPage = () => {
    let load=false;
    const dispatch=useDispatch();
    const val=useContext(UserValAuthContext);
    const user=getLoggedInUser();
    const [loading,setLoading]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    useEffect(()=>{
         if(!load){
            setLoading(true);
            dispatch(getDataList(`/user/get-user-card/${user.id}/?page=${currentPage}`,GET_USER_CARDLIST,setLoading))
         }
         return () => { load = true }
    },[currentPage])
    const cardPerPageList = useSelector((state) => state.Reducer.cardPerPageList);
    const cardTotalItemCount = useSelector((state) => state.Reducer.cardTotalItemCount);
    const tableArray = [
        {
            id: 1,
            title: "Card",
            header:[{ key: "Card Detail", width: "" }, { key: "Action", width: "12%" }],  
            data:cardPerPageList,
            totalItem:cardTotalItemCount,
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

export default CardPage