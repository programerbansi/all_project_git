import React ,{createContext,useState} from 'react';

export const ValAuthContext = createContext();

const AuthProvider = ({children})=>{

    const [mobileOpen, setMobileOpen] = useState(true);
    const [editorVal1,setEditorVal1] = useState('');

    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false);
    const [error, setError] = useState('');

    const [openLoader,setOpenLoader] = useState(false);

    const drawerWidth = 240;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      }; 
    

    return <ValAuthContext.Provider value={{mobileOpen,setMobileOpen,handleDrawerToggle,message,setMessage,status, setStatus,error, setError,drawerWidth,openLoader,setOpenLoader}}>{children}</ValAuthContext.Provider>

    
}
export default AuthProvider