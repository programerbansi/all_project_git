import React, { useState } from 'react'
import '../../css/TablePage.css'
import UserTable from '../layout/UserTable'
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { GET_HISTORY_LIST, GET_REPORTS_LIST, getDataList, getReportList } from '../../../redux/action/Action';
import { UserValAuthContext } from '../context/UserAuthProvider';
import { useEffect } from 'react';
import BackDrop from '../function/BackDrop';

const HistoryPage = () => {
  let load = false;
  const dispatch = useDispatch();
  const val = useContext(UserValAuthContext);
  const user = getLoggedInUser();
  const [loading1, setLoading1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (!load) {
      setLoading1(true);
      dispatch(getDataList(`/user/get-history-list/${user.id}/?page=${currentPage}`,GET_HISTORY_LIST,setLoading1))
    }
    return () => { load = true }
  }, [currentPage])
  const historyPerPageList = useSelector((state) => state.Reducer.historyPerPageList);
  const historyTotalItemCount = useSelector((state) => state.Reducer.historyTotalItemCount);
  const tableArray = [
    {
      id: 1,
      title: "Logs",
      header: [{ key: "Activity", width: "" }, { key: "Date", width: "" }, { key: "Action", width: "12%" }],
      data: historyPerPageList,
      totalItem: historyTotalItemCount,
      currentPage: currentPage,
      setCurrentPage: setCurrentPage,
    },
  ]
  return (
    <>
      {loading1 ? <BackDrop /> : null}
      <div className='main-content'>
        {tableArray && tableArray.map((i, idx) => {
          return <UserTable id={i.id} title={i.title} header={i.header} data={i.data} key={idx} totalItem={i.totalItem} currentPage={i.currentPage} setCurrentPage={i.setCurrentPage} />
        })}
      </div>

    </>
  )
}

export default HistoryPage