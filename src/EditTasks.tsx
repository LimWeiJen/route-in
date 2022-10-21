import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Sidebar, TaskGroupEdit, TaskGroupList } from './components';
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
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <Sidebar />
        {currTaskGroup ? 
          <TaskGroupEdit data={currTaskGroup} /> : 
          <TaskGroupList />
        }
      </div>
    </div>
  )
}

export default EditTasks