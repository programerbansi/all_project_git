import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getLocation, getRole, getToken } from '../../../Services/LocalStorage';

function Protected(props) {
    const navigate = useNavigate();
    const { Component } = props;

    let token = getToken();
    let role = getRole();
    let location = getLocation();
    useEffect(() => {
        if (!token && (role !== 'admin') || !token && (role !== 'user')) 
        {
            navigate('/login');
        }
        else if(token && (role === 'admin'))
        {
            navigate(`/${role}Dashboard`);
            switch(location)
            {
                case 'addProject':
                    navigate(`/${role}Dashboard/${location}`);
                case 'viewProjects':
                    navigate(`/${role}Dashboard/${location}`);
                case 'profile' :
                    navigate(`/${role}Dashboard/${location}`);
                case 'viewTickets' :
                    navigate(`/${role}Dashboard/${location}`)
                default:        
            }
        }
        else if(token && (role === 'user'))
        {
            // navigate(`/${role}Dashboard`);
            switch(location)
            {
                case 'viewProjectDetail':
                    navigate(`/${role}Dashboard/${location}`);
                default:        
            }
        }
        // else if(token && (role == 'admin') || token && (role == 'user')){
        //     navigate(`/${role}Dashboard`);
        // }
    }, [])
    return (
        <div><Component /></div>
    )
}

export default Protected
