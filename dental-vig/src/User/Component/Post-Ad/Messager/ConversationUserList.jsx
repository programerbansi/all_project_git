import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GET_USER_MESSAGE_LIST, getCoversationList, getDatasPost } from '../../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser } from '../../../../services/LocalStorageUser';
import { DETAIL_PAGE, MESSAGE } from '../../../../services/UserRoutePath';

const UserMessageList = () => {

    const dispatch = useDispatch();
    let loggedInUser = getLoggedInUser();
    const navigate = useNavigate();

    let pageLoaded = false;
    let userList = useSelector((state) => state.UserEcommerceReducer.message_List);

    useEffect(() => {
        if (!pageLoaded) {
            dispatch(getDatasPost(`user/get_all_messages`,GET_USER_MESSAGE_LIST))
            pageLoaded = true;
        }
    }, [dispatch])

    return (
        <>
            <ul className="message-list" style={{ height: 'fit-content', maxHeight: '400px' }}>
                {
                    userList && userList.map((item, index) => {
                        return <li key={index} className="message-item unread mt-2" onClick={() => {navigate(MESSAGE,{state:{prevPath:DETAIL_PAGE}})}} style={{cursor:'pointer'}}>
                            <div className="message-link">
                                <div className="message-img active">
                                    {
                                        item?.receiver_id == loggedInUser.id ? <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${item.sender.image}`} alt="avatar" /> : <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${item.receiver.image}`} alt="avatar" />
                                    }
                                </div>
                                <div className="message-text">
                                    {
                                        item?.receiver_id == loggedInUser.id ?
                                            <h6>                                            
                                                {item?.sender.name}<span>now</span>
                                            </h6> :
                                            <h6>                                              
                                                {item?.receiver.name}<span>now</span>
                                            </h6>
                                    }
                                    <p style={{ color: 'rgb(139 139 139)', fontWeight: 600, fontSize: "12px" }}>{item?.items?.name}</p>
                                </div>                             
                            </div>
                        </li>
                    })
                }
            </ul>
        </>
    )
}

export default React.memo(UserMessageList)