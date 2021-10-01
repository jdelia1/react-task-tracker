import Header from './components/Header'
import Tasks from './components/Tasks'
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
            {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> :
                <p>No Tasks</p>}
        </div>
    );
}

export default App;
