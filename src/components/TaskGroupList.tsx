import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom'

const TaskGroupList = () => {
  
  const userContext = useContext(UserContext);
  
  return (
    <div>
          {userContext!.taskGroups?.map((taskGroup) => <div>
            <div onClick={() => location.href=`/edit-tasks/${taskGroup.id}`}>
              {taskGroup.name}<br />
              {taskGroup.tasks.length} tasks
            </div>
            <button onClick={() => userContext!.deleteTaskGroup(taskGroup.id)}>delete</button>
          </div>)}
    </div>
  )
}

export default TaskGroupList