import React, { useContext, useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, setNotificationSeen } from '../../../redux/actions/UserEcommerceAction';
import Moment from 'react-moment';
import { UserValAuthContext } from '../Context/UserValContext';
import NotificationModal from '../Modal/NotificationModal';
import { NavLink } from 'react-router-dom';
import { PUSHER_KEY, VIEW_ALL_NOTIFICATION } from '../../../services/UserRoutePath';
import usePusher from '../CustomeHook/usePusher';

const SellBuyNotification = () => {

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({});

    let loggedInUser = getLoggedInUser();
    const dispatch = useDispatch();
    const val = useContext(UserValAuthContext);
    const { buyerPusherData } = usePusher();
    useEffect(() => {
        if (buyerPusherData && (buyerPusherData?.sold?.buyer_id == loggedInUser?.id || buyerPusherData?.sold?.seller_id == loggedInUser?.id)) {

            let obj = { id: buyerPusherData?.sold?.id, buyer_id: buyerPusherData?.sold?.buyer_id, seller_id: buyerPusherData?.sold?.seller_id, buyer_seen: buyerPusherData?.sold?.buyer_seen, seller_seen: buyerPusherData?.sold?.seller_seen, created_at: new Date(), item_id: buyerPusherData?.item?.id, items: buyerPusherData?.item }
            val?.setNotifications((notificationArray) => [...notificationArray, obj])

        }
    }, [buyerPusherData])
    
    const handleNotification = (item) => {
        setShow(true);
        setNotification(item);
        val?.setShowNotify(false);
        const formdata = new FormData();
        const formdata1 = new FormData();

        formdata.append('id', item?.id);
        (item?.seller_id == loggedInUser?.id) ? formdata.append('seller_id', item?.seller_id) : formdata.append('buyer_id', item?.buyer_id)

        formdata1.append('id', loggedInUser?.id)
        dispatch(setNotificationSeen(formdata, formdata1, val.setNotifications))
        val.setNotificationCount((count) => count - 1)
    }

    useEffect(() => {
        if (val.notifications) {
            val.setNotificationCount(0);
            val.notifications.map((n) => {
                if (n?.seller_id == loggedInUser?.id && n?.seller_seen == 0) {
                    val.setNotificationCount((count) => count + 1)
                }
                if (n?.buyer_id == loggedInUser?.id && n?.buyer_seen == 0) {
                    val.setNotificationCount((count) => count + 1)
                }
            })
        }
    }, [val.notifications])

    const handleViewALlClick = () => {
        val?.setShowNotify(false);
    }

    return (
        <>
            {show && <NotificationModal show={show} setShow={setShow} notification={notification} setNotification={setNotification} />}
            <div className="dropdown-header">
                <h5>Notification ({val.notificationCount})</h5><NavLink to={VIEW_ALL_NOTIFICATION} state={val.notifications} onClick={handleViewALlClick}>view all</NavLink>
            </div>
            <ul className="notify-list">
                {
                    val.notifications?.length > 0 ?
                        val.notifications.map((item, index) =>
                            <li className={`notify-item ${((item?.buyer_id == loggedInUser?.id && item?.buyer_seen == 0) || item?.seller_id == loggedInUser?.id && item?.seller_seen == 0) ? 'active' : ''}`} key={index}
                                onClick={() => handleNotification(item)}>
                                <a className="notify-link" >
                                    <div className="notify-img">
                                        {
                                            item?.items?.itemimage ? (item?.buyer_id == loggedInUser?.id || item?.seller_id == loggedInUser?.id) && <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}${item?.items?.itemimage[0]?.image}`} alt="avatar" /> :
                                                <img src="images/avatar/not-image.png" alt="avatar" />
                                        }
                                    </div>
                                    <div className="notify-content">
                                        {
                                            item?.buyer_id == loggedInUser?.id &&
                                            <p className="notify-text">
                                                <span>You have bought a product successfully .</span>
                                            </p>
                                        }
                                        {
                                            item?.seller_id == loggedInUser?.id &&
                                            <p className="notify-text">
                                                <span>Your ad has been sold successfully .</span>
                                            </p>
                                        }
                                        <span className="notify-time"><Moment fromNow ago>{item?.created_at}</Moment></span>
                                    </div>
                                </a></li>)
                        :
                        <div className="dropdown-header">
                            <h5 className='text-center w-100'>--No Notifications-- </h5>
                        </div>
                }
            </ul>
        </>
    )
}

export default React.memo(SellBuyNotification)