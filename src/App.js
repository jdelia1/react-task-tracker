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
            reminder: true
        },
        {
            id: 3,
            text: 'Test Task 3',
            day: 'October 13th',
            reminder: true
        }
    ])

    return (
        <div className="container">
            <Header />
            <Tasks tasks={tasks}/>
        </div>
    );
}

export default App;
