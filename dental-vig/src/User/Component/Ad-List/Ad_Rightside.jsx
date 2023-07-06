import React, { useEffect, useState, useContext } from 'react'
import List_3 from './List_3';
import '../../Css/Ad_Rightside.css'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import {  GetUserProductsByCategoryPrice } from '../../../redux/actions/UserEcommerceAction';
import { UserValAuthContext } from '../Context/UserValContext';
import { SimpleLoader} from '../Action/SkeltonLoader';

const Ad_Rightside = ({ obj }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemList, setItemList] = useState([]);
    const [newList, setNewList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [LoaderArray, setLoaderArray] = useState([]);
    const dispatch = useDispatch();
    const val = useContext(UserValAuthContext);
    let list = useSelector((state) => state.UserEcommerceReducer.userproducts);
    let lastPage = useSelector((state) => state.UserEcommerceReducer.itemLastPage);
    let listLoaded = false;
    useEffect(() => {
        if (!listLoaded) {
            setLoaderArray([]);
            let argObj = {};
            argObj = { 'id': val.gsearchId, 'name': val.gsearchAllName, 'type_id': val?.subheadertype.length > 0 ? val?.subheadertype : obj?.filterTypeId, 'category_id': val?.subheadercat.length > 0 ? val?.subheadercat : obj?.filterCategoryId, 'brand_id': obj?.filterBrandId, 'price': val.priceRange, 'star': obj?.filterRatings,'sub_category_id':val.subCat_id }
            if ((Number(val.priceRange[0]) >= 10 && Number(val.priceRange[1]) >= 10) && Number(val.priceRange[0]) <= 10000000000 && Number(val.priceRange[1]) <= 10000000000 && val?.dependentLocationState != 'denied') {
                dispatch(GetUserProductsByCategoryPrice(argObj, currentPage, setNewList, newList, setLoader, val.gsearchType, val.gsearchAllType));
            }
           listLoaded = true;
        }

    }, [dispatch, currentPage, val.priceRange, val.gsearchId, val.gsearchAllType, val.gsearchType, obj?.filterBrandId, obj?.filterCategoryId, obj?.filterTypeId, val?.subheadercat, val?.subheadertype, obj?.filterRatings,val?.subCat_id]);
  
    const likeproduct = useSelector((d) => d.UserEcommerceReducer.userwishlist);
    useEffect(() => {
        setCurrentPage(1);
    }, [val.priceRange, obj])
    const handlePagination = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    }
    return (
        <>
            <div className={`${val.gsearchAllName ? 'col-lg-8 col-xl-9' : 'col-12'}`}>
                <div className="row m-0">
                    <div className="col-lg-12">
                        <div className="header-filter">
                        </div>
                    </div>
                </div>
                <div className='list-tab'>
                    <div className="tab-pane active" id="three">
                        <div className="row m-0" >
                            {
                                newList && newList.map((item, index) => <List_3 item={item} key={index} key1={index} likeproduct={likeproduct} image={<img src='images/image_not/image_not1.png' style={{ height: "245px" }}></img>} />)
                            }
                            {                          
                                loader && <SimpleLoader />
                            }
                        </div>
                    </div>
                </div>
                {
                    (currentPage < lastPage) && !loader ?
                        <>
                            <div className='center-20'><button className='btn btn-inline mb-3' onClick={handlePagination}><i className={'fas fa-eye'} /><span>{'show More ...'}</span></button>
                            </div>
                        </>
                        : currentPage == lastPage ? null : null
                }
                {
                    list.length < 1 && !loader ? <h4 style={{ display: 'block', textAlign: 'center', marginTop: 'auto' }}>Not Available</h4> : null
                }
            </div>
        </>
    )
}

export default React.memo(Ad_Rightside)