import React, { useEffect, useState } from 'react'
import ProjectModel from '../../Models/ProjectModel'
import InputButton from '../../user/inputFunction/InputButton';
import Layout from '../../admin/layout';
import { loadProjects, loadTickets, UpdateTicket } from '../../Redux/Action/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModel from '../../Models/DeleteModel';
import TicketModel from '../../Models/TicketModel';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import TicketDetailModel from '../../Models/TicketDetailModel';
function AllTickets() {
    const [showModel, setShowModel] = useState(false);
    const [showDeleteModel, setDeleteShowModel] = useState(false);
    const[showTicketDetailModel,setShowTicketDetailModel]=useState(false);
    const [action, setAction] = useState('');
    const [edititem, setEditItem] = useState();
    const [deleteitem, setDeleteItem] = useState();
    const [updateTicket,setUpdateTicket]=useState(false);
    const[detail,setDetail]=useState();
    const [st,setSt]=useState({data:"",status:""});
    const dispatch = useDispatch();
    const handleAdd = () => {
        setShowModel(true);
        setAction('add')
    }
    const Router=useRouter();
    useEffect(() => {
        dispatch(loadProjects());
        dispatch(loadTickets());
    }, [dispatch])
    let tickets = useSelector((state) => state.userReducer.tickets);
    const[state,setState]=useState({tasks:[]})
    let load=false;
    // useEffect(()=>{
    //     if(!load)
    //     {
    //         setState(tickets)
    //     }
    //     return()=>{
    //       load=true;
    //     }
    // },[tickets])
    // console.log(tickets, "--------------all tickets")
    
    const todo = tickets?.filter((item, index) => {
        return item?.ticket_status.value == "Todo"

    })
    const progress = tickets?.filter((item, index) => {
        return item?.ticket_status.value == "In progress"

    })
    const testing = tickets?.filter((item, index) => {
        return item?.ticket_status.value == "Ready For Testing"

    })
    const done = tickets?.filter((item, index) => {
        return item?.ticket_status.value == "Done"

    })
    // console.log(todo,"------------todo-----------")
    // console.log(progress,"------------progress-----------")
    // console.log(testing,"------------testing-----------")
    // console.log(done,"------------done-----------")

    const onDragStart = (evt,id) => {
        let element = evt.currentTarget;

        element.classList.add("dragged");
        evt.dataTransfer.setData("text/plain", id);
        evt.dataTransfer.effectAllowed = "move";
      };
     const onDragEnd = (evt) => {
        evt.currentTarget.classList.remove("dragged");
      };
     const onDragEnter = (evt) => {
        evt.preventDefault();
        let element = evt.currentTarget;
        element.classList.add("dragged-over");
        evt.dataTransfer.dropEffect = "move";
      };
     const onDragLeave = (evt) => {
        let currentTarget = evt.currentTarget;
        let newTarget = evt.relatedTarget;
        if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
          return;
        evt.preventDefault();
        let element = evt.currentTarget;
        element.classList.remove("dragged-over");
      };
     const onDragOver = (evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
      };
     const onDrop = (evt, value, status) => {
        evt.preventDefault();
        evt.currentTarget.classList.remove("dragged-over");
        let data = evt.dataTransfer.getData("text/plain");
        // let tasks = this.state.tasks;
        console.log("data", data, status);
        setUpdateTicket(true);
        setSt({data:data,status:status});
      };
      
      useEffect(()=>{
        let updated = tickets?.map((task) => {
            if (task.id === st.data) {
              dispatch(UpdateTicket({ ticket_name: task.ticket_name, ticket_description: task.ticket_description, ticket_status: {label:st.status,value:st.status}, assigned_users: task.assigned_users, createdAt: Timestamp.fromDate(new Date) }, task.id));
              // dispatch(loadTickets());
              // task.ticket_status.value = status;
            }
            return task;
          });
          return()=>{
            setUpdateTicket(false);
          }
      },[updateTicket])
    // console.log(state,"-------------state----------")

    const handleClick=(item)=>{
        setShowTicketDetailModel(true);
        setDetail(item);
    }

    return (
        <>
            {
                showModel ? <TicketModel showModel={showModel} setShowModel={setShowModel} action={action} edititem={edititem} /> : null
            }
            {
                showDeleteModel ? <DeleteModel showDeleteModel={showDeleteModel} setDeleteShowModel={setDeleteShowModel} action="project" deleteitem={deleteitem} /> : null
            }
            {
                showTicketDetailModel ?<TicketDetailModel showTicketDetailModel={showTicketDetailModel} setShowTicketDetailModel={setShowTicketDetailModel} setDetail={setDetail} detail={detail}/>:null
            }
              <div className={Router.pathname == "/tickets"?"":"main-content"}>
                <div className={Router.pathname == "/tickets"?"":"page-content"}>
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row" style={{display:Router.pathname == "/tickets"?"none":"block"}}>
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">All Ticket</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Ticket</a></li>
                                            <li className="breadcrumb-item active">All Ticket</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-lg-12">
                                {/* <div className='drag-drop'> */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title mb-0">All Ticket</h4>
                                    </div>{/* end card header */}
                                    <div className="card-body">
                                        <div id="customerList">
                                            <div className="row g-4 mb-3">
                                                <div className="col-sm-auto">
                                                    <div>
                                                        <InputButton name="Add" className="btn btn-success add-btn" handleClick={handleAdd} />
                                                        {/* <button type="button" onClick={()=>{handleAdd()}}className="btn btn-success add-btn" data-bs-toggle="modal" id="create-btn" data-bs-target="#showModal"><i className="ri-add-line align-bottom me-1" /> Add</button> */}
                                                        {/* <button className="btn btn-soft-danger" onclick="deleteMultiple()"><i className="ri-delete-bin-2-line" /></button> */}
                                                    </div>
                                                </div>
                                                <div className="col-sm">
                                                    <div className="d-flex justify-content-sm-end">
                                                        <div className="search-box ms-2">
                                                            <input type="text" className="form-control search" placeholder="Search..." />
                                                            <i className="ri-search-line search-icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='drag'>
                                            <div className="container">
                                                <div
                                                    className="order small-box"
                                                    onDragLeave={(e) => onDragLeave(e)}
                                                    onDragEnter={(e) => onDragEnter(e)}
                                                    onDragEnd={(e) => onDragEnd(e)}
                                                    onDragOver={(e) => onDragOver(e)}
                                                    onDrop={(e) => onDrop(e, false, "Todo")}
                                                >
                                                    <section className="drag_container">
                                                        <div className="container">
                                                            <div className="drag_column">
                                                                <div className="drag_row">
                                                                    <h4>Todo</h4>
                                                                    {todo&&[...new Map(todo.map((item) => [item?.id, item])).values()].map((task) => (
                                                                        <div
                                                                            className="card1"
                                                                            key={task.id}
                                                                            id={task.id}
                                                                            draggable
                                                                            onDragStart={(e) => onDragStart(e,task.id)}
                                                                            onDragEnd={(e) => onDragEnd(e,task.id)}
                                                                            onClick={()=>handleClick(task)}
                                                                        >
                                                                            {/* <div className="img">
                                                                                <img src={task.image} alt="box" />
                                                                            </div> */}
                                                                            <div className="card_right">
                                                                                <div className="status">{task.ticket_status.value}</div>
                                                                                <div className="days">{task.ticket_name}</div> {/* <div className="days">{task.time}</div>
                                                                                <div className="time">{task.days}</div> */}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div
                                                    className="pending small-box"
                                                    onDragLeave={(e) => onDragLeave(e)}
                                                    onDragEnter={(e) => onDragEnter(e)}
                                                    onDragEnd={(e) => onDragEnd(e)}
                                                    onDragOver={(e) => onDragOver(e)}
                                                    onDrop={(e) =>onDrop(e, false, "In progress")}
                                                >
                                                    <section className="drag_container">
                                                        <div className="container">
                                                            <div className="drag_column">
                                                                <div className="drag_row">
                                                                    <h4>In Progress</h4>
                                                                    {progress&&[...new Map(progress.map((item) => [item?.id, item])).values()].map((task) => (
                                                                        <div
                                                                            className="card1"
                                                                            key={task.id}
                                                                            id={task.id}
                                                                            draggable
                                                                            onDragStart={(e) => onDragStart(e,task.id)}
                                                                            onDragEnd={(e) => onDragEnd(e,task.id)}
                                                                            onClick={()=>handleClick(task)}
                                                                        >
                                                                            {/* <div className="img">
                                                                                <img src={task.image} alt="box" />
                                                                            </div> */}
                                                                            <div className="card_right">
                                                                                <div className="status">{task.ticket_status.value}</div>
                                                                                <div className="days">{task.ticket_name}</div> {/* <div className="days">{task.time}</div>
                                                                                <div className="time">{task.days}</div> */}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div
                                                    className="waiting small-box"
                                                    onDragLeave={(e) => onDragLeave(e)}
                                                    onDragEnter={(e) => onDragEnter(e)}
                                                    onDragEnd={(e) => onDragEnd(e)}
                                                    onDragOver={(e) =>onDragOver(e)}
                                                    onDrop={(e) => onDrop(e, true, "Ready For Testing")}
                                                >
                                                    <section className="drag_container">
                                                        <div className="container">
                                                            <div className="drag_column">
                                                                <div className="drag_row">
                                                                    <h4>Ready For Testing</h4>
                                                                    {testing&&[...new Map(testing.map((item) => [item?.id, item])).values()].map((task) => (
                                                                        <div
                                                                            className="card1"
                                                                            key={task.id}
                                                                            id={task.id}
                                                                            draggable
                                                                            onDragStart={(e) => onDragStart(e,task.id)}
                                                                            onDragEnd={(e) => onDragEnd(e,task.id)}
                                                                            onClick={()=>handleClick(task)}
                                                                        >
                                                                            {/* <div className="img">
                                                                                <img src={task.image} alt="box" />
                                                                            </div> */}
                                                                            <div className="card_right">
                                                                                <div className="status">{task.ticket_status.value}</div>
                                                                                <div className="days">{task.ticket_name}</div>
                                                                                {/* <div className="days">{task.time}</div>
                                                                                <div className="time">{task.days}</div> */}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div
                                                    className="done small-box"
                                                    onDragEnter={(e) => onDragEnter(e)}
                                                    onDragLeave={(e) => onDragLeave(e)}
                                                    onDragEnd={(e) => onDragEnd(e)}
                                                    onDragOver={(e) => onDragOver(e)}
                                                    onDrop={(e) => onDrop(e, true, "Done")}
                                                    
                                                >
                                                    <section className="drag_container">
                                                        <div className="container">
                                                            <div className="drag_column">
                                                                <div className="drag_row">
                                                                    <h4>Done</h4>
                                                                    {done&&[...new Map(done.map((item) => [item?.id, item])).values()].map((task) => (
                                                                        <div
                                                                            className="card1"
                                                                            key={task.id}
                                                                            id={task.id}
                                                                            draggable
                                                                            onDragStart={(e) => onDragStart(e,task.id)}
                                                                            onDragEnd={(e) => onDragEnd(e,task.id)}
                                                                            onClick={()=>handleClick(task)}
                                                                        >
                                                                            {/* <div className="img">
                                                                                <img src={task.image} alt="box" />
                                                                            </div> */}
                                                                            <div className="card_right">
                                                                                <div className="status">{task.ticket_status.value}</div>
                                                                                <div className="days">{task.ticket_name}</div>
                                                                                {/* <div className="time">{task.days}</div> */}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                            </div>
                                            {/* <div className="table-responsive table-card mt-3 mb-1">
                                                <table className="table align-middle table-nowrap" id="customerTable">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th className="sort" data-sort="customer_name">Todo</th>
                                                            <th className="sort" data-sort="email">In progress</th>
                                                            <th className="sort" data-sort="phone">Ready For Testing</th>
                                                            <th className="sort" data-sort="date">Done</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="list form-check-all">
                                                        <tr><td>todo</td><td>In progress</td><td>Ready For Testing</td><td>Done</td></tr>
                                                       
                                                     
                                                    {/* {projects && projects?.map((item,index)=>{
                                                           return <tr key={index}>
                                                               <td>{index+1}</td>
                                                               <td >{item?.project_name}</td>
                                                               <td>{item?.project_description}</td>
                                                               <td>{item?.assigned_users.map((item,index)=><span key={index}>{item?.value} {" , "}</span>)}</td>
                                                               <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-success edit-item-btn"  onClick={()=>{handleEdit(item)}}>Edit</button>
                                                                    </div>
                                                                    <div className="remove">
                                                                        <button className="btn btn-sm btn-danger remove-item-btn" onClick={()=>{handleDelete(item)}}>Remove</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                           </tr>
                                                    })} */}
                                            {/* </tbody> */}
                                            {/* </table> */}
                                            {/* </div>      */}
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>



        </>
    )
}

export default AllTickets