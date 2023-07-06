import React, { useContext, useState } from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import TextField from "./TextField";
import { ValAuthContext } from "../context/ValContext";
import Button from "../inputs/Button";
import { IoIosAddCircle } from "react-icons/io";
import { BiExport } from 'react-icons/bi';
import { FiSave } from 'react-icons/fi';
import SelectDropdown from "./SelectDropdown";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addDetail } from "../../redux/actions/action";
import { useNavigate } from 'react-router-dom';
import style from '../../styles/resume_form.module.css';
import { TiDelete } from 'react-icons/ti'

const ResumeForm = () => {
  const val = useContext(ValAuthContext);
  const { pathname } = useLocation();

  const [templateId, setTemplateId] = useState(pathname.split(':').pop());
  const dispatch = useDispatch();

  const data = useSelector((state) => state.Reducer);
  const [showExperience, setShowExperience] = useState(false);
  const [resume, setResume] = useState(data?.resume);
  const [skill, setSkill] = useState(data?.resume?.skill || []);
  const [education, setEducation] = useState(data?.resume?.education || [])
  const [experience, setExperience] = useState(data?.resume?.experience || [])

  const navigate = useNavigate();

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    setFieldValue,
    setErrors,
    setTouched,
    setFieldError,
  } = useFormik({
    initialValues:  {
      profile: resume?.profile ? resume.profile : "", fname: resume?.fname ? resume.fname : "", lname: resume?.lname ? resume.lname : '', phone: resume?.phone ? resume.phone : "", email: resume?.email ? resume.email : "", address: resume?.address ? resume.address : "", web: resume?.web ? resume.web : "", degree: resume?.degree ? resume.degree : "", university: resume?.university ? resume.university : "", skill: "", experience: resume?.experience ? resume.experience : "", profile_image: "", position: resume?.position ? resume.position : "", work_as: resume?.work_as ? resume.work_as : "", duration: resume?.duration ? resume.duration : "", company: resume?.company ? resume.company : "", work_detail: resume?.work_detail ? resume.work_detail : "", image: ''
    } 
  });
  //   initialValues: templateId == data.template ? {
  //     profile: resume?.profile ? resume.profile : "", fname: resume?.fname ? resume.fname : "", lname: resume?.lname ? resume.lname : '', phone: resume?.phone ? resume.phone : "", email: resume?.email ? resume.email : "", address: resume?.address ? resume.address : "", web: resume?.web ? resume.web : "", degree: resume?.degree ? resume.degree : "", university: resume?.university ? resume.university : "", skill: "", experience: resume?.experience ? resume.experience : "", profile_image: "", position: resume?.position ? resume.position : "", work_as: resume?.work_as ? resume.work_as : "", duration: resume?.duration ? resume.duration : "", company: resume?.company ? resume.company : "", work_detail: resume?.work_detail ? resume.work_detail : "", image: ''
  //   } : {
  //     profile: "", fname: "", lname: '', phone: "", email: "", address: "", web: "", degree: "", university: "", skill: "", experience: "", profile_image: "", position: "", work_as: "", duration: "", company: "", work_detail: "", image: ''
  //   },
  // });

  const handleSubmit = () => {
    // if(templateId != data.template){localStorage.clear();}
    if (data?.resume && (templateId == data.template)) {

      let obj = { fname: values.fname, lname: values.lname, email: values.email, phone: values.phone, address: values.address, web: values.web, profile: values.profile, 
        skill: val.userObj.skill ? skill : data.resume.skill, education: val.userObj.education ? val.userObj.education : data.resume.education, experience: val.userObj.experience ? val.userObj.experience : data.resume.experience, position: val.userObj.position ? val.userObj.position : data.resume.position, image: val.userObj.image ? val.userObj.image : data.resume.image }

      dispatch(addDetail({ resume_detail: obj, template: templateId }))
    }
    else {
      dispatch(addDetail({ resume_detail: val.userObj, template: templateId }))
    }
    val.setUserObj({ fname: '', lname: '', email: '', phone: '', address: '', web: '', profile: '', skill: [], education: [], experience: [], position: '', image: '' })
    navigate(`/template:${templateId}/save-resume`, { state: templateId })
  }

  const handleSkill = (e) => {
    e.preventDefault();
    val.setUserObj((prevState) => ({
      ...val.userObj,
      skill: [...prevState.skill, val.skill],
    }));
    setFieldValue("skill", "");
    val.setSkill("");
    setSkill((skill)=>[...skill, val.skill])
  };

  const handleEducation = (e) => {
    e.preventDefault();
    val.setUserObj((prevState) => ({
      ...val.userObj,
      education: [
        ...prevState.education,
        { degree: val.degree, university: val.university },
      ],
    }));
    setEducation([...education, { degree: val.degree, university: val.university }])
    setFieldValue("degree", "");
    setFieldValue("university", "");
    val.setDegree("");
    val.setUniversity("");
  };

  const handleExperience = (e) => {
    e.preventDefault();
    val.setUserObj((prevState) => ({
      ...val.userObj,
      experience: [
        ...prevState.experience,
        {
          work_as: val.work_as,
          duration: val.duration,
          company: val.company,
          work_detail: val.work_detail,
        },
      ],
    }));
    setFieldValue("work_as", "");
    setFieldValue("duration", "");
    setFieldValue("company", "");
    setFieldValue("work_detail", "");
    val.setWork_as("");
    val.setWork_detail("");
    val.setDuration("");
    val.setCompany("");
  };

  const handleDeleteSkill = (id) => {
    let arr = skill.filter((item, index) => index != id)
    setSkill(arr)
    val.setUserObj({ ...val.userObj, skill: arr })
  }

  const handleDeleteEducation = (id) => {
    let arr = education.filter((item, index) => index != id)
    setEducation(arr)
    val.setUserObj({ ...val.userObj, education: arr })
  }

  return (
    <>

      <div className="container-fluid">
        <div className="row text-start">
          <h4 className={`${style.font_family}`}>Edit Your CV</h4>
          <form >
            <div className="form-group col-md-12">
              <TextField
                type="text"
                placeholder="first name"
                id="fname"
                classname="mt-4"
                value={values.fname}
                name={"fname"}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="form-group col-md-12">
              <TextField
                type="text"
                placeholder="last name"
                id="lname"
                classname="mt-4"
                value={values.lname}
                name={"lname"}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="form-group col-md-12">
              <TextField
                type="file"
                placeholder="image"
                id="image"
                classname="mt-4"
                value={values.image}
                name={"image"}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <TextField
                  type="text"
                  placeholder="phone-number"
                  id="phonenumber"
                  name={"phone"}
                  classname="mt-4"
                  value={values.phone}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="form-group col-md-12">
                <TextField
                  id='email'
                  type="text"
                  value={values.email}
                  placeholder="Email"
                  classname="mt-4"
                  name={"email"}
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>
            <div className="form-group col-md-12">
              <TextField
                type="text"
                placeholder="address"
                id="address"
                classname="mt-4"
                value={values.address}
                name={"address"}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="form-group col-md-12">
              <TextField
                type="text"
                placeholder="web"
                id="web"
                value={values.web}
                classname="mt-4"
                name={"web"}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="form-group col-md-12">
              <TextField
                type="text"
                placeholder="profile"
                id="profile"
                name={"profile"}
                classname="mt-4"
                value={values.profile}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="form-group col-md-12">
              <TextField
                type="text"
                placeholder="position"
                id="position"
                name={"position"}
                classname="mt-4"
                value={values.position}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="form-group col-md-12">
              <div className="d-flex justify-content-lg-between">
                <TextField
                  type="text"
                  placeholder="skills"
                  id="skill"
                  name={"skill"}
                  classname="mt-4 w-75"
                  value={values.skill}
                  setFieldValue={setFieldValue}
                />
                <Button
                  name={"add skill"}
                  className={"w-25 mt-4 ms-2"}
                  event={(e) => handleSkill(e)}
                />
              </div>
              <div className="mt-2">
                {
                  templateId ? (skill && skill.map((item, index) => <span key={index} className="badge rounded-pill bg-primary" onClick={() => handleDeleteSkill(index)}>{item} <TiDelete style={{ fontSize: '20px' }} /></span>)) : val.userObj.skill.map((item, index) => <span key={index} className="badge rounded-pill bg-primary" onClick={() => handleDeleteSkill(index)}>{item} <TiDelete style={{ fontSize: '20px' }} /></span>)
                }
                {/* {
                  templateId == data?.template ? (skill && skill.map((item, index) => <span key={index} className="badge rounded-pill bg-primary" onClick={() => handleDeleteSkill(index)}>{item} <TiDelete style={{ fontSize: '20px' }} /></span>)) : val.userObj.skill.map((item, index) => <span key={index} className="badge rounded-pill bg-primary" onClick={() => handleDeleteSkill(index)}>{item} <TiDelete style={{ fontSize: '20px' }} /></span>)
                } */}
              </div>
            </div>
            <div className="form-group col-md-12">
              <div className="d-flex justify-content-lg-between">
                <TextField
                  type="text"
                  placeholder="degree"
                  id="degree"
                  name={"degree"}
                  classname={`mt-4 ${values.degree ? "w-50" : "w-75"}`}
                  value={values.degree}
                  setFieldValue={setFieldValue}
                />
                {values.degree && (
                  <TextField
                    type="text"
                    placeholder="university/school "
                    id="university"
                    name={"university"}
                    classname={`mt-4 ms-2 ${values.degree ? "w-50" : ""}`}
                    value={values.university}
                    setFieldValue={setFieldValue}
                  />
                )}
                <Button
                  type={"button"}
                  name={"add education"}
                  className={"w-25 mt-4 ms-2"}
                  event={(e) => handleEducation(e)}
                />
              </div>
              <div className="mt-2">
                {/* {
                  templateId == data?.template ? (education && education.map((item, index) =>
                    <div className="px-3 pt-2 m-2" style={{ border: '1px solid #efefef' }} key={index}>
                      <p className="text-end mb-0"><TiDelete style={{ fontSize: '30px', color: '#bd0404', cursor: 'pointer' }} onClick={() => handleDeleteEducation(index)} /></p>
                      <h5>{item.degree}</h5>
                      <p>{item.university}</p>
                    </div>

                  )) : val.userObj.education.map((item, index) =>
                    <div className="px-3 pt-2 m-2" style={{ border: '1px solid #efefef' }} key={index}>
                      <p className="text-end mb-0"><TiDelete style={{ fontSize: '30px', color: '#bd0404', cursor: 'pointer' }} onClick={() => handleDeleteEducation(index)} /></p>
                      <h5>{item.degree}</h5>
                      <p>{item.university}</p>
                    </div>
                  )
                } */}
              </div>
            </div>
            <div className="form-group col-md-12 text-start">
              <Button
                name={"add experience"}
                className={"w-25 mt-4"}
                icon={
                  <IoIosAddCircle
                    style={{ color: "white", fontSize: "20px", marginRight: "7px", marginBottom: '3px' }}
                  />
                }
                event={(e) => { e.preventDefault(); setShowExperience(true) }}
              />
            </div>
            {showExperience && (
              <div
                className="text-end col-md-12 form-group mt-4 w-100 px-3 pb-4"
                style={{ border: "1px solid #e8e8e8" }}
              >
                <TextField
                  type="text"
                  placeholder="worked as"
                  id="work_as"
                  name={"work_as"}
                  classname={`mt-4 w-100`}
                  value={values.work_as}
                  setFieldValue={setFieldValue}
                />
                <TextField
                  type="text"
                  placeholder="duration"
                  id="duration"
                  name={"duration"}
                  classname={`mt-4 w-100`}
                  value={values.duration}
                  setFieldValue={setFieldValue}
                />
                <TextField
                  type="text"
                  placeholder="company name"
                  id="company"
                  name={"company"}
                  classname={`mt-4 w-100`}
                  value={values.company}
                  setFieldValue={setFieldValue}
                />
                <TextField
                  type="text"
                  placeholder="work detail"
                  id="work_detail"
                  name={"work_detail"}
                  classname={`mt-4 w-100`}
                  value={values.work_detail}
                  setFieldValue={setFieldValue}
                />
                <Button
                  type={"button"}
                  name={"add"}
                  className={"w-25 mt-4 ms-2"}
                  event={(e) => handleExperience(e)}
                />
              </div>
            )}
            {/* {
              templateId == data?.template ? (experience && experience.map((item, index) =>
                <div className="px-3 pt-2 m-2" style={{ border: '1px solid #efefef' }} key={index}>
                  <p className="text-end mb-0"><TiDelete style={{ fontSize: '30px', color: '#bd0404', cursor: 'pointer' }} onClick={() => handleDeleteEducation(index)} /></p>
                  <p><span>work as : {item.work_as}</span></p>
                  <p><span>work detail : {item.work_detail}</span></p>
                  <p><span>duration : {item.duration}</span></p>
                  <p><span>company  : {item.company}</span></p>
                </div>

              )) : val.userObj.education.map((item, index) =>
                <div className="px-3 pt-2 m-2" style={{ border: '1px solid #efefef' }} key={index}>
                  <p className="text-end mb-0"><TiDelete style={{ fontSize: '30px', color: '#bd0404', cursor: 'pointer' }} onClick={() => handleDeleteEducation(index)} /></p>
                  <h5>{item.degree}</h5>
                  <p>{item.university}</p>
                </div>
              )
            } */}
            <hr />
            <Button type="button" event={handleSubmit} className={"w-25 mt-4"} name={"save changes"} icon={<FiSave style={{ color: "white", fontSize: "20px", marginRight: "7px", marginBottom: '5px' }} />} />
          </form>
        </div>
      </div>

    </>
  );
};

export default ResumeForm;
