import React, { useState } from 'react'
import Slider from "react-slick";
import Modal from 'react-bootstrap/Modal';
import '../../../../Css/DetailPage.css'
const ProductSlider = ({ image, event, height, review, index }) => {
  return (
    <>
      <div className='modal-slider-feature-main'>
        <div className="feature-thumb-slider ">
          <div className='feature-thumb'>
            {
              review && review == 'video' ?
                <video autoPlay muted loop id={index} style={{ width: "100%" }} key={index}>
                  <source src={`${process.env.REACT_APP_REVIEW_MEDIA_IMAGE_URL}/${image}`} type="video/MP4" />
                </video>

                : review && <img src={`${process.env.REACT_APP_REVIEW_MEDIA_IMAGE_URL}/${image}`} key={index} style={{ height: '420px', width: "100%" }}></img>
            }
            {!review && <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}${image}`} key={image} onClick={event} style={{ height: height}}></img>}
          </div>
        </div>
      </div>


    </>
  )
}

export default React.memo(ProductSlider)