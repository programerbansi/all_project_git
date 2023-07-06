import React, { useState } from 'react'
import '../../css/TablePage.css'
import UserTable from '../layout/UserTable'
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { GET_REPORTS_LIST, getDataList, getReportList } from '../../../redux/action/Action';
import { UserValAuthContext } from '../context/UserAuthProvider';
import { useEffect } from 'react';
import BackDrop from '../function/BackDrop';

const ReportPage = () => {
  let load = false;
  const dispatch = useDispatch();
  const val = useContext(UserValAuthContext);
  const user = getLoggedInUser();
  const [loading1, setLoading1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (!load) {
      setLoading1(true);
      dispatch(getDataList(`/user/get-invoice-reports/${user.id}/?page=${currentPage}`,GET_REPORTS_LIST,setLoading1))
    }
    return () => { load = true }
  }, [currentPage])
  const reportPerPageList = useSelector((state) => state.Reducer.reportPerPageList);
  const reportTotalItemCount = useSelector((state) => state.Reducer.reportTotalItemCount);
  const tableArray = [
    {
      id: 1,
      title: "Completed",
      header: [{ key: "Name", width: "400px" }, { key: "Type", width: "" }, { key: "Status", width: "" }, { key: "Most recent invoice(Total)", width: "500px" }, { key: "Download Invoice", width: "12%" }],
      data: reportPerPageList,
      totalItem: reportTotalItemCount,
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

export default ReportPage