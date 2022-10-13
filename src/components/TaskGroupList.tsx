import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom'

const TaskGroupList = () => {
  
  const userContext = useContext(UserContext);
  
  return (
    <div>
          {userContext!.taskGroups?.map((taskGroup) => <div>
            <Link to={`/edit-tasks/${taskGroup.id}`}>
              {taskGroup.name}<br />
              {taskGroup.tasks.length} tasks
            </Link>
            <button onClick={() => userContext!.deleteTaskGroup(taskGroup.id)}>delete</button>
          </div>)}
    </div>
  )
}

export default TaskGroupList