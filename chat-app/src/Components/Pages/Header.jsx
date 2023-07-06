import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../Services/LocalStorage';
import '../Styles/Header.css';
import { auth, db } from '../Services/firebase';
import { updateDoc, doc } from 'firebase/firestore';

function Header() {
    const navigate = useNavigate();
    const logOut = () => {

        updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isOnline: false
        });
        removeToken('auth');
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }
    let token = getToken();
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [])
    return (
        <div className='header p-2'>
            <div className="conatiner p-2">
                <div className="row w-100">
                    <div className="col-2 text-end"><h3>Messenger</h3></div>
                    {
                        token ?
                            <>
                              <div className="col-xl-1 offset-xl-7 col-md-2 text-end"><NavLink to='/profile' className='btn btn-outline-light'>Profile</NavLink></div>
                                <div className="col-xl-1 col-md-2"><button className='btn btn-outline-light' onClick={()=>logOut()}>Log Out</button></div>  
                            </> :
                            <>
                                <div className="col-1 offset-7 text-end"><NavLink to='/signup' className='btn btn-outline-light'>Sign Up</NavLink></div>
                                <div className="col-1"><NavLink to='/login' className='btn btn-outline-light'>Login</NavLink></div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header