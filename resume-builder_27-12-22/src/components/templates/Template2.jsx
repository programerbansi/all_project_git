import React, { useContext, useEffect, useState } from "react";
import style from "../../styles/template2.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { details } from "../../services/variable";
import { ValAuthContext } from "../context/ValContext";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiRotaryPhone } from "react-icons/gi";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";

const Template2 = () => {

  const val = useContext(ValAuthContext);
  const { state } = useLocation();

  const data = useSelector((state) => state.Reducer);
  // const [userObj, setUserObj] = useState(data.template == 2 ? data.resume : val.userObj)
  const [userObj, setUserObj] = useState(data.template != '' ? data.resume :val.userObj)
  const [profileText, setProfileText] = useState('I am a qualified and professional web developer with five years of experience in database administration and website design. Strong creative and analytical skills. Team player with an eye for detail.')

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
    // setUserObj(data.template == 2 ? data.resume : val.userObj)
    setUserObj(data.template != '' ? data.resume :val.userObj)
  }, [val.userObj])

  const education = () => {
    return <>
      <div className="w-100 school-detail">
        <h6 className={style.font_family}>secondary school</h6>
        <p className={`${style.name}`}>
          Really Great High School
        </p>
      </div>
      <div className="w-100 graduation-detail">
        <h6 className={style.font_family}>Bachelor of Technology</h6>
        <p className={`${style.name}`}>
          Really Great University
        </p>
      </div>
    </>
  }

  const experience = () => {
    return <>
      <div className="w-100 text-start my-4">
        <h6 className="m-0">Applications developer</h6>
        <span className={`${style.span_year}`}>2012-2014</span>
        <p className={`${style.name}`}>Really Great High School</p>
        <ul
          className={`${style.skill_ul} ${style.font_family} ${style.font_size}`}
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
        <h6 className="m-0">Applications developer</h6>
        <span className={`${style.span_year}`}>2012-2014</span>
        <p className={`${style.name}`}>Really Great High School</p>
        <ul
          className={`${style.skill_ul} ${style.font_family} ${style.font_size}`}
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
        <h6 className="m-0">Applications developer</h6>
        <span className={`${style.span_year}`}>2012-2014</span>
        <p className={`${style.name}`}>Really Great High School</p>
        <ul
          className={`${style.skill_ul} ${style.font_family} ${style.font_size}`}
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
    </>
  }
  return (
    <>
      <div className="container my-4 border-1 py-4" >
        <div className={`row ${style.user_profile_section} justify-content-center`}>
          <div className="col-3 h-100 p-0">
            <img src={val?.userObj.image ? val?.userObj.image : userObj.image == "" ? '/profile-image.webp' : userObj.image } alt="image" className="h-100 w-100"
            />
          </div>
          <div
            className={`col-6 ${style.user_name} h-100 d-flex flex-column justify-content-center`}
          >
            <h4 className={`ps-3 text-start ${style.font_family} ${style.word_break}`}>
              {userObj.fname == '' && userObj.lname == '' ? 'Keith Shannons' : `${userObj.fname} ${userObj.lname}`}
            </h4>
            <h6 className={`ps-3 ${style.font_family} ${style.word_break}`}>{userObj.position == '' ?'Software Engineer' : userObj.position}</h6>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className={`col-3 p-3 ${style.left_detail}`}>
            <div className="col-12 p-3">
              <h5 className={`${style.heading} ${style.font_family}`}>
                contact me
              </h5>
              {details &&
                details.map((item, index) => (
                  <div className="w-100 d-flex" key={index}>
                    <span className="me-2">{item.icon}</span>
                    <p className={`ms-2 ${style.font_size} ${style.word_break}`}>{item.value}</p>
                  </div>
                ))}
            </div>
            <div className="col-12 p-3">
              <div className="w-100 school-detail">
                <h5 className={`${style.heading} ${style.font_family}`}>
                  skills
                </h5>
                <ul className={`${style.font_size} ${style.skill_ul} `}>
                  {userObj?.skill?.length > 0 ? (
                    userObj?.skill.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  ) : (
                    <>
                      <li className="mt-2">
                        Javascript, C/C++, Java,Python, Kotlin, Go
                      </li>
                      <li className="mt-2">Problem Solving</li>
                      <li className="mt-2">Team Communication</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-12 p-3">
              <h5 className={`${style.heading} ${style.font_family}`}>
                profile
              </h5>
              <p className={`${style.text} ${style.font_size} ${style.word_break}`}>
                {userObj.profile == "" ? profileText : userObj.profile}
              </p>
            </div>
          </div>
          <div className="col-6 p-3" style={{background:'white'}}>
            <div className="col-12 p-3">
              <h5 className={`${style.heading} ${style.font_family}`}>
                experience
              </h5>
              {userObj.experience.length > 0 ? (
                userObj.experience.map((item, index) => (
                  <div className="w-100 text-start my-4" key={index}>
                    <h6 className={`m-0 ${style.word_break}`}>{item.work_as}</h6>
                    <span className={`${style.span_year} ${style.word_break}`}>{item.duration}</span>
                    <p className={`${style.name} ${style.word_break}`}>{item.company}</p>
                    <ul
                      className={`${style.skill_ul} ${style.font_family} ${style.font_size}`}
                    >
                      <li>
                        {item.work_detail}
                      </li>
                    </ul>
                  </div>
                ))
              ) : (experience())}
            </div>
            <div className="col-12 p-3">
              <div className="col-12 education">
                <h5 className={`${style.heading} ${style.font_family}`}>
                  education
                </h5>
                {userObj.education.length > 0 ? (
                  userObj.education.map((item, index) => (
                    <div className="w-100 school-detail" key={index}>
                      <h6 className={`${style.font_family} ${style.word_break}`}>{item.degree}</h6>
                      <p className={`${style.name} ${style.word_break}`}>
                        {item.university}
                      </p>
                    </div>
                  ))
                ) : (education())}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template2;
