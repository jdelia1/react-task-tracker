import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    const tasksEndpoint = 'http://localhost:5050/tasks';

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    }, [])

    // GET Tasks
    const fetchTasks = async () => {
        const resp = await fetch(tasksEndpoint)
        const data = await resp.json()

        return data
    }

    const fetchTask = async (id) => {
        const resp = await fetch(`${tasksEndpoint}/${id}`)
        const data = await resp.json()

        return data
    }

    // POST Task
    const addTask = async (task) => {
        const resp = await fetch(tasksEndpoint, { 
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await resp.json()

        setTasks([...tasks, data])
    }

    // DELETE Task
    const deleteTask = async (id) => {
        await fetch(`${tasksEndpoint}/${id}`, { method: 'DELETE' })
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
        const res = await fetch(`${tasksEndpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })

        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    }

    return (
        <div className="container">
            <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> :
                <p>No Tasks</p>}
        </div>
    );
}

export default App;
