import React, { useContext, useState } from 'react'
import { Navbar, Sidebar, TaskGroupEdit } from './components';
import { UserContext } from './contexts/UserContext';
import { TaskGroup } from './interfaces';
import { Trash } from 'react-feather';
import './styles/settings.scss'

const EditTasks = () => {
  const [currTaskGroup, setCurrTaskGroup] = useState<TaskGroup>();

  const userContext = useContext(UserContext);

  if (userContext?.isBusy) return null;
  return (
    <div className={userContext?.styles!.theme}>
      <Navbar />
      <main>
        <Sidebar />
        <div className='wrapper'>
        {currTaskGroup ? 
          <TaskGroupEdit data={currTaskGroup} /> : 
          <div>
            <div>
              <p className='settings-title'>Tasks</p>
              <div className='task-group-list'>
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
            <div>
              <p className='settings-title'>Display</p>
              <button className='btn txt-btn theme-btn' onClick={() => userContext?.switchTheme(userContext.styles!.theme === 'light' ? 'dark' : 'light')}>Theme: {userContext?.styles!.theme === 'light' ? 'Light' : 'Dark'}</button>
              <button className='btn txt-btn theme-btn' onClick={() => userContext?.switchTaskGroupsDisplay(userContext.styles!.taskGroupsDisplay === 'row' ? 'grid' : 'row')}>Task Groups Display: {userContext?.styles?.taskGroupsDisplay === 'row' ? 'Row' : 'Grid'} Based</button>
            </div>
          </div>
        }
        </div>
      </main>
    </div>
  )
}

export default EditTasks