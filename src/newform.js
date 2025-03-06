import React, { useState } from "react";
import { FormBuilder } from "@formio/react";
import "./newform.css"; // Custom CSS for styling

const FormBuilderComponent = () => {
  const [formSchema, setFormSchema] = useState({
    display: "form",
    components: [],
  });

  const onChange = (schema) => {
    setFormSchema(schema);
  };

  const saveForm = () => {
    console.log("Saved Form JSON:", JSON.stringify(formSchema, null, 2));
  };

  return (
    <div className="form-builder-container">
      <h2>Inspection Form Builder</h2>
      <FormBuilder form={formSchema} onChange={onChange} />
      <button onClick={saveForm} className="save-button">
        Save Form
      </button>
    </div>
  );
};

export default FormBuilderComponent;
