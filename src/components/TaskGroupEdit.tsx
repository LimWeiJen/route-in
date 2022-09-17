import React, { useRef, useState } from 'react'
import { Task, TaskGroup } from '../interfaces'

const TaskGroupEdit = ({data}: {data: TaskGroup}) => {
  const [newName, setNewName] = useState(data.name);
  const [newTasks, setNewTasks] = useState(data.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);

  const addNewTask = () => {
    const newTask: Task = {
      title: newTaskTitle,
      completionRate: 0,
      checked: false
    }
    data.tasks.push(newTask);
    if (titleInputRef.current) titleInputRef.current.value = "";
  }

  return (
    <div>
      <input type="text" defaultValue={data.name} onChange={e => setNewName(e.target.value)} />
      {data.tasks.map(e => <div>
        {e.title}
      </div>)}
      <input type="text" placeholder='new task' ref={titleInputRef} onChange={e => setNewTaskTitle(e.target.value)} />
      <button onClick={addNewTask}>add new task</button>
      M <input type="checkbox" />
    </div>
  )
}

export default TaskGroupEdit