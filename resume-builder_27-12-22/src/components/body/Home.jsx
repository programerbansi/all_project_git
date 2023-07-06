import React from "react";
import resumeSvg from "../../assets/resume-folder.svg";
import "../../styles/home.css";
import { template_options, process_options } from "../../services/variable";
import { Link } from "react-scroll";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid p-0">
        <div className="row h-100 home-container w-100 m-0 align-items-center p-5">
          <div className="col-sm-5 col-12  h-100">
            <h3 className="heading-text">
              A <span> Resume</span> that stands out ! Make your Own resume .{" "}
              <span> It's free </span>
            </h3>
            <p className="p-4">
              If a sheet of paper represents your entire work life, personality,
              and skills, it better be a pretty amazing piece of paper— Let us
              do the heavy lifting.
            </p>
            <a
              href="#get-started"
              className="btn btn-lg btn-primary rounded-pill mt-4 mb-3"
            >
              <Link
                to="get-started"
                spy={true}
                smooth={true}
                offset={-150}
                duration={300}
              >
                create your cv now
              </Link>
            </a>
          </div>
          <div className="col-sm-7 col-12 h-100">
            <img src={resumeSvg} alt="image" className="w-100 h-100" />
          </div>
        </div>
        <div className="row w-100 m-0">
          {process_options &&
            process_options.map((item, index) => (
              <div className="col-sm-6 col-md-4 col-12 g-5 h-100" key={item.id}>
                {item.image}
                <h5 className="mt-2">{item.heading}</h5>
                <p className="mt-2">{item.text}</p>
              </div>
            ))}
        </div>
        <div className="row w-100 h-100 m-0 py-2">
          <h2 className="mt-3 pt-3">Select resume template to get started </h2>
          <h6 className="text-center">You'll be able to edit and this template later!</h6>
        </div>
        <div
          className="row w-100 h-100 mx-0 mt-3 pt-3 pb-2"
          id="get-started"
          data-bs-spy="scroll"
        >
          {template_options &&
            template_options.map((item) => (
              <div
                className="col-lg-4 col-md-6 col-12 h-100 gx-5 gy-3"
                key={item.id}
                style={{
                  borderRadius: "10px",
                  boxShadow: "1px 2px 3px solid gray",
                }}
              >
                <div className="w-100 h-100 p-2 template-container">
                  {item.image}
                  <div className="overlay">
                    <button className="btn btn-primary rounded-pill" onClick={()=>navigate(`/template:${item.id}`)}>
                      use this template
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
