import React, { useContext, useEffect, useState } from "react";
import style from "../../styles/template3.module.css";
import { details } from "../../services/variable";
import { useLocation } from "react-router-dom";
import { ValAuthContext } from "../context/ValContext";
import { useSelector } from "react-redux";
import { GiRotaryPhone } from "react-icons/gi";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";

const Template3 = () => {

  const val = useContext(ValAuthContext);
  const { state } = useLocation();

  const data = useSelector((state) => state.Reducer);
  // const [userObj, setUserObj] = useState(data.template == 3 ? data.resume : val.userObj)
  const [userObj, setUserObj] = useState(data.template != '' ? data.resume :val.userObj)
  
  const [profileText,setProfileText] = useState(' I am a qualified and professional web developer with five years of experience in database administration and website design. Strong creative and analytical skills. Team player with an eye for detail.')

  const details = [
    {
      icon: <GiRotaryPhone />,
      value: userObj.phone == "" ? "+91 9265148451" : userObj.phone,
    },
    {
      icon: <MdEmail />,
      value:
        userObj.email == ""
          ? "hello@reallygreatsite.com"
          : userObj.email,
    },
    {
      icon: <MdOutlineLocationOn />,
      value:
        userObj.address == ""
          ? "123 Anywhere St., Any City"
          : userObj.address,
    },
    {
      icon: <TfiWorld />,
      value: userObj.web == "" ? "reallygreatsite.com" : userObj.web,
    },
  ];

  useEffect(() => {
    setUserObj(data.template != '' ? data.resume :val.userObj)
    // setUserObj(data.template == 3 ? data.resume : val.userObj)
  }, [val.userObj])

  const education = () => {
    return <>
      <div className="w-100 school-detail">
        <h6>secondary school</h6>
        <p
          className={`text-start ${style.font_family} ${style.education_font_size} ${style.text_color}`}
        >
          Really Great High School
        </p>
      </div>
      <div className="w-100 graduation-detail">
        <h6>Bachelor of Technology</h6>
        <p
          className={`text-start ${style.font_family} ${style.education_font_size} ${style.text_color}`}
        >
          Really Great University
        </p>
      </div>
    </>
  }

  const experience = () => {
    return <>
      <div className="w-100 text-start my-4">
        <h6 className={`m-0 ${style.h6}`}>Applications developer</h6>
        <span>2012-2014</span>
        <p className={`${style.font_family} m-0`}>
          Really Great High School
        </p>
        <ul
          className={`${style.skill_ul} ${style.font_family} ${style.text_color} ${style.font_size}`}
        >
          <li>
            Built the logic for a streamlined ad-serving platform that
            scaled
          </li>
          <li>
            Educational institutions and online classroom management
          </li>
        </ul>
      </div>
      <div className="w-100 text-start my-4">
        <h6 className={`m-0 ${style.h6}`}>Web content manager</h6>
        <span>2015-2017</span>
        <p className={`${style.font_family} m-0`}>
          Really Great University
        </p>
        <ul
          className={`${style.skill_ul} ${style.font_family} ${style.text_color} ${style.font_size}`}
        >
          <li>Database administration and website design</li>
          <li>
            Educational institutions and online classroom management
          </li>
        </ul>
      </div>
      <div className="w-100 text-start my-4">
        <h6 className={`m-0 ${style.h6}`}>Analysis content</h6>
        <span>2017-2021</span>
        <p className={`${style.font_family} m-0`}>
          Really Great High School
        </p>
        <ul
          className={`${style.skill_ul} ${style.font_family} ${style.text_color} ${style.font_size}`}
        >
          <li>Database administration and website design</li>
          <li>
            Built the logic for a streamlined ad-serving platform that
            scaled
          </li>
        </ul>
      </div>
    </>
  }

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row justify-content-center h-100 w-100">
          <div className={`col-4 px-5 py-2 ${style.left_detail}`}>
            <div className={`${style.profile_image} col-12`}>
              <div className={`${style.image_container}`}>
                <img
                  src={val?.userObj.image ? val?.userObj.image : userObj.image == "" ? '/profile-image.webp' : userObj.image }
                  className={`${style.user_image}`}
                  alt="image"
                />
              </div>
            </div>
            <div className="col-12">
              <h5 className={`${style.heading} my-3`}>contact me</h5>
              {details &&
                details.map((item, index) => (
                  <div className="w-100 d-flex" key={index}>
                    <span className="me-2">{item.icon}</span>
                    <p
                      className={`ms-2 ${style.font_family} ${style.text_color} ${style.font_size} ${style.word_break} `}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
            </div>
            <div className="col-12">
              <h5 className={`${style.heading} my-3`}>education</h5>
              {userObj.education.length > 0 ? (
                userObj.education.map((item, index) => (
                  <div className="w-100 school-detail" key={index}>
                    <h6>{item.degree}</h6>
                    <p
                      className={`text-start ${style.font_family} ${style.education_font_size} ${style.text_color}`}
                    >
                      {item.university}
                    </p>
                  </div>
                ))
              ) : (education())}


            </div>
            <div className="col-12">
              <h5 className={`${style.heading} my-3`}>skills</h5>
              <ul
                className={`${style.skill_ul} ${style.font_family} ${style.text_color} ${style.font_size}`}
              >
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
          </div>
          <div className="col-6 px-5 py-2">
            <div
              className={`col-12 ${style.profile_image} ms-0 d-flex flex-column justify-content-center`}
            >
              <h1 className={`text-start ps-3 ${style.user_name} ${style.word_break}`}>{userObj.fname == "" ? "Mariana" : userObj.fname}</h1>
              <h1 className={`text-start ps-3 ${style.user_surname} ${style.word_break} `}>
                {userObj.lname == "" ? "Anderson" : userObj.lname}
              </h1>
              <h6 className={`ps-3 ${style.user_position} ${style.word_break} `}>
                {userObj.position == "" ? "web developer" : userObj.position}
              </h6>
            </div>
            <div className={`col-12`}>
              <h5 className={`${style.heading} my-3`}>work experience</h5>
              {userObj.experience.length > 0 ? (
                userObj.experience.map((item, index) => (
                  <div className="w-100 text-start my-4" key={index}>
                    <h6 className={`m-0 ${style.h6} ${style.word_break} `}>{item.work_as}</h6>
                    <span className={`${style.word_break} `}>{item.duration}</span>
                    <p className={`${style.font_family} ${style.word_break} m-0`}>
                      {item.company}
                    </p>
                    <ul
                      className={`${style.skill_ul} ${style.font_family} ${style.text_color} ${style.font_size} `}
                    >
                      <li className={`${style.word_break} `}>
                        {item.work_detail}
                      </li>
                    </ul>
                  </div>
                ))
              ) : (experience())}

            </div>
            <div className="col-12">
              <h5 className={`${style.heading} my-3`}>profile</h5>
              <p className={`${style.text_justify} ${style.font_family} ${style.text_color} ${style.word_break} `}>
              {userObj.profile == "" ? profileText: userObj.profile}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template3;
