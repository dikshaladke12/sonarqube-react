import React, { useEffect, useRef, useState } from 'react';
import { FormBuilder } from 'formiojs';
import axios from 'axios';
import 'formiojs/dist/formio.full.css';

const AdminPanel = () => {
    const [formData, setFormData] = useState(null);
    const formBuilderRef = useRef(null);
 
    

    // Initialize the FormBuilder
    const initializeFormBuilder = () => {
        const builder = new FormBuilder(formBuilderRef.current, {
            builder: {
                basic: ['textfield', 'textarea', 'select', 'checkbox', 'radio'], // List of components the admin can use
            },
            display: 'form',
            form: {
                components: [], 
            }
        });

        console.log("value", builder.form.components)
        setFormData(builder.form.components)
        builder.on('save', (form) => {
            // setFormData(form);
            console.log('Form data saved:', form);
        });
    };

    const saveForm = async () => {
        // if (!formData) {
        //     console.log('No form data to save');
        //     return;
        // }

        try {
            const response = await axios.post('http://localhost:5353/form/saveform', 
                formData
            );
            console.log('Form saved successfully:', response.data);
            alert('Form saved!');
        } catch (error) {
            console.error('Error saving form:', error);
            alert('Error saving form.');
        }
    };

    useEffect(() => {
        initializeFormBuilder();

        return () => {
            if (formBuilderRef.current) {
                const formBuilder = formBuilderRef.current.Formio;
                if (formBuilder) {
                    formBuilder.destroy();
                }
            }
        };
    }, []);

    return (
        <div>
            <h2>Create a New Form</h2>
            <div ref={formBuilderRef} style={{ height: '500px', border: '1px solid #ccc' }}></div>
            <button onClick={saveForm} style={{ marginTop: '20px' }}>Save Form</button>
        </div>
    );
};

export default AdminPanel;
