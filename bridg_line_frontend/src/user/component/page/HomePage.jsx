import React, { useContext, useEffect, useState } from 'react'
import '../../css/TablePage.css'
import UserTable from '../layout/UserTable'
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { GET_INVOICE_NEED_LIST, getDataList, getInvoiceNeedList } from '../../../redux/action/Action';
import { UserValAuthContext } from '../context/UserAuthProvider';
import BackDrop from '../function/BackDrop';
import { useQuery } from 'react-query';
const HomePage = () => {
  let load = false;
  const dispatch = useDispatch();
  const val = useContext(UserValAuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const user = getLoggedInUser();
  const [loading, setLoading] = useState(false);
  const needPerPageList = useSelector((state) => state.Reducer.needPerPageList);
  const needTotalItemCount = useSelector((state) => state.Reducer.needTotalItemCount);
  const fetchData = async () => {
    setLoading(true);
    dispatch(getDataList(`/user/get-invoice-need/${user?.id}/?page=${currentPage}`, GET_INVOICE_NEED_LIST, setLoading))
  };
  const query = useQuery(['home',currentPage], fetchData);
  if (query.isLoading) {
    return console.log("Loading..")
  }

  if (query.error) {
    return <div>Error: {query.error.message}</div>;
  }
 
  const tableArray = [
    {
      id: 1,
      title: "Needs Attention",
      header: [{ key: "ID", width: "5%" }, { key: "Name", width: "" }, { key: "Message", width: "45%" }, { key: "Status", width: "" }, { key: "Amount", width: "" }, { key: "Date", width: "" },
      ],
      data: needPerPageList,
      totalItem: needTotalItemCount,
      currentPage: currentPage,
      setCurrentPage: setCurrentPage,
    },
  ]
  return (
    <>
      {loading ? <BackDrop /> : null}
      <div className='main-content'>
        {tableArray && tableArray.map((i, idx) => {
          return <UserTable id={i.id} title={i.title} header={i.header} data={i.data} key={idx} totalItem={i.totalItem} currentPage={i.currentPage} setCurrentPage={i.setCurrentPage} />
        })}
      </div>
    </>
  )
}

export default HomePage