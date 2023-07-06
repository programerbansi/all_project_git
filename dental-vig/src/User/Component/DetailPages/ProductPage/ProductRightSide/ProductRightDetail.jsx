import React,{useEffect} from 'react'
import PDescription from './PDescription'
import ProductDetailCard from './ProductDetailCard'
import ReviewShow from './Reviews/ReviewShow'
import Specification from './Specification/Specification'
const ProductRightDetail = ({title,description,image,views,item}) => {
    return (
        <>
          <ProductDetailCard title={title} image={image} views={views} item={item}/>
          <Specification item={item}/>
          <PDescription description={description}/>
          <ReviewShow item={item}/>
        </>
    )
}

export default React.memo(ProductRightDetail)