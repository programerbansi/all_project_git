import React, { useEffect } from 'react'
import '../../Css/Advertisement.css'
import { AiOutlineCloseCircle } from "react-icons/ai";
const LeftAds = ({ left_ads }) => {
  
    return (
        <>
 

            <div className='left-ads-main '>
            {left_ads.map((item,index)=>{
                    return  !item?.image ? null : <a href={`${item?.url}`} target="_blank" key={index}><img src={`${process.env.REACT_APP_ADVERTISE_IMAGE_URL}${item?.image}`} alt="ads" className='left-ads1' /></a>
                })}
            </div>

        </>
    )
}

export default React.memo(LeftAds)