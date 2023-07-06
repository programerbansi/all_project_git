import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import Slider from "react-slick";
import Future_card from '../../../Content/Future_card';
import ProductSlider from './ProductSlider';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { UserValAuthContext } from '../../../Context/UserValContext';
import Button from '../../../InputFunction/Button';
import { userAddWishList, userDeleteWishList } from '../../../../../redux/actions/UserEcommerceAction';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser, getUserToken } from '../../../../../services/LocalStorageUser';
import ReportItem from '../../../Modal/ReportItem';
import RemoveAds from '../../../Modal/RemoveAds';
function ProductDetailCard({ title, image, views, item }) {

    const dispatch = useDispatch();
    const [state, setState] = useState({ nav1: null, nav2: null });
    const [show, setShow] = useState(false);
    const [like, setLike] = useState("far fa-heart");
    const [openReportModal, setOpenReportModal] = useState(false);
    const [openRemoveAdModal, setOpenRemoveAdModal] = useState(false);
    const [likemodel,setLikeModel]=useState(false);

    const val = useContext(UserValAuthContext);
    const navigate = useNavigate();
    const loggedInUser = getLoggedInUser();
    const token = getUserToken();
    var settings123;
    var slider1, slider2;
    useEffect(() => {
        setState({
            nav1: slider1,
            nav2: slider2
        });
    }, [])
    useEffect(() => {
        val?.headerLikeProduct && val?.headerLikeProduct.length > 0 && val?.headerLikeProduct.map((product, index) => {
            if (product.item_id == item?.id) {
                setLike("fas fa-heart")
            }
        })
    }, [val?.headerLikeProduct])
    var settings = {
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

    const handleSliderClick = (item) => {
        // console.log(item)
        setShow(true)
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
    const handleHeartLike = (item) => {
        if (loggedInUser && token) {
            if (like == "fas fa-heart") {
                const del = val?.headerLikeProduct.length > 0 && val?.headerLikeProduct.find((product) => {
                    if (product.item_id == item?.id) {
                        return product.id
                    }
                })
                //  console.log(del)
                const formdata = new FormData();
                formdata.append('id', del.id);
                dispatch(userDeleteWishList(formdata, setLike, loggedInUser.id))
                setLike("far fa-heart")
            }
            else {

                const formdata = new FormData();
                formdata.append('item_id', item.id);
                dispatch(userAddWishList(formdata, setLike, loggedInUser.id))
                setLike("fas fa-heart")
            }
        }
        else {
            setOpenRemoveAdModal(true);
            setLikeModel(true);
            // navigate('/login')
        }
    }

    const handleReportItem = () => {
        setOpenReportModal(true);
    }
    return (
        <>
            {
                openRemoveAdModal && <RemoveAds  action={likemodel?"likeheart":""} likemodel={likemodel} setLikeModel={setLikeModel} openRemoveAdModal={openRemoveAdModal} setOpenRemoveAdModal={setOpenRemoveAdModal} />
            }
            {openReportModal && <ReportItem show={openReportModal} setShow={setOpenReportModal} item={item}/>}
            <div className="common-card">
            <p className='table-text mt-3' style={{ fontSize: "14px" }} title={`${item?.brand?.name || "-"}/${item?.category?.name || "-"} /${item?.types?.name || "-"}`}>{item?.brand?.name || "-"} / {item?.category?.name || "-"} / {item?.types?.name || "-"}/ {item?.subcategory?.name || "-"}</p>             
                <h5 className="ad-details-address">1420 west jalkuri, shiddirganj, Narayanganj</h5>
                <h3 className="ad-details-title">{title}</h3>
                <div className="ad-details-meta">
                    <a className="view"><i className="fas fa-eye" /><span><strong>({views})</strong>preview</span></a>
                    <a className="click"><i className="fas fa-mouse" /><span><strong>(76)</strong>click</span></a>
                    <a href="#review" className="rating"><i className="fas fa-star" /><span><strong>({item?.avgreviews?.avg ? Number(item?.avgreviews?.avg) : 0})</strong>average review</span></a>
                </div>
                <div className="ad-details-slider-group  sub-slider">
                    <div className="ad-details-slider ">
                        <Slider {...settings}
                            asNavFor={state.nav2}
                            // autoplay={true}
                            ref={slider => (slider1 = slider)}
                        >
                            {image.map((item, index) => <ProductSlider image={item.image} key={index} event={() => handleSliderClick(image)} height="450px" />)}
                        </Slider>
                    </div>
                </div>
                <div className="feature-thumb-slider">
                    <Slider
                        asNavFor={state.nav1}
                        ref={slider => (slider2 = slider)}
                        slidesToShow={image.length<2 ? 1 :image.length==2?2:3}
                        focusOnSelect={true}
                        centerMode={true}
                        // autoplay={true}
                        responsive={ [
                            {
                              breakpoint: 1024,
                              settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                // infinite: true,
                                // dots: true
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
                                slidesToScroll: 1,
                                initialSlide: 1
                              }
                            }
                          ]}
                    >
                        {image.map((item, index) => <ProductSlider image={item.image} key={index} height="120px" />)}
                    </Slider>
                </div>
                <div className="ad-details-action mt-4">
                    <Button type="submit" className="wish" icon={like} name="bookmark" event={() => handleHeartLike(item)}></Button>
                     <button type="button" onClick={() => handleReportItem(item)}><i className="fas fa-exclamation-triangle" />report</button>
                    <button type="button" data-toggle="modal" data-target="#ad-share"><i className="fas fa-share-alt" />share
                    </button>
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
                        {image.map((item, index) => <ProductSlider image={item.image} item={image} key={index} />)}
                    </Slider>
                </Modal>
            </div>

        </>
    )
}

export default React.memo(ProductDetailCard)