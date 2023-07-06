import React, { useContext, useState, useEffect } from "react";
import { FaRegSmile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import { deleteConversation, deleteMessage, getCoversationList, getMessageNotifications, getUserConversation, seenMessages, setMessageNotificationSeen, userMessage, userMessageId, } from "../../../../redux/actions/UserEcommerceAction";
import { getLoggedInUser } from "../../../../services/LocalStorageUser";
import { UserValAuthContext } from "../../Context/UserValContext";
import moment from "moment";
import Pusher from 'pusher-js'
import { PUSHER_KEY } from "../../../../services/UserRoutePath";
import '../../../Css/Message.css';
import usePusher from "../../CustomeHook/usePusher";
import Avatar from '@mui/material/Avatar';
const UserChat = ({ convFromItem,user, conversation_id, messages, setMessages, pusherData, pusher, page, setPage, totalResult, setTotalResult, submitFlag, setSubmitFlag, scrollToBottom, loading, setLoading, selected, setSelected, setItemUserChat, setMessageAdded, UserMessageList, selectedUser,conversationObj }) => {

    const [pdata, setPdata] = useState();
    const [message, setMessage] = useState("");

    const val = useContext(UserValAuthContext);

    const dispatch = useDispatch();
    const loggedInUser = getLoggedInUser();
    const [openEmoji, setOpenEmoji] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);
    let lastpage = useSelector((d) => d.UserEcommerceReducer.lastpage);
    let pageLoaded = false;
    const {seenMsgPusherData}=usePusher();
    var filterArray = [];
    filterArray = [...new Map(messages.map((item) => [item?.id, item])).values()].sort((a, b) => parseInt(a.id) - parseInt(b.id)).filter(function (vendor) { return vendor?.conversation_id === conversation_id ? conversation_id : 1 }).filter((item) => item?.conversation_id == (!user?.conversation_id ? conversation_id ? conversation_id : convFromItem : user?.conversation_id)).map((m)=>{
        if(m?.s_delete == 1 && m?.r_delete ==1) return
        else if(m?.s_delete ==1)
        {
            if(m?.conversation?.sender_id != loggedInUser?.id) return m    
        }
        else if(m?.r_delete == 1){
            if(m?.conversation?.receiver_id != loggedInUser?.id) return m
        }
        else if(m?.s_delete == 0 && m?.r_delete ==0) return m
      
    }).filter((m)=>m != undefined)
   const unseen_messages = filterArray && filterArray.filter((item) => {
        return item?.seen == 0
    })
    const unseen_messages_id = unseen_messages && unseen_messages.map((item) => {
        return item?.id
    })

    useEffect(() => {
        if (!pageLoaded) {
            let formdata = new FormData();
            formdata.append('conversation_id', (selectedUser?.convId));
            let formdata1 = new FormData();
            formdata1.append('receiver_id', loggedInUser?.id);
            if (pusherData || pusher) {
                if ((selectedUser?.convId) == (pusherData ? pusherData?.message?.conversation_id : pusher?.message?.conversation_id)) {
                    if (selectedUser?.convId && ((pusherData ? pusherData.message.r_id : pusher.message.r_id) == loggedInUser?.id)) {
                        dispatch(setMessageNotificationSeen(formdata))
                        dispatch(seenMessages({ 'id': unseen_messages_id }, selectedUser?.convId, setTotalResult, setMessages, messages, setPage, setLoading))
                    }
                    setTimeout(() => {
                        if (selectedUser?.convId && ((pusherData ? pusherData.message.r_id : pusher.message.r_id) == loggedInUser?.id)) {
                            dispatch(getMessageNotifications(formdata1, val?.setMsg_Notifications));
                        }
                    }, 100);
                }
            }
            else {
                val?.msg_notifications && val?.msg_notifications.length && val?.msg_notifications.map((n) => {
                    if (n?.conversation_id === selectedUser?.convId) {
                        dispatch(setMessageNotificationSeen(formdata))
                        dispatch(seenMessages({ 'id': unseen_messages_id }, selectedUser?.convId, setTotalResult, setMessages, messages, setPage, setLoading))
                        setTimeout(() => {
                        dispatch(getMessageNotifications(formdata1, val?.setMsg_Notifications));
                    }, 100);
                    }
                })
            }
        }
        return () => {
            pageLoaded = true; 
            filterArray =[];
        }
    }, [messages, val?.seenMessageClicked])

    useEffect(()=>{
        if (seenMsgPusherData?.msg?.data?.id) {
            setPdata(seenMsgPusherData?.msg?.data?.id);
        }
    },[seenMsgPusherData])

    let loadedArray = false;
    useEffect(() => {
    if (!loadedArray) {
        if (pdata) {
            for (let i = 0; i < unseen_messages_id.length; i++) {
                let obj = filterArray.findIndex((n) => n?.id == unseen_messages_id[i]);
                var tmpdata = filterArray;
                if (tmpdata) { tmpdata[obj].seen = 1; }
                filterArray = tmpdata;
            }
        }
    }
    return () => loadedArray = true
}, [pdata])

    const handleScroll = (e) => {
        var objDiv = document.getElementById("inbox-chat-list");
        if (objDiv && (objDiv.scrollTop < 1)) {
            if (totalResult > filterArray.length) {
                if (page < lastpage) {
                    setPage(page + 1);
                    dispatch(getUserConversation(conversation_id || user?.conversation_id, (page + 1), setTotalResult, setMessages, messages, setPage, setLoading))
                    setPage(page + 1);
                }
            }
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [message])

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages([...messages]);

        const formdata = new FormData();
        const formdata1 = new FormData();

        formdata.append("receiver_id", user.user?.id);
        formdata.append("r_id", user.user?.id);
        formdata.append("item_id", user?.id);
        formdata.append("message", message);

        formdata1.append("message", message);
        formdata1.append("r_id", user?.user?.id);

        setOpenEmoji(false);
        setMessageAdded(true);

        if ((conversation_id ? conversation_id : user?.conversation_id ? user?.conversation_id : convFromItem) && messages.length > 0) {
            setSendingMessage(true);

            if (message?.trim()?.length > 0) {
                setMessages((messages) => [...messages, { icon: <i className="far fa-clock"></i>, id: (filterArray && filterArray[filterArray?.length - 1]?.id) + 1, message: message, r_id: user?.user?.id, s_id: loggedInUser?.id, conversation_id: conversation_id ? conversation_id : user?.conversation_id ? user?.conversation_id : convFromItem, seen: 0 ,r_delete:0,s_delete:0,conversation:{receiver_id:conversationObj?.receiver_id,sender_id:conversationObj?.sender_id}}]);
                   dispatch(userMessageId(user?.conversation_id || pusherData?.message.conversation_id || conversation_id || convFromItem, formdata1, page, setTotalResult, setMessages, messages, setSubmitFlag, submitFlag, scrollToBottom, setSendingMessage, setMessageAdded));
            }

      } else {
            let array = [];
            array.push({ conversation_id: UserMessageList?.length > 0 ? (UserMessageList && UserMessageList[UserMessageList?.length - 1]?.id) + 1 : 1, id: 1, message: message, r_id: user.user?.id, receiver_id: user.user?.id, item_id: user?.id, s_id: loggedInUser?.id, seen: 0,r_delete:0,s_delete:0,conversation:{sender_id:loggedInUser?.id,receiver_id: user.user?.id || conversationObj?.receiver_id}  });
                if (message?.trim()?.length > 0) {
                setMessages(array);

                dispatch(userMessage(formdata, setTotalResult, setMessages, messages, setPage, setLoading, setMessageAdded));
                  }
            setMessages([]);
            setOpenEmoji(false);
           
        }
        setItemUserChat(false);
        setMessage("");
       
    };

    let _ = require('lodash');
    let grouped = _.groupBy(filterArray, function (n) {
        return moment(n?.created_at).format("MMMM DD YYYY ");
    });

    const handleDeleteMessage = (v) => {
        const formdata = new FormData();
        formdata.append('id', v.id);
        dispatch(deleteMessage(formdata));
        setMessages(messages.filter((m) => m.id !== v.id))
    }
    return (
        <>
            <div className="message-inbox h-100">
                <div className="inbox-header">
                    {!selected ? (
                        <h6>Select chat to view conversation</h6>
                    ) : (
                        <>
                            <div className="inbox-header-profile d-flex justify-content-start w-100">
                                <i className="fas fa-arrow-left back-aerrow" onClick={()=>{setSelected(false)}}/>
                                    <a className="inbox-header-img" href="">
                                        {!user?.user?.image ? (
                                           <Avatar className="avtar">{user?.user?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{user?.user?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar>
                                        ) : (
                                            <img
                                                src={`${process.env.REACT_APP_USER_IMAGE_URL}${val?.userImage || user?.user?.image
                                                    }`}
                                                alt="avatar"
                                            />
                                        )}
                                    </a>
                                    <div className="inbox-header-text">
                                        <h5>
                                            <a href="#">
                                                {val?.userName ||
                                                    user?.user?.name}
                                            </a>
                                        </h5>
                                        <span>active now</span>
                                    </div>
                            </div>
                            
                        </>
                    )}
                </div>
                <ul className={`inbox-chat-list ${!selected ? 'bg-grey' : ''}`} onScroll={handleScroll} id="inbox-chat-list">
                    {loading && <h5 className="text-center m-3">loading...</h5>}
                    {
                        !selected ? <>
                            <i className="far fa-comments" style={{ fontSize: '200px', color: 'rgb(237 237 241)', position: 'absolute', top: '30%', left: '30%' }}></i>
                        </> :
                            grouped && Object.keys(grouped).map((item, index) => {
                                return <span key={index}>
                                    <h6 key={index} className='text-center my-2'>{item}</h6>
                                    {
                                        grouped[item].map((v, index) => {
                                            return <li
                                                className={`inbox-chat-item ${loggedInUser?.id == v?.r_id ? "" : "my-chat"}`} key={index}
                                            >
                                                <div className="inbox-chat-img">
                                                    {loggedInUser.id == v?.s_id ? (
                                                        loggedInUser?.image ? (
                                                            <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${loggedInUser?.image}`} alt="avatar"
                                                            />
                                                        ) : (
                                                            <Avatar className="avtar">{loggedInUser?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{loggedInUser?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar>
                                                        )
                                                    ) : user.user?.image ? (
                                                        <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${user.user?.image}`} alt="avatar"
                                                        />
                                                    ) : (
                                                        <Avatar  className="avtar">{user?.user?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{user?.user?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar>
                                                    )}

                                                </div>
                                                <div className="inbox-chat-content">
                                                    <div className="inbox-chat-text" style={{ maxWidth: "550px" }}
                                                    >
                                                        <p className="w-100" style={{ wordWrap: "break-word" }}>
                                                            {v?.message}
                                                        </p>
                                                       
                                                        {
                                                            loggedInUser?.id == v?.s_id ?
                                                                <div className="inbox-chat-action">
                                                                    <button title="Delete message" className="fas fa-trash-alt" style={{ color: '#f54747', cursor: "pointer" }} onClick={() => handleDeleteMessage(v, item, index)}
                                                                    />
                                                                
                                                                </div>
                                                                : ''
                                                        }

                                                    </div>
                                                    <small className="inbox-chat-time" style={{ marginRight: '15px' }}>
                                                        {moment(v?.created_at).format("LT")}
                                                        <span style={{ marginLeft: '3px' }}>
                                                            {
                                                                v?.icon && sendingMessage && (v?.id > grouped[item][[grouped[item].length - 2]]?.id) ? v?.icon :

                                                                    v?.icon && !sendingMessage && loggedInUser?.id === v?.s_id ?

                                                                        selectedUser && ((selectedUser?.convId || convFromItem) == v?.conversation_id) && v?.seen == 1 ? <i className="fas fa-check-double" style={{ color: '#0014ffc7' }}></i> : <i className="fas fa-check" style={{ color: '#0014ffc7' }}></i>

                                                                        :

                                                                        loggedInUser?.id === v?.s_id && v?.seen == 1 ? <i className="fas fa-check-double" style={{ color: '#0014ffc7' }}></i> : loggedInUser?.id === v?.s_id && <i className="fas fa-check" style={{ color: '#0014ffc7' }}></i>
                                                            }
                                                        </span>
                                                    </small>
                                                </div>
                                            </li>
                                        })
                                    }
                                </span>
                            })

                    }
                </ul>
                {
                    user?.item_status == 3 ?
                        <h5 className="inbox-chat-form" style={{ backgroundColor: '#0d0633', padding: '20px', color: 'white' }}>
                            Ad inactive. Chat will be deleted in 10 days
                        </h5>
                        :
                        !selected ? null : <div className="inbox-chat-form">
                            <form onSubmit={handleSubmit}>
                                <input
                                    className="text-message"
                                    placeholder="Type a Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    disabled={!selected}
                                />
                                <FaRegSmile
                                    className="emoji-text"
                                    onClick={() => setOpenEmoji(!openEmoji)}
                                />
                                <button type="submit" disabled={message?.trim()?.length > 0 ? false : true}>
                                    <i className="fas fa-paper-plane" />
                                </button>
                            </form>
                            {openEmoji ? (
                                <Picker
                                    className="emoji_picker"
                                    suggestedEmojisMode={false}
                                    height={300}
                                    width={300}
                                    onEmojiClick={(emojiData, event) => {
                                        setMessage(message + emojiData.emoji);
                                    }}
                                />
                            ) : null}
                        </div>
                }
            </div>
        </>
    );
};

export default React.memo(UserChat);