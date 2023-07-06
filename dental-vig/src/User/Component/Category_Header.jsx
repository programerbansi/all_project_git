import React from 'react'
import Button from "./InputFunction/Button";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_TYPE, GET_ALL_TYPECAT, GetAllType, getAllTypeCat, getDatas, GetUserType } from "../../redux/actions/UserEcommerceAction";
import '../Css/Header.css'
import '../Css/Category_Header.css'
import { UserValAuthContext } from "./Context/UserValContext";
import { useLocation, useNavigate } from "react-router-dom";
const Category_Header = ({ setSelectName, setSelectLoc }) => {
    const [show, setShow] = useState(false);
    const val = useContext(UserValAuthContext);
    const [typeId, setTypeId] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    let listLoaded = false;
    useEffect(() => {
        if (!listLoaded) {
            dispatch(getDatas(`gettype_category`,GET_ALL_TYPE))
        }
        return () => {
            listLoaded = true;
        }
    }, [dispatch, listLoaded])

    let typeList = useSelector((state) => state.UserEcommerceReducer.allType);
    let sort_typeList = typeList && typeList.map((item) => {
        return item
    })
    const handleClickType = (item) => {
        setShow(true);
    }
    const handleClickCat = (item) => {
        val?.setSubHeaderCat([item?.id])
        setShow(false);
        if (location.pathname !== "/") {
            navigate("/")
        }
    }
    const handleClickSubCat = (item) => {
        val?.setSubCatId([item?.id])
        setShow(false);
        if (location.pathname !== "/") {
            navigate("/")
        }
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShow(false);
                    setTypeId("")
                }
            }
            document.addEventListener("mouseout", handleClickOutside);
            return () => {
                document.removeEventListener("mouseout", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    function liHover() {
        sort_typeList.map((t, index) => {
            document.getElementById(`demo${t.id}`)?.addEventListener("mouseover", () => { setShow(true); setTypeId(t.id) });
        })
    }
    liHover()
    let typetocatlist = sort_typeList && sort_typeList.find((item) => {
        return item.id === typeId ? item : null
    })

    return (
        <>
            <div >
                <header className="" style={{ boxShadow: "0 1px 4px 0 rgb(0 0 0 / 10%)" }}>
                    <div className="container sub-header-part " ref={wrapperRef}>
                        <div className="row">
                            {
                                sort_typeList && sort_typeList?.map((item, index) => {
                                    return <div className='col' key={index}>
                                        <div id={`demo${item.id}`} className={`types_header pt-2 pb-2 `} onClick={() => handleClickType(item)}><span style={{ color: item.id == typeId ? '#0044bb' : 'black' }}> {item?.name}</span>
                                            <div className={`${(show && (item.id == typeId)) ? "d-block" : "d-none"} subcat-header-categories container p-3 rounded`} ref={wrapperRef}>
                                                <ul className="list-none text-black">
                                                    <div className='row'>
                                                        {
                                                            typetocatlist?.category.map((item, index) => {
                                                                return (<div className='col-md-6 col-12 p-0' key={index} ><li style={{ fontSize: "17px", cursor: "pointer", fontWeight: "bold" }} className="type-list-hover" onClick={() => { handleClickCat(item) }}>{item?.name}</li>
                                                                    <div className='row'>
                                                                        <ul className="list-none text-black" >
                                                                            {
                                                                                item?.subcategory.map((item, index) => {
                                                                                    return (<div className='col-md-6 col-12' key={index}><li key={index} style={{ fontSize: "15px", cursor: "pointer" }} className="type-list-hover mx-2" onClick={() => { handleClickSubCat(item) }}>{item?.name}</li></div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </div>)
                                                            })
                                                        }
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                })

                            }

                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}

export default Category_Header