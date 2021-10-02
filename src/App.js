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
        const res = await fetch(tasksEndpoint)
        const data = await res.json()

        return data
    }

    // Add Task
    const addTask = (task) => {
        // Not a guaranteed solution for ID!!!
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }

    // DELETE Task
    const deleteTask = async (id) => {
        await fetch(`${tasksEndpoint}/${id}`, { method: 'DELETE' })
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
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
