import React, { useEffect } from 'react'
import Slider from "react-slick";
import Product_Card from '../Ad-List/Product_Card';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import { GET_USER_WISHLIST, getDatas, getRelatedProducts, GetUserWishList } from '../../../redux/actions/UserEcommerceAction';
import { useQuery } from 'react-query';

const RelatedAds = ({ item }) => {
    var settings1 = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
    const dispatch = useDispatch();
    const userid = getLoggedInUser();
    const likeproduct = useSelector((d) => d.UserEcommerceReducer.userwishlist); 
    const relateProducts = useSelector((d) => d.UserEcommerceReducer.relateProducts);
    const fetchData = async () => {
        if (userid?.role)  dispatch(getDatas(`user/getwishlistCreatedByUser/${userid?.id}`,GET_USER_WISHLIST));
    };
    const query = useQuery('wishlist', fetchData);
    const fetchData1 = async () => {
        const formdata = new FormData();
            formdata.append('type_id', item?.type_id);
            formdata.append('category_id', item?.category_id);
            formdata.append('brand_id', item?.brand_id);
            dispatch(getRelatedProducts(formdata));
    };
    const query1 = useQuery(['releted',item], fetchData1);
    if (query.isLoading) {
        return console.log("Loading..")
    }
    if (query.error) {
        return console.log(query.error.message)
    }
    if (query1.isLoading) {
        return console.log("Loading..")
    }
    if (query1.error) {
        return console.log(query.error.message)
    }

    return (
        <>
            {
                relateProducts && relateProducts?.length > 0 && <div className="container pt-3">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-center-heading">
                                <h2>Related This <span>Ad</span></h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit aspernatur illum vel sunt libero
                                    voluptatum repudiandae veniam maxime tenetur.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="related-slider slider-arrow">
                                <Slider {...settings1}>
                                    {
                                        relateProducts.map((product, index) => <Product_Card key={index} image={<img src='images/image_not/image_not1.png' style={{ height: "245px" }}></img>} item={product} className="product-card mx-2" height="245px" likeproduct={likeproduct} />)
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default React.memo(RelatedAds)