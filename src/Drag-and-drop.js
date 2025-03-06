import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './dnd.css'

import axios from "axios";

// Predefined components that can be dragged
const components = [
  { label: "Text Field", type: "textfield" },
  { label: "Checkbox", type: "checkbox" },
  { label: "Select", type: "select" },
  { label: "Button", type: "button" },
  { label: "Textarea", type: "textarea" },
];

// Draggable Component
const DraggableComponent = ({ component }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: { type: component.type, label: component.label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="draggable-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {component.label}
    </div>
  );
};

// Drop Area where components are dropped
const DropArea = ({ onDrop, formComponents }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "component",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`drop-area ${isOver ? "drop-hover" : ""}`}>
      {formComponents.length === 0 ? <p>Drag & drop components here</p> : null}
      {formComponents.map((field, index) => (
        <div key={index} className="dropped-item">
          <label className="field-label">{field.label}</label>
          {field.type === "textfield" && <input type="text" className="input-field" />}
          {field.type === "checkbox" && <input type="checkbox" className="checkbox-field" />}
          {field.type === "select" && (
            <select className="select-field">
              <option>Select</option>
            </select>
          )}
          {field.type === "button" && <button className="button-field">{field.label}</button>}
          {field.type === "textarea" && <textarea className="textarea-field"></textarea>}
        </div>
      ))}
    </div>
  );
};

const DragAndDropForm = () => {
  const [formComponents, setFormComponents] = useState([]);


  const handleDrop = (item) => {
    setFormComponents([...formComponents, item]);
  };

  const saveForm = async (e) => {
    e.preventDefault();

    // Construct JSON object with form components data
    const jsonData = {
      components: formComponents.map((field, index) => ({
        type: field.type,
        label: field.label,
        key: `field_${index + 1}`, // Create a unique key for each field
      })),
    };

    console.log("Form data to save:", JSON.stringify(jsonData));

    try {
      // Sending form data to the backend
      const response = await axios.post("http://localhost:5353/form/saveform", jsonData);
      console.log("Form saved successfully:", response.data);
      alert("Form saved!");
     // Navigate after saving
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Error saving form.");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        {/* Sidebar for draggable components */}
        <aside className="sidebar">
          <h3>Form Components</h3>
          {components.map((component) => (
            <DraggableComponent key={component.type} component={component} />
          ))}
        </aside>

        {/* Main Content - Drop Area */}
        <main className="main-content">
          <h3>Build Your Form</h3>
          <DropArea onDrop={handleDrop} formComponents={formComponents} />
          <button onClick={saveForm} className="save-button">
            Save Form
          </button>
        </main>
      </div>
    </DndProvider>
  );
};

export default DragAndDropForm;
