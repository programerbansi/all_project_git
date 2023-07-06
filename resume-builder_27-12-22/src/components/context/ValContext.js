import React ,{createContext, useState} from 'react';

export const ValAuthContext = createContext();

const AuthProvider = ({children})=>{

    const [skill,setSkill] = useState('');

    // -----------education----------------

    const [degree,setDegree] = useState('');
    const [university,setUniversity] = useState('');

    // -----------------experience ------------------------

    const [work_detail,setWork_detail] = useState('');
    const [company,setCompany] = useState('');
    const [duration,setDuration] = useState('');
    const [work_as,setWork_as] = useState('');

    const [userObj,setUserObj] = useState({fname:'',lname:'',email:'',phone:'',address:'',web:'',profile:'',skill:[],education:[],experience:[],position:'',image:''})

    return <ValAuthContext.Provider value={{userObj,setUserObj,skill,setSkill,degree,setDegree,setUniversity,university,setWork_detail,work_detail,company,setCompany,duration,setDuration,work_as,setWork_as}}>{children}</ValAuthContext.Provider>
    
}
export default AuthProvider