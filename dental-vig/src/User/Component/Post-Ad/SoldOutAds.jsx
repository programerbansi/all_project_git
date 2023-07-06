import React from 'react'
import EmptyData from './EmptyData'

const SoldOutAds = ({ userProduct }) => {

    let soldOutAds = userProduct.filter((item) => item?.status == 3)
    const header=['Index','Images','Name','Description','Type','Category','Brand','Price','Condition','Status','Who bought ad']
    return (
        <>
            <section className="inner-section compare-part w-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {
                                soldOutAds.length > 0 ?
                                    <table className="table table-list table-responsive">
                                        <thead className='table-head'>
                                            <tr>
                                                {header && header.map((i,idx)=>{
                                                    return <th scope="col" key={idx}>{i}</th>
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody className='table-body'>
                                            {
                                                soldOutAds?.map((item, index) => {
                                                    return <tr key={index}>
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
                                                            <h6 className="badge sold">sold-out</h6>
                                                        </td>
                                                        <td className="table-status">
                                                            <h5 className='table-text' style={{ width: "120px" }}>
                                                                 {item?.sold?.users?.name}
                                                            </h5>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    :
                                  
                                    <EmptyData/>
                                          }

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(SoldOutAds)