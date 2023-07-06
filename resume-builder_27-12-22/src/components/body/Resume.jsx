import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../inputs/Button";
import Template2 from "../templates/Template2";
import Template1 from "./../templates/Template1";
import Template3 from './../templates/Template3';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Resume = () => {
  const { state } = useLocation();
  const handleGeneratePdf = () => {
    const input = document.getElementById(`template${state}`);
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a2');
        pdf.addImage(imgData, 'JPEG', 10, 50);
        pdf.save(`template${state}-pdf`)
      })
    }
  }
  // style={{background: 'linear-gradient(160deg, #1976d2 1%, rgba(0, 0, 0, 0)40%)'}}
  return <>
    <div className="container-fluid" >
      <div className="container" >
        <div className="row ">
          <div className="col-11 text-end">
            <Button type="button" name="export as pdf" className='mt-4 mb-4' event={() => handleGeneratePdf()} />
          </div>
          <div className="col-12">
            {state == 1 && <Template1 />}{state == 2 && <Template2 />}{state == 3 && <Template3 />}
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default Resume;
