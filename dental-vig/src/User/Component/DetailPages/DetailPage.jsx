import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { CountItemView, GetItemId } from '../../../redux/actions/UserEcommerceAction'
import LeftAds from '../Advertisement/LeftAds'
import Banner from '../Banner/Banner'
import ProductDetail from './ProductDetail'
import RelatedAds from './RelatedAds'
import { useQuery } from 'react-query'
const DetailPage = ({ left_ads, right_ads }) => {
  const { state } = useLocation();
  let page_load = false;
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [slugId, setSlugId] = useState(slug.split('-').pop());
  const productArray = useSelector((d) => d.UserEcommerceReducer.itemById)
  const views = useSelector((d) => d.UserEcommerceReducer.itemview)

  const fetchData = async () => {
    window.scrollTo({ top: 0 })

    const formdata = new FormData();
    formdata.append('name', slug);
    if (state?.id) dispatch(GetItemId(formdata, state?.id))
    else dispatch(GetItemId(formdata, Number(slugId)));
  };
  const query = useQuery('detail', fetchData);
  if (query.isLoading) {
    return console.log("Loading..")
  }
  if (query.error) {
    return console.log(query.error.message)
  }
  // useLayoutEffect(() => {
  //   window.scrollTo({ top: 0 })

  //   const formdata = new FormData();
  //   formdata.append('name', slug);
  //   if(state?.id) dispatch(GetItemId(formdata,state?.id))
  //   else dispatch(GetItemId(formdata,Number(slugId)));
  // }, [dispatch]) 


  return (
    <>
      <section className="inner-section ad-details-part mb-0">
        {productArray && Object.keys(productArray).length > 0 ?
          <ProductDetail
            id={productArray?.id}
            price={productArray?.price}
            negotiable_price={productArray?.negotiable_price}
            title={productArray?.name}
            description={productArray?.description}
            image={productArray?.itemimage}
            user={productArray?.users}
            condition={productArray?.item_condition}
            brand_name={productArray?.brand?.name}
            category_name={productArray?.category?.name}
            quantity={productArray?.quantity}
            views={views}
            item={productArray}
            left_ads={left_ads} right_ads={right_ads}
          /> : null
        }
      </section>
      <section className="inner-section related-part">
        <RelatedAds item={productArray} />
      </section>
    </>
  )
}

export default DetailPage