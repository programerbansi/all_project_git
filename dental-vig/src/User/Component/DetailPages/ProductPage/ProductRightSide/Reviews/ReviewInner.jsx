import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import Slider from 'react-slick';
import ProductSlider from '../ProductSlider';

function ReviewInner({ review }) {

    const [media, setMedia] = useState([]);
    const [show,setShow] = useState(false);
    const [state, setState] = useState({ nav1: null, nav2: null });

    useEffect(() => {
        if (review?.media) {
            setMedia(JSON.parse(review?.media));
        }
    }, [review])

    var settings123;
    var slider1, slider2;
    useEffect(() => {
        setState({
            nav1: slider1,
            nav2: slider2
        });
    }, [])

    const handleSliderClick = (item) => {
        setMedia((media)=>[item,...media?.filter((m)=>m !== item)]);
        setShow(true);
        settings123 = {
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            // autoplay: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        // dots: true
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
    }

   
    return (
        <li className="review-item" key={review?.id}>
            <div className="review-user">
                <div className="review-head">
                    <div className="review-profile">
                        <a href="#" className="review-avatar">
                            {
                                review?.users?.image ? <img src={`${process.env.REACT_APP_USER_IMAGE_URL}/${review?.users?.image}`} alt="review" /> : <img src="/images/avatar/03.jpg" alt="review" />
                            }
                        </a>
                        <div className="review-meta">
                            <h6>                         
                                <a href="#">{review?.users?.name}-</a>
                                <span>{moment(review?.created_at).format("MMMM D , YYYY")}</span></h6>
                            <ul>
                                {
                                    Array.from({ length: 5 }, (_, i) => i + 1).map((num, index) => <li key={index}><i className={`fas fa-star ${num <= review?.star ? 'active' : ''}`} /></li>)
                                }                           
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="review-desc">{review?.description}</p>
                {
                    media && <div className="row" >
                        <div className="col-12 d-flex">
                            {

                                review?.media && JSON.parse(review?.media).map((m, index) => {
                                    if (m.split('.').pop() === 'mp4') {
                                        return <div key={index} style={{ height: '40px', width: '40px', margin: '2px', padding: '5px' }} onClick={()=>handleSliderClick(m)}>
                                            <video style={{ borderRadius: '5px' }} className='w-100 h-100' src={`${process.env.REACT_APP_REVIEW_MEDIA_IMAGE_URL}/${m}`} controls={false} />
                                        </div>

                                    }
                                    else {
                                        return <div key={index} style={{ height: '40px', width: '40px', margin: '2px', padding: '5px' }} onClick={()=>handleSliderClick(m)}>
                                            <img style={{ borderRadius: '5px' }} key={index} className='w-100 h-100' src={`${process.env.REACT_APP_REVIEW_MEDIA_IMAGE_URL}/${m}`} alt="image" />
                                        </div>
                                    }
                                })
                            }
                        </div>

                    </div>
                }
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className='slider-model'
                centered
            >
                <div className='close-model-slider'><AiOutlineClose onClick={() => setShow(false)} /></div>

                <Slider {...settings123} className="modal-slider">
                    {media && media?.map((item, index) => {
                        if (item.split('.').pop() === 'mp4') {
                            return <ProductSlider image={item} index={index} item={media} key={index} review={'video'} />

                        }
                        else {
                            return <ProductSlider image={item} item={media} index={index} key={index} review={'image'} height="450px"/>
                        }
                    })}
                </Slider>
            </Modal>
        </li>
    )
}

export default React.memo(ReviewInner)