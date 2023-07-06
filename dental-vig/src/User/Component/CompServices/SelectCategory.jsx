import React, { useEffect, useState } from 'react'
import { Menu, MenuItem, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_TYPE, GET_USER_TYPE_TO_CAT, GetUserType, GetUserTypetoCat, getDatas, getDatasPost } from '../../../redux/actions/UserEcommerceAction';
const SelectCategory = () => {
  let load = false;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDatas(`gettype`,GET_USER_TYPE));
    return () => load = true
  }, [])
  const type_op = useSelector((d) => d.UserEcommerceReducer.usertype);
  const category = useSelector((d) => d.UserEcommerceReducer.usertypetocat)
  const cat_option = category[0];
  const cat_finalop=cat_option?.category?.map((item, index) => {
    return item
  })

  useEffect(()=>{
    category?.length < 1 && dispatch(getDatasPost(`gettype_category/${12}`,GET_USER_TYPE_TO_CAT))
  },[])

  function liHover(){
    type_op.map((t,index)=>{
      document.getElementById(`demo${t.id}`)?.addEventListener("mouseover",  ()=>{});
      document.getElementById(`demo${t.id}`)?.addEventListener("mouseout", ()=> document.getElementById(`demo${t.id}`).style.color = "black");
    })
  }
  liHover()

  return (
    <>
      <div className="dropdown">
        <a className="dropdown-toggle p-1 border rounded" style={{ color: "#495057", width: "100%" }} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          select
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {
            type_op?.map((t, index) => {
              return <li key={index} >
                <a className="dropdown-item" id={`demo${t?.id}`} href="#">{t.name}</a>
                <ul>
                  {
                   cat_finalop?.map((c)=>{
                    return   <li><a className="dropdown-item" href="#">{c.name}</a></li>
                   })
                  }
                </ul>
              </li>
            })
          }
        </ul>
      </div>

    </>
  )
}

export default SelectCategory