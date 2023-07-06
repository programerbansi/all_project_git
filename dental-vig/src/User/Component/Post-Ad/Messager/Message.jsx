import React, { useContext, useState, useEffect, useRef, useMemo } from 'react'
import Pusher from 'pusher-js'
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_MESSAGE_LIST, getCoversationList, getDatasPost, getUserConversation, seenMessages, setMessageNotificationSeen } from '../../../../redux/actions/UserEcommerceAction';
import '../../../Css/Message.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../../../services/LocalStorageUser';
import UserChat from './UserChat';
import ConversationList from './ConversationList';
import { UserValAuthContext } from '../../Context/UserValContext';
import { PUSHER_KEY, USER_MESSAGE_LIST } from '../../../../services/UserRoutePath';
import AddPostTabs from '../AddPostTabs';
import usePusher from '../../CustomeHook/usePusher';
import Button from '../../InputFunction/Button';
import Avatar from '@mui/material/Avatar';
const Message = () => {

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])
    
    const val = useContext(UserValAuthContext);
    const { state } = useLocation();

    const loggedInUser = getLoggedInUser();
    const [messages, setMessages] = useState([]);
    const [pusherData, setPusherData] = useState();
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState();
    const [selectedUser, setSelectedUser] = useState(state?.oldUser);
    const [loading, setLoading] = useState(false);
    const [itemUserChat, setItemUserChat] = useState(false);
    const [prevMessageList, setPrevMessageList] = useState([]);
    const [messageAdded, setMessageAdded] = useState(false);
    const [selected, setSelected] = useState(state && state?.prevPath == USER_MESSAGE_LIST ? false : true);
    const dispatch = useDispatch();
    let UserMessageList = useSelector((d) => d.UserEcommerceReducer.message_List);
    let conversation_id = useSelector((d) => d.UserEcommerceReducer.conversation_id);
    let conversation = useSelector((d) => d.UserEcommerceReducer.conversation);

    let pageLoaded = false;
    let userMessagelistId = UserMessageList && UserMessageList?.filter((item) => {
        return item?.item_id == state?.id
    })
    
    let convFromItem  = userMessagelistId && userMessagelistId?.filter((u)=>u.item_id == state?.id).find((u)=>{
        if((loggedInUser?.id == u?.sender_id) || (loggedInUser?.id == u?.receiver_id))
        {
            return u
        }
    })
    
    const { msgpusherData, deleteMessagePusherData } = usePusher();
    const navigate = useNavigate();
    useEffect(() => { setMessageAdded(true) }, [selectedUser])
    let n = false;

    useEffect(() => {
        if (!pageLoaded) {
          
            let s_ = prevMessageList.some((m) => m.conv_id == state?.conversation_id);
            if (s_ == false) dispatch(getDatasPost(`user/get_all_messages`,GET_USER_MESSAGE_LIST))
            
            if (selected) {
                
                    if (s_ == false || messageAdded) {
                        if(convFromItem && !state?.conversation_id)
                        {
                            setSelectedUser({ user: loggedInUser.id == convFromItem?.receiver_id ? convFromItem.sender : convFromItem.receiver, convId: convFromItem?.id });
                            val?.setSeenMessageClicked(true);
                                  }
                             dispatch(getUserConversation(!state?.conversation_id ? (conversation_id || pusherData?.message?.conversation_id || convFromItem?.id) : state?.conversation_id, page, setTotalResult, setMessages, messages, setPage, setLoading));
                        
                    }
                    else {
                        setTotalResult(state?.totalMessages)
                        prevMessageList.map((m) => { if (m.conv_id == state?.conversation_id) { setMessages(m.chat) } })
                    }
               
            }
           
        }
        return()=>{
             pageLoaded = true;
             convFromItem = {};
        }
    }, [dispatch,pageLoaded, selected, state?.conversation_id,convFromItem?.id])

    useEffect(() => {
        if (messages.length > 0 && prevMessageList?.length > 0 && prevMessageList.some((p) => p.conv_id == messages[messages.length - 1]?.conversation_id)) {
            const newState = prevMessageList.map(obj => {
               
                if (obj?.conv_id == messages[messages.length - 1]?.conversation_id) {
                    return { ...obj, chat: messages };
                }
              
                return obj;
            });
            setPrevMessageList(newState);
        }
        else if (messages.length > 0) {
            setPrevMessageList([...prevMessageList, { conv_id: messages[messages.length - 1]?.conversation_id, chat: messages }])
        }
    }, [messages, selected])

    const scrollToBottom = () => {
        var objDiv = document.getElementById("inbox-chat-list");
        if (objDiv) objDiv.scrollTop = objDiv.scrollHeight;
    }

    useEffect(() => {
        if (msgpusherData?.message?.coversation_id == conversation_id || state?.conversation_id) {
           
            if (msgpusherData?.message?.s_id !== loggedInUser?.id) {
                setMessages((messages) => [...messages, msgpusherData?.message])
                setTimeout(() => { scrollToBottom() }, 200)
            }
           
        }
    }, [msgpusherData])

    useEffect(() => {
        if (deleteMessagePusherData?.data?.s_id !== loggedInUser?.id) {
            setMessages((messages) => messages.filter((m) => m?.id !== deleteMessagePusherData?.data?.id))
        }
    }, [deleteMessagePusherData])

    const handleOldUserConversation = () => {
        setSelected(true);
        setItemUserChat(true);
        val.setUserImage(state.oldUser?.image)
       
        val.setUserName((state.oldUser?.name));
        dispatch(getDatasPost(`user/get_all_messages`,GET_USER_MESSAGE_LIST))
        setMessages([]);
        setPage(1);
    }
    const renderChat = () => {
        return <UserChat user={itemUserChat === true ? { user: state?.oldUser, id: state?.id, conversation_id: pusherData?.message?.conversation_id } : state} messages={messages} conversationObj={state?.conversationObj}
            setMessages={setMessages} pusherData={pusherData} setPusherData={setPusherData} page={page} setPage={setPage} totalResult={totalResult} setTotalResult={setTotalResult} scrollToBottom={scrollToBottom} loading={loading} setLoading={setLoading} selected={selected} setSelected={setSelected} itemUserChat={itemUserChat} setItemUserChat={setItemUserChat} conversation_id={state?.conversation_id ? state?.conversation_id : conversation_id} setPrevMessageList={setPrevMessageList} setMessageAdded={setMessageAdded} UserMessageList={UserMessageList} selectedUser={selectedUser} pusher={state?.pusher}  convFromItem={convFromItem?.id}/>
    }

    let arr1Length = UserMessageList && UserMessageList.filter((item) => (loggedInUser?.id == item?.sender_id) && item?.s_delete == 0)?.length
    let arr2Length = UserMessageList && UserMessageList.filter((item) => (loggedInUser?.id == item?.receiver_id) && item?.r_delete == 0)?.length

    useEffect(() => {
        if (!n) {
            if (state?.msg_notifications?.length > 0) {
                dispatch(getDatasPost(`user/get_all_messages`,GET_USER_MESSAGE_LIST))
            }
        }
    }, [state?.msg_notifications])
    const handleClick = () => {
        navigate("/");
    }
    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            {state && state?.prevPath == USER_MESSAGE_LIST ? <AddPostTabs /> : null}
            {
                state?.prevPath == USER_MESSAGE_LIST ? UserMessageList?.length > 0 &&
                    <section className="message-part message-part-height">
                        <div className="container">
                            <div className="row">
                                <div className={`col-lg-5 col-xl-4 ${selected ? 'message-none' : ''}`}>
                                    <div className="message-filter h-100">
                                      
                                        <form className="message-filter-src"><input type="text" placeholder="Search for Username" />
                                        </form>

                                        <ul className="message-list" >
                                             {(arr2Length + arr1Length > 0) ?
                                                UserMessageList.length > 0 && UserMessageList?.map((item, index) => {

                                                    if ((loggedInUser?.id == item?.sender_id) && item?.s_delete == 0) {
                                                        return <ConversationList item={item} key={index} oldUser={state?.oldUser} setMessages={setMessages} setSelectedUser={setSelectedUser} selectedUser={selectedUser} setPage={setPage} setSelected={setSelected} setItemUserChat={setItemUserChat} pusherData={pusherData} setPusherData={setPusherData} msg_notify_convid={state?.msg_notifications} pusher={state?.pusher} convFromItem={convFromItem?.id}/>
                                                    }
                                                    else if ((loggedInUser?.id == item?.receiver_id) && item?.r_delete == 0) {
                                                        return <ConversationList item={item} key={index} oldUser={state?.oldUser} setMessages={setMessages} setSelectedUser={setSelectedUser} selectedUser={selectedUser} setPage={setPage} setSelected={setSelected} setItemUserChat={setItemUserChat} pusherData={pusherData} setPusherData={setPusherData} msg_notify_convid={state?.msg_notifications} pusher={state?.pusher} convFromItem={convFromItem?.id}/>
                                                    }


                                                })

                                                : <h6 className='border-bottom pb-3 me-1'>No users found</h6>
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className={`col-lg-7 col-xl-8 ${!selected ? 'message-none' : ''}`}>
                                    {
                                        renderChat()
                                    }
                                </div>
                            </div>
                        </div>
                    </section> : UserMessageList?.length < 1 && <h5 className='text-center m-5'>your chats will be shown here once you start chat</h5>
            }
            {
                state?.prevPath !== USER_MESSAGE_LIST && <section className="message-part">
                    <div className="container">
                        <div className="row">
                            <div className={`col-lg-5 col-xl-4 ${selected ? 'message-none' : ''}`}>
                                <div className="message-filter h-100">
                                    <form className="message-filter-src"><input type="text" placeholder="Search for Username" />
                                    </form>
                                    <ul className="message-list">
                                        {(userMessagelistId.length == 0 && state?.oldUser) && <li className="message-item unread" onClick={handleOldUserConversation} style={{ cursor: "pointer" }}><a className="message-link">
                                            <div className="message-img active">
                                                {!state?.oldUser?.image ? <Avatar className='avtar'>{state?.oldUser.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{state?.oldUser.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar> : <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${state?.oldUser?.image}`} alt="avatar" />}
                                            </div>
                                            <div className="message-text">
                                                <h6>{state?.oldUser?.name} <span>now</span></h6>
                                                <p style={{ color: 'rgb(139 139 139)', fontWeight: 600, fontSize: "12px" }}>Say hi and start messages!..</p>
                                            </div>
                                       </a></li>}
                                        {(arr2Length + arr1Length > 0) ?
                                            UserMessageList?.length > 0 && UserMessageList?.map((item, index) => {

                                                if ((loggedInUser?.id == item?.sender_id) && item?.s_delete == 0) {
                                                    return <ConversationList item={item} key={index} oldUser={state?.oldUser} setMessages={setMessages} setSelectedUser={setSelectedUser} selectedUser={selectedUser} setPage={setPage} setSelected={setSelected} setItemUserChat={setItemUserChat} pusherData={pusherData} setPusherData={setPusherData} msg_notify_convid={state?.msg_notifications} pusher={state?.pusher} convFromItem={convFromItem?.id}/>
                                                }
                                                else if ((loggedInUser?.id == item?.receiver_id) && item?.r_delete == 0) {
                                                    return <ConversationList item={item} key={index} oldUser={state?.oldUser} setMessages={setMessages} setSelectedUser={setSelectedUser} selectedUser={selectedUser} setPage={setPage} setSelected={setSelected} setItemUserChat={setItemUserChat} pusherData={pusherData} setPusherData={setPusherData} msg_notify_convid={state?.msg_notifications} pusher={state?.pusher} convFromItem={convFromItem?.id}/>
                                                }


                                            })

                                            : userMessagelistId.length == 0 && state?.oldUser ? null : <h6 className='border-bottom pb-3 me-1'>No users found</h6>
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className={`col-lg-7 col-xl-8 ${!selected ? 'message-none' : ''}`}>
                                {
                                    renderChat()
                                }
                            </div>
                        </div>
                    </div>
                </section>
            }
            {
                !state?.oldUser && UserMessageList?.length < 1 && ((arr2Length + arr1Length) < 1)? <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className='text-center'>
                                <i className="fas fa-comment-slash" style={{fontSize:"200px",marginTop:"30px",color:"lightgrey"}}></i>
                            </div>
                            <h4 className='text-center mb-2 pt-4' style={{ color: 'rgb(161 161 161)' }}>No messages, yet?</h4>
                            <p className='text-center mb-5' style={{ color: 'rgb(191 190 190)', width: '150px', display: 'block', margin: 'auto', fontWeight: '500' }}>Start conversation with world.</p>

                        </div>
                        <div className='col-md-3 col-6 mb-2'>
                            <Button name="Start Conversation" type="submit" link="" className="btn btn-outline post-btn d-block m-auto" event={handleClick} />
                        </div>
                    </div>
                </div>
                    : null
            }
        </div>

    )
}

export default React.memo(Message)