import './ApiLogs.css';

export default function ApiLogs({ apiLogs }) {
  return (
    <div className='panel'>
      <h2>API Logs</h2>
      <ol className='logs'>
        {
          apiLogs.map((l, i) => (
            <li key={`${l.name}_${l.time}`} className='log'>
              <span className="log-index">{i}.</span>
              <span className="log-name">{l.name}</span>
              took
              <span className="log-millis">{l.millis}ms</span>
            </li>
          ))
        }
      </ol>
    </div>
  );
}