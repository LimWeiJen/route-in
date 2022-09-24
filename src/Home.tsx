import React, { useState } from 'react'
import { Navbar, Sidebar } from './components'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { auth, db } from './firebase';
import { TaskGroup, User } from './interfaces';

const Home = () => {
  const [taskGroups, setTaskGroups] = useState<Array<TaskGroup>>();
  
  auth.onAuthStateChanged(async (user) => {
    if (!user) return;

    // get user data
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData: User = JSON.parse(JSON.stringify(userDoc.data()));

    setTaskGroups(userData.taskGroups);
  })

  const getTodaysDay = () => new Date().getDay()

  return (
    <div>
      <Navbar />
      <Sidebar />
      {taskGroups?.filter(taskGroup => taskGroup.dayOfAppearance[getTodaysDay()]).map((taskGroup, i) => <div key={i}>
        {taskGroup.name}
        {taskGroup.tasks.map((task, j) => <div key={j}>
          {task.checked}
          {task.completionRate}
          <input type="checkbox" checked={task.checked} />
        </div>)}
      </div>)}
    </div>
  )
}

export default Home