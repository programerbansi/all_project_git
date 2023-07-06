import React from 'react'
import FilterbyBrand from './FilterbyBrand';
import FilterbyCategory from './FilterbyCategory';
import FilterbyPrice from './FilterbyPrice'
import FilterbyRating from './FilterbyRating'
import FilterbyType from './FilterbyType';

const Ad_Leftside = ({obj}) => {
    return (
        <>
            <div className="col-lg-4 col-xl-3">
                <div className="row">
                    <FilterbyPrice />
                    <FilterbyType filterState={obj}/>
                    <FilterbyCategory filterState={obj}/>
                    <FilterbyBrand filterState={obj}/>
                    <FilterbyRating filterState={obj}/>
                </div>
            </div>
        </>
    )
}
export default React.memo(Ad_Leftside)