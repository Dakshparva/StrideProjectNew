import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "./Accordian";
import "./styles.css";

const projects = [
  { id: 1, name: "Content Edit", description: "Details about Content Edit", items: ["Feature A", "Feature B"] },
  { id: 2, name: "Attendance", description: "Details about Attendance", items: ["Attendance Tracking", "Reports"] },
  { id: 3, name: "E-Commerce", description: "Details about E-Commerce", items: ["Product Listings", "Checkout"] },
  { id: 4, name: "Stride", description: "Details about Stride", items: ["Task Management", "Timeline"] },
  { id: 5, name: "HRM", description: "Details about HRM", items: ["Employee Management", "Payroll"] },
  { id: 6, name: "Delivery App", description: "Details about Delivery App", items: ["Order Tracking", "Delivery Status"] }
];

function ProjectPage() {
  const { id } = useParams();
  const navigate=useNavigate();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) return <h1>Project Not Found</h1>;

  return (
    <div style={{ padding: "20px" }}>
    <button className="back-button" onClick={()=>navigate(-1)}>← Back</button>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <Accordion items={project.items} />
    </div>
  );
}

export default ProjectPage;
