import React, { useContext, useState } from 'react'
import { Navbar, Sidebar, TaskGroupEdit } from './components';
import { UserContext } from './contexts/UserContext';
import { TaskGroup } from './interfaces';
import { Trash } from 'react-feather';

const EditTasks = () => {
  const [currTaskGroup, setCurrTaskGroup] = useState<TaskGroup>();

  const userContext = useContext(UserContext);


  return (
    <div className={userContext?.theme}>
      <Navbar />
      <main>
        <Sidebar />
        {currTaskGroup ? 
          <TaskGroupEdit data={currTaskGroup} /> : 
          <div>
            <div>
              {userContext!.taskGroups?.map((taskGroup) => <div className='task'>
                <div className='left btn' onClick={() => setCurrTaskGroup(taskGroup)}>
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
            <div>
              <button className='btn txt-btn' onClick={userContext?.deleteAllTasks}>Delete All Tasks</button>
              <button className='btn txt-btn' onClick={userContext?.resetAllRecords}>Reset All Records</button>
            </div>
          </div>
        }
      </main>
    </div>
  )
}

export default EditTasks