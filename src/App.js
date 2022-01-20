import './App.css';
import MyTasks from './MyTasks';
import Split from 'react-split';
import Counts from './Counts';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

function App() {
  const [apiCounts, setApiCounts] = useState({ putTaskCount: 0, postTaskCount: 0, deleteTaskCount: 0 });
  useEffect(() => {
    fetch('/counts/PostTask').then(res => res.json()).then(json => {
      setApiCounts(c => ({ ...c, postTaskCount: json.count }))
    });

    fetch('/counts/PutTask').then(res => res.json()).then(json => {
      setApiCounts(c => ({ ...c, putTaskCount: json.count }))
    });

    fetch('/counts/DeleteTask').then(res => res.json()).then(json => {
      setApiCounts(c => ({ ...c, deleteTaskCount: json.count }))
    });
  }, []);
  return (
    <div className="app">
      <header className='header'>
        <h1>
          Precily Assignment - Split Panes
        </h1>
      </header>
      <Split minSize={[240, 100]} gutterSize={14} style={{ height: 'calc(100vh - 100px)' }} direction='vertical'>
        <Split minSize={[360, 200]} gutterSize={14} style={{ width: '100vw', display: 'flex' }} direction='horizontal'>
          <MyTasks setApiCounts={setApiCounts} />
          <Counts {...apiCounts} />
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

export default App;
