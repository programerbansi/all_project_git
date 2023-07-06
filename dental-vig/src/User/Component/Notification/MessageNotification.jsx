import React, { useContext, useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { useDispatch, useSelector } from 'react-redux';
import { getCoversationList, getMessageNotifications } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import { UserValAuthContext } from '../Context/UserValContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { DETAIL_PAGE, MESSAGE, PUSHER_KEY } from '../../../services/UserRoutePath';
import Moment from 'react-moment';
import usePusher from '../CustomeHook/usePusher';
import Avatar from '@mui/material/Avatar';
const MessageNotification = ({ msg_notificationCount, setMsg_NotificationCount }) => {
    const dispatch = useDispatch();
    let loggedInUser = getLoggedInUser();
    const [pusher, setPuser] = useState();
    const val = useContext(UserValAuthContext);
    const navigate = useNavigate();
    const { msgpusherData } = usePusher();

    useEffect(() => {
        setMsg_NotificationCount(0);
        const formdata = new FormData();
        formdata.append('receiver_id', loggedInUser?.id);
        dispatch(getMessageNotifications(formdata, val?.setMsg_Notifications));
    }, [dispatch])
    useEffect(() => {
        if (msgpusherData && (msgpusherData?.message?.r_id == loggedInUser?.id)) {
            let obj = {
                conversation_id: msgpusherData?.message?.conversation_id,
                created_at: msgpusherData?.message?.created_at,
                item_id: msgpusherData?.conve?.item_id,
                receiver_id: msgpusherData?.message?.r_id,
                sender: { id: msgpusherData?.user?.id, name: msgpusherData?.user?.name, image: msgpusherData?.user?.image },
                sender_id: msgpusherData?.message?.s_id,
                seen: msgpusherData?.message?.seen,
                message_count: msgpusherData?.unseencount?.seen,
            }
            val?.setMsg_Notifications((array) => [...array, obj])
        }
    }, [msgpusherData])
    useEffect(() => {
        val?.setMsg_Notifications([...new Map(val?.msg_notifications.map((item) => [item?.conversation_id, item])).values()])
    }, [val?.msg_notifications?.length])

    useEffect(() => {
        if (val?.msg_notifications) {
            setMsg_NotificationCount(0);
            val?.msg_notifications.map((n) => {
                if (n?.receiver_id == loggedInUser?.id && n?.seen == 0) {
                    setMsg_NotificationCount((msg_notificationCount) => msg_notificationCount + 1)
                }
            })
        }
    }, [val?.msg_notifications])

    const handleNavigation = (item) => {

        navigate(MESSAGE,
            {
                state: {
                    msg_notifications: val?.msg_notifications, 
                    pusher: pusher, 
                    prevPath: DETAIL_PAGE, 
                    conversation_id: item?.conversation_id,
                    user: loggedInUser.id == item?.receiver_id ? item?.sender: item.receiver, 
                    id: item?.item_id,
                    oldUser: loggedInUser.id == item?.receiver_id ? {...item.sender, convId: item?.conversation_id,} : {...item.receiver, convId: item?.conversation_id,}, 
                    prevItemId: item?.item_id, 
                    item_status: item?.items?.status
                }
            })
        val?.setShowEnvelop(false);
    }

    return (
        <div>
            <div className="dropdown-header">
                <h5>message ({msg_notificationCount})</h5><a onClick={() => { handleNavigation() }} style={{ cursor: 'pointer' }}>view all</a>
            </div>
            <ul className="message-list" style={{ height: 'fit-content', maxHeight: '400px' }}>
                {
                    val?.msg_notifications && val?.msg_notifications?.length > 0 ? val?.msg_notifications.map((item, index) => {                     
                        return <li key={index} className="message-item unread mt-2" onClick={() => { handleNavigation(item) }} style={{ cursor: 'pointer' }}>
                            <div className="message-link">
                                <div className="message-notify-img active">
                                    {
                                        item?.sender_id.image ? <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${item?.sender?.image}`} alt="avatar" /> : <Avatar >{item?.sender?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{item?.sender?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar>
                                    }
                                </div>
                                <div className="message-text">
                                    {
                                        <h6>                                         
                                            {item?.sender?.name}
                                            <span><Moment fromNow ago>{item?.created_at}</Moment></span>
                                        </h6>
                                    }                                  
                                </div>
                                <span className="message-count">
                                    {
                                        item?.message_count
                                    }

                                </span>
                            </div>
                        </li>
                    }) : <div className="dropdown-header">
                        <h5 className='text-center w-100'>--No Notifications-- </h5>
                    </div>
                }
            </ul>
        </div>
    )
}

export default React.memo(MessageNotification)