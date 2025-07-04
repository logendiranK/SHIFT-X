import React from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/Emploer/Employerpostjob.css"
const EmployerJob = () => {
  const navigate=useNavigate();
  const parttimehandleclick=()=>{
    navigate('/part-time');
  }
  const urgenthandleclick=()=>{
    navigate('/urgent');
  }
   
  return (
    <div className="container">
      <div className="content">
        <div className="card">
          <h3>Part-time Job</h3>
          <button onClick={parttimehandleclick}>Post a Part-time Job</button>
        </div>
        <div className="card">
          <h3>Urgent Job</h3>
          <button onClick={urgenthandleclick}>Post a Urgent Job</button>
        </div>
      </div>
    </div>
  );
};
export default EmployerJob;
