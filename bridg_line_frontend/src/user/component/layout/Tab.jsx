import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { HiHome } from 'react-icons/hi2';
import '../../css/Tab.css';
import { useLocation, useParams } from 'react-router';
import { BILL_HISTORY, CARD, HISTORY, HOME, INVOICE, INVOICE_VIEW, NOTIFY, REPORT, TEAM } from '../../../services/UserRoutePath';
import { BiNetworkChart } from 'react-icons/bi';
import { RiFileListLine } from 'react-icons/ri';

const Tab = () => {
  const { pathname } = useLocation();
  const [heading, setHeading] = useState({});
  const { slug_id } = useParams();

  useEffect(() => {
    const getHeading = () => {
      switch (pathname) {
        case HOME:
          return { icon: <HiHome />, title: 'Home' };
        case INVOICE:
          return { icon: <RiFileListLine />, title: 'Invoice' };
        case REPORT:
          return { icon: <BiNetworkChart />, title: 'Completed' };
        case `/invoice/${slug_id}`:
          return { icon: <RiFileListLine />, title: 'View Invoice' };
        case TEAM:
          return { icon: <RiFileListLine />, title: 'Team' };
        case CARD:
          return { icon: <RiFileListLine />, title: 'Card' };
        case BILL_HISTORY:
          return { icon: <RiFileListLine />, title: 'Bill History' };
        case NOTIFY:
          return { icon: <RiFileListLine />, title: 'Notification' };
        case HISTORY:
          return { icon: <RiFileListLine />, title: 'Logs' };
        default:
          return {};
      }
    };

    setHeading(getHeading());
  }, [pathname, slug_id]);

  return (
    <>
      <Container fluid className="header-tab">
        <div className="d-inline-block mt-4 mb-3 px-3 blue-color border-blue">
          <span>{heading.title}</span>
        </div>
      </Container>
    </>
  );
};

export default Tab;
