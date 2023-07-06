import React, { useContext, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getNotifications, setNotificationSeen } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import { UserValAuthContext } from '../Context/UserValContext';
import NotificationModal from '../Modal/NotificationModal';
import AddPostTabs from '../Post-Ad/AddPostTabs';
import { useQuery } from 'react-query';

const ViewAllNotification = () => {
    let { state } = useLocation();
    let loggedInUser = getLoggedInUser();
    const dispatch = useDispatch();
    const val = useContext(UserValAuthContext);
    const [notificationList, setNotificationList] = useState(state);
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({});
    let list = useSelector((state) => state.UserEcommerceReducer.notifications)
    let pageLoaded = false;
    const fetchData = async () => {
        if (state) {
            setNotificationList(state)
        }
        else {
            const formdata = new FormData();
            formdata.append('id', loggedInUser?.id);
            dispatch(getNotifications(formdata, setNotificationList))       
            pageLoaded = true;
        }
        window.scrollTo({top:0});
    };
    const query = useQuery(['viewnoti'], fetchData);
    if (query.isLoading) {
        return console.log("Loading..")
    }
    if (query.error) {
        return console.log(query.error.message)
    }
   


    const options = ['all-notification', 'read-notification', 'unread-notification'];

    const handleSelectedOption = (option) => {

        switch (option) {
            case options[0]:
                if(state)setNotificationList(state);
                else setNotificationList(list)
                break;
            case options[1]:
                if(state)setNotificationList(state.filter((n) => ((n?.buyer_id == loggedInUser?.id && n?.buyer_seen == 1) || (n?.seller_id == loggedInUser?.id && n?.seller_seen == 1))));
                else setNotificationList(list?.filter((n) => ((n?.buyer_id == loggedInUser?.id && n?.buyer_seen == 1) || (n?.seller_id == loggedInUser?.id && n?.seller_seen == 1))))          
                break;
            case options[2]:
                if(state)setNotificationList(state.filter((n) => ((n?.seller_id == loggedInUser?.id && n?.seller_seen == 0) || (n?.buyer_id == loggedInUser?.id && n?.buyer_seen == 0))))
                else setNotificationList(list?.filter((n) => ((n?.seller_id == loggedInUser?.id && n?.seller_seen == 0) || (n?.buyer_id == loggedInUser?.id && n?.buyer_seen == 0))))
                break;
            default:
                if(state)setNotificationList(state);
                else setNotificationList(list);
                break;
        }
    }

    const handleNotification = (item) => {
        setShow(true);
        setNotification(item);

        const formdata = new FormData();
        const formdata1 = new FormData();

        formdata.append('id', item?.id);
        (item?.seller_id == loggedInUser?.id) ? formdata.append('seller_id', item?.seller_id) : formdata.append('buyer_id', item?.buyer_id)

        formdata1.append('id', loggedInUser?.id)
        if ((item?.buyer_id == loggedInUser?.id && item?.buyer_seen == 0) || item?.seller_id == loggedInUser?.id && item?.seller_seen == 0) {
            dispatch(setNotificationSeen(formdata, formdata1, setNotificationList))
            val.setNotificationCount((count) => count - 1)
        }
    }

    return (
        <>
            {!state && <AddPostTabs />}
            {show && <NotificationModal show={show} setShow={setShow} notification={notification} setNotification={setNotification} />}
            <section className="notify-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 mx-auto">
                            <div className="notify-body">
                                <div className="notify-filter">
                                    <div className="nice-select select notify-select" tabIndex={0}>
                                        <span className="current">all notification</span>
                                        <ul className="list" id='nice'>
                                            {
                                                options?.map((option, index) =>
                                                    <li data-value className="option" onClick={() => handleSelectedOption(option)} key={index}>{option}</li>
                                                )
                                            }                                        
                                        </ul>
                                    </div>

                                    <div className="notify-action"><a href="#" title="Delete All" className="fas fa-trash-alt" /><a href="#" title="Mark All As Read" className="fas fa-envelope-open" /><a href="#" title="Notification Setting" className="fas fa-cog" /></div>
                                </div>
                                <ul className="notify-list notify-scroll">
                                    {
                                        notificationList && notificationList?.length > 0 ?
                                            notificationList.map((n, index) =>
                                                <li className={`notify-item ${((n?.buyer_id == loggedInUser?.id && n?.buyer_seen == 0) || n?.seller_id == loggedInUser?.id && n?.seller_seen == 0) ? 'active' : ''}`} key={index} onClick={() => handleNotification(n)}>
                                                    <a className="notify-link">
                                                        <div className="notify-img" >
                                                            {
                                                                n?.items?.itemimage ? (n?.buyer_id == loggedInUser?.id || n?.seller_id == loggedInUser?.id) && <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}${n?.items?.itemimage[0]?.image}`} alt="avatar" /> :
                                                                    <img src="images/avatar/not-image.png" alt="avatar" />
                                                            }
                                                        </div>
                                                        <div className="notify-content">
                                                            {
                                                                n?.buyer_id == loggedInUser?.id &&
                                                                <p className="notify-text">
                                                                    <span>you </span>have bought <span>{n?.items?.name} </span> successfully .
                                                                </p>
                                                            }
                                                            {
                                                                n?.seller_id == loggedInUser?.id &&
                                                                <p className="notify-text">
                                                                    <span>you </span>have sold <span>{n?.items?.name} </span>successfully .
                                                                </p>
                                                            }
                                                            <span className="notify-time"><Moment fromNow ago>{n?.created_at}</Moment></span>
                                                        </div>
                                                    </a>
                                                </li>
                                            )
                                            :
                                            <h4>----No Notifications--------</h4>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(ViewAllNotification)
