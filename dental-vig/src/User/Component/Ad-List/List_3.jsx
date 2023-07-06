import React from 'react';
import Product_Card from './Product_Card';
const List_3 = ({ image, item, likeproduct,key1 }) => {
    return (
        <>
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3 product-card-div-main">
                <Product_Card key1={key1} image={image} item={item} likeproduct={likeproduct} className="product-card" height="245px"/>
            </div>
        </>
    )
}

export default React.memo(List_3)