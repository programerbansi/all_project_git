import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLoggedInUser } from '../../../../services/LocalStorageUser';
import { MESSAGE } from '../../../../services/UserRoutePath';
import { UserValAuthContext } from '../../Context/UserValContext';
import '../../../Css/Message.css'
import {  deleteConversationSeen } from '../../../../redux/actions/UserEcommerceAction';
import $ from 'jquery';
import { useState } from 'react';
import RemoveAds from '../../Modal/RemoveAds';
import Avatar from '@mui/material/Avatar';
const ConversationsList = ({ item, oldUser, setSelectedUser, selectedUser, pusher, setMessages, setPage, setSelected, setItemUserChat, pusherData, setPusherData ,convFromItem}) => {
    const val = useContext(UserValAuthContext);
    let loggedInUser = getLoggedInUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const [showdelete, setShowdelete] = useState(false);
    const [openRemoveAdModal, setOpenRemoveAdModal] = useState(false);
    let UserMessageList = useSelector((d) => d.UserEcommerceReducer.message_List);
    const handleConversation = (item) => {
        if(!showdelete)
        {
            val?.setSeenMessageClicked(true)
         
            setSelected(true);
            setItemUserChat(false);
           
            if (loggedInUser.id == item?.receiver_id) {
                val.setUserImage(item?.sender.image)
              
                val.setUserName((item?.sender.name));
            }
            else {
                val.setUserImage(item?.receiver.image)
              
                val.setUserName((item?.receiver.name));
            }
            setSelectedUser({ user: loggedInUser.id == item?.receiver_id ? item.sender : item.receiver, convId: item?.id });
            setPage(1);
            navigate(MESSAGE, {
                state: {
                    user: loggedInUser.id == item?.receiver_id ? item?.sender : item?.receiver, id: item?.item_id,
                    conversation_id: item?.id,
                    oldUser: oldUser,
                    prevPath: state?.prevPath,
                    totalMessages: item?.messages?.length,
                    prevItemId: state?.prevItemId,
                    item_status: item?.items?.status,
                    conversationObj:{sender_id:item?.sender_id,receiver_id:item?.receiver_id}
                }
            })
        }
       
    }
    useEffect(() => {
        var timeoutId = 0;

        $(`#${item?.id}`).on('mouseenter', function () {
            timeoutId = setTimeout(()=> {  setShowdelete(true)}, 1000);
        }).on('mouseleave', function () {
            setShowdelete(false)
            clearTimeout(timeoutId);
        });
    }, [item])
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowdelete(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const handeledeleteConve = (item) => {
        setOpenRemoveAdModal(true);
    }

    return (
        
        <div ref={wrapperRef}>
            {
                openRemoveAdModal && <RemoveAds setSelectedUser={setSelectedUser} setShowdelete={setShowdelete} setSelected={setSelected} item_id={item?.id} userid={loggedInUser?.id} action={'removeConv'} openRemoveAdModal={openRemoveAdModal} setOpenRemoveAdModal={setOpenRemoveAdModal} />
            }
            <div key={item?.id} onClick={() => { handleConversation(item) }} style={{ opacity: item?.items?.status == 3 ? 0.6 : 1 }}>
                <li id={item?.id} className={`${item?.id} message-item ${item?.id == (selectedUser?.convId || convFromItem)? 'unread' : ''}`} style={{ cursor: "pointer" }}><a className="message-link">
                    <div className="message-img active" >
                        {
                            loggedInUser?.id == item?.receiver_id ?
                                !item?.sender?.image ?   <Avatar className='avtar ' style={{border: "2px solid transparent"}}>{item?.sender?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{item?.sender?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar> : <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${item?.sender?.image}`} alt="avatar"/>
                                :
                                !item?.receiver?.image ?  <Avatar className='avtar ' style={{border: "2px solid transparent"}}>{item?.receiver?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{item?.receiver?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar> : <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${item?.receiver?.image}`} alt="avatar"/>
                        }
                    </div>
                    <div className="message-text" >
                        {
                            loggedInUser?.id == item?.receiver_id ?
                                <h6 className='mb-0'>                                
                                    {item?.sender?.name}<span>now</span> 
                                </h6>
                                :
                                <h6 className='mb-0'>
                                    {item?.receiver?.name}<span>now</span>
                                </h6>
                        }                      
                        {
                            <p style={{ color: 'rgb(139 139 139)', fontWeight: 600, fontSize: "12px" }}>{item?.items?.name}</p>
                        }                   
                    </div>
                    <div className={`${showdelete ? 'd-block' : 'd-none'} delete-conv-main`}>
                        <button title="Delete message" className="fas fa-trash-alt delete-conv" onClick={() => handeledeleteConve(item)} />
                    </div>                  
                    {
                        val?.msg_notifications && val?.msg_notifications.map((n, index) => {
                            if (n?.conversation_id == item.id) {
                                if (n?.seen == 0) return <span className="message-count" key={index}>{n?.message_count}</span>
                            }
                        })
                    }

                </a></li>
            </div>
        </div>
    )
}

export default React.memo(ConversationsList)