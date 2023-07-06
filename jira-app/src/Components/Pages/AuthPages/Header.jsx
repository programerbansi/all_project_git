import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Down from "../../Svg/Down";
import "../../Styles/Header.css";
import { removeRole, getToken, removeToken, getRole } from '../../../Services/LocalStorage'
import { signOut } from "firebase/auth";
import { auth } from '../../../Services/firebase';
import { ValAuthContext } from "../../Context/ValContext";

function Header() {
  const navigate = useNavigate();
  const val = useContext(ValAuthContext);
  const handleToggle = () => {
    if (val.toggle) {
      document.getElementById('sub_menu').style.display = 'block';
      val.setToggle(false);
    }
    else {
      document.getElementById('sub_menu').style.display = 'none';
      val.setToggle(true)
    }
  }

  const handleLogOut = () => {
    signOut(auth).then(() => {
      removeToken();
      removeRole();
      navigate('/');
    }).catch((error) => {
      console.log(error);
    });
  }

  let token = getToken();
  let role = getRole();
  useEffect(() => {
    if (!token && !role) {
      navigate('/');
    }
  }, [token, role]);

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-center text-lg-start">
              <li className="nav-item d-flex px-4 justify-content-center justify-content-lg-start">
                <img src={require('../../Assets/logo.png')} alt="logo" style={{ width: '30px', height: '30px', display: 'block', marginTop: 'auto', marginBottom: 'auto' }} />
                <a className="nav-link active text-uppercase">JiraWeb</a>
              </li>
              <li className="nav-item px-4">
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </li>
              <li className="nav-item px-4">
                <a className="nav-link">Product</a>
              </li>
              <li className="nav-item px-4" onClick={() => handleToggle()}>
                <a className="nav-link">
                  For Teams <Down />
                </a>
              </li>
              <li className="nav-item px-4">
                <a className="nav-link">Support</a>
              </li>
            </ul>
            <form className="d-flex m-auto justify-content-center justify-content-lg-start" role="search">
              {
                token ?
                  <>
                    <button className="btn btn-outline-danger me-2" onClick={() => handleLogOut()}>Log Out</button>
                  </>
                  :
                  <>
                    <NavLink className="btn-signup me-2" to='/signup'>Sign Up</NavLink>
                    <NavLink className="btn-signin ms-2" to='/login'>Sign In</NavLink>
                  </>
              }
            </form>
          </div>
        </div>
      </nav>
      <div className="sub_menu pt-3 px-5 main-header" id="sub_menu">
        <div className="row">
          <div className="col-sm-3 col-6">
            <h6>By Team Size</h6>
          </div>
          <div className="col-sm-3 col-6">
            <h6>By Team Function</h6>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-3 col-6 justify-content-between justify-content-sm-center border-bottom-1 border-sm-0">
            <ul>
              <li>
                Startups <br />
                <small>Great for startups, from incubator to IPO</small>
              </li>
              <li>
                Business <br />
                <small>Get the right tools for your growing business</small>
              </li>
              <li>
                Enterprise
                <br />
                <small>Learn how we make big teams successfull</small>
              </li>
            </ul>
          </div>
          <div className="col-sm-3 col-6 border-bottom-1 border-sm-0">
            <ul>
              <li>
                Software <br />
                <small>Plan, build, & ship quality products</small>
              </li>
              <li>
                Marketing <br />
                <small>Bring together a winning strategy</small>
              </li>
              <li>
                Hr
                <br />
                <small>Streamline people management</small>
              </li>
              <li>
                Legal <br />
                <small>Operate securely and reliably</small>
              </li>
            </ul>
          </div>
          <div className="col-sm-3 col-6 align-items-center">
            <ul>
              <li>
                Operations <br />
                <small>Run your business efficiently</small>
              </li>
              <li>
                It <br />
                <small>Provide great service and support</small>
              </li>
              <li>
                Finance
                <br />
                <small>Simplify all finance processes</small>
              </li>
              <li>
                Incident Response <br />
                <small>Respond, resolve, & learn from incidents</small>
              </li>
            </ul>
          </div>
          <div className="col-sm-3 col-6">
            <ul>
              <li>
                Market Place <br />
                <small>Apps that enhance Atlassian products</small>
              </li>
              <li>
                Developers <br />
                <small>Docs and resources to build Atlassian apps</small>
              </li>
              <li>
                Trust and Security
                <br />
                <small>Compliance, privacy, platform roadmap, and more</small>
              </li>
              <li>
                Work Life Blog <br />
                <small>Stories on culture, tech, teams, and tips</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
