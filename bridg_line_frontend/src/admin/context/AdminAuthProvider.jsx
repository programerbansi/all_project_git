import React ,{ createContext, useState } from "react"

export const AdminValAuthContext =createContext();
const AdminAuthProvider = ({children})=>{
    const [toggleSidebar,setToggleSidebar]=useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading,setLoading]=useState(false);
    const [action, setAction] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editItem, setEditItem] = useState();
    const [deleteId, setdeleteId] = useState();
    const [showViewModal, setShowViewModal] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [viewItem, setViewItem] = useState();
    const [heading, setHeading] = useState();
    const [currentPage, setCurrentPage] = useState(1)
    const [selectStatus, setSelectStatus] = useState();
    const [filteredArray, setFilteredArray] = useState([]);
   


    return <AdminValAuthContext.Provider value={{showOrders, setShowOrders,filteredArray, setFilteredArray,currentPage, setCurrentPage,toggleSidebar,setToggleSidebar,showModal, setShowModal,loading,setLoading,action, setAction,editItem, setEditItem,deleteId, setdeleteId, heading, setHeading,showDeleteModal, setShowDeleteModal,showViewModal, setShowViewModal,viewItem, setViewItem,selectStatus,setSelectStatus}}>{children}</AdminValAuthContext.Provider>
}

export default AdminAuthProvider