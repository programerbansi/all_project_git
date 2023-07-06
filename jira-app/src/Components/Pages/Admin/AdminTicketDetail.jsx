import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../../Styles/ViewTicketDetail.css";
import { AddComment, LoadComments, LoadUsers } from "../../redux/Actions";
import "../../Styles/ViewTicketDetail.css";
import { Timestamp } from "firebase/firestore";
import Avatar from "react-avatar";
import Moment from "react-moment";

function AdminTicketDetail({ ticket, visible ,setVisible ,comments}) {

  const [message, setMessage] = useState("");
  const [from,setFrom] = useState('');
  const [userId,setUserId] = useState('');

  const dispatch = useDispatch();

  const users = useSelector((state) => state.projectReducer.users);
  let close = document.getElementsByClassName('close');
  console.log(close[0]);

  useEffect(() => {
    dispatch(LoadUsers());
    setVisible(false);
  }, [dispatch]);

  useEffect(()=>{
    comments && comments.forEach((c) => {
      users && users.forEach((u) => {if(u.uid === c.from){
        setFrom(u.name)
        setUserId(u.uid);
      }})
    })
  },[comments]);
  
  const addComment = (ticket) => {
    dispatch(
      AddComment(ticket?.id, ticket.key, {
        createdAt: Timestamp.fromDate(new Date()),
        msg: message,
        from: 'admin',
        to : userId
      }));
    dispatch(LoadComments(visible && ticket ? ticket.id : null))
    setMessage("");
  };

  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="card-body">
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="COMMENTS">
                  <div className="p-2">
                    <div className="row mb-2 px-2 align-items-center">
                      {comments && comments.map((c,index) => (
                            <div
                              className={`col-12 mb-2 p-2 d-flex rounded align-items-center ${
                                c.from === "admin" ? "bg-admin" : ""
                              }`}
                              key={index}
                            >
                              <Avatar
                                size="35"
                                round={true}
                                
                                name={c.from != "admin" ?  `${from}`: "admin"}
                                textSizeRatio={1.75}
                              />
                              <div className="message ms-2">
                                <small className="text-muted">
                                  <Moment>{c.createdAt.toDate()}</Moment>
                                </small>
                                <p className="m-0">{c.msg}</p>
                              </div>
                            </div>
                          ))
                        }
                    </div>
                    <div className="row ">
                      <div className="col-12">
                        <div className="form">
                          <form>
                            <div className="form-group px-2">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="ps-2 text-muted"
                              >
                                Add Comment
                              </label>
                              <textarea
                                className="form-control"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                id="exampleFormControlTextarea1"
                                rows={3}
                              />
                            </div>
                            <button
                              type="button"
                              className="btn btn-outline-success ms-2"
                              onClick={() => addComment(ticket)}
                            >
                              Add
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            {/* <button type="button" className="btn btn-primary">
              Save changes
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTicketDetail;
