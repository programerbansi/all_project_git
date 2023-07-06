import React, { useContext, useEffect, useState } from "react";
import "../../styles/template1.css";
import { GiRotaryPhone } from "react-icons/gi";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import "bootstrap/dist/css/bootstrap.css";
import { ValAuthContext } from "../context/ValContext";
import { useSelector } from "react-redux";

const Template1 = () => {
  const val = useContext(ValAuthContext);

  const data = useSelector((state)=>state.Reducer);

  const [userObj,setUserObj] = useState(data.template != '' ? data.resume :val.userObj)
  const [profileText,setProfileText] = useState(" I am a qualified and professional web developer with five years of experience in database administration and website design. Strong creative and analytical skills. Team player with an eye for detail.")

  useEffect(()=>{
    setUserObj(data.template != '' ? data.resume :val.userObj)
  },[val.userObj])

  const details = [
    {
      icon: <GiRotaryPhone />,
      value:val?.userObj.phone ? val?.userObj.phone : userObj.phone == "" ? "+91 9265148451" : userObj.phone,
    },
    {
      icon: <MdEmail />,
      value: val?.userObj.email ? val?.userObj.email :
        userObj.email == "" ? "hello@reallygreatsite.com" : userObj.email,
    },
    {
      icon: <MdOutlineLocationOn />,
      value:val?.userObj.address ? val?.userObj.address :
        userObj.address == "" ? "123 Anywhere St., Any City" : userObj.address,
    },
    {
      icon: <TfiWorld />,
      value:val?.userObj.web ? val?.userObj.web : userObj.web == "" ? "reallygreatsite.com" : userObj.web,
    },
  ];

  const experience = () => {
    return (
      <>
        <div className="w-100 school-detail">
          <h6 className="m-0">Applications developer</h6>
          <span>2012-2014</span>
          <p className="font-family m-0">Really Great High School</p>
          <ul className="skill-ul font-family text-color font-size">
            <li>
              Built the logic for a streamlined ad-serving platform that scaled
            </li>
            <li>Educational institutions and online classroom management</li>
          </ul>
        </div>
        <div className="w-100 graduation-detail ">
          <h6 className="m-0">Web content manager</h6>
          <span>2015-2017</span>
          <p className="font-family m-0">Really Great University</p>
          <ul className="skill-ul font-family text-color font-size">
            <li>Database administration and website design</li>
            <li>Educational institutions and online classroom management</li>
          </ul>
        </div>
        <div className="w-100 school-detail">
          <h6 className="m-0">Analysis content</h6>
          <span>2017-2021</span>
          <p className="font-family m-0">Really Great High School</p>
          <ul className="skill-ul font-family text-color font-size">
            <li>Database administration and website design</li>
            <li>
              Built the logic for a streamlined ad-serving platform that scaled
            </li>
          </ul>
        </div>
      </>
    );
  };

  const education =()=>{
    return <>
    <div className="w-100 school-detail">
      <h6>secondary school</h6>
      <p className="font-family text-color">
        Really Great High School
      </p>
    </div>
    <div className="w-100 graduation-detail">
      <h6>Bachelor of Technology</h6>
      <p className="font-family text-color">
        Really Great University
      </p>
    </div>
  </>
  }

  // useEffect(()=>{localStorage.clear()},[])

  return (
    <>
      <div className="container mt-3 template1 pb-3 mb-3 p-0" id="template1">
        <div className="row m-0 w-100 p-md-3 user-row">
          <div className="col-12  w-100 text-start ps-md-4">
            <div className="user-profile-section w-100 d-flex flex-column justify-content-center ps-5">
              <h1 className="w-50">
                <span className="name me-3 word-break">
                  {val?.userObj.fname ? val?.userObj.fname : userObj.fname == "" ? "dani" : userObj.fname}
                </span>
                <span className="surname word-break">
                  {val?.userObj.lname ? val?.userObj.lname : userObj.lname == "" ? "Schwaiger" : userObj.lname}
                </span>
              </h1>
              <h4 className="word-break">
                { val?.userObj.position ? val?.userObj?.position : userObj.position == ""? "web developer": userObj.position}
              </h4>
            </div>
            <div className="image-overlay">
            {/* require("../../assets/thumbnail.jpg") */}
              <img
                src={val?.userObj.image ? val?.userObj.image : userObj.image == "" ? '/profile-image.webp' : userObj.image }
                alt="image"
                className="user-image "
              />
            </div>
          </div>
        </div>
        <div className="row m-0 w-100">
          <div className="col-4 offset-1 detail border-bottom pt-4">
            {details &&
              details.map((item, index) => (
                <div className="w-100 d-flex" key={index}>
                  <span className="me-2">{item.icon}</span>
                  <p className="word-break ms-2 font-family text-color font-size" style={{paddingTop: '4px'}}>
                    {item.value}
                  </p>
                </div>
              ))}
          </div>
          <div className="col-6 profile border-left border-bottom">
            <h4 className="headings">profile</h4>
            <p className="word-break profile-text font-family text-color">
              {val?.userObj.profile ? val?.userObj.profile : userObj.profile == "" ? profileText : userObj.profile}
            </p>
          </div>
        </div>
        <div className="row w-100 m-0">
          <div className="col-4 offset-1">
            <div className="col-12 skill border-bottom">
              <h4 className="headings">skills</h4>
              <ul className="skill-ul font-family text-color font-size">
                {userObj?.skill?.length > 0 ? (
                  userObj?.skill.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <>
                    <li>Web Design</li>
                    <li>Design Thinking</li>
                    <li>Wireframe Creation</li>
                    <li>Front End Coding</li>
                    <li>Problem-Solving</li>
                    <li>Computer Literacy</li>
                    <li>Project Management Tools</li>
                    <li>Strong Communication</li>
                  </>
                )}
              </ul>
            </div>
            <div className="col-12 education">
              <h4 className="headings">education</h4>
              {userObj?.education?.length > 0 ? (
                userObj?.education?.map((item, index) => (
                  <div key={index} className="w-100 school-detail">
                    <h6>{item.degree}</h6>
                    <p className="font-family text-color">{item.university}</p>
                  </div>
                ))
              ) : (education())}
            </div>
          </div>
          <div className="col-6 experience border-left text-start">
            <h4 className="headings">Experience</h4>
            {userObj?.experience?.length > 0 ? (
              userObj?.experience?.map((item,index) => (
                <div className="w-100 school-detail" key={index}>
                  <h6 className="m-0">{item.work_as}</h6>
                  <span>{item.duration}</span>
                  <p className="font-family m-0">{item.company}</p>
                  <ul className="skill-ul font-family text-color font-size">
                    <li>{item.work_detail}</li>
                  </ul>
                </div>
              ))
            ) : (experience())}
          </div>
        </div>
      </div>
    </>
  );
};

export default Template1;
