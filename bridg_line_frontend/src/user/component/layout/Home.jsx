import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { BILL_HISTORY, CARD, HISTORY, HOME, INVOICE, INVOICE_VIEW, NOTIFY, REPORT, STRIPE, TEAM } from '../../../services/UserRoutePath';
import Header from './Header';
import Tab from './Tab';
import ReportPage from '../page/ReportPage';
import InvoicePage from '../page/InvoicePage';
import HomePage from '../page/HomePage';
import { UserValAuthContext } from '../context/UserAuthProvider';
import SearchPage from '../page/SearchPage';
import ViewModel from '../modal/ViewModel';
import TeamPage from '../page/TeamPage';
import CardPage from '../page/CardPage';
import BillHistoryPage from '../page/BillHistoryPage';
import StripePage from '../page/StripePage';
import HistoryPage from '../page/HistoryPage';

const Home = () => {
  const { pathname } = useLocation();
  const val = useContext(UserValAuthContext);
  const { slug_id } = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    document.title = `Bridgeline Billing-${title || ''}`;
  }, [title]);

  useEffect(() => {
    const getTitle = () => {
      switch (pathname) {
        case HOME:
          return 'home';
        case INVOICE:
          return 'invoice';
        case TEAM:
          return 'team';
        case REPORT:
          return 'report';
        case CARD:
          return 'card';
        case BILL_HISTORY:
          return 'bill-history';
        case NOTIFY:
          return 'notification';
        case `/invoice/${slug_id}`:
          return `invoice-${slug_id}`;
        default:
          return '';
      }
    };

    setTitle(getTitle());
  }, [pathname, slug_id]);

  return (
    <>
      <Header />
      <Tab />
      {val?.searchArray.length < 1 ? (
        <>
          {pathname === HOME && <HomePage />}
          {pathname === INVOICE && <InvoicePage />}
          {pathname === REPORT && <ReportPage />}
          {pathname === TEAM && <TeamPage />}
          {pathname === CARD && <CardPage />}
          {pathname === BILL_HISTORY && <BillHistoryPage />}
          {pathname === STRIPE && <StripePage />}
          {pathname === HISTORY && <HistoryPage />}
          {pathname === `/invoice/${slug_id}` && <ViewModel />}
        </>
      ) : (
        <SearchPage />
      )}
    </>
  );
};

export default Home;
