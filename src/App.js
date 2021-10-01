import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState} from 'react'

function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Test Task 1',
            day: 'October 8th',
            reminder: true
        },
        {
            id: 2,
            text: 'Test Task 2',
            day: 'October 10th',
            reminder: false
        },
        {
            id: 3,
            text: 'Test Task 3',
            day: 'October 13th',
            reminder: true
        }
    ])

    // Add Task
    const addTask = (task) => {
        // Not a guaranteed solution for ID!!!
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }

    // Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
    }

    return (
        <div className="container">
            <Header />
            <AddTask onAdd={addTask} />
            {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> :
                <p>No Tasks</p>}
        </div>
    );
}

export default App;
