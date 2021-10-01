import { FaTimes } from 'react-icons/fa'

const Task = ({ task }) => {
    return (
        <div className='task'>
            <h3 key={task.id}>{task.text} <FaTimes color='red' cursor='pointer' /></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
