import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../AuthPages/SideBar'
import '../../Styles/BackLog.css';
import { useDispatch, useSelector } from 'react-redux';
import { LoadProjectTickets, LoadUsers, LoadUserTickets } from '../../redux/Actions';
import { useLocation } from 'react-router-dom';
import Avatar from 'react-avatar';
import { getProjectId } from '../../../Services/LocalStorage';
import { auth } from '../../../Services/firebase';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function BackLog() {

  const [currentTickets, setCurrentTickets] = useState([]);
  const [todo, setTodo] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [development, setDevelopment] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();

  let users = useSelector((state) => state.projectReducer.users);
  let projectTickets = useSelector((state) => state.projectReducer.projectTickets);

  let item = getProjectId();

  useEffect(() => {
    dispatch(LoadUsers());
    dispatch(LoadUserTickets(users));
    if (item) { dispatch(LoadProjectTickets(item.project_id)); }

    users && users.map((user) => {
      if (user.uid === auth.currentUser.uid) {
        setUser(user);
      }
    });
    setTodo(currentTickets && currentTickets.filter((ticket) => { return ticket.ticket_status === 'TO-DO' }));
    setCompleted(currentTickets && currentTickets.filter((ticket) => { return ticket.ticket_status === 'COMPLETED' }));
    setDevelopment(currentTickets && currentTickets.filter((ticket) => { return ticket.ticket_status === 'DEVELOPMENT' }));

  }, [dispatch, location, users]);

  useEffect(() => {
    setCurrentTickets(projectTickets && projectTickets.filter((ticket) => {
      return ticket.assigned_users.includes(user?.name)
    }))
  }, [users]);

  const onDragEnd = () => {

  }

  return (
    <>
      <SideBar />
      <div className="content-wrapper bg-white kanban">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <h1>BackLog </h1>
              </div>
              <div className="col-sm-6 d-none d-sm-block">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Kanban Board</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content pb-3">
          <div className="container-fluid">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="row">
                <Droppable>
                  <div className="col-md-4">
                    <div className="card card-row card-warning">
                      <div className="card-header">
                        <h3 className="card-title">
                          TO-DO
                        </h3>
                        <span>
                        </span>
                      </div>
                      <div className="card-body p-0">
                        {
                          todo && todo.map((ticket, index) =>
                            <div className="card card-outline m-2" key={index}>
                              <div className="card-header">
                                <Avatar name={ticket?.new_assigned} round={true} size="40" title={ticket?.new_assigned || 'Not Assigned'} />
                              </div>
                              <div className="card-body">
                                <div className="info-box-content">
                                  <p><b>Name : </b><span className="text-muted mb-0 mx-1"> {ticket && ticket?.ticket_name}</span></p>
                                  <p><b>Description : </b><span className="text-muted mb-0 mx-1"> {ticket && ticket?.ticket_description}</span></p>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </Droppable>
                <div className="col-md-4">
                  <div className="card card-row card-default">
                    <div className="card-header bg-info">
                      <h3 className="card-title">
                        DEVELOPMENT
                      </h3>
                    </div>
                    <div className="card-body p-0">
                      {
                        development && development.map((ticket, index) =>
                          <div className="card card-info card-outline m-2" key={index}>
                            <div className="card-header">
                              <Avatar name={ticket?.new_assigned} round={true} size="40" />
                            </div>
                            <div className="card-body">
                              <div className="info-box-content">
                                <b>Name : </b><span className="info-box-number text-muted mb-0">{ticket && ticket?.ticket_name}</span>
                                <br />
                                <b>Description : </b><span className="info-box-number text-muted mb-0">{ticket && ticket?.ticket_description}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card card-row card-success">
                    <div className="card-header">
                      <h3 className="card-title">
                        COMPLETED
                      </h3>
                    </div>
                    <div className="card-body p-0">
                      {
                        completed && completed.map((ticket, index) =>
                          <div className="card card-info card-outline m-2" key={index}>
                            <div className="card-header">
                              <Avatar name={ticket?.new_assigned} round={true} size="40" />
                            </div>
                            <div className="card-body">
                              <div className="info-box-content">
                                <p><b>Name : </b><span className="info-box-number text-muted mb-0 ms-1">{ticket && ticket?.ticket_name}</span></p>
                                <p><b>Description : </b><span className="info-box-number text-muted mb-0 ms-1">{ticket && ticket?.ticket_description}</span></p>
                              </div>
                            </div>
                          </div>
                        )
                      }

                    </div>
                  </div>
                </div>
              </div>
            </DragDropContext>
          </div>
        </section>
      </div>
    </>
  )
}

export default BackLog