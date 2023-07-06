import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Profile.css';
import Camera from '../Svg/Camera';
import { storage, db ,auth } from '../Services/firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { doc, updateDoc, collection, query, onSnapshot, where } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../Context/auth';
import Delete from '../Svg/Delete';

function Profile() {

    const val = useContext(AuthContext);
    const navigate = useNavigate();
    const [img, setImg] = useState('');
    const [profile, setProfile] = useState({});
    const usersCollectionRef = collection(db, 'users');

    useEffect(() => {
        const getUsers = () => {
            const q = query(usersCollectionRef, where('uid', '==', auth.currentUser.uid));
            const unsub = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setProfile(doc.data())
                })
            })
            return () => unsub();
        }
        getUsers();

        if (img) {
            const uploadImage = async () => {
                const imgRef = await ref(storage, `avtar/${new Date().getTime()} - ${img.name}`);
                try {
                    if (profile.avatarPath) {
                        await deleteObject(ref(storage, profile.avatarPath));
                        getUsers();
                    }
                    navigate('/dashboard');
                    const snap = await uploadBytes(imgRef, img);
                    const url = await getDownloadURL(ref(storage, snap.ref._location.path_));
                    await updateDoc(doc(db, 'users', profile.uid), {
                        avatar: url,
                        avatarPath: snap.ref._location.path_
                    });
                    setImg('');
                    getUsers();
                }
                catch (error) {
                    console.log(error.message);
                }
                getUsers();
            };
            uploadImage();
        }
    }, [img]);

    const deleteImage = async () => {
        try {
            const confirm = window.confirm('Remove Image ??');
            if (confirm) {
                await deleteObject(ref(storage, profile.avatar));
                await updateDoc(doc(db, 'users', profile.uid), {
                    avatar: '',
                    avatarPath: '',
                });
                navigate('/dashboard');
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="block">
            <div className='profile-block'>
                <div className="container justify-content-center">
                    <div className="row w-100 m-0 justify-content-center ">
                        <div className="col-8 card p-5 img-hover-zoom">
                            <div className="row content justify-content-center">
                                <div className="col-lg-5 image_container text-center d-block m-auto">
                                    {
                                        profile.avatar ? <img src={profile.avatar || (require('../Assets/profile2.png'))} alt="photo" /> : <img src={(require('../Assets/profile2.png'))} alt="photo" />
                                    }
                                    <div className="overlay">
                                        <div>
                                            <label htmlFor="photo">
                                                <Camera />
                                            </label>
                                            {profile.avatar ? <Delete deleteImage={() => deleteImage()} /> : null}
                                            <input type="file" accept='image/*' style={{ display: 'none' }} id='photo' onChange={(e) => setImg(e.target.files[0])} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 justify-content-center pt-3 mt-4 profile_content">
                                    <h5><span>UserName :</span> {profile.name ? profile.name : 'loading'}</h5>
                                    <h5><span>User Email :</span> {profile.email ? profile.email : 'loading...'}</h5>
                                    <h5><span>Joined On   :</span> {profile.createdAt ? profile.createdAt.toDate().toDateString() : 'Loading...'} </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile