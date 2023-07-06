import React from 'react'
import EmptyData from './EmptyData'

const RejectedAds = ({ userProduct }) => {

    let rejectedProducts = userProduct.filter((item) => item?.status == 2)
    const header=['Index','Images','Name','Description','Type','Category','Brand','Price','Condition','Status']
    return (
        <>
            <section className="inner-section compare-part w-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                           
                            {
                                rejectedProducts.length > 0 ?
                                    <table className="table table-list table-responsive">
                                        <thead className='table-head'>
                                            <tr style={{ background: '#d30606' }}>
                                                {header && header.map((i,idx)=>{
                                                    return <th scope="col" key={idx} style={{ borderRight: '1px solid white' }}>{i}</th>
                                                })}
                                            </tr>
                                        </thead>
                                        
                                        <tbody className='table-body'>
                                            {
                                                userProduct?.length > 0 && userProduct?.map((item, index) => {
                                                    if (item.status == 2) {
                                                        return <tr key={index} >
                                                            <td >
                                                                <h6 className='table-text'>{index + 1}</h6>
                                                            </td>
                                                            <td className="table-product"> {item?.itemimage[0]?.image ? <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}${item?.itemimage[0]?.image} `} /> : <img src='images/image_not/image_not1.png' />}</td>
                                                            <td >
                                                                <h5 className='table-text' style={{ width: "120px" }}>{item.name}</h5>
                                                            </td>
                                                            <td>
                                                                <h5 className='table-text' style={{ width: "120px" }}>{item.description}</h5>
                                                            </td>
                                                            <td>
                                                                <h5 className='table-text' style={{ width: "120px" }}>{item.types?.name}</h5>
                                                            </td>
                                                            <td className="">
                                                                <h5 className='table-text' style={{ width: "120px" }}>{item?.category?.name || '-'}</h5>
                                                            </td>
                                                            <td className="">
                                                                <h5 className='table-text' style={{ width: "120px" }}>{item.brand?.name}</h5>
                                                            </td>
                                                            <td className="">
                                                                <h5 className='table-text' style={{ width: "120px" }}>₹ {item.price}</h5>
                                                            </td>
                                                            <td className="table-condition ">
                                                                <h6 className={`badge ${item.item_condition}`}>{item.item_condition}</h6>
                                                            </td>

                                                            <td className="table-status">
                                                                <h6 className="badge rejected">rejected</h6>
                                                            </td>

                                                        </tr>
                                                    }
                                                    else {
                                                        return null
                                                    }
                                                })
                                            }
                                            {
                                                userProduct.length < 1 && <tr>No Pending Ads</tr>
                                            }
                                        </tbody>
                                    </table> :
                                    <EmptyData/>
                                    }

                        </div>
                          </div>
                </div>
                   </section>

        </>
    )
}

export default React.memo(RejectedAds)