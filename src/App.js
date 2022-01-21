import { useState, useEffect } from 'react';
import Split from 'react-split';

import './App.css';
import MyTasks from './Components/MyTasks/MyTasks';
import Counts from './Components/Counts/Counts';
import ApiLogs from './Components/ApiLogs/ApiLogs';
import { fetchAllCounts } from './Service/network';

function App() {
  const [apiLogs, setApiLogs] = useState([]);
  const [apiCounts, setApiCounts] = useState({ putTaskCount: 0, postTaskCount: 0, deleteTaskCount: 0 });

  function addLog(log) {
    setApiLogs(apiLogs => [...apiLogs, log]);
  }

  useEffect(() => {
    fetchAllCounts(addLog).then(setApiCounts);
  }, []);

  return (
    <div className="app">
      <header className='header'>
        <h1>
          Precily Assignment - Split Panes
        </h1>
      </header>

      <Split className='v-panel-container' minSize={[240, 150]} gutterSize={14} direction='vertical'>
        <Split className='h-panel-container' minSize={[360, 240]} gutterSize={14} direction='horizontal'>
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
