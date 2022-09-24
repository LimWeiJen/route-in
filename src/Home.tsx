import React, { useContext, useState } from 'react'
import { Navbar, Sidebar } from './components'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { auth, db } from './firebase';
import { TaskGroup, User } from './interfaces';
import { UserContext } from './contexts/UserContext';

const Home = () => {
  const userContext = useContext(UserContext);

  const getTodaysDay = () => new Date().getDay()

  return (
    <div>
      <Navbar />
      <Sidebar />
      {userContext!.taskGroups?.filter(taskGroup => taskGroup.dayOfAppearance[getTodaysDay()]).map((taskGroup, i) => <div key={i}>
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