import React from 'react'
import { useLocation } from 'react-router-dom'
import { ADVERTISEMENTS, ALL_BRANDS, ALL_CATEGORIES, ALL_PRODUCTS, ALL_TAGS, ALL_TYPES, ALL_USERS, CONTACT_US, REPORTED_ITEMS, SUB_CATEGORIES, USER_DETAIL } from '../../services/AdminRoutePath';
import AllBrands from '../brand/AllBrands';
import AdminHeader from '../header-sidebar/AdminHeader';
import AdminSideBar from '../header-sidebar/AdminSideBar';
import Categories from '../category/Categories';
import SubCategories from '../category/SubCategories';
import AllTags from '../tags/AllTags';
import AllProducts from '../products-list/AllProducts';
import AllTypes from '../type/AllTypes';
import AllUsers from '../users/AllUsers';
import UserDetail from '../users/UserDetail';
import Advertisement from '../advertisements/Advertisement';
import ReportedItems from '../products-list/ReportedItems';
import ContactUs from '../contact-us/ContactUs';

const AdminHome = () => {
    const { pathname } = useLocation();
    return (
        <>
            <AdminHeader />
            <AdminSideBar />
            {pathname == ALL_BRANDS ? <AllBrands /> : null}
            {pathname == ALL_CATEGORIES ? <Categories /> : null}
            {pathname == SUB_CATEGORIES ? <SubCategories /> : null}
            {pathname == ALL_TAGS ? <AllTags /> : null}
            {pathname == ALL_PRODUCTS ? <AllProducts /> : null}
            {pathname == ALL_TYPES ? <AllTypes /> : null}
            {pathname == ALL_USERS ? <AllUsers /> : null}
            {pathname == USER_DETAIL ? <UserDetail /> : null}
            {pathname == ADVERTISEMENTS ? <Advertisement /> : null}
            {pathname == REPORTED_ITEMS ? <ReportedItems /> : null}
            {pathname == CONTACT_US ? <ContactUs /> : null}
        </>
    )
}

export default AdminHome