import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SHOW_ALL_ADS } from '../../../services/UserRoutePath'
import Banner from '../Banner/Banner'
import Ad_Leftside from './Ad_Leftside'
import Ad_Rightside from './Ad_Rightside';
import '../../Css/Banner.css';
import LeftAds from '../Advertisement/LeftAds'
import '../../Css/Advertisement.css'
import RightAds from '../Advertisement/RightAds'
import { UserValAuthContext } from '../Context/UserValContext'

const Ad_List = ({ left_ads, right_ads }) => {
  const location = useLocation();
  const val = useContext(UserValAuthContext)
  return (
    <>

      <section className={`inner-section ad-list-part${location.pathname == SHOW_ALL_ADS ? 'mt-2 pt-2' : ''}`}>
        <div className='container-fluid'>
          <div className='row'>
            <div className="col" >
              {left_ads ? <LeftAds left_ads={left_ads} /> : null}
            </div>
            <div className="container mt-5 container-width">
              <div className="row content-reverse">
                {
                  val?.gsearchAllName && <Ad_Leftside obj={{ filterCategoryId: val.filterCategoryId, setFilterCategoryId: val.setFilterCategoryId, filterBrandId: val.filterBrandId, setFilterBrandId: val.setFilterBrandId, filterTypeId: val.filterTypeId, setFilterTypeId: val.setFilterTypeId, setFilterRatings: val.setFilterRatings, filterRatings: val.filterRatings }} />
                }
                <Ad_Rightside items={location?.state} obj={{ filterCategoryId: val.filterCategoryId, setFilterCategoryId: val.setFilterCategoryId, filterBrandId: val.filterBrandId, setFilterBrandId: val.setFilterBrandId, filterTypeId: val.filterTypeId, setFilterTypeId: val.setFilterTypeId, setFilterRatings: val.setFilterRatings, filterRatings: val.filterRatings }} />
              </div>
            </div>
            <div className='col' style={{ right: "0px" }}>
              {right_ads ? <RightAds right_ads={right_ads} /> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Ad_List