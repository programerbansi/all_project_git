import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserAdvertisement } from '../../../redux/actions/UserEcommerceAction';
import '../../Css/Advertisement.css'
import { AiOutlineCloseCircle } from "react-icons/ai";
const TopAds = ({top_ads}) => {
  return (
   <>
     <div className='container'>
        <div className='row'>
            <div className='col-lg-12 d-flex justify-content-center ' >          
                {!top_ads[0]?.image ? null : <a href={`${top_ads[0]?.url}`}  target="_blank"><img src={`${process.env.REACT_APP_ADVERTISE_IMAGE_URL}${top_ads[0]?.image}`} alt="ads" className='top-ads1'/></a>}   
            </div>
        </div>
     </div>
   </>
  )
}

export default React.memo(TopAds)