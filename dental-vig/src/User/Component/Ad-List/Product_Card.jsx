import React, { useState, useEffect, useRef } from 'react'
import Moment from 'react-moment';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedProductDetail, GetUserWishList, userAddWishList, userDeleteWishList } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser, getUserRole } from "../../../services/LocalStorageUser";
import '../../Css/AdPost.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Button from '../InputFunction/Button';
import { useContext } from 'react';
import { UserValAuthContext } from '../Context/UserValContext';
import { AD_POST, MY_ADS } from '../../../services/UserRoutePath';
import $ from 'jquery';
import RemoveAds from '../Modal/RemoveAds';
import SoldAd from '../Modal/SoldAd';

const Product_Card = ({ myAd, image, item, className, likeproduct, key1, newarray, height, key, index }) => {

    const navigate = useNavigate();
    const role = getUserRole();
    const [like, setLike] = useState("far fa-heart");
    const [hover, setHover] = useState(false);
    const [openAction, setOpenActions] = useState(false);
    const userid = getLoggedInUser();
    const dispatch = useDispatch();
    const [soldAd, setsoldAd] = useState('sold');
    const [deleteItemId, setDeleteItemId] = useState();
    const [deleteItemUserId, setDeleteItemUserId] = useState();
    const [product, setProduct] = useState();
    const [openSoldAdModal, setOpenSoldAdModal] = useState(false);
    const [remove, setRemove] = useState('remove');
    const [openRemoveAdModal, setOpenRemoveAdModal] = useState(false);
    const [likemodel, setLikeModel] = useState(false);
    const val = useContext(UserValAuthContext);
    useEffect(() => {
        likeproduct.length > 0 && likeproduct.map((product, index) => {
            if (product.item_id == item?.id) {
                setLike("fas fa-heart")
            }
        })
    }, [likeproduct])
    const heartclick = (item, likeproduct) => {
        if ((myAd == 'All Ads' && (item?.status == 0 || item?.status == 3))) {
            return
        }
        else {
            if (role == "user") {
                if (like == "fas fa-heart") {
                    const del = likeproduct.length > 0 && likeproduct.find((product) => {
                        if (product.item_id == item?.id) {
                            return product.id
                        }
                    })             
                    const formdata = new FormData();
                    formdata.append('id', del.id);
                    dispatch(userDeleteWishList(formdata, setLike, userid.id))
                    setLike("far fa-heart")
                }
                else {

                    const formdata = new FormData();
                    formdata.append('item_id', item.id);
                    dispatch(userAddWishList(formdata, setLike, userid.id))
                    setLike("fas fa-heart")
                }
            }
            else {
                setOpenRemoveAdModal(true);
                setLikeModel(true);
            }
        }
    }
    const handleClickLink1 = (item) => {
        val.setDetailSlug(item?.slug)
        if (myAd == 'All Ads' && item?.status == 0) {
            return
        }
        else {
            window.open(`/${item?.slug}`, '_blank', 'noopener,noreferrer');
        }
    }

    const actionOptions = [{ name: 'Remove', action: 'remove' }, { name: 'Edit', action: 'edit' }, { name: 'Mark as sold', action: 'sold' }];
    const pendingActionOptions = [{ name: 'Remove', action: 'remove' }, { name: 'Edit', action: 'edit' }];
    const soldActionOptions = [{ name: 'Remove', action: 'remove' }];

    const handleActionNavigate = (a, item) => {

        if (a?.action == 'edit') { navigate(AD_POST, { state: item }); setRemove(''); setsoldAd('') }
        else { setRemove(() => a?.action); setsoldAd(a?.action) }

        if (a.action == 'remove') {

            setOpenRemoveAdModal(true);
            setDeleteItemId(item?.id);
            setDeleteItemUserId(item?.users?.id)
        }
        else if (a.action == 'sold' && item?.status !== 0) {
            setOpenSoldAdModal(true);
            setProduct(() => item)
        }

    }
    const handleDisableClick = () => {
        $("#name-click").off('click');
        $("#media-click").off('click');
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpenActions(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <>
            {
                openRemoveAdModal && <RemoveAds item_id={deleteItemId} userid={deleteItemUserId} setRemove={setRemove} action={likemodel ? "likeheart" : "remove"} likemodel={likemodel} setLikeModel={setLikeModel} openRemoveAdModal={openRemoveAdModal} setOpenRemoveAdModal={setOpenRemoveAdModal} />
            }
            {
                openSoldAdModal && <SoldAd product={product} setProduct={setProduct} openSoldAdModal={openSoldAdModal} setOpenSoldAdModal={setOpenSoldAdModal} />
            }
            {

                <div className={`w-100 h-100 ${item?.status == 2 ? 'reject-overlay' : ''}`} key={key1}>
                    <div className={className} key={key1} style={{ position: item?.status == 2 ? '' : null, opacity: (item?.status == 2) ? 1 : 1 }} ref={wrapperRef}>
                        <div className="product-media" id='media-click' onClick={() => item?.status == 2 ? handleDisableClick() : handleClickLink1(item, index)}>
                            {
                                myAd && item?.status == 0 ? <div className="product-type"><span className="flat-badge pending">pending</span></div> :
                                    myAd && item.status == 1 ?
                                        <div className="product-type"><span className="flat-badge approve">approved</span></div>
                                        : myAd && item.status == 2 ?
                                            <div className="product-type"><span className="flat-badge rejected">Rejected</span></div> :
                                            myAd && item.status == 3 &&
                                            <div className="product-type"><span className="flat-badge sold">Sold</span></div>

                            }
                            <div className="product-img">
                                {item?.itemimage?.length > 0 ? <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}${item?.itemimage[0]?.image}`} style={{
                                    height: height, background: `url(${process.env.REACT_APP_ITEMS_IMAGE_URL}${item?.itemimage[0]?.image})`,
                                    background: 'rgba(255, 0, 0, 0) '
                                }} /> : image}
                            </div>
                           
                            <ul className="product-action">
                                <li className="view"><i className="fas fa-eye" /><span>{item?.itemviews?.length}</span></li>
                                <li className="click"><i className="fas fa-mouse" /><span>134</span></li>
                                <li className="rating"><i className="fas fa-star" />
                                
                                    <span>{item?.avgrat == null ? 0 : item?.avgrat}/5</span>
                                </li>
                            </ul>
                        </div>
                        <div className="product-content">
                            <p className='table-text mt-3' style={{ fontSize: "14px" }} title={`${item?.brand?.name || "-"}/${item?.category?.name || "-"} /${item?.types?.name || "-"}`}>{item?.brand?.name || "-"} / {item?.category?.name || "-"} / {item?.types?.name || "-"}/ {item?.subcategory?.name || "-"}</p>
                           
                            <div className='product-title-div'>
                                <h5 className="product-title">
                                    <a id='name-click' onClick={() => item?.status == 2 ? handleDisableClick() : handleClickLink1(item, index)}>{item?.name}</a>
                                </h5>
                            </div>
                            <div>
                                <p className='table-text mt-0'>{item?.location?.citi?.name} / {item?.location?.state?.name}</p>

                               
                            </div>
                            
                            <div className="product-meta">
                               
                                <span><i className="fas fa-clock" /><Moment fromNow ago>{item?.created_at}</Moment></span>
                            </div>
                            <div className="product-info">
                                <h5 className="product-price">₹ {new Intl.NumberFormat('en-IN').format(item?.price)}
                                    
                                </h5>
                                <div className="product-btn">
                                 
                                    {
                                        myAd && item.status == 1 ?
                                            <>
                                                <button type='button' className='fas fa-ellipsis-h' onClick={() => setOpenActions(!openAction)}>
                                                </button>
                                                <div style={{ display: openAction ? 'flex' : 'none', flexDirection: 'column', position: 'absolute', top: '98%', zIndex: '3', backgroundColor: 'white', left: '68%', width: '130px', borderRadius: '5px', justifyContent: 'center' }} id='action-container'>
                                                    {
                                                        actionOptions.map((a, index) => <h5 className='heading' key={index} onClick={() => handleActionNavigate(a, item)}>{a?.name}</h5>)
                                                    }

                                                </div>
                                            </>
                                            : (item?.status == 0) ?
                                                <>
                                                    <button type='button' className='fas fa-ellipsis-h' onClick={() => setOpenActions(!openAction)}>
                                                    </button>
                                                    <div style={{ display: openAction ? 'flex' : 'none', flexDirection: 'column', position: 'absolute', top: '98%', zIndex: '3', backgroundColor: 'white', left: '68%', width: '130px', borderRadius: '5px', justifyContent: 'center' }} id='action-container'>
                                                        {
                                                            pendingActionOptions.map((a, index) => <h5 className='heading' key={index} onClick={() => handleActionNavigate(a, item)}>{a?.name}</h5>)
                                                        }

                                                    </div>
                                                </>
                                                : (item?.status == 3) &&
                                                <>
                                                    <button type='button' className='fas fa-ellipsis-h' onClick={() => setOpenActions(!openAction)}>
                                                    </button>
                                                    <div style={{ display: openAction ? 'flex' : 'none', flexDirection: 'column', position: 'absolute', top: '98%', zIndex: '3', backgroundColor: 'white', left: '68%', width: '130px', borderRadius: '5px', justifyContent: 'center' }} id='action-container'>
                                                        {
                                                            soldActionOptions.map((a, index) => <h5 className='heading' key={index} onClick={() => handleActionNavigate(a, item)}>{a?.name}</h5>)
                                                        }

                                                    </div>
                                                </>
                                    }
                                    <button type="button" title="Like" className={like} onClick={() => heartclick(item, likeproduct)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default React.memo(Product_Card)