import React, { useState } from 'react'
import { ADMIN_COMPLETED_INVOICE, ADMIN_DASHBOARD, ADMIN_INVOICE, ADMIN_INVOICE_VIEW, ADMIN_JOB_TYPE, ADMIN_NOTIFICATION, ADMIN_ORDERS, ADMIN_PAYMENT, ADMIN_STATUS, ADMIN_TEAM, ADMIN_USER, ADMIN_VIEW_ORDERS } from '../../../services/AdminRoutePath';
import Dashboard from '../page/Dashboard';
import CurdPage from '../page/CurdPage';
import { useLocation, useParams } from 'react-router';
import ViewModel from '../modal/ViewModel';
import { useEffect } from 'react';
import OrdersById from '../page/OrdersById';

const AdminContent = () => {
  const { pathname } = useLocation();
  const { slug_id } = useParams();
  const [title, setTitle] = useState();
  useEffect(() => {
    document.title = `Bridgeline Billing-${title}`;
  }, [title]);
  useEffect(() => {
    switch (pathname) {
      case ADMIN_DASHBOARD:
        setTitle("admin-dashboard")
        break;
      case ADMIN_USER:
        setTitle("admin-clients")
        break;
      case ADMIN_INVOICE:
        setTitle("admin-write-invoice-estimate")
        break;
      case ADMIN_JOB_TYPE:
        setTitle("admin-job-type")
        break;
      case ADMIN_ORDERS:
        setTitle("admin-order")
        break;
      case ADMIN_PAYMENT:
        setTitle("admin-payment-method")
        break;
      case ADMIN_TEAM:
        setTitle("admin-team")
        break;
      case ADMIN_NOTIFICATION:
        setTitle("admin-notification")
        break;
      case ADMIN_COMPLETED_INVOICE:
        setTitle("admin-write-invoice-estimate-completed")
        break;
      case `/admin/view/orders/${slug_id}`:
        setTitle(`admin-view-orders-${slug_id}`)
        break;
      case `/admin/write-invoice-estimate/${slug_id}`:
        setTitle(`admin-write-invoice-estimate-${slug_id}`)
        break;
      case `/admin/completed-jobs/${slug_id}`:
        setTitle(`admin-write-invoice-estimate-completed-${slug_id}`)
        break;
      default:
        break;
    }
  }, [pathname])
  return (
    <>
      {pathname == ADMIN_DASHBOARD ? <><Dashboard /></> : null}
      {pathname == ADMIN_USER ? <><CurdPage /></> : null}
      {pathname == ADMIN_INVOICE ? <><CurdPage /></> : null}
      {pathname == ADMIN_COMPLETED_INVOICE ? <><CurdPage /></> : null}
      {pathname == `/admin/write-invoice-estimate/${slug_id}` ? <><ViewModel /></> : null}
      {pathname == `/admin/completed-jobs/${slug_id}` ? <><ViewModel /></> : null}
      {pathname == ADMIN_JOB_TYPE ? <><CurdPage /></> : null}
      {pathname == ADMIN_ORDERS ? <><CurdPage /></> : null}
      {pathname == ADMIN_PAYMENT ? <><CurdPage /></> : null}
      {pathname == ADMIN_TEAM ? <><CurdPage /></> : null}
      {pathname == ADMIN_NOTIFICATION ? <><CurdPage /></> : null}
      {pathname == `/admin/view/orders/${slug_id}` ? <><OrdersById /></> : null}

    </>
  )
}

export default AdminContent