import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import '../styles/taskgrouplist.scss'
import '../styles/taskgroup.scss';
import { Trash } from 'react-feather';

const TaskGroupList = () => {
  const userContext = useContext(UserContext);
  
  return (
    <div className='wrapper container'>
          {userContext!.taskGroups?.map((taskGroup) => <div className='task'>
            <div className='left' onClick={() => location.href=`/edit-tasks/${taskGroup.id}`}>
              <div className='square' style={{backgroundColor: `${taskGroup.color}`}}></div>
              <div>
                {taskGroup.name.toUpperCase()}
              </div>
            </div>
            <div className='right'>
              <div className='completion-rate text-secondary'>
                {taskGroup.tasks.length} tasks
              </div>
              <Trash className='btn' style={{color: '#E73333'}} onClick={() => userContext!.deleteTaskGroup(taskGroup.id)} />
            </div>
          </div>)}
    </div>
  )
}

export default TaskGroupList