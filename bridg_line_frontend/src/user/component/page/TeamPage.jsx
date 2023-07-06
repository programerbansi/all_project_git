import React, { useContext, useEffect, useState } from 'react'
import '../../css/TablePage.css'
import UserTable from '../layout/UserTable'
import { useDispatch, useSelector } from 'react-redux'
import {  GET_USER_TEAM_LIST, getDataList, getUserTeamList } from '../../../redux/action/Action'
import { UserValAuthContext } from '../context/UserAuthProvider'
import { getLoggedInUser } from '../../../services/UserLocalStorage'
import BackDrop from '../function/BackDrop'
const TeamPage = () => {
    let load=false;
    const dispatch=useDispatch();
    const val=useContext(UserValAuthContext);
    const user=getLoggedInUser();
    const [loading,setLoading]=useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    useEffect(()=>{
         if(!load){
            setLoading(true);
            dispatch(getDataList(`/user/get-user-team/${user.id}/?page=${currentPage}`,GET_USER_TEAM_LIST,setLoading))
         }
         return () => { load = true }
    },[currentPage])
    const teamPerPageList = useSelector((state) => state.Reducer.teamPerPageList);
    const teamTotalItemCount = useSelector((state) => state.Reducer.teamTotalItemCount);
    const tableArray = [
        {
            id: 1,
            title: "Team",
            header:[{ key: "ID", width: "5%" }, { key: "Name", width: "" }, { key: "Email", width: "" },{ key: "Password", width: "" },{key:"Access",width:""},{ key: "Action", width: "12%" }],  
            data:teamPerPageList,
            totalItem:teamTotalItemCount,
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

export default TeamPage