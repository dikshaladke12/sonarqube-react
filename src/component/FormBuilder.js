import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import axios from 'axios';
import DragAndDrop from './DragAndDrop';

const FormBuilder = () => {
    const [formComponents, setFormComponents] = useState([]);
    const [formJson, setFormJson] = useState(null);

    const [{ isOver }, drop] = useDrop({
        accept: 'component',
        drop: (item) => handleComponentDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const handleComponentDrop = (item) => {
        setFormComponents((prev) => [
            ...prev,
            { type: item.type, label: item.label, key: item.label + Math.random() },
        ]);
    };

    const handleSaveForm = async () => {
        const json = {
            formJson: {
                components: formComponents.map((component) => ({
                    label: component.label,
                    type: component.type,
                    key: component.key,
                    input: true,
                })),
            },
        };

        try {
            const response = await axios.post('http://localhost:5353/form/saveform', json);
            console.log('Form saved:', response.data);
            setFormJson(response.data.form);
        } catch (error) {
            console.error('Error saving form:', error);
        }
    };

    return (
        <div>
            <h1>Form Builder</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <DragAndDrop onComponentDrop={handleComponentDrop} />
                <div
                    ref={drop}
                    style={{
                        width: '400px',
                        height: '400px',
                        border: '1px solid #ccc',
                        padding: '10px',
                        backgroundColor: isOver ? 'lightgray' : 'white',
                    }}
                >
                    <h3>Form Canvas</h3>
                    {formComponents.map((component, index) => (
                        <div key={index}>
                            <div>{component.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleSaveForm} style={{ marginTop: '20px' }}>
                Save Form
            </button>
        </div>
    );
};

export default FormBuilder;
