import React, { useState } from "react";
import { Form } from "@formio/react";

const FormCloneExample = () => {
  const templateForm = {
    display: "form",
    components: [
      {
        type: "textfield",
        key: "name",
        label: "Name",
        input: true,
      },
      {
        type: "email",
        key: "email",
        label: "Email",
        input: true,
      },
    ],
  };

  const [forms, setForms] = useState([templateForm]);

  const cloneForm = () => {
    setForms([...forms, { ...templateForm }]);
  };

  return (
    <div>
      <button onClick={cloneForm} className="bg-blue-500 text-white p-2 rounded">
        Clone Form
      </button>

      {forms.map((form, index) => (
        <div key={index} className="border p-4 my-2">
          <h3>Form {index + 1}</h3>
          <Form form={form} />
        </div>
      ))}
    </div>
  );
};

export default FormCloneExample;
