import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "../components/Accordian";
import "./styles.css";
import ProjectsMobileData from "../constants/ProjectsMobileData";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = ProjectsMobileData?.find((p) => p.id === parseInt(id));

  if (!project) return <h1>Project Not Found</h1>;

  return (
    <>
    <div style={{width:"100%",backgroundColor:"#007bff",display:"flex",justifyContent:"space-between",borderRadius:"10px"}}>
     <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowBackIosOutlinedIcon/> Back
      </button>
      <h1 style={{marginRight:"25px",color:"white"}}>{project?.name}</h1>
      <span style={{display:"flex",justifyContent:"center",alignItems:"center",marginRight:"8px"}}><ErrorOutlineOutlinedIcon /></span>
      
      </div>
    <div style={{ padding: "20px" }}>
      <p>{project?.description}</p>
      <Accordion items={project?.items} />
    </div>
    </>
  );
}

export default ProjectPage;
