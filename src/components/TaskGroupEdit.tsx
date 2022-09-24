import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Task, TaskGroup } from '../interfaces'

const TaskGroupEdit = ({data}: {data: TaskGroup}) => {
  ////// VARIABLES //////
  const [newName, setNewName] = useState(data.name); // name of the task group
  const [newTasks, setNewTasks] = useState(data.tasks);
  const [newDayOfAppearance, setNewDayOfAppearance] = useState(data.dayOfAppearance);
  const newTaskTitleInputRef = useRef<HTMLInputElement>(null);

  const userContext = useContext(UserContext);

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

  const deleteExistingTask = async (taskIndex: number) => {
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
      <button onClick={() => userContext!.saveTaskGroup(data.id, newDayOfAppearance, newName, newTasks)}>save</button>
    </div>
  )
}

export default TaskGroupEdit