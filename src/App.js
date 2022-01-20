import './App.css';

import Split from 'react-split';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="app">
      <header className='header'>
        <h1>
          Precily Assignment - Split Panes
        </h1>
      </header>
      <Split minSize={[240, 100]} gutterSize={14} style={{ height: 'calc(100vh - 100px)' }} direction='vertical'>
        <Split minSize={[360, 200]} gutterSize={14} style={{ width: '100vw', display: 'flex' }} direction='horizontal'>
          <MyTasks />
          <div className='panel'>
            <h2>How To Use</h2>
          </div>
        </Split>
        <div className='panel'>
          <h2>Event Logs</h2>
        </div>
      </Split>
      <footer className='footer'>
        Made By - Yash Thatte
      </footer>
    </div>
  );
}

function MyTasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [editTask, setEditTask] = useState("")
  const [editingId, setEditingId] = useState("")

  useEffect(() => {
    fetch('/tasks').then(res => res.json()).then(json => setTasks(json.tasks))
  }, []);

  function addTask() {
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newTask })
    }).then(res => res.json()).then(json => {
      console.log(json)
      if (json.success) {
        setTasks([...tasks, json.task,]);
        setNewTask("")
      }
    })
  }

  function deleteTask(id) {
    fetch(`/tasks/${id}`, { method: 'DELETE', })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json.success) {
          setTasks(tasks => tasks.filter(task => task._id !== id))
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
      console.log(json)
      if (json.success) {
        setEditingId("")
        setEditTask("")
        setTasks(tasks => tasks.map(t => {
          if (t._id !== json.task._id) return t;
          return json.task;
        }))
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
          placeholder='Enter New Task'
          style={{ fontSize: '16px', outline: 'none', padding: '6px', flexGrow: '1' }}
          type='text' maxLength='50' value={newTask}
          onChange={(e) => setNewTask(e.target.value)} />
        <button
          disabled={newTask === ""}
          className='btn btn-primary btn-add-task'
          onClick={addTask}> Add Task</button>
      </div>
      <hr />
      <ul className='task-list'>
        {tasks.map(({ _id, text }) => (
          <li key={`task_id_${_id}`} className='task'>
            {
              editingId === _id ?
                <>
                  <div style={{ display: 'flex', flexGrow: '1', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <input
                      placeholder='Edit Task'
                      style={{ fontSize: '16px', padding: '6px', outline: 'none', flexGrow: '1' }}
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
                    <button className='btn btn-small btn-outline-primary' disabled={editingId !== ""} onClick={() => { setEditingId(_id); setEditTask(text) }}><span className="lnr lnr-pencil"></span></button>
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

export default App;
