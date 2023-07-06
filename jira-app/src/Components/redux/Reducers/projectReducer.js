let initialState = {
    total_pages: null,
    current_page: 1,
    admin: {},
    projects: [],
    userProjects: [],
    tickets: [],
    users: [],
    userTickets: [],
    projectTickets: [],
    comments: [],
    commentUser:{},
    todo: 0,
    completed: 0,
    development: 0
}

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ADMIN':
            return { ...state, admin: action.payload }
        case 'GET_PROJECTS':
            return { ...state, projects: action.payload }
        case 'GET_TICKETS':
            return { ...state, tickets: action.payload }
        case 'UPDATE_TICKET':
            return { ...state }
        case 'UPDATE_PROJECT':
            return { ...state }
        case 'DELETE_PROJECT':
            return { ...state }
        case 'GET_USER_PROJECTS':
            return { ...state, userProjects: action.payload }
        case 'GET_USERS':
            return { ...state, users: action.payload }
        case 'GET_USER_TICKETS':
            return { ...state, userTickets: action.payload }
        case 'TODO_COUNT':
            return { ...state, todo: action.payload }
        case 'COMPLETED_COUNT':
            return { ...state, completed: action.payload }
        case 'DEVELOPMENT_COUNT':
            return { ...state, development: action.payload }
        case 'UPDATE_ASSIGNED_USER':
            return { ...state }
        case 'UPDATE_STATUS':
            return { ...state }
        case 'PROJECT_TICKETS':
            return { ...state, projectTickets: action.payload }
        case 'GET_COMMENTS':
            return { ...state, comments: action.payload }
        case 'GET_COMMENT_USER':
            return { ...state }
        default:
            return state
    }
}