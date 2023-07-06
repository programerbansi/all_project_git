import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { GetUserProducts } from '../../../redux/actions/UserEcommerceAction';
import { LIST_PAGE } from '../../../services/UserRoutePath';

const Slider_Card = ({item}) => {
    const navigate=useNavigate();
    const handlecardclick=()=>{
        navigate(LIST_PAGE,{state:item});
       
    }
  return (
     <>
         <a key={item.id} className="suggest-card slider-a" onClick={()=>handlecardclick()}><img src="images/suggest/automobile.png" alt="car" />
             <h6>{item.name}</h6>
             <p>(4,521) ads</p>
         </a>
     </>
  )
}

export default Slider_Card