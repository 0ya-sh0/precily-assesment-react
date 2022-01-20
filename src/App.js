import './App.css';

import Split from 'react-split';
import { useState } from 'react';

function App() {
  return (
    <div className="app">
      <header className='header'>
        <h1>
          Precily Assignment - Split Panes
        </h1>
      </header>
      <Split minSize={[240, 100]} gutterSize={14} style={{ height: 'calc(100vh - 100px)' }} direction='vertical'>
        <Split minSize={[200, 200]} gutterSize={14} style={{ width: '100vw', display: 'flex' }} direction='horizontal'>
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
  const [tasks, setTasks] = useState([{
    id: 1,
    text: 'Task 1'
  }, {
    id: 2,
    text: 'Task 2'
  }, {
    id: 3,
    text: 'Task 3'
  }, {
    id: 4,
    text: 'Task 4'
  },])

  function addTask() {
    setTasks([...tasks, { id: tasks.length + 1, text: `Task ${tasks.length + 1}` }])
  }

  return (
    <div className='panel'>
      <h2>My Tasks</h2>

      <button className='btn btn-primary btn-add-task' onClick={addTask}> Add Task</button>
      <hr />
      <ul className='task-list'>
        {tasks.map(({ id, text }) => (
          <li key={`task_id_${id}`} className='task'>
            <span>{text}</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className='btn btn-small btn-outline-primary' onClick={() => { }}><span className="lnr lnr-pencil"></span></button>
              <button className='btn btn-small btn-outline-danger' onClick={() => { }}><span className="lnr lnr-trash"></span></button>
            </div>
          </li>
        ))}
      </ul>
    </div >
  );
}

export default App;
