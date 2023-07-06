import React ,{ createContext, useState } from "react"

export const UserValAuthContext =createContext();
const UserAuthProvider = ({children})=>{
 
    const [userShowModal, setUserShowModal] = useState(false);
    const [userShowModal1, setUserShowModal1] = useState(false);
    const [userLoading,setUserLoading]=useState(false);
    const [userAction, setUserAction] = useState();
    const [userShowDeleteModal, setUserShowDeleteModal] = useState(false);
    const [userEditItem, setUserEditItem] = useState();
    const [userDeleteId, setUserDeleteId] = useState();
    const [userheading, setUserHeading] = useState();
    const [userCurrentPage, setUserCurrentPage] = useState(1);
    const [searchArray, setsearchArray] = useState([]);
    const [clear,setClear] = useState(false)
    return <UserValAuthContext.Provider value={{clear,setClear,userCurrentPage, setUserCurrentPage,userShowModal, setUserShowModal,userLoading,setUserLoading,userAction, setUserAction,userEditItem, setUserEditItem,userDeleteId, setUserDeleteId, userheading, setUserHeading,userShowDeleteModal, setUserShowDeleteModal,searchArray,setsearchArray}}>{children}</UserValAuthContext.Provider>
}

export default UserAuthProvider