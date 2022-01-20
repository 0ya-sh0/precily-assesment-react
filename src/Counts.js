export default function Counts({ postTaskCount = 0, putTaskCount = 0, deleteTaskCount = 0 }) {
    return (
        <div className='panel'>
            <h2>API Call Counts</h2>
            <ul style={{ paddingLeft: "16px" }}>
                <li><span>POST /tasks</span> : {postTaskCount}</li>
                <li><span>PUT /tasks/id</span> : {putTaskCount}</li>
                <li><span>DELETE /tasks/id</span> : {deleteTaskCount}</li>
            </ul>
        </div>
    );
}