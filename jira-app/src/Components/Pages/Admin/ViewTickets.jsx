import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../AuthPages/SideBar';
import '../../Styles/ViewTickets.css';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTicket, LoadComments, loadTickets } from '../../redux/Actions';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminTicketDetail from './AdminTicketDetail';

function ViewTickets() {

  const [ticketArray, setTicketArray] = useState([]);
  const [closedTickets, setClosedTickets] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [viewDetail, setViewDetail] = useState({});
  const [visible, setVisible] = useState(false);
  let tickets = useSelector((state) => state.projectReducer.tickets);
  let comments = useSelector((state) => state.projectReducer.comments);
  console.log(comments,'==============================deatil=========================')

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let dId = document.getElementsByClassName('btn-close')[0]?.id;

  let todo = useSelector((state) => state.projectReducer.todo);
  let completed = useSelector((state) => state.projectReducer.completed);
  let development = useSelector((state) => state.projectReducer.development);

  useEffect(() => {
    dispatch(loadTickets());
  }, [dispatch, location]);

  const handleDelete = (id, dId) => {
    dispatch(DeleteTicket(id, dId));
    dispatch(loadTickets());
  }
  const handleEdit = (id, item) => {
    navigate('/adminDashboard/editTicket', { state: { item } })
  }

  const viewTicketDetail = (item) => {
    setViewDetail(item);
    setVisible(true);
    dispatch(LoadComments(item.id))
  }
  return (
    <>
      <SideBar />
      <div className="content-wrapper bg-white">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Ticket List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Ticket List</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box bg-info" onClick={() => setTicketArray(tickets)}>
                  <div className="info-box-content">
                    <span className="info-box-text text-center">Total Tickets</span>
                    <span className="info-box-number text-center">
                      {completed + todo + development}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box  bg-danger mb-3" onClick={() => {
                  setClosedTickets(true);
                  setTicketArray(tickets.filter((ticket) => { return ticket.ticket_status === 'COMPLETED' }
                  ))
                }}>
                  <div className="info-box-content">
                    <span className="info-box-text text-center">Completed Tickets</span>
                    <span className="info-box-number text-center">{completed}</span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box bg-success mb-3" onClick={() => setTicketArray(tickets.filter((ticket) => {
                  return ticket.ticket_status === 'DEVELOPMENT'
                }))}
                >
                  <div className="info-box-content">
                    <span className="info-box-text text-center">Development Tickets</span>
                    <span className="info-box-number text-center">{development}</span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box bg-warning mb-3" onClick={() => setTicketArray(tickets.filter((ticket) => {
                  return ticket.ticket_status === 'TO-DO'
                }))}>
                  <div className="info-box-content">
                    <span className="info-box-text text-center">To-Do Tickets</span>
                    <span className="info-box-number text-center">{todo}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header border-transparent">
                    <h3 className="card-title">Tickets</h3>
                    <div className="card-tools">
                      <button type="button" className="btn btn-tool" data-card-widget="collapse">
                        <i className="fas fa-minus" />
                      </button>
                      <button type="button" className="btn btn-tool" data-card-widget="remove">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table m-0">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Assigned-Users</th>
                            <th>Attechments</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            closedTickets && ticketArray && ticketArray.map((item, index) =>
                              <tr key={index}>
                                <td className='text-dark'>{item.ticket_name}</td>
                                <td><a>{item.ticket_description}</a></td>
                                <td>
                                  {
                                    item.ticket_status === 'Pending' ? <span className='badge badge-warning'>{item.ticket_status}</span> :
                                      item.ticket_status === 'Closed' ? <span className='badge badge-danger'>{item.ticket_status}</span> :
                                        item.ticket_status === 'Open' ? <span className='badge badge-success'>{item.ticket_status}</span> : null
                                  }
                                </td>
                                <td>{item?.createdAt.toDate().toDateString()}</td>
                                <td>
                                  {
                                    item?.assigned_users ?
                                      item.assigned_users.map((user, index) =>
                                        <span key={index}>
                                          <span className='d-block'>
                                            <h6 className='m-0 p-0 d-inline-block'>({index + 1}) {user} </h6>
                                          </span>
                                          <br />
                                        </span>
                                      ) :
                                      null
                                  }
                                </td>
                                <td>
                                  {
                                    item?.ticket_urls ?
                                      item.ticket_urls.map((file, index) =>
                                        <span key={index}>
                                          <span className='d-block'>
                                            <h6 className='m-0 p-0 d-inline-block'>({index + 1}) </h6>
                                            <a href={file.url} className='text-blue'> {file?.file_name || file?.image_name}</a>
                                          </span>
                                          <br />
                                        </span>
                                      ) :
                                      null
                                  }
                                </td>
                                <td>
                                  <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(item.id, item)}>
                                    <i className="fas fa-pencil-alt">
                                    </i>
                                    Edit
                                  </button>
                                  <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setDeleteId(item.id)}>
                                    <i className="fas fa-trash">
                                    </i>
                                    Delete
                                  </button>
                                </td>
                              </tr>) ||
                            tickets && tickets.map((item, index) =>
                              <tr key={index}>
                                <td className='text-dark'>{item.ticket_name}</td>
                                <td><a>{item.ticket_description}</a></td>
                                <td>
                                  {
                                    item.ticket_status === 'TO-DO' ? <span className='badge badge-warning'>{item.ticket_status}</span> :
                                      item.ticket_status === 'COMPLETED' ? <span className='badge badge-danger'>{item.ticket_status}</span> :
                                        item.ticket_status === 'DEVELOPEMNT' ? <span className='badge badge-success'>{item.ticket_status}</span> : null
                                  }
                                </td>
                                <td>{item?.createdAt.toDate().toDateString()}</td>
                                <td>
                                  {
                                    item?.assigned_users ?
                                      item.assigned_users.map((user, index) =>
                                        <span key={index}>
                                          <span className='d-block'>
                                            <h6 className='m-0 p-0 d-inline-block'>({index + 1}) {user} </h6>
                                          </span>
                                          <br />
                                        </span>
                                      ) :
                                      null
                                  }
                                </td>
                                <td>
                                  {
                                    item?.ticket_urls ?
                                      item.ticket_urls.map((file, index) =>
                                        <span key={index}>
                                          <span className='d-block'>
                                            <h6 className='m-0 p-0 d-inline-block'>({index + 1}) </h6>
                                            <a href={file.url} className='text-blue'> {file?.file_name || file?.image_name}</a>
                                          </span>
                                          <br />
                                        </span>
                                      ) :
                                      null
                                  }
                                </td>
                                <td>
                                  <button className='btn btn-info btn-sm me-2' data-toggle="modal" data-target="#exampleModalCenter"  onClick={() => viewTicketDetail(item)}>Comments</button>
                                  <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(item.id, item)}>
                                    <i className="fas fa-pencil-alt">
                                    </i>
                                    Edit
                                  </button>
                                  <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setDeleteId(item.id)}>
                                    <i className="fas fa-trash">
                                    </i>
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>
                      {
                        <AdminTicketDetail ticket={viewDetail} visible= {visible} setVisible={setVisible} comments={comments}/>
                      }
                      {/* confirm delete */}

                      <div className="modal" tabIndex={-1} id='deleteModal'>
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Delete Project</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                              <p>Are you sure , you want to delete?</p>
                            </div>
                            <div className="modal-footer">
                              <button type="button" id='closeDeleteModal' className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                              <button type="button" className="btn btn-danger" onClick={() => handleDelete(deleteId, dId)}>Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ViewTickets