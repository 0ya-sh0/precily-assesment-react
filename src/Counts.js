import "./Counts.css";

export default function Counts({ postTaskCount = 0, putTaskCount = 0, deleteTaskCount = 0 }) {
    return (
        <div className='panel'>
            <h2>API Call Counts</h2>
            <ul className="counts">
                <li className="count"><span className="count-name">POST /tasks</span>{"=>"}<span className="count-value">{postTaskCount}</span></li>
                <li className="count"><span className="count-name">PUT /tasks/:id</span>{"=>"}<span className="count-value">{putTaskCount}</span></li>
                <li className="count"><span className="count-name">DELETE /tasks/:id</span>{"=>"}<span className="count-value">{deleteTaskCount}</span></li>
            </ul>
        </div>
    );
}