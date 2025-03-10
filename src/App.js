import './App.css';
import FormBuilder from './component/FormBuilder';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AdminPanel from './AdminPanel';
import Crud from './Crud';
import DynamicForm from './DynamicForm.js';
import DragAndDropForm from './Drag-and-drop.js'
import FormBuilderComponent from './newform.js'
import FormCloneExample from './FormClone.js';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <div className="App"> */}
        {/* <AdminPanel /> */}
        {/* <DynamicForm /> */}
        {/* <FormBuilder /> */}
        {/* <FormBuilderComponent /> */}
        <DragAndDropForm />
        {/* <FormCloneExample /> */}
     
        {/* <Crud /> */}
      {/* </div> */}


    </DndProvider>
  );
}

export default App;
