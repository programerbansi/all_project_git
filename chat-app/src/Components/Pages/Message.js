import React, { useEffect, useRef, useState } from 'react';
import Moment from 'react-moment';
import '../Styles/Message.css';
import { db } from '../Services/firebase';
import { onSnapshot, doc } from 'firebase/firestore'

function Message({ msg, user1,msgData}) {
    console.log(msgData,'...msgData..')
    const [data, setData] = useState([]);    
    const user2 = msg.to;

    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        let unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
            setData(doc.data());
        })
        return () => unsub();
    }, [msg]);
    return (

        <div className='row h-100 m-0' ref={scrollRef}>
            <div className={`msg_wrapper col-2 mt-3 ${msg.from === user1 ? 'own' : 'friend'}`}>
                <h5 className='mb-0 d-block w-auto'>
                    {msg.media ?<img src={msg.media} alt={msg.text} className='w-100' /> : null}
                    {msg.text}
                    <br />
                </h5>
                <small className='d-flex justify-content-between'>
                    <>
                        <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                        {
                           ((data !== undefined && data.text === msg.text ) ? ((data.unread && data.from === user1  ? <small className='check-white'>✓</small> : <small className='check-green'>✓✓</small>)) : 
                            (msg.from === user1 && data !== undefined ? <small className='check-green'>✓✓</small> : null))                  
                        }
                    </>
                </small>
            </div>
        </div>
    )
}

export default Message