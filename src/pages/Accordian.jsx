import React, { useState } from "react";

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => toggleAccordion(index)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              textAlign: "left",
              padding: "10px",
              background: openIndex === index ? "#ddd" : "#f9f9f9",
              border: "1px solid #ccc",
              marginBottom: "5px",
              cursor: "pointer",
            }}
          >
            {item}
            <span style={{ marginLeft: "10px" }}>
              {openIndex === index ? "▲" : "▼"}
            </span>
          </button>
          {openIndex === index && (
            <div
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderTop: "none",
                background: "#f1f1f1",
              }}
            >
              Content for {item}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
