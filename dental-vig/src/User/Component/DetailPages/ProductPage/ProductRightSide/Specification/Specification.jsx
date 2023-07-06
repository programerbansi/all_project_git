import moment from 'moment'
import React from 'react'
function Specification({ item }) {
    const obj=[
        {title:"Price:",data:new Intl.NumberFormat('en-IN').format(item?.price)},
        {title:"Condition:",data:item?.item_condition},
        {title:"Category:",data:item?.category?.name},
        {title:"Brand:",data:item?.brand?.name},
        {title:"Published:",data:moment(item?.created_at).format("MMM Do YY")},
        {title:"Quantity:",data:item?.quantity},
    ]
    return (
        <>
            <div className="common-card">
                <div className="card-header">
                    <h5 className="card-title">Specification</h5>
                </div>
                <ul className="ad-details-specific">
                    {obj && obj.map((i,idx)=>{
                        return   <li key={idx}>
                        <h6>{i.title}</h6>
                        <p>{i.data}</p>
                    </li>     
                    })}                                   
                </ul>
            </div>
        </>
    )
}

export default Specification