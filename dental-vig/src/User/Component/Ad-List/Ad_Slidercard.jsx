import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserValAuthContext } from '../Context/UserValContext'
import Moment from 'react-moment';
const Ad_Slidercard = ({ item }) => {
    const val=useContext(UserValAuthContext);
    const navigate=useNavigate();
    const handleClickLink1 = (item) => {
        val.setDetailSlug(item?.slug)
            navigate(`/${item?.slug}`, { state: item });
    }
    return (
        <>
            <div className='right-slider-main'> 
                <div className="feature-card"><a href="#" className="feature-img">
                     {item?.itemimage?.length > 0 ? <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}${item?.itemimage[0]?.image}`}/>:null}
                  </a>
                    <div className="feature-content text-white">
                    <p className='table-text mt-3' style={{ fontSize: "14px" }} title={`${item?.brand?.name || "-"}/${item?.category?.name || "-"} /${item?.types?.name || "-"}`}>{item?.brand?.name || "-"} / {item?.category?.name || "-"} / {item?.types?.name || "-"}</p>
                       <h3 className="feature-title">
                             <a onClick={() => handleClickLink1(item)}>{item?.name}</a>
                            </h3>
                        <div className="feature-meta">
                            <span className="feature-price">₹ {new Intl.NumberFormat('en-IN').format(item?.price)}</span>
                            <span className="feature-time"><i className="fas fa-clock" /><Moment fromNow ago>{item?.created_at}</Moment></span>
                        </div>
                    </div>
                </div>
                  
            </div>
        </>
    )
}

export default React.memo(Ad_Slidercard)