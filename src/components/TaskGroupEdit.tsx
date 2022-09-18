import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { auth, db } from '../firebase';
import { Task, TaskGroup, User } from '../interfaces'

const TaskGroupEdit = ({data}: {data: TaskGroup}) => {
  ////// VARIABLES //////
  const [newName, setNewName] = useState(data.name); // name of the task group
  const [newTasks, setNewTasks] = useState(data.tasks);
  const [newDayOfAppearance, setNewDayOfAppearance] = useState(data.dayOfAppearance);
  const newTaskTitleInputRef = useRef<HTMLInputElement>(null);

  ////// FUNCTIONS //////
  const addNewTask = () => {
    // initialize an empty task
    const newTask: Task = {
      title: newTaskTitleInputRef.current?.value || '',
      completionRate: 0,
      checked: false
    }

    // add the new task
    setNewTasks([...newTasks, newTask]);

    // reset the task title input
    if (newTaskTitleInputRef.current) newTaskTitleInputRef.current.value = "";
  }

  const updateExistingTaskTitle = (updatedTaskTitle: string, taskIndex: number) => {
    // create a copy of the tasks
    const t = [...newTasks];

    // update the title of the task
    t[taskIndex].title = updatedTaskTitle;

    // update the tasks
    setNewTasks(t);
  }

  const deleteExistingTask = (taskIndex: number) => {
    setNewTasks(newTasks.filter((v, i) => i != taskIndex));
  }

  const updateDayOfAppearance = (i: number) => {
    // create a copy of the days of appearances
    let d = [...newDayOfAppearance];
    
    // toggle the day of appearance of day i
    d[i] = !d[i];
    
    // update the days of appearances
    setNewDayOfAppearance(d);
  }

  const save = async () => {
    if (!auth.currentUser) return;

    // get user data
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    const userData: User = JSON.parse(JSON.stringify(userDoc.data()));

    // update the task group
    userData.taskGroups.forEach((taskGroup) => {
      if (taskGroup.id === data.id) {
        taskGroup.dayOfAppearance = newDayOfAppearance;
        taskGroup.name = newName;
        taskGroup.tasks = newTasks;
      }
    })

    // update the user document
    await updateDoc(doc(db, 'users', auth.currentUser.uid), JSON.parse(JSON.stringify(userData)));
    location.href = '/home';
  }

  return (
    <div>
      <input type="text" defaultValue={data.name} onChange={e => setNewName(e.target.value)} />
      {newTasks.map((task, i) => <div>
        <input type="text" defaultValue={task.title} onChange={e => updateExistingTaskTitle(e.target.value, i)} />
        <button onClick={() => deleteExistingTask(i)}>delete</button>
      </div>)}
      <input type="text" placeholder='new task' ref={newTaskTitleInputRef} />
      <button onClick={addNewTask}>add new task</button>
      {newDayOfAppearance.map((e, i) => <div>
        <input type="checkbox" checked={e} onChange={() => updateDayOfAppearance(i)} />
      </div>)}
      <button onClick={save}>save</button>
    </div>
  )
}

export default TaskGroupEdit