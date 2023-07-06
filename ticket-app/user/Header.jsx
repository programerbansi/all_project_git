import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getRole, getToken } from '../LocalStorage/localStorageServices';
import { useRouter } from 'next/router'
import { FaUnlock,FaUserCheck } from "react-icons/fa";
import Link from 'next/link'
import InputButton from './inputFunction/InputButton';
function Header() {
    const router=useRouter();
    const role=getRole();
    const token=getToken();

    const handleLogin=()=>{
        token && role ? router.push('/') :router.push('/login');
    }
    const handleSignup=()=>{
        token && role ? router.push('/') :router.push('/signup');
       
    }
    const handleLogout=()=>{
        localStorage.clear();
        // removeRole();
        // removeToken();
        // removeUser();
        router.push('/')
    }
    useEffect(()=>{
        if(role == 'admin')
        {
            token && (role == 'admin') ? router.push('/admin') :router.push('/')
        }
       
    },[])
    // const handleTicket=()=>{
    //     router.replace("/tickets")
    // }
    // const handleProject=()=>{
    //     router.push('/user/project')
    // }
    return (
        <>
            <div className='mb-5'>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Ticket App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link href="/" className='mx-2 text-dark link-hover'>Home</Link>
                            <Link href="/project" className='mx-2 text-dark link-hover'>Project</Link>
                            <Link href="/tickets" className='mx-2 text-dark link-hover'>Ticket</Link>
                            {/* <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link onClick={()=>handleProject()}>Project</Nav.Link>
                            <Nav.Link onClick={()=>handleTicket()}>Ticket</Nav.Link> */}
                        </Nav>
                        {/* <div className='mx-2'> */}
                        {/* <button onClick={()=>handleProject()}>ok</button> */}
                        {!token && !role &&<InputButton name="Signup" handleClick={handleSignup} className={`mx-2 btn btn-primary`}/>}
                        {!token && !role &&<InputButton name="Signin" handleClick={handleLogin} className={`mx-2 btn btn-primary`}/>}
                        {token && role &&<InputButton name="Logout" handleClick={handleLogout} className={`mx-2 btn btn-danger`}/>}
                        {/* </div> */}

                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {router.pathname == "/"?<h2 className='text-primary m-3'>User Dashboard</h2>:null}
            </div>
        </>
    )
}

export default Header