import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Sidebar, TaskGroupEdit } from './components';
import { auth, db } from './firebase';
import { TaskGroup, User } from './interfaces';

const EditTasks = () => {
  const [currTaskGroup, setCurrTaskGroup] = useState<TaskGroup>();
  const [taskGroups, setTaskGroups] = useState<Array<TaskGroup>>();

  auth.onAuthStateChanged(async (user) => {
    if (!user) return;

    // get user data
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData: User = JSON.parse(JSON.stringify(userDoc.data()));

    // get all user's task groups
    setTaskGroups(userData.taskGroups);

    // get user's task group by id if the id is provided
    const id = location.href.replace('http://localhost:3000/edit-tasks/', '');
    setCurrTaskGroup(userData.taskGroups.filter((taskGroup) => taskGroup.id === id)[0]);
  })

  return (
    <div>
      EditTasks
      <Sidebar />
      {currTaskGroup ? 
        <TaskGroupEdit data={currTaskGroup} /> : 
        <div>
          {taskGroups?.map((taskGroup) => <div>
            <Link to={`/edit-tasks/${taskGroup.id}`}>
              {taskGroup.name}<br />
              {taskGroup.tasks.length} tasks
            </Link>
          </div>)}
        </div> 
      }
    </div>
  )
}

export default EditTasks