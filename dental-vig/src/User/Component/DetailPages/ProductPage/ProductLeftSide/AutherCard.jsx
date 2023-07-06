import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PRODUCT, GetProduct, GetUserProduct, getDatas } from '../../../../../redux/actions/UserEcommerceAction';
import moment from 'moment';
import { Avatar } from '@mui/material';
import "../../../../Css/Message.css"
import { useQuery } from 'react-query';

const AutherCard = ({ user }) => {
    const dispatch = useDispatch();
    let userProduct = useSelector((d) => d.UserEcommerceReducer.product);
    const fetchData = async () => {
        dispatch(getDatas(`get_item_without_token/${user?.id}`,GET_PRODUCT))
    };
    const query = useQuery('auther', fetchData);
    if (query.isLoading) {
        return console.log("Loading..")
    }
    if (query.error) {
        return console.log(query.error.message)
    }

    return (
        <>
            <div className="common-card">
                <div className="card-header">
                    <h5 className="card-title">author info</h5>
                </div>
                <div className="ad-details-author">
                    <a href="#" className="author-img active">         
                        {!user?.image ?       
                            <Avatar style={{ height: "100px", width: "100px" ,position:"initial"}}>{user?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{user?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar>
                            : <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${user?.image}`} style={{height:'100px',width:'100px'}} alt="avatar" />}
                    </a>
                    <div className="author-meta">                   
                        <h4><a href="#">{user?.name}</a></h4>
                        <h5>Member since : {moment(user?.created_at).format('MMM D, YYYY')}</h5>                   
                    </div>    
                    <ul className="author-list">
                        <li>
                            <h6>total ads</h6>
                            <p>{(userProduct.filter((item) => {
                                return item?.status == 1
                            })).length}</p>
                        </li>
                        <li>
                            <h6>total ratings</h6>
                            <p>78</p>
                        </li>
                        <li>
                            <h6>total follower</h6>
                            <p>56</p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default React.memo(AutherCard)