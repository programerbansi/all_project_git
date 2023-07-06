import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserAdvertisement } from '../../../redux/actions/UserEcommerceAction';
import '../../Css/Advertisement.css'
import { AiOutlineCloseCircle } from "react-icons/ai";
const FooterAds = ({footer_ads}) => {

  return (
   <>
   
     <div className='container'>
        <div className='row'>
            <div className='col-lg-12 d-flex justify-content-center' >
                {!footer_ads[0]?.image ? null : <a href={`${footer_ads[0]?.url}`}  target="_blank"><img src={`${process.env.REACT_APP_ADVERTISE_IMAGE_URL}${footer_ads[0]?.image}`} alt="ads" className='top-ads1 mt-2 mb-2'/></a>}   
            </div>
        </div>
     </div>
   </>
  )
}

export default React.memo(FooterAds)