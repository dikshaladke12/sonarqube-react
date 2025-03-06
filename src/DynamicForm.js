// import React, { useState } from "react";

// const defaultTemplate = {
//   display: "form",
//   components: [
//     {
//       type: "textfield",
//       key: "project",
//       label: "Project",
//       placeholder: "Enter project name",
//       disabled: false,
//       input: true,
//     },
//     {
//       type: "select",
//       key: "priority",
//       label: "Priority",
//       data: {
//         values: [
//           { label: "Low", value: "low" },
//           { label: "Medium", value: "medium" },
//           { label: "High", value: "high" },
//         ],
//       },
//       input: true,
//     },
//     {
//       type: "textfield",
//       key: "title",
//       label: "Title",
//       placeholder: "Enter title",
//       input: true,
//     },
//     {
//       type: "textfield",
//       key: "actionTemplateNo",
//       label: "Action Template No.",
//       placeholder: "Enter action template number",
//       input: true,
//     },
//     {
//       type: "textfield",
//       key: "category",
//       label: "Category",
//       placeholder: "Enter category",
//       input: true,
//     },
//     {
//       type: "textfield",
//       key: "assignedBy",
//       label: "Assigned By",
//       placeholder: "Enter name",
//       input: true,
//     },
//     {
//       type: "textfield",
//       key: "assignedTo",
//       label: "Assigned To",
//       placeholder: "Enter assignee name",
//       input: true,
//     },
//     {
//       type: "textarea",
//       key: "description",
//       label: "Description",
//       placeholder: "Enter description",
//       input: true,
//     },
//     {
//       type: "datetime",
//       key: "completionDate",
//       label: "Completion Date",
//       format: "yyyy-MM-dd",
//       input: true,
//     },
//     {
//       type: "file",
//       key: "mediaFiles",
//       label: "Upload Media Files",
//       storage: "base64",
//       input: true,
//     },
//   ],
// };

// const DynamicForm = () => {
//   const [formData, setFormData] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "file") {
//       // Handle file input separately
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(files[0]);
//       fileReader.onload = () => {
//         setFormData({
//           ...formData,
//           [name]: fileReader.result,
//         });
//       };
//     } else {
//       setFormData({
//         ...formData,
//         [name]: type === "checkbox" ? checked : value,
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {defaultTemplate.components.map((field) => (
//         <div key={field.key}>
//           <label>{field.label}</label>
//           {field.type === "select" ? (
//             <select name={field.key} onChange={handleChange} required={field.required}>
//               <option value="">Select</option>
//               {field.data.values.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           ) : field.type === "textarea" ? (
//             <textarea
//               name={field.key}
//               placeholder={field.placeholder}
//               onChange={handleChange}
//               required={field.required}
//             />
//           ) : (
//             <input
//               type={field.type === "datetime" ? "date" : field.type}
//               name={field.key}
//               placeholder={field.placeholder}
//               onChange={handleChange}
//               required={field.required}
//             />
//           )}
//         </div>
//       ))}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default DynamicForm;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultTemplate = {
  display: "form",
  components: [
    {
      type: "textfield",
      key: "project",
      label: "Project",
      placeholder: "Enter project name",
      disabled: false,
      input: true,
    },
    {
      type: "select",
      key: "priority",
      label: "Priority",
      data: {
        values: [
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
        ],
      },
      input: true,
    },
    {
      type: "textfield",
      key: "title",
      label: "Title",
      placeholder: "Enter title",
      input: true,
    },
    {
      type: "textfield",
      key: "actionTemplateNo",
      label: "Action Template No.",
      placeholder: "Enter action template number",
      input: true,
    },
    {
      type: "textfield",
      key: "category",
      label: "Category",
      placeholder: "Enter category",
      input: true,
    },
    {
      type: "textfield",
      key: "assignedBy",
      label: "Assigned By",
      placeholder: "Enter name",
      input: true,
    },
    {
      type: "textfield",
      key: "assignedTo",
      label: "Assigned To",
      placeholder: "Enter assignee name",
      input: true,
    },
    {
      type: "textarea",
      key: "description",
      label: "Description",
      placeholder: "Enter description",
      input: true,
    },
    {
      type: "datetime",
      key: "completionDate",
      label: "Completion Date",
      format: "yyyy-MM-dd",
      input: true,
    },
    {
      type: "file",
      key: "mediaFiles",
      label: "Upload Media Files",
      storage: "base64",
      input: true,
    },
  ],
};

const DynamicForm = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = () => {
        setFormData({
          ...formData,
          [name]: fileReader.result,
        });
      };
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(formData);
    console.log('e.target');


    // Validate required fields before submitting
    const isValid = defaultTemplate.components.every((field) => {
      if (field.input && field.required && !formData[field.key]) {
        return false;
      }
      return true;
    });

    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }


    const jsonData = {
      components: formData,
    };
    console.log(JSON.stringify(jsonData));

    try {
      const response = await axios.post('http://localhost:5353/form/saveform', jsonData);
      console.log('Form saved successfully:', response.data);
      alert('Form saved!');
      navigate('/templates');
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Error saving form.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Dynamic Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {defaultTemplate.components.map((field) => (
          <div key={field.key} className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.key}
                onChange={handleChange}
                required={field.required}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {field.data.values.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.key}
                placeholder={field.placeholder}
                onChange={handleChange}
                required={field.required}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                type={field.type === "datetime" ? "date" : field.type}
                name={field.key}
                placeholder={field.placeholder}
                onChange={handleChange}
                required={field.required}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
