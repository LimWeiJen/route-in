import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom'
import '../styles/taskgrouplist.scss'
import { Trash } from 'react-feather';

const TaskGroupList = () => {
  const userContext = useContext(UserContext);
  
  return (
    <div className='task-group-list'>
          {userContext!.taskGroups?.map((taskGroup) => <div className='task-group-preview'>
            <div className='left' onClick={() => location.href=`/edit-tasks/${taskGroup.id}`}>
              <div className='block' style={{backgroundColor: `${taskGroup.color}`}}></div>
              <div>
                {taskGroup.name.toUpperCase()}
              </div>
            </div>
            <div className='right'>
              <div className='total-tasks'>
                {taskGroup.tasks.length} tasks
              </div>
              <Trash className='ico-btn delete-btn' onClick={() => userContext!.deleteTaskGroup(taskGroup.id)} />
            </div>
          </div>)}
    </div>
  )
}

export default TaskGroupList