import React from 'react'
import { getLoggedInUser } from '../../../../../services/LocalStorageUser'
import AreaMap from './AreaMap'
import AutherCard from './AutherCard'
import Card1 from './Card1'
import FutureProduct from './FutureProduct'
import MakeOffer from './MakeOffer'
import SafetyTips from './SafetyTips'

const ProductLeftDetail = ({ price ,user,id,negotiable_price}) => {
  let loggedInUser = getLoggedInUser();
  return (
    <>
      <Card1 price={price} negotiable_price={negotiable_price}/>
      <AutherCard user={user}/>
      {
        (user?.id == loggedInUser?.id || !loggedInUser)  ? null : <MakeOffer user={user} id={id}/>
      }
      <AreaMap />
      <SafetyTips />
      <FutureProduct />
    </>
  )
}

export default React.memo(ProductLeftDetail)