import React from 'react'
import Slider from "react-slick";
import "../../Css/Slider_.css"
import Slider_Card from './Slider_Card';
import Button from '../InputFunction/Button';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { GET_USER_CATEGORY, GetUserCategory, GetUserProducts, getDatas } from '../../../redux/actions/UserEcommerceAction';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { AD_POST, SHOW_ALL_ADS, USER_LOGIN } from '../../../services/UserRoutePath';
import { getUserRole } from '../../../services/LocalStorageUser';
const Slider_ = () => {
    var settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

      const dispatch = useDispatch();
      let categoryList = useSelector((state) => state.UserEcommerceReducer.usercategory);
      const role =getUserRole();
      const nevigate=useNavigate();
      let listLoaded = false;

      useEffect(()=>{
        if(!listLoaded)
        {
          if(role == "user")
          { 
            dispatch(getDatas(`getsubcat`,GET_USER_CATEGORY));
          }
         
          listLoaded = true;
        }
      },[dispatch,listLoaded])
      
      const handeleAddpost=()=>{
        if(role == "user")
        {
          nevigate(AD_POST)
        }
        else
        {
          nevigate(USER_LOGIN)
        }
      }
  return (
       <>
             <div>
                <nav className="mobile-nav">
                    <div className="container">
                        <div className="mobile-group"><NavLink to='/' className="mobile-widget"><i className="fas fa-home" /><span>home</span></NavLink><NavLink to='/signup' className="mobile-widget"><i className="fas fa-user" /><span>join me</span></NavLink>
                        <a className="mobile-widget plus-btn"><i className="fas fa-plus" onClick={handeleAddpost}/><span>Ad Post</span></a>
                        <a href="notification.html" className="mobile-widget"><i className="fas fa-bell" /><span>notify</span><sup>0</sup></a><a href="message.html" className="mobile-widget"><i className="fas fa-envelope" /><span>message</span><sup>0</sup></a></div>
                    </div>
                </nav>
                <section className="banner-part">
                    <div className="container">
                        <div className="banner-content">
                            <h1>You can #Buy, #Rent, #Booking anything from here.</h1>
                            <p>Buy and sell everything from used cars to mobile phones and computers, or search for property, jobs
                                and more in the world.</p>
                                
                            <Button name="Show all ads" icon="fas fa-eye" link={SHOW_ALL_ADS} className=" btn-outline"/>
                             </div>
                    </div>
                </section>
                <section className="suggest-part">
                    <div className="container">                 
                        <Slider {...settings}>
                          {
                            categoryList.map((item)=><Slider_Card item={item} key={item.id} />)
                          }
                        </Slider>                         
                    </div>
                </section>
            </div>

       </>
  )
}

export default Slider_