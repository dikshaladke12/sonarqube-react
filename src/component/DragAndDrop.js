import React from 'react';
import { useDrag } from 'react-dnd';

const components = [
  { label: 'Text Field', type: 'textfield' },
  { label: 'Checkbox', type: 'checkbox' },
  { label: 'Select', type: 'select' },
  { label: 'button', type: 'button' },
];

const DraggableComponent = ({ component }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { type: component.type, label: component.label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        padding: '10px',
        margin: '5px',
        border: '1px solid #ccc',
        backgroundColor: isDragging ? 'lightgreen' : 'white',
        cursor: 'move',
      }}
    >
      {component.label}
    </div>
  );
};

const DragAndDrop = ({ onComponentDrop }) => {
  return (
    <div>
      <h3>Drag Components</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {components.map((component) => (
          <DraggableComponent
            key={component.type}
            component={component}
          />
        ))}
      </div>
      <h3>Drop Components Here</h3>
      <div
        style={{
          height: '400px',
          border: '2px dashed #ccc',
          marginTop: '20px',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <p>Drop area</p>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
