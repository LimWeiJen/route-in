import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Sidebar, TaskGroupEdit } from './components';
import { UserContext } from './contexts/UserContext';
import { TaskGroup } from './interfaces';

const EditTasks = () => {
  const [currTaskGroup, setCurrTaskGroup] = useState<TaskGroup>();

  const userContext = useContext(UserContext);

  // get user's task group by id if the id is provided on load
  useEffect(() => {
    const id = location.href.replace('http://localhost:3000/edit-tasks/', '');
    setCurrTaskGroup(userContext!.taskGroups?.filter((taskGroup) => taskGroup.id === id)[0]);
  })

  return (
    <div>
      EditTasks
      <Sidebar />
      {currTaskGroup ? 
        <TaskGroupEdit data={currTaskGroup} /> : 
        <div>
          {userContext!.taskGroups?.map((taskGroup) => <div>
            <Link to={`/edit-tasks/${taskGroup.id}`}>
              {taskGroup.name}<br />
              {taskGroup.tasks.length} tasks
            </Link>
            <button onClick={() => userContext!.deleteTaskGroup(taskGroup.id)}>delete</button>
          </div>)}
        </div> 
      }
    </div>
  )
}

export default EditTasks