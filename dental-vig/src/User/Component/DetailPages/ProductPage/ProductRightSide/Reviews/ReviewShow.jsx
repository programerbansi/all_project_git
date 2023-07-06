import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { GET_REVIEWS, getDatas, getReviews } from '../../../../../../redux/actions/UserEcommerceAction';
import { VIEW_ALL_REVIEWS } from '../../../../../../services/UserRoutePath';
import ReviewInner from './ReviewInner'
import { useQuery } from 'react-query';

function ReviewShow({ item }) {
    const dispatch = useDispatch();
    let reviews = useSelector((state) => state.UserEcommerceReducer.reviews);
    const [page, setPage] = useState(1);
    const fetchData = async () => {
        dispatch(getDatas(`getreview_created_by_item/${item?.id}?page=${page}`,GET_REVIEWS))
    };
    const query = useQuery('brand', fetchData);
    if (query.isLoading) {
        return console.log("Loading..")
    }
    if (query.error) {
        return console.log(query.error.message)
    }
  
    return (
        <>
            {
                reviews?.length > 0 &&
                <div className="common-card pb-1" id="review">
                    <div className="card-header">
                        <h5 className="card-title">reviews ({reviews?.length})</h5>
                    </div>
                    <div className="ad-details-review">
                        <ul className="review-list">
                            {
                                reviews && reviews.map((r, index) => {if(index < 3) return <ReviewInner review={r} key={index} />})
                            }                    
                        </ul>
                       { reviews?.length > 0 && <NavLink to={VIEW_ALL_REVIEWS} state={{reviews,item}} className='px-1'>See all reviews</NavLink>}
                    </div>
                </div>
            }
        </>
    )
}

export default React.memo(ReviewShow)