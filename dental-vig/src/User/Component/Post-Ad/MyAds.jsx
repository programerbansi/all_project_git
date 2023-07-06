import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserProduct } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser, getUserToken } from '../../../services/LocalStorageUser';
import AddPostTabs from './AddPostTabs'
import Product_Card from '../Ad-List/Product_Card';
import { GetUserWishList } from '../../../redux/actions/UserEcommerceAction';
import SearchSelectBox from '../InputFunction/SearchSelectBox';
import { useState } from 'react';
import PendingAds from './PendingAds';
import LeftAds from '../Advertisement/LeftAds';
import RightAds from '../Advertisement/RightAds';
import RejectedAds from './RejectedAds';
import Button from '../InputFunction/Button';
import { AD_POST, USER_LOGIN } from '../../../services/UserRoutePath';
import { useNavigate } from 'react-router-dom';
import SoldOutAds from './SoldOutAds';
const MyAds = ({ left_ads, right_ads }) => {
    const dispatch = useDispatch();
    const userid = getLoggedInUser();
    const [filter, setFilter] = useState({ label: 'All Ads', value: 'All Ads' });
    let user = getLoggedInUser();
    let token = getUserToken();
    const navigate = useNavigate();

    let load = false;
    useEffect(() => {
        if (!load) {
            // dispatch(GetUserProduct(userid?.id))
            // dispatch(GetUserWishList(userid?.id))

        }
       return ()=>{load=true}
    }, [dispatch])
    let userProduct = useSelector((d) => d.UserEcommerceReducer.userproduct);
    let pedding_ads = userProduct?.filter((item) => {
        return item?.status == 0
    })
    let likeproduct = useSelector((d) => d.UserEcommerceReducer.userwishlist);

    const adOptions = [{ label: 'Aprroved Ads', value: 'Aprroved Ads' }, { label: 'Pending Ads', value: 'Pending Ads' }, { label: 'Rejected Ads', value: 'Rejected Ads' }, { label: 'All Ads', value: 'All Ads' }, { label: 'Sold-Out Ads', value: 'Sold-Out Ads' }]

    const handleClick = () => {
     
         token ? navigate(AD_POST) : navigate(USER_LOGIN)
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
                      
                        {
                            userProduct.length > 0 ?

                                <div className="container pt-5">
                                    <div className="row">
                                        {pedding_ads?.length > 0 ? <div className="col-lg-12 ">
                                            <div className="dash-header-alert alert fade show mt-0 mb-3 py-2">
                                                <p style={{ marginTop: "8px" }}>Pending ads will be approve by admin .</p><button data-dismiss="alert"><i className="fas fa-times" /></button>
                                            </div>
                                        </div> : null}

                                        <div className="col-lg-12 ">
                                            <div className="header-filter d-flex justify-content-end">                                              
                                                <div className="filter-short"><label className="filter-label">Short by :</label>
                                                    <SearchSelectBox
                                                        option={adOptions}
                                                        select={false}
                                                        name="Ad"
                                                        value={filter}
                                                        setFilter={setFilter}
                                                    />                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {
                                            filter.value == 'All Ads' ?
                                                userProduct.length > 0 && userProduct.map((item, index) => {
                                                    return <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 my-2" key={index}>
                                                        <Product_Card myAd={'All Ads'}
                                                            height={"253px"}
                                                            item={item} key1={index} likeproduct={likeproduct} className="product-card" image={<img src='images/image_not/image_not1.png' style={{ height: "253px" }}></img>} />

                                                    </div>
                                                })
                                                :
                                                filter.value == 'Pending Ads' ?
                                                    <PendingAds userProduct={userProduct} />
                                                    :
                                                    filter.value == 'Rejected Ads' ?
                                                        <RejectedAds userProduct={userProduct} /> :
                                                        filter.value == 'Sold-Out Ads' ?
                                                            <SoldOutAds userProduct={userProduct} /> :
                                                            userProduct.length > 0 && userProduct.map((item, index) => {
                                                                return item?.status == 1 && <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 my-2" key={index}> <Product_Card myAd={true} item={item} key1={index} likeproduct={likeproduct} className="product-card" image={<img src='images/image_not/image_not1.png'></img>} /></div>
                                                            })
                                        }
                                    </div>
                                   
                                </div> :
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-12">
                                            <div className=' d-flex justify-content-center'>
                                                <img src="/images/dental-vig-images/My-Ads/no-publications.webp" alt="image" />
                                            </div>
                                            <h4 className='text-center mb-5 pt-4' style={{ color: 'rgb(161 161 161)' }}>you haven't listed anything yet</h4>

                                        </div>
                                        <div className='col-md-3 col-6'>
                                            <Button name="Start selling" type="submit" link="" className="btn btn-outline post-btn d-block m-auto" event={handleClick} />
                                        </div>
                                    </div>
                                </div>
                        }
                        <div className='col'>
                            <RightAds right_ads={right_ads} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MyAds