import React, { useEffect, useState } from 'react'
import SideBar from '../AuthPages/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { LoadProjectTickets, loadTickets, LoadUsers, LoadUserProjects } from '../../redux/Actions';
import { useLocation, useNavigate } from 'react-router-dom';
// import Avatar from 'react-avatar';
import { auth } from '../../../Services/firebase';
import { getProjectId, storeUserTicket } from '../../../Services/LocalStorage';
import '../../Styles/ViewUserTickets.css';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Stack from '@mui/material/Stack';

function ViewUserTickets() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [allTicketList, setAllTicketList] = useState([]);
    const [user, setUser] = useState(null);

    // let tickets = useSelector((state) => state.projectReducer.tickets);
    let users = useSelector((state) => state.projectReducer.users);
    let projectTickets = useSelector((state) => state.projectReducer.projectTickets);

    let projectid = getProjectId();
    useEffect(() => {
        dispatch(LoadUsers());
        dispatch(loadTickets());
        if(projectid)
        {
            dispatch(LoadProjectTickets(projectid.project_id))
        }
        users && users.map((user) => {
            if (user.uid === auth.currentUser.uid) {
                setUser(user);
            }
        });
    }, [dispatch, location])

    useEffect(()=>{
        setAllTicketList(projectTickets);
    },[users])

    const allTickets = () => {
        setAllTicketList(projectTickets);
    }

    const filterTicket = (name) => {
        setAllTicketList(projectTickets && projectTickets.filter((ticket) => { return ticket.assigned_users.includes(name) }))
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
                        <div className="row align-items-center justify-content-center mt-4">
                            <div className="col-9">
                                <div className="avatar border w-auto rounded p-1">
                                    {projectid ? <Stack direction="row" spacing={2}>
                                        <AvatarGroup total={users.length}>
                                            {users && users.map((user, index) => <span className='user-avatar text-dark' key={index}>
                                                <Avatar className={`${user.uid === auth.currentUser.uid ? 'background' : null}`}  title={user.name} onClick={() => filterTicket(user.name)} >{user.name.charAt(0)}</Avatar>
                                            </span>)}
                                        </AvatarGroup>
                                        <button className='btn btn-outline-secondary' onClick={() => allTickets()}>All Tickets</button>
                                    </Stack> : 'Choose Project'}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid mt-4">
                        <div className="row justify-content-center">
                            <div className="col-9">
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allTicketList && allTicketList.map((item, index) =>
                                                        <tr key={index} onClick={() => {
                                                            storeUserTicket(JSON.stringify(item));
                                                            navigate('/userDashboard/viewTicketDetail', { state: { item } })}}>
                                                            <td className='text-dark'>{item.ticket_name}</td>
                                                            <td><a>{item.ticket_description}</a></td>
                                                            <td>
                                                                {
                                                                    item.ticket_status === 'TO-DO' ? <span className='badge badge-warning'>{item.ticket_status}</span> :
                                                                        item.ticket_status === 'COMPLETED' ? <span className='badge badge-success'>{item.ticket_status}</span> :
                                                                            item.ticket_status === 'DEVELOPMENT' ? <span className='badge badge-info'>{item.ticket_status}</span> : null
                                                                }
                                                            </td>
                                                        </tr>)
                                                    }
                                                </tbody>
                                            </table>
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

export default ViewUserTickets