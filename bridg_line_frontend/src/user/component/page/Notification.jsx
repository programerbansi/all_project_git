import React, { useContext, useEffect, useState } from 'react'
import '../../css/TablePage.css'
import UserTable from '../layout/UserTable'
import { useDispatch, useSelector } from 'react-redux'
import {  GET_NOTIFY_USER, getData, getDataWithLoading, getNotifyUser, getUserTeamList } from '../../../redux/action/Action'
import { UserValAuthContext } from '../context/UserAuthProvider'
import { getLoggedInUser } from '../../../services/UserLocalStorage'
import BackDrop from '../function/BackDrop'

const Notification = () => {
    let load=false;
    const dispatch=useDispatch();
    const user=getLoggedInUser();
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
         if(!load){
            setLoading(true);
            dispatch(getDataWithLoading(`/user/get-notify-user/${user.id}`,GET_NOTIFY_USER,setLoading))
         }
         return () => { load = true }
    },[])
    const notify_user = useSelector((state) => state.Reducer.notify_user);
    const tableArray = [
        {
            id: 1,
            title: "Email Notification",
            header:[{ key: "ID", width: "5%" }, { key: "Subject", width: "20%" }, { key: "Body", width: "60%" },{ key: "Action", width: "12%" }],  
            data:notify_user,
        
           
        },
    ]
    return (
        <>
        {loading ? <BackDrop/>:null}
            <div className='main-content'>
                {tableArray && tableArray.map((i, idx) => {
                    return <UserTable id={i.id} title={i.title} header={i.header} data={i.data} key={idx} />
                })}
            </div>
        </>
    )
}

export default Notification