import { db, storage, auth } from '../../../Services/firebase';
import { collection, addDoc, query, onSnapshot, where, doc, updateDoc, deleteDoc, deleteField, orderBy, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import $ from 'jquery';

const projectsCollectionRef = collection(db, 'projects');
const adminCollectionRef = collection(db, 'admin');
const usersCollectionRef = collection(db, 'users');
const ticketCollectionRef = collection(db, 'tickets');
const commentCollectionRef = collection(db, 'comments');

let urls = [];

//  Project Images

const addProjectImage = async (file, editId, arrayFile) => {
    const imageRef = await ref(storage, `ProjetImageFiles/${new Date().getTime()} - ${file.name}`);
    const snap = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(ref(storage, snap.ref._location.path_));
    urls.push({ url: url, image_name: file.name });
    return (dispatch) => {
        if (arrayFile) {
            const updateProject = doc(db, 'projects', editId);
            updateDoc(updateProject, { project_urls: deleteField() });
            dispatch(loadProjects());
        }
    }
}

export const UploadProjectImage = (file, editId, arrayFile) => {
    return {
        type: 'UPLOAD_IMAGE_FILE',
        payload: addProjectImage(file, editId, arrayFile)
    }
}

// Project Files

const projectFile = async (file) => {
    const fileRef = await ref(storage, `ProjectFiles/${new Date().getTime()} - ${file.name}`);
    const snap = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(ref(storage, snap.ref._location.path_));
    urls.push({ url: url, file_name: file.name });
}

export const UploadProjectFile = (file) => {
    return {
        type: 'UPLOAD_PROJECT_FILE',
        payload: projectFile(file)
    }
}

//  Delete Field 

export const DeleteField = (editId) => {
    return (dispatch) => {
        const updateProject = doc(db, 'projects', editId);
        updateDoc(updateProject, { project_urls: deleteField() }).then(() => {
            dispatch(loadProjects());
            return {
                type: 'DELETE_FIELD'
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}

//  Add ( Create ) Project

export const CreateProject = (obj, reset, setLoading) => {
    return {
        type: 'ADD_PROJECT',
        payload: project(obj, reset, setLoading)
    }
}
const project = async (obj, reset, setLoading) => {
    await addDoc(projectsCollectionRef, {
        project_name: obj.project_name, project_description: obj.project_description, createdAt: obj.createdAt, project_urls: urls, assigned_users: obj.assigned_users
    }).then((res) => {
        updateDoc(doc(db, 'projects', res.id), { project_id: res.id });
        $('.msl-clear-btn').click();
        setLoading(false);
        reset();
        return (dispatch) => {
            dispatch(loadTickets())
        }
    });
    urls = [];
}

// Update ( Edit ) Project

export const UpdateProject = (obj, editId, setLoading, reset, btnId, userName) => {
    return (dispatch) => {
        const updateProject = doc(db, 'projects', editId);
        updateDoc(updateProject, { project_id: editId, project_name: obj.project_name, project_description: obj.project_description, createdAt: obj.createdAt, project_urls: urls, assigned_users: obj.assigned_users }).then(() => {
            setLoading(false);
            dispatch(loadProjects());
            dispatch(loadTickets());
            dispatch(LoadUserProjects(userName))
            dispatch(LoadProjectTickets(editId));
            urls = [];
            reset();
            $(`#${btnId}`).click();
            return {
                type: 'UPDATE_PROJECT'
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}

//  Delete PRoject

const deleteDocument = async (id, dId) => {
    const project = doc(db, 'projects', id);
    await deleteDoc(project).then(() => {
        $(`#${dId}`).click();
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

// Load and Get Projects

export const loadProjects = () => {
    return (dispatch) => {
        let projects = [];
        const q = query(projectsCollectionRef);
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                projects.push({ project_name: doc.data().project_name, project_description: doc.data().project_description, createdAt: doc.data().createdAt, project_urls: doc.data().project_urls, assigned_users: doc.data().assigned_users, id: doc.id });
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

// Load and Get Admin

export const LoadAdmin = () => {
    return (dispatch) => {
        const uid = auth?.currentUser?.uid;
        const q = query(adminCollectionRef, where('uid', '==', uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dispatch(GetAdmin(doc.data()))
            })
        })
        return () => unsub();
    }
}
const GetAdmin = (admin) => {
    return {
        type: 'GET_ADMIN',
        payload: admin,
    }
}

// Profile Image 

export const profileImage = (img, admin) => {
    return (dispatch) => {
        const uploadImage = async () => {
            const imgRef = await ref(storage, `avtar/${new Date().getTime()} - ${img.name}`);
            try {
                const snap = await uploadBytes(imgRef, img);
                const url = await getDownloadURL(ref(storage, snap.ref._location.path_));
                await updateDoc(doc(db, 'admin', admin.uid), {
                    avatar: url,
                    avatarPath: snap.ref._location.path_
                });
                dispatch(LoadAdmin());
            }
            catch (error) {
                console.log(error.message);
            }
            dispatch(LoadAdmin());
        };
        uploadImage();
    }
}

export const uploadProfileImage = (img, admin) => {
    return {
        type: 'UPLOAD_PROFILE_IMAGE',
        payload: profileImage(img, admin)
    }
}

// Load Users

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

// Add Ticket 

let ticketUrls = [];
export const CreateTicket = (obj, projectId, setLoading, reset, statusId, navigate) => {
    return {
        type: 'ADD_TICKET',
        payload: Ticket(obj, projectId, setLoading, reset, statusId, navigate)
    }
}

const Ticket = async (obj, projectId, setLoading, reset, statusId, navigate) => {
    await addDoc(ticketCollectionRef, {
        ticket_name: obj.ticket_name, ticket_description: obj.ticket_description, createdAt: obj.createdAt, assigned_users: obj.assigned_users, ticket_status: obj.ticket_status, ticket_urls: ticketUrls, key: projectId
    }).then((res) => {
        reset();
        updateDoc(doc(db, 'tickets', res.id), { ticket_id: res.id })
        $('.msl-clear-btn').click();
        statusId.value = 'select';
        setLoading(false);
        navigate('/adminDashboard/viewProjects');
        return (dispatch) => { dispatch(LoadProjectTickets(projectId)) }
    });
    ticketUrls = [];
}

//  Ticket Images

const addTicketImage = async (file) => {
    const imageRef = await ref(storage, `TicketImageFiles/${new Date().getTime()} - ${file.name}`);
    const snap = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(ref(storage, snap.ref._location.path_));
    ticketUrls.push({ url: url, image_name: file.name });
    // return (dispatch) => {
    //     if (arrayFile) {
    //         const updateProject = doc(db, 'projects', editId);
    //         updateDoc(updateProject, { project_urls: deleteField() });
    //         dispatch(loadProjects());
    //     }
    // }
}

export const UploadTicketImage = (file) => {
    return {
        type: 'UPLOAD_TICKET_IMAGE',
        payload: addTicketImage(file)
    }
}

// Ticket Files

const ticketFile = async (file) => {
    const fileRef = await ref(storage, `ticketFiles/${new Date().getTime()} - ${file.name}`);
    const snap = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(ref(storage, snap.ref._location.path_));
    ticketUrls.push({ url: url, file_name: file.name });
}

export const UploadTicketFile = (file) => {
    return {
        type: 'UPLOAD_TICKET_FILE',
        payload: ticketFile(file)
    }
}

// Ticket Status

export const ToDoCount = (i) => {
    return {
        type: 'TODO_COUNT',
        payload: i
    }
}
export const CompletedCount = (i) => {
    return {
        type: 'COMPLETED_COUNT',
        payload: i
    }
}

export const DevelopmentCount = (i) => {
    return {
        type: 'DEVELOPMENT_COUNT',
        payload: i
    }
}

// Load and Get Tickets 

export const loadTickets = () => {
    return (dispatch) => {
        let tickets = [];
        const q = query(ticketCollectionRef, orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                tickets.push({ ticket_name: doc.data().ticket_name, ticket_description: doc.data().ticket_description, ticket_status: doc.data().ticket_status, createdAt: doc.data().createdAt, ticket_urls: doc.data().ticket_urls, assigned_users: doc.data().assigned_users, key: doc.data().key, id: doc.id });
            })
            let todoTickets = [];
            let completedTickets = [];
            let developmentTickets = [];
            tickets.map((ticket) => {
                if (ticket.ticket_status === 'TO-DO') {
                    todoTickets.push(ticket)
                }
                if (ticket.ticket_status === 'COMPLETED') {
                    completedTickets.push(ticket)
                }
                if (ticket.ticket_status === 'DEVELOPMENT') {
                    developmentTickets.push(ticket)
                }
            })
            dispatch(ToDoCount(todoTickets.length));
            dispatch(CompletedCount(completedTickets.length))
            dispatch(DevelopmentCount(developmentTickets.length))
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

//  Delete Ticket Urls 

export const DeleteTicketUrl = (editId) => {
    return (dispatch) => {
        const updateTicket = doc(db, 'tickets', editId);
        updateDoc(updateTicket, { ticket_urls: deleteField() }).then(() => {
            dispatch(loadTickets());
            return {
                type: 'DELETE_FIELD'
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}

// Update Ticket 

export const UpdateTicket = (obj, editId, setLoading, reset, setFiles, files) => {
    return (dispatch) => {
        const updateTicket = doc(db, 'tickets', editId);
        if (files.length > 0) {
            updateDoc(updateTicket, { ticket_urls: ticketUrls }).then(() => {
                ticketUrls = [];
            });
        }
        updateDoc(updateTicket, { ticket_name: obj.ticket_name, ticket_description: obj.ticket_description, createdAt: obj.createdAt, ticket_status: obj.ticket_status, assigned_users: obj.assigned_users }).then(() => {
            dispatch(loadTickets());
            setFiles('');
            setLoading(false);
            reset();
            $('#cancel').click();
            return {
                type: 'UPDATE_TICKET'
            }
        }).catch((error) => {
            console.log(error);
        })
    }

}

//  Delete Ticket 

const deleteTicketDoc = async (id, dId) => {
    const project = doc(db, 'tickets', id);
    await deleteDoc(project).then(() => {
        $(`#${dId}`).click();
        $('#closeDeleteModal').click();
    });
    return (dispatch) => {
        dispatch(loadProjects())
    }
}
export const DeleteTicket = (id, dId) => {
    return {
        type: 'DELETE_TICKET',
        payload: deleteTicketDoc(id, dId)
    }
}


// ===================================================USERS=======================================================================

// Load and Get Current User Tickets 

export const LoadUserTickets = (users) => {
    return (dispatch) => {
        let tickets = [];
        let userTickets = [];
        const q = query(ticketCollectionRef, orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                tickets.push({ ticket_name: doc.data().ticket_name, ticket_description: doc.data().ticket_description, ticket_status: doc.data().ticket_status, createdAt: doc.data().createdAt, ticket_urls: doc.data().ticket_urls, assigned_users: doc.data().assigned_users, key: doc.data().key, id: doc.id, new_assigned: doc.data().new_assigned });
            })
            users && users.map((user) => {
                if (user.uid === auth.currentUser.uid) {
                    tickets.map((ticket) => {
                        ticket.assigned_users.map((u) => {
                            if (u.toUpperCase() === user.name.toUpperCase()) {
                                userTickets.push(ticket);
                            }
                        })
                    })
                }
            })
            dispatch(GetUserTickets(userTickets))
        })
        return () => unsub();
    }
}

const GetUserTickets = (userTickets) => {
    return {
        type: 'GET_USER_TICKETS',
        payload: userTickets
    }
}

// Update Asssigned User 

export const UpdateAssignedUser = (ticketId, value, users, ddlViewBy2, setLoadingUser, navigate) => {
    const updateTicket = doc(db, 'tickets', ticketId);
    return (dispatch) => {
        setLoadingUser(true);
        updateDoc(updateTicket, { new_assigned: value }).then(() => {
            dispatch(LoadUserTickets(users));
            ddlViewBy2.value = 'Select';
            setLoadingUser(false)
            navigate('/userDashboard/backlog');
            return {
                type: 'UPDATE_ASSIGNED_USER'
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}

// Update Status

export const UpdateStatus = (ticketId, status, users, setStatusLoading, ddlViewBy) => {
    const updateTicket = doc(db, 'tickets', ticketId);
    return (dispatch) => {
        setStatusLoading(true)
        updateDoc(updateTicket, { ticket_status: status }).then(() => {
            dispatch(LoadUserTickets(users));
            ddlViewBy.value = status;
            setStatusLoading(false);
            return {
                type: 'UPDATE_STATUS'
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}

// Load Project Tickets 

export const LoadProjectTickets = (id) => {
    return (dispatch) => {
        let tickets = [];
        const q = query(ticketCollectionRef, where('key', '==', id));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                tickets.push(doc.data())
            })
            dispatch(ProjectTickets(tickets))
        })
        return () => unsub();
    }
}

const ProjectTickets = (tickets) => {
    return {
        type: 'PROJECT_TICKETS',
        payload: tickets
    }
}

// Load User Assigned Projects

export const LoadUserProjects = (userName) => {
    return (dispatch) => {
        let userProjects = [];
        const q = query(projectsCollectionRef);
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().assigned_users.includes(userName)) {
                    userProjects.push(doc.data());
                }
            })
            dispatch(GetUserProjects(userProjects))
        })
        return () => unsub();
    }
}

const GetUserProjects = (userProjects) => {
    return {
        type: 'GET_USER_PROJECTS',
        payload: userProjects
    }
}

// Add Comment

export const AddComment = (ticketId, projectId, navigate,current ,obj) => {
    return {
        type: 'ADD_COMMENT',
        payload: Comment(ticketId, projectId,navigate,current , obj)
    }
}
const Comment = async (ticketId, projectId,navigate,current, obj) => {
    await addDoc(commentCollectionRef, {createdAt: obj.createdAt, msg: obj.msg, projectId: projectId, ticketId: ticketId, from: obj.from,to:obj.to
    }).then((res) => {
        if(current){
            window.location.reload();
            updateDoc(doc(db, 'comments', res.id), { fromName: obj.fromName });
        }
        $('.close').click();
        updateDoc(doc(db, 'comments', res.id), { comment_id: res.id })
    });
}

//  Load Comments

export const LoadComments = (ticketId) => {
    return (dispatch) => {
        let comments = [];
        const q = query(commentCollectionRef,orderBy('createdAt','asc'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(ticketId === doc.data().ticketId)
                {
                    comments.push(doc.data());
                }
            })
            dispatch(GetComments(comments))
        })
        return () => unsub();
    }
}

const GetComments = (comments) => {
    return {
        type: 'GET_COMMENTS',
        payload: comments
    }
}
export const LoadCommentUser = (userId) =>{
    return (dispatch) => {
        let user = [];
        const q = query(usersCollectionRef, where('uid','==',userId));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                user.push(doc.data());
            })
            dispatch(GetCommentUser(user))
        })
        return () => unsub();
    }
}
const GetCommentUser = (user) => {
    return {
        type: 'GET_COMMENT_USER',
        payload: user
    }
}



