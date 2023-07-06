import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getBoughtProducts } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import AddPostTabs from './AddPostTabs'
import EmptyData from './EmptyData';

const MyOrders = ({ userProduct }) => {

    const dispatch = useDispatch();

    let loggedInUser = getLoggedInUser();
    let pageLoaded = false;
    useEffect(() => {
        if (!pageLoaded) {
            const formdata = new FormData();
            formdata.append('id', loggedInUser?.id);
            dispatch(getBoughtProducts(formdata));
           
        }
        return ()=>{pageLoaded =true}
    }, [])
    let Products = useSelector((state) => state?.UserEcommerceReducer.boughtProducts);
    let boughtProducts = Products.map((p) => p?.items)
    const header=['Index','Images','Name','Description','Type','Category','Brand','Price','Condition','seller']
    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            <AddPostTabs />
            <section className="message-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {
                                boughtProducts && boughtProducts?.length > 0 ?
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
                                                boughtProducts && boughtProducts?.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td >
                                                            <h6 className='table-text'>{index + 1}</h6>
                                                        </td>
                                                        <td className="table-product"> {item?.itemimage[0]?.image ? <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}${item?.itemimage[0]?.image} `} /> : <img src='images/image_not/image_not1.png' />}
                                                        </td>
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
                                                            <h5 className='table-text' style={{ width: "120px" }}>
                                                                    {item?.users?.name}
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
        </div>
    )
}

export default MyOrders
