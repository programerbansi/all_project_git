import React, { useEffect, useState } from 'react';
import '../Styles/User.css';
import { db } from '../Services/firebase';
import {onSnapshot,doc} from 'firebase/firestore'

function User({ user, selectedUser ,user1 , selected}) {
    const [data,setData] = useState({});
    const user2 = user?.uid;
    useEffect(()=>{
        const id = user1>user2 ? `${user1+user2}` : `${user2+user1}`;
        let unsub = onSnapshot(doc(db,'lastMsg',id),(doc)=>{
            setData(doc.data());
        })
        return ()=>unsub();
    },[])
    return (
        <>
            <div className={`row p-0 m-0 user_row justify-content-start align-items-center ${selected.name == user.name ? 'active' : ''}`} onClick={() => selectedUser(user,user.uid)}>
                <div className="col-xl-5 col-sm-6 m-0 p-2 justify-content-center">
                    <div className="image_container">
                        <img src={user.avatar || (require('../Assets/profile2.png'))} alt="photo" className='d-block m-auto' />
                    </div>
                </div>
                <div className="col-xl-2 col-lg-5 p-0 col-sm-6 justify-content-center">
                    <h4 className='user_name m-0'>{user.name}</h4>
                    <small className='last_msg'>{data?.text}</small>
                </div>
                <div className="col-xl-1">
                    {data?.from !== user1 && data?.unread && <small className='unread'>New</small>}
                </div>
                <div className="col-xl-1 col-lg-1 px-2">
                    <div className={`${user.isOnline ? 'online' : 'offline'} circle d-block ms-lg-auto`}></div>
                </div>
            </div>
            <hr/>
        </>
    )
}

export default User