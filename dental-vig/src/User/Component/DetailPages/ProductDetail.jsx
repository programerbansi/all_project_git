import React from 'react'
import LeftAds from '../Advertisement/LeftAds'
import RightAds from '../Advertisement/RightAds'
import ProductLeftDetail from './ProductPage/ProductLeftSide/ProductLeftDetail'
import ProductRightDetail from './ProductPage/ProductRightSide/ProductRightDetail'

const ProductDetail = ({ id, price,negotiable_price, title, description, image, user, condition, brand_name, category_name, left_ads, right_ads, views, quantity ,item}) => {
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <LeftAds left_ads={left_ads} />
                    </div>          
                    <div className="container">
                        <div className="row content-reverse">
                            <div className="col-lg-4">
                                <ProductLeftDetail price={price} user={user} id={id} quantity={quantity} item={item} negotiable_price={negotiable_price}/>
                            </div>
                            <div className="col-lg-8">
                                <ProductRightDetail title={title} description={description} price={price} image={image} condition={condition} brand_name={brand_name}
                                    category_name={category_name} views={views} quantity={quantity} item={item}/>
                            </div>
                        </div>
                    </div>               
                    <div className='col'>
                        <RightAds right_ads={right_ads} />
                    </div>

                </div>
            </div>

        </>
    )
}

export default React.memo(ProductDetail)