import React from 'react'
import Slider from 'react-slick';
import Future_card from '../../../Content/Future_card';
import '../../../../Css/DetailPage.css'
const FutureProduct = () => {
    var settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
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
    const array = [{ 'image': <img src='/images/product/01.jpg'></img> },
    { 'image': <img src='/images/product/02.jpg'></img> },
    { 'image': <img src='/images/product/03.jpg'></img> },
    { 'image': <img src='/images/product/04.jpg'></img> },
    { 'image': <img src='/images/product/05.jpg'></img> }
    ]

    return (
        <>
            <div className="common-card">
                <div className="card-header">
                    <h5 className="card-title">featured ads</h5>
                </div>
                <div className="ad-details-feature slider-arrow sub-slider">
                <Slider {...settings}>                       
                  {array.map((item, index) => <Future_card image={item.image} key={index} />)}                       
                </Slider>
                  
                </div>
            </div>
        </>
    )
}

export default FutureProduct