import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "../components/Accordian";
import "./styles.css";
import ProjectsMobileData from "../constants/ProjectsMobileData";

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = ProjectsMobileData?.find((p) => p.id === parseInt(id));

  if (!project) return <h1>Project Not Found</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>{project?.name}</h1>
      <p>{project?.description}</p>
      <Accordion items={project?.items} />
    </div>
  );
}

export default ProjectPage;
