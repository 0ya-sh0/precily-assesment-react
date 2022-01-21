export async function fetchAllCounts(addLog) {
    const postTask = await fetch('/api/counts/postTask')
        .then(res => res.json());
    addLog({ name: 'GET /counts/postTask', millis: postTask.millis, time: new Date() })

    const putTask = await fetch('/api/counts/putTask')
        .then(res => res.json());
    addLog({ name: 'GET /counts/putTask', millis: putTask.millis, time: new Date() })

    const deleteTask = await fetch('/api/counts/deleteTask')
        .then(res => res.json());
    addLog({ name: 'GET /counts/deleteTask', millis: deleteTask.millis, time: new Date() })

    return {
        postTaskCount: postTask.count,
        putTaskCount: putTask.count,
        deleteTaskCount: deleteTask.count
    }
}

export async function fetchAllTasks(addLog) {
    const json = await fetch('/api/tasks')
        .then(res => res.json())
    addLog({ name: 'GET /tasks', millis: json.millis, time: new Date() })
    return json.tasks
}

export async function addTask(newTask, addLog, setApiCounts) {
    const json = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newTask })
    }).then(res => res.json());
    addLog({ name: 'POST /tasks', millis: json.millis, time: new Date() });
    setApiCounts(c => ({ ...c, postTaskCount: json.count }));

    return json.task;
}

export async function deleteTask(id, addLog, setApiCounts) {
    const json = await fetch(`/api/tasks/${id}`, { method: 'DELETE', })
        .then(res => res.json())
    addLog({ name: `DELETE /tasks/${id}`, millis: json.millis, time: new Date() })
    setApiCounts(c => ({ ...c, deleteTaskCount: json.count }));

    return;
}

export async function saveTask(id, task, addLog, setApiCounts) {
    const json = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: task })
    }).then(res => res.json())
    addLog({ name: `PUT /tasks/${id}`, millis: json.millis, time: new Date() })
    setApiCounts(c => ({ ...c, putTaskCount: json.count }));

    return json.task;
}