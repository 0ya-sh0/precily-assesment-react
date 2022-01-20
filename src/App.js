import './App.css';
import MyTasks from './MyTasks';
import Split from 'react-split';
import Counts from './Counts';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import ApiLogs from './ApiLogs';

function App() {
  const [apiLogs, setApiLogs] = useState([]);
  function addLog(log) {
    setApiLogs(apiLogs => [...apiLogs, log]);
  }
  const [apiCounts, setApiCounts] = useState({ putTaskCount: 0, postTaskCount: 0, deleteTaskCount: 0 });
  useEffect(() => {
    fetch('/counts/postTask').then(res => res.json()).then(json => {
      setApiCounts(c => ({ ...c, postTaskCount: json.count }))
      addLog({ name: 'GET /counts/postTask', millis: json.millis, time: new Date() })
    });

    fetch('/counts/putTask').then(res => res.json()).then(json => {
      setApiCounts(c => ({ ...c, putTaskCount: json.count }))
      addLog({ name: 'GET /counts/putTask', millis: json.millis, time: new Date() })
    });

    fetch('/counts/deleteTask').then(res => res.json()).then(json => {
      setApiCounts(c => ({ ...c, deleteTaskCount: json.count }))
      addLog({ name: 'GET /counts/deleteTask', millis: json.millis, time: new Date() })
    });
  }, []);
  return (
    <div className="app">
      <header className='header'>
        <h1>
          Precily Assignment - Split Panes
        </h1>
      </header>
      <Split minSize={[240, 150]} gutterSize={14} style={{ height: 'calc(100vh - 100px)' }} direction='vertical'>
        <Split minSize={[360, 240]} gutterSize={14} style={{ width: '100vw', display: 'flex' }} direction='horizontal'>
          <MyTasks setApiCounts={setApiCounts} addLog={addLog} />
          <Counts {...apiCounts} />
        </Split>
        <ApiLogs apiLogs={apiLogs} />
      </Split>
      <footer className='footer'>
        Made By - Yash Thatte
      </footer>
    </div>
  );
}

export default App;
