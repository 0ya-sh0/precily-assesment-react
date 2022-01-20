import './MyTasks.css';
import { useEffect, useRef, useState } from 'react';

export default function MyTasks({ setApiCounts, addLog }) {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [editTask, setEditTask] = useState("")
  const [editingId, setEditingId] = useState("")
  const editingRef = useRef(null);

  useEffect(() => {
    fetch('/tasks')
      .then(res => res.json())
      .then(json => {
        setTasks(json.tasks);
        addLog({ name: 'GET /tasks', millis: json.millis, time: new Date() });
      });
  }, []);

  useEffect(() => {
    if (editingId && editingRef.current) {
      editingRef.current.focus();
    }
  }, [editingId])

  function addTask() {
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newTask })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        setTasks([...tasks, json.task,]);
        setNewTask("");
        setApiCounts(c => ({ ...c, postTaskCount: json.count }));
        addLog({ name: 'POST /tasks', millis: json.millis, time: new Date() })
      }
    })
  }

  function deleteTask(id) {
    fetch(`/tasks/${id}`, { method: 'DELETE', })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setTasks(tasks => tasks.filter(task => task._id !== id));
          setApiCounts(c => ({ ...c, deleteTaskCount: json.count }));
          addLog({ name: `DELETE /tasks/${id}`, millis: json.millis, time: new Date() })
        }
      })
  }

  function saveTask() {

    fetch(`/tasks/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: editTask })
    }).then(res => res.json()).then(json => {
      if (json.success) {
        setEditingId("")
        setEditTask("")
        setTasks(tasks => tasks.map(t => {
          if (t._id !== json.task._id) return t;
          return json.task;
        }));
        setApiCounts(c => ({ ...c, putTaskCount: json.count }));
        addLog({ name: `PUT /tasks/${editingId}`, millis: json.millis, time: new Date() })
      }
    })

  }

  function resetTask() {
    setEditingId("")
    setEditTask("")
  }

  return (
    <div className='panel'>
      <h2>My Tasks</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '10px' }}>
        <input
          className='input'
          placeholder='Enter New Task'
          style={{ fontSize: '16px', outline: 'none', padding: '6px', flexGrow: '1', }}
          type='text' maxLength='50' value={newTask}
          onChange={(e) => setNewTask(e.target.value)} />
        <button
          disabled={newTask === ""}
          className='btn btn-primary btn-add-task'
          onClick={addTask}> Add Task</button>
      </div>
      <ul className='task-list'>
        {tasks.map(({ _id, text }) => (
          <li key={`task_id_${_id}`} className={`task${editingId === _id ? ' task-editing' : ''}`}>
            {
              editingId === _id ?
                <>
                  <div style={{ display: 'flex', flexGrow: '1', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <input
                      ref={editingRef}
                      placeholder='Edit Task'
                      style={{ fontSize: '16px', padding: '5px', outline: 'none', flexGrow: '1' }}
                      type='text' maxLength='50' value={editTask}
                      onChange={(e) => { setEditTask(e.target.value) }} />
                    <button
                      disabled={editTask === ""}
                      className='btn btn-primary'
                      onClick={saveTask}>Save</button>
                    <button
                      className='btn btn-outline-primary'
                      onClick={resetTask}>Reset</button>
                  </div>
                </> :
                <>
                  <span>{text}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className='btn btn-small btn-outline-primary' disabled={editingId !== ""} onClick={() => { setEditingId(_id); setEditTask(text); }}><span className="lnr lnr-pencil"></span></button>
                    <button className='btn btn-small btn-outline-danger' onClick={() => { deleteTask(_id) }}><span className="lnr lnr-trash"></span></button>
                  </div>
                </>
            }

          </li>
        ))}
      </ul>
    </div >
  );
}