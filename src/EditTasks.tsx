import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { TaskGroupEdit } from './components';
import { auth, db } from './firebase';
import { TaskGroup, User } from './interfaces';

const EditTasks = () => {
  const [currTaskGroup, setCurrTaskGroup] = useState<TaskGroup>();
  const [taskGroups, setTaskGroups] = useState<Array<TaskGroup>>();

  auth.onAuthStateChanged(async (user) => {
    if (!user) return;
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData: User = JSON.parse(JSON.stringify(userDoc.data()));
    const id = location.href.replace('http://localhost:3000/edit-tasks/', '');
    setTaskGroups(userData.taskGroups);
    setCurrTaskGroup(userData.taskGroups.filter((taskGroup) => taskGroup.id === id)[0]);
  })

  return (
    <div>
      EditTasks
      {currTaskGroup ? 
        <TaskGroupEdit data={currTaskGroup} /> : 
        <div>
          {taskGroups?.map((taskGroup) => <div>
            {taskGroup.name}<br />
            {taskGroup.tasks.length} tasks
          </div>)}
        </div> 
      }
    </div>
  )
}

export default EditTasks