import './MyTasks.css';
import { useEffect, useRef, useState } from 'react';
import { addTask, deleteTask, fetchAllTasks, saveTask } from '../../Service/network';

export default function MyTasks({ setApiCounts, addLog }) {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [editingTask, setEditingTask] = useState(null);
  const editingRef = useRef(null);

  useEffect(() => {
    fetchAllTasks(addLog).then(setTasks);
  }, []);

  useEffect(() => {
    if (editingTask && editingRef.current) {
      editingRef.current.focus();
    }
  }, [editingTask])

  function addTaskHandler() {
    addTask(newTask, addLog, setApiCounts).then(task => {
      setTasks([...tasks, task,]);
      setNewTask("");
    })
  }

  function deleteTaskHandler(id) {
    deleteTask(id, addLog, setApiCounts).then(() => {
      setTasks(tasks => tasks.filter(task => task._id !== id));
    });
  }

  function saveTaskHandler() {
    saveTask(editingTask._id, editingTask.text, addLog, setApiCounts)
      .then(task => {
        setEditingTask(null);
        setTasks(tasks => tasks.map(t => {
          if (t._id !== task._id) return t;
          return task;
        }));
      });
  }

  function resetTaskHandler() {
    setEditingTask(null);
  }

  return (
    <div className='panel'>
      <h2>My Tasks</h2>
      <div className='add-task-container'>
        <input
          className='input add-task-input'
          placeholder='Enter New Task'
          type='text' maxLength='50' value={newTask}
          onChange={(e) => setNewTask(e.target.value)} />
        <button
          disabled={newTask === ""}
          className='btn btn-primary btn-add-task'
          onClick={addTaskHandler}> Add Task</button>
      </div>
      <ul className='task-list'>
        {tasks.map(({ _id, text }) => (
          <Task
            key={`task_id_${_id}`}
            _id={_id} text={text}
            editingRef={editingRef}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            saveTaskHandler={saveTaskHandler}
            resetTaskHandler={resetTaskHandler}
            deleteTaskHandler={deleteTaskHandler}
          />
        ))}
      </ul>
    </div >
  );
}


function Task({ _id, text, editingRef, editingTask, setEditingTask, saveTaskHandler, resetTaskHandler, deleteTaskHandler }) {
  const isEditing = editingTask && editingTask._id === _id;

  if (!isEditing) {
    return (
      <li className='task'>
        <span>{text}</span>
        <div className='task-btn-container'>
          <button className='btn btn-small btn-outline-primary' disabled={!!editingTask} onClick={() => { setEditingTask({ _id, text }) }}><span className="lnr lnr-pencil"></span></button>
          <button className='btn btn-small btn-outline-danger' onClick={() => { deleteTaskHandler(_id) }}><span className="lnr lnr-trash"></span></button>
        </div>
      </li>
    );

  }

  return (
    <li className='task task-editing'>
      <div className='task-editing-container'>
        <input
          ref={editingRef}
          placeholder='Edit Task'
          className='input task-editing-input'
          type='text' maxLength='50' value={editingTask.text}
          onChange={(e) => {
            setEditingTask(t => ({ ...t, text: e.target.value }))
          }} />
        <button
          disabled={editingTask.text === ""}
          className='btn btn-primary'
          onClick={saveTaskHandler}>Save</button>
        <button
          className='btn btn-outline-primary'
          onClick={resetTaskHandler}>Reset</button>
      </div>
    </li>
  );

}