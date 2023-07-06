import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SideBar from '../AuthPages/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { AddComment, LoadComments, LoadUsers, UpdateAssignedUser, UpdateStatus } from '../../redux/Actions';
import '../../Styles/ViewTicketDetail.css';
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { auth, db } from '../../../Services/firebase';
import Avatar from 'react-avatar';
import Moment from 'react-moment';

function ViewTicketDetail() {

  const [ticket, setTicket] = useState(null);
  const [project, setProject] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [from, setFrom] = useState('');

  const [current, setCurrent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let users = useSelector((state) => state.projectReducer.users);
  let comments = useSelector((state) => state.projectReducer.comments);

  let ddlViewBy = document.getElementById('ddlViewBy');
  let ddlViewBy2 = document.getElementById('ddlViewBy2');

  useEffect(() => {
    dispatch(LoadComments(ticket && ticket?.ticket_id));
  }, [dispatch, ticket])

  useEffect(() => {
    dispatch(LoadUsers())
    setTicket(location.state?.item);

    const unsub = async () => {
      const docProjectRef = doc(db, "projects", location?.state?.item?.key);
      const docProjectSnap = await getDoc(docProjectRef);
      if (docProjectSnap.exists()) {
        setProject(docProjectSnap.data());
      } else {
        console.error("No such document!");
      }
    }
    if (document.getElementById('ddlViewBy')) {
      document.getElementById('ddlViewBy').value = location.state?.item?.ticket_status || '';
    }
    unsub();

    users && users.map((user) => {
      if (user.uid === auth.currentUser.uid) {
        setCurrent(user.name);
        setCurrentUser(user);
      }
    })
  }, [location, dispatch]);

  useEffect(() => {
    comments && comments.forEach((c) => {
      users && users.forEach((u) => {
        if (u.uid === c.from) {
          setFrom(u.name)
        }
      })
    })
  }, [comments])

  let array = project && project?.assigned_users.filter((u) => {
    return !(ticket && ticket.assigned_users.includes(u))
  })


  const handleAssign = () => {
    if (selectedUser) {
      dispatch(UpdateAssignedUser(ticket.id, selectedUser, users, ddlViewBy2, setLoadingUser, navigate))
      setSelectedUser(null)
    }
  }

  const updateStatus = () => {
    if (status) {
      dispatch(UpdateStatus(ticket.ticket_id, status, users, setLoadingStatus, ddlViewBy, navigate))
      setStatus(null);
    }
  }

  const addComment = (ticket) => {
    dispatch(AddComment(ticket.ticket_id, ticket.key, navigate, current, { createdAt: Timestamp.fromDate(new Date), msg: message, from: currentUser.uid, to: 'admin', fromName: current }));
    dispatch(LoadComments(ticket.ticket_id));
    setFrom(current)
    setMessage('');
  }
  return (
    <>
      <SideBar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Ticket Detail</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Ticket Detail</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content ticket-detail">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Ticket Detail</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-7 order-2 order-md-1">
                  <div className="row">
                    <div className="col-12">
                      <div className="info-box bg-light">
                        <div className="info-box-content">
                          <span className="info-box-text text-muted">Name </span>
                          <span className="info-box-number text-muted mb-0">{ticket && ticket?.ticket_name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="info-box bg-light">
                        <div className="info-box-content">
                          <span className="info-box-text text-muted">Description</span>
                          <span className="info-box-number text-muted mb-0">{ticket && ticket?.ticket_description}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="info-box bg-light">
                        <div className="info-box-content">
                          <span className="info-box-text text-muted">Assigned to</span>

                          {
                            ticket && ticket?.assigned_users.includes(current) ? <span className="info-box-number text-muted mb-0">Me</span> : ticket && ticket?.assigned_users.map((u, index) => <span key={index} className='info-box-number text-muted mb-0'>{u}</span>)
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="info-box bg-light">
                        <div className="info-box-content">
                          <h5 className="mt-1 text-muted">Attechments</h5>
                          <ul className="list-unstyled">
                            {
                              ticket && ticket?.ticket_urls.map((item, index) => <li key={index}>
                                <a href={item.url} className="btn-link text-secondary"><i className="far fa fa-paperclip" />  {item.file_name}</a>
                              </li>)
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-5 order-1 order-md-2">
                  <h3 className="text-primary"><i className="fas fa-paint-brush" /> Ticket</h3>
                  <p className="text-muted">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terr.</p>
                  <br />
                  <div className="text-muted">
                    <p className="text-sm">Project Creator
                      <b className="d-block">Admin</b>
                    </p>
                  </div>

                  <h5 className="mt-1 text-muted">Status</h5>
                  <div className='d-flex'>
                    {
                      ticket && ticket.assigned_users.includes(current) ? <>
                        <div className="btn-group">
                          <select id="ddlViewBy" className='status' onChange={(e) => setStatus(e.target.value)}>
                            <option value="select" defaultValue={'Select'} disabled>Select</option>
                            <option value="TO-DO">TO-DO</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="DEVELOPMENT">DEVELOPMENT</option>
                          </select>
                        </div>
                        <button className='btn btn-primary ms-2' onClick={() => updateStatus()}>{loadingStatus ? 'Updating...' : 'Update'}</button>
                      </> :
                        <span className='badge badge-info'>{ticket?.ticket_status}</span>
                    }
                  </div>
                  {
                    ticket && ticket.assigned_users.includes(current) ? <>
                      <h5 className="mt-4 text-muted">Assign to </h5>
                      <div className="d-flex">
                        <div className="btn-group">
                          <select id="ddlViewBy2" className='status' onChange={(e) => setSelectedUser(e.target.value)}>
                            <option value="select" defaultValue={'Select'} disabled selected>Select</option>
                            {
                              array && array.map((user, index) => <option value={user} key={index}>{user}</option>)
                            }
                          </select>
                        </div>
                        <button className='ms-2 btn btn-md btn-primary' onClick={() => handleAssign()}>{loadingUser ? 'Assigning...' : 'Assign'}</button>
                      </div>
                    </> : null
                  }

                </div>
              </div>

              {/* Comment Section */}

              {ticket && ticket.assigned_users.includes(current) ?
                <div className='border p-2 rounded'>
                  <div className="row mb-2 px-2 align-items-center">
                    {
                      ticket && comments && comments.map((c, index) =>
                        <div className={`col-7 mb-2 p-2 d-flex rounded align-items-center ${c.from === 'admin' ? 'bg-admin' : c.fromName === current ? 'bg-current' : null}`} key={index}>
                          <Avatar size='35' round={true} name={c.from === 'admin' ? 'admin' : c.fromName} textSizeRatio={1.75} />
                          <div className="message ms-2">
                            <small className='text-muted'><Moment>{c.createdAt.toDate()}</Moment></small>
                            <p className='m-0'>{c.msg}</p>
                          </div>
                        </div>
                      )
                    }
                  </div>
                  <div className="row ">
                    <div className="col-9">
                      <div className="form">
                        <form>
                          <div className="form-group px-2">
                            <label htmlFor="exampleFormControlTextarea1" className="ps-2 text-muted">Comment</label>
                            <textarea className="form-control"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)} id="exampleFormControlTextarea1" rows={3} />
                          </div>
                          <button type='button' className='btn btn-outline-success ms-2' onClick={() => addComment(ticket)}>Submit</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                : null}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ViewTicketDetail