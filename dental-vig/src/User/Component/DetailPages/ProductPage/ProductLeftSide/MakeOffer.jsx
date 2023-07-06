import React, { useContext } from 'react';
import Button from '../../../InputFunction/Button';
import {DETAIL_PAGE, MESSAGE} from '../../../../../services/UserRoutePath'
import { useNavigate } from 'react-router-dom';
import { UserValAuthContext } from '../../../Context/UserValContext';

const MakeOffer = ({user,id}) => {
    const navigate = useNavigate();
    const handleClick=()=>{
            navigate(MESSAGE,{ state:{user:user,id:id,oldUser:user,prevPath:DETAIL_PAGE,prevItemId:id,conversationObj:{receiver_id:user?.id}}})
    }
    return (
        <div>
            <div className="common-card">
                <div className="card-header">
                    <h5 className="card-title">chat</h5>
                </div>
                <div className="ad-details-safety">
                    <h6 className='mb-4'>Chat to know more about the product .</h6>
                    <Button type="submit" event={handleClick} className="product-widget-btn" icon="fas fa-hand-holding-usd" name="Make Offer"/>
                </div>
            </div>
        </div>
    )
}

export default React.memo(MakeOffer)