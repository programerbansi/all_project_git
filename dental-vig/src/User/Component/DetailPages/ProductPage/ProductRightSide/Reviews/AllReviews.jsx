import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { getHighToLowReviews, getLowToHighReviews, getRecentReviews } from '../../../../../../redux/actions/UserEcommerceAction';
import '../../../../../Css/AllReviews.css';
import ProductSlider from '../ProductSlider';

const AllReviews = () => {

    const { state } = useLocation();
    const [reviews,setReviews] = useState(state?.reviews);
    const [item,setItem] = useState(state?.item);
    const [globalRatings, setGlobalRatings] = useState(Math.round(Number(state?.item?.avgreviews?.avg)));
    const [fiveRatings, setFiveRatings] = useState(reviews?.filter((r) => r.star == 5)?.length);
    const [fourRatings, setFourRatings] = useState(reviews?.filter((r) => r.star == 4)?.length);
    const [threeRatings, setThreeRatings] = useState(reviews?.filter((r) => r.star == 3)?.length);
    const [twoRatings, setTwoRatings] = useState(reviews?.filter((r) => r.star == 2)?.length);
    const [oneRatings, setOneRatings] = useState(reviews?.filter((r) => r.star == 1)?.length);
    const [totalRatings, setTotalRatings] = useState(fiveRatings + fourRatings + threeRatings + twoRatings + oneRatings);
    const [showTxt, setShowTxt] = useState(false);

    const dispatch = useDispatch();

    const countPercentage = (ratings) => {
        let percent = ratings * 100 / totalRatings;
        return <div style={{ width: `${percent}%` }} className='border-radius percentage-div'></div>
    }

    const options = ['high-to-low', 'low-to-high', 'recent-reviews','all-reviews'];

    let high_to_low_reviews = useSelector((state)=>state.UserEcommerceReducer.high_to_low_reviews);
    let low_to_high_reviews = useSelector((state)=>state.UserEcommerceReducer.low_to_high_reviews);
    let recent_reviews = useSelector((state)=>state.UserEcommerceReducer.recent_reviews);

    const handleSelectedOption = (option) =>{
        switch (option) {
            case options[0]:
                if(!high_to_low_reviews || high_to_low_reviews?.length < 1){dispatch(getHighToLowReviews(item?.id,setReviews))}
                else{setReviews(high_to_low_reviews)}
                break;
            case options[1]:
                if(!low_to_high_reviews || low_to_high_reviews?.length < 1){dispatch(getLowToHighReviews(item?.id,setReviews))}
                else{setReviews(low_to_high_reviews)}
                break;
            case options[2]:
                if(!recent_reviews || recent_reviews?.length < 1){dispatch(getRecentReviews(item?.id,setReviews))}
                else{setReviews(recent_reviews)}
                break;
            case options[3]:
                setReviews(state?.reviews)
                break;
            default:
                break;
        }
    }

    const [show,setShow] = useState(false);
    const [sliderState, setSliderState] = useState({ nav1: null, nav2: null });
    const [media,setMedia] = useState([]);
    var settings123;
    var slider1, slider2;

    useEffect(() => {
        setSliderState({
            nav1: slider1,
            nav2: slider2
        });
    }, [])

    const handleSliderClick = (item,assets) => {
        setMedia((media)=>[item,...assets?.filter((m)=>m !== item)]);
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
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-5 col-12">
                    <h3 className='my-1'>Customer reviews</h3>
                    <ul className='d-flex'>
                        {
                            globalRatings && Array.from({ length: 5 }, (_, i) => i + 1).map((num, index) => <li key={index}><i style={{ color: num <= globalRatings ? '#ffcc23' : '#bbbbbb' }} className={`fas fa-star`} /></li>)

                        }
                        <h6 className='h6'> - {Number(state?.item?.avgreviews?.avg)} out of 5</h6>
                    </ul>
                    <p className='text'>global Ratings</p>
                    <ul className='w-100'>
                        <span className='d-flex my-2'><small className='small'>5 star </small><li className='w-50 mx-1 percentage-li border-radius'>{countPercentage(fiveRatings)}</li><small className='small'>{fiveRatings * 100 / totalRatings} %</small></span>

                        <span className='d-flex my-2'><small className='small'>4 star </small><li className='w-50 mx-1 percentage-li border-radius'>{countPercentage(fourRatings)}</li><small className='small'>{fourRatings * 100 / totalRatings} %</small></span>

                        <span className='d-flex my-2'><small className='small'>3 star </small><li className='w-50 mx-1 percentage-li border-radius'>{countPercentage(threeRatings)}</li><small className='small'>{threeRatings * 100 / totalRatings} %</small></span>

                        <span className='d-flex my-2'><small className='small'>2 star </small><li className='w-50 mx-1 percentage-li border-radius'>{countPercentage(twoRatings)}</li><small className='small'>{twoRatings * 100 / totalRatings} %</small></span>

                        <span className='d-flex my-2'><small className='small'>1 star </small><li className='w-50 mx-1 percentage-li border-radius'>{countPercentage(oneRatings)}</li><small className='small'>{oneRatings * 100 / totalRatings} %</small></span>
                    </ul>
                </div>
                <div className="col-md-7 col-12">
                    <div className="row w-100 m-0">
                        <div className="col-2 p-0">
                            {
                                state?.item?.itemimage[0]?.image ? <img className='item-img my-2' src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}${state?.item?.itemimage[0]?.image} `} /> : <img className='item-img my-2' src='images/image_not/image_not1.png' />
                            }
                        </div>
                        <div className="col-10 p-0">
                            <p className='item-name'>{state?.item?.name}</p>
                            <p>{state?.item?.brand?.name || "-"} | {state?.item?.category?.name || "-"} | {state?.item?.types?.name || "-"}</p>
                        </div>
                    </div>
                    <div className="row w-100 m-0">
                        <span onClick={() => setShowTxt(!showTxt)} className='d-flex'><i className={`${showTxt ? 'fas fa-angle-down' : 'fas fa-angle-up'}`} style={{ fontSize: "24px", marginRight: "8px",cursor:'pointer'}}> </i><p className='ratings-calculatoin-text'>How are ratings calculated?</p></span>
                        <p className={`${showTxt ? 'd-block' : 'd-none'}`}>
                            To calculate the overall star rating and percentage breakdown by star, we don’t use a simple average. Instead, our system considers things like how recent a review is and if the reviewer bought the item on Dental-vig. It also analyses reviews to verify trustworthiness.
                        </p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-8">
                    <p className='filter-text'>Filter by ratings</p>
                </div>
                <div className="col-8">
                    <div className="nice-select select notify-select px-3 filter-dropdown" tabIndex={0}>
                        <span className="current">All reviews</span>
                        <ul className="list" id='nice'>
                            {
                                options?.map((option, index) =>
                                    <li data-value className="option" onClick={() => handleSelectedOption(option)} key={index}>{option}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
            {
                reviews && reviews.map((review, index) =>
                    <div className='row justify-content-start my-2 p-2 mx-0' key={index} style={{ backgroundColor: 'rgb(242 248 255 / 29%)' }}>
                        <div className="col-12">
                            <div className="review-head" style={{ marginBottom: '5px' }}>
                                <div className="review-profile">
                                    <a href="#" className="review-avatar" style={{ width: '45px', height: "45px" }}>
                                        {
                                            review?.users?.image ? <img className='w-100 h-100' src={`${process.env.REACT_APP_USER_IMAGE_URL}${review?.users?.image}`} /> : <img src="/images/user.png" alt="review" className='w-100 h-100' />
                                        }
                                    </a>
                                    <div className="review-meta">
                                        <h6 className='mb-0'>                     
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
                        </div>
                        <div className="col-12">
                            <p className="review-desc mb-2">{review?.description}</p>
                        </div>
                        <div className="col-12 d-flex">
                            {

                                review?.media && JSON.parse(review?.media).map((m, index) => {
                                    if (m.split('.').pop() === 'mp4') {
                                        return <div style={{ height: '40px', width: '40px', margin: '2px', padding: '5px' }} onClick={()=>handleSliderClick(m,JSON.parse(review?.media))} key={index} >
                                            <video style={{ borderRadius: '5px' }} className='w-100 h-100' src={`${process.env.REACT_APP_REVIEW_MEDIA_IMAGE_URL}/${m}`} controls={false} />
                                        </div>

                                    }
                                    else {
                                        return <div style={{ height: '40px', width: '40px', margin: '2px', padding: '5px' }} onClick={()=>handleSliderClick(m,JSON.parse(review?.media))} key={index}>
                                            <img style={{ borderRadius: '5px' }} className='w-100 h-100' src={`${process.env.REACT_APP_REVIEW_MEDIA_IMAGE_URL}/${m}`} alt="image" />
                                        </div>
                                    }
                                })
                            }
                        </div>
                    </div>)
            }
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
        </div>
    )
}

export default AllReviews
