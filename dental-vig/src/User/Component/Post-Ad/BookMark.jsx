import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { GetUserWishList } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser, getUserToken } from '../../../services/LocalStorageUser';
import Product_Card from '../Ad-List/Product_Card';
import LeftAds from '../Advertisement/LeftAds';
import RightAds from '../Advertisement/RightAds';
import Button from '../InputFunction/Button';
import AddPostTabs from './AddPostTabs'

const BookMark = ({ left_ads, right_ads }) => {
    const dispatch = useDispatch();
    const userid = getLoggedInUser();
    let token = getUserToken();
    const navigate = useNavigate();

    let load = false;
    useEffect(() => {
        if (!load) {
            // dispatch(GetUserWishList(userid?.id))
        }
        load = true;
    }, [dispatch])

    let likeproduct = useSelector((d) => d.UserEcommerceReducer.userwishlist);

    const handleClick = () => {
        navigate('/')
    }
    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            <AddPostTabs />
            <section className="myads-part">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>
                            <LeftAds left_ads={left_ads} />
                        </div>                
                        <div className="container pt-3 mb-3">                    
                            <div className="row">
                                {
                                    likeproduct.length > 0 ? likeproduct.map((item, index) => {
                                        return <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 my-2" key={index}> <Product_Card item={item.items} key1={index} likeproduct={likeproduct} height={"253px"} image={<img src='images/image_not/image_not1.png' style={{ height: "253px" }}></img>} className="product-card" /></div>
                                    }) :
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <div className="col-12">
                                                    <div>
                                                        <img src="/images/dental-vig-images/Bookmark/no-favorites.webp" alt="image" />
                                                    </div>
                                                    <h4 className='text-center mb-2 pt-4' style={{ color: 'rgb(161 161 161)' }}>You haven't liked any ads yet</h4>
                                                    <p className='text-center mb-5' style={{ color: 'rgb(191 190 190)',width:'150px',display:'block',margin:'auto',fontWeight:'500'}}>Like ads and share them with the world</p>

                                                </div>
                                                <div className='col-md-3 col-6'>
                                                    <Button name="Discover" type="submit" link="" className="btn btn-outline post-btn d-block m-auto" event={handleClick} />
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>                         
                        </div>
                        <div className='col'>
                            <RightAds right_ads={right_ads} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BookMark