import React, { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';
import { db, auth, storage } from '../Services/firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { collection, query, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc, getDocs } from 'firebase/firestore'
import User from './User';
import MessageForm from './MessageForm';
import Message from './Message';
import Search from '../Svg/Search';
function Dashboard() {

  const usersCollectionRef = collection(db, 'users');
  const user1 = auth.currentUser.uid;
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState({});
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [flag, setFlag] = useState(false);
  const [msgData, setMsgData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [foundText, setFoundText] = useState([])

  useEffect(() => {
    const q = query(usersCollectionRef, orderBy('count', 'desc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let Users = [];
      querySnapshot.forEach((doc) => {
        Users.push(doc.data())
      })
      setUsers(Users.filter((user) => { return user.uid !== auth.currentUser.uid }))
    })
    return () => unsub();
  }, []);

  // search  start

  const mss = async () => {
    const querySnapshot = await getDocs(collection(db, "chat-messages"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setMsgData(arr);
  }
  useEffect(() => {
    mss();
  }, []);

  const filter = (e) => {
    const keyword = e.target.value;
    setFilterName(keyword);
    if (keyword !== '') {
      const results = msgData.filter((msg) => {
        return msg.text.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundText(results);
    } else {
      setFoundText(msgData);
    }
  };

  // search ends

  const selectedUser = async (user) => {
    setSelected(user);
    setFlag(true);
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgRef = collection(db, 'messages', id, 'chat');
    const q = query(msgRef, orderBy('createdAt', 'asc'))

    onSnapshot(q, querySnapshot => {
      let msgs = [];
      querySnapshot.forEach(doc => {
        msgs.push(doc.data());
      })
      setMsgs(msgs);
    })
    const docSnap = await getDoc(doc(db, 'lastMsg', id));
    if (docSnap.data()?.from !== user1) {
      await updateDoc(doc(db, 'lastMsg', id),
      {unread:false});
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = selected.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
      const snap = await uploadBytes(imgRef, img);
      const dlurl = await getDownloadURL(ref(storage, snap.ref._location.path_));
      url = dlurl;
    }

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date),
      media: url || '',
    })

    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date),
      media: url || '',
      unread: true,
    })
    await addDoc(collection(db, 'chat-messages'), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date),
      media: url || '',
    })
    await updateDoc(doc(db, 'users', user1), {
      count: Timestamp.fromDate(new Date)
    });
    setText('');
    setImg('');
  }

  return (
    <div className='dashboard-block container-fluid'>
      <div className="users-block h-100">
        <div className="row p-0  m-0">
          <div className="col-xl-4 col-lg-5 col-md-5 h-auto">
            <div className="side-block w-100 h-100">
              <div className="chat">
                {users.map((user) => {
                  return <User key={user.uid} user={user} selectedUser={selectedUser} user1={user1} selected={selected} />
                })}
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7 col-md-7 h-auto dashboard_chat">
            <div className="row selected_row align-items-center m-0">
              <div className="col-12 selected_user w-50">
                <span className='d-flex justify-content-between'>
                  <h3 className='ms-3 p-3'>{flag ? `${selected.name}` : 'Selcet user to start conversation'}</h3>
                  <div className="d-flex justify-content-center">
                    <label htmlFor="search" className="form-label my-auto">
                      <Search />
                    </label>
                    <input type="text" className="form-control ms-1" id="search" onChange={filter} value={filterName} />
                  </div>
                </span>
                <hr className='mb-0' />
              </div>
              <div className="col-11 chat_container">
                {
                  filterName && foundText && foundText.length > 0 ?
                    <div className='row h-100 m-0 search_row'>
                      <div className={` col-12 mt-3`}>
                        {
                          foundText.map((msg, i) => {
                            return <h5 className='mb-0 d-block w-auto' key={i}>
                              {msg.text}
                              <br />
                            </h5>
                          })
                        }
                      </div>
                    </div> :
                    (msgs.length ?
                      msgs.map((msg, i) => {
                        return <Message key={i} msg={msg} user1={user1} msgData={msgData}/>
                      }) : null)
                }
              </div>
            </div>
          </div>
          <div className="col-12 h-auto">
            <div className="chat_footer">
              {flag ? <MessageForm handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg} /> : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard