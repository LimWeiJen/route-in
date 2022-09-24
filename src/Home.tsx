import React, { useContext, useState } from 'react'
import { Navbar, Sidebar } from './components'
import { UserContext } from './contexts/UserContext';

const Home = () => {
  const userContext = useContext(UserContext);

  const _getTodaysDay = () => new Date().getDay()

  return (
    <div>
      <Navbar />
      <Sidebar />
      {userContext!.taskGroups?.filter(taskGroup => taskGroup.dayOfAppearance[_getTodaysDay()]).map((taskGroup, i) => <div key={i}>
        {taskGroup.name}
        {taskGroup.tasks.map((task, j) => <div key={j}>
          {task.title}
          {task.completionRate}
          <input type="checkbox" checked={task.checked} />
        </div>)}
      </div>)}
    </div>
  )
}

export default Home