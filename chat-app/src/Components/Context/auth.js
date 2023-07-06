import { onAuthStateChanged } from "firebase/auth";
import { createContext,useEffect,useState } from "react";
import { auth ,db} from "../Services/firebase";
import Loading from '../Pages/Loading';
import { getDocs ,collection} from 'firebase/firestore';

export const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [loading,setLoading] = useState(true);
    const [profile, setProfile] = useState({});
    const usersCollectionRef = collection(db, 'users');

    useEffect(()=>{
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            result.map((user) => {
                if (user.uid === auth.currentUser.uid) {
                    setProfile(user);
                }
            })
        }
        getUsers();
        
        onAuthStateChanged(auth,(user)=>{
            setLoading(false);
        })
    },[])
    
    if(loading)
    {
        return <Loading/>
    }
    return <AuthContext.Provider value={{loading,profile,setProfile}}>{children}</AuthContext.Provider>
}

export default AuthProvider;