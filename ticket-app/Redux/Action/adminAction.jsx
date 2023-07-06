import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const projectsCollectionRef = collection(db, 'projects');
const usersCollectionRef = collection(db, 'users');
const ticketCollectionRef = collection(db, 'tickets');

export const LoadUsers = () => {
    return (dispatch) => {
        let users = [];
        const q = query(usersCollectionRef);
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                users.push(doc.data())
            })
            dispatch(GetUsers(users))
        })
        return () => unsub();
    }
}

const GetUsers = (users) => {
    return {
        type: 'GET_USERS',
        payload: users
    }
}

export const CreateProject = (obj, reset,setShowModel) => {
    return {
        type: 'ADD_PROJECT',
        payload: project(obj,setShowModel)
        // payload: project(obj, reset, setLoading)
    }
}

const project = async (obj, reset, setLoading,setShowModel) => {
    await addDoc(projectsCollectionRef, {
        project_name: obj.project_name, project_description: obj.project_description, createdAt: obj.createdAt, assigned_users: obj.assigned_users
    }).then((res) => {
        console.log(res,"====")
       
        // updateDoc(doc(db, 'projects', res.id), { project_id: res.id });
        // $('.msl-clear-btn').click();
        // setLoading(false);
        //  setShowModel(false);
        // reset();
        // return (dispatch) => {
        //     dispatch(loadTickets())
        // }
    });
    // urls = [];
}

export const loadProjects = () => {
    return (dispatch) => {
        let projects = [];
        const q = query(projectsCollectionRef);
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                projects.push({ project_name: doc.data().project_name, project_description: doc.data().project_description, createdAt: doc.data().createdAt, assigned_users: doc.data().assigned_users, id: doc.id });
            })
            dispatch(GetProjects(projects))
        })
        return () => unsub();
    }
}
const GetProjects = (projets) => {
    return {
        type: 'GET_PROJECTS',
        payload: projets
    }
}
export const UpdateProject = (obj, editId, setLoading, setShowModel,reset, btnId, userName) => {
    return (dispatch) => {
        const updateProject = doc(db, 'projects', editId);
        updateDoc(updateProject, { project_id: editId, project_name: obj.project_name, project_description: obj.project_description, createdAt: obj.createdAt, assigned_users: obj.assigned_users }).then(() => {
            // setLoading(false);
            dispatch(loadProjects());
            // setShowModel(false);
            // dispatch(loadTickets());
            // dispatch(LoadUserProjects(userName))
            // dispatch(LoadProjectTickets(editId));
            // urls = [];
            // reset();
            // $(`#${btnId}`).click();
            return {
                type: 'UPDATE_PROJECT'
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}

const deleteDocument = async (id, dId) => {
    const project = doc(db, 'projects', id);
    await deleteDoc(project).then((res) => {
        // $(`#${dId}`).click();
    });
    return (dispatch) => {
        dispatch(loadProjects())
    }
}
export const DeleteProject = (id, dId) => {
    return {
        type: 'DELETE_PROJECT',
        payload: deleteDocument(id, dId)
    }
}

export const CreateTicket = (obj, projectId) => {
    return {
        type: 'ADD_TICKET',
        payload: Ticket(obj, projectId)
    }
}

const Ticket = async (obj, projectId, setLoading, reset, statusId, navigate) => {
    await addDoc(ticketCollectionRef, {
        ticket_name: obj.ticket_name, ticket_description: obj.ticket_description, createdAt: obj.createdAt, assigned_users: obj.assigned_users, ticket_status: obj.ticket_status, ticket_url: obj.ticket_Urls, key: projectId
    }).then((res) => {
        // reset();
        // updateDoc(doc(db, 'tickets', res.id), { ticket_id: res.id })
        // $('.msl-clear-btn').click();
        // statusId.value = 'select';
        // setLoading(false);
        // navigate('/adminDashboard/viewProjects');
        // return (dispatch) => { dispatch(LoadProjectTickets(projectId)) }
    });
    // ticketUrls = [];
}
export const loadTickets = () => {
    return (dispatch) => {
        let tickets = [];
        const q = query(ticketCollectionRef, orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                tickets.push({ ticket_name: doc.data().ticket_name, ticket_description: doc.data().ticket_description, ticket_status: doc.data().ticket_status, createdAt: doc.data().createdAt, ticket_url: doc.data().ticket_url, assigned_users: doc.data().assigned_users, key: doc.data().key, id: doc.id });
            })
            dispatch(GetTickets(tickets))
        })
        return () => unsub();
    }
}
const GetTickets = (tickets) => {
    return {
        type: 'GET_TICKETS',
        payload: tickets
    }
}

export const UpdateTicket = (obj, editId, setLoading, reset, setFiles, files) => {
    return (dispatch) => {
        const updateTicket = doc(db, 'tickets', editId);
        // if (files.length > 0) {
        //     updateDoc(updateTicket, { ticket_urls: ticketUrls }).then(() => {
        //         ticketUrls = [];
        //     });
        // }
        updateDoc(updateTicket, { ticket_name: obj.ticket_name, ticket_description: obj.ticket_description, createdAt: obj.createdAt, ticket_status: obj.ticket_status, assigned_users: obj.assigned_users }).then(() => {
            dispatch(loadTickets());
            // setFiles('');
            // setLoading(false);
            // reset();
            // $('#cancel').click();
            return {
                type: 'UPDATE_TICKET'
            }
        }).catch((error) => {
            console.log(error);
        })
    }

}