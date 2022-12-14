import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Task, TaskGroup } from '../interfaces'
import { Trash, PlusCircle, Pocket } from 'react-feather';
import '../styles/taskgroupedit.scss'

const TaskGroupEdit = ({data}: {data: TaskGroup}) => {
  const [newName, setNewName] = useState(data.name); // name of the task group
  const [newTasks, setNewTasks] = useState(data.tasks);
  const [newDayOfAppearance, setNewDayOfAppearance] = useState(data.dayOfAppearance);
  const [newColor, setNewColor] = useState(data.color);

  const userContext = useContext(UserContext);

  const _dayStr = ["S", "M", "T", "W", "T", "F", "S"];

  /**
   * @desc adds a new empty task to the task group
   * 
   * @returns void
   */
  const _addNewTask = () => {
    // initialize an empty task
    const newTask: Task = {
      title: '',
      totalCompletionDay: 0,
      totalDay: 0,
      checked: false,
      status: 'unchecked'
    }

    
    // add the new task
    setNewTasks([...newTasks, newTask]);
  }

  /**
   * @desc updates the title of an existing task
   * 
   * @param updatedTaskTitle the new task title
   * @param taskIndex the index of the task to be updated
   * 
   * @returns void
   */
  const updateExistingTaskTitle = (updatedTaskTitle: string, taskIndex: number) => {
    // create a copy of the tasks
    const t = [...newTasks];

    // update the title of the task
    t[taskIndex].title = updatedTaskTitle;

    // update the tasks
    setNewTasks(t);
  }

  /**
   * @desc deletes a task from the task group
   * 
   * @param taskIndex the index of the task to be deleted
   * 
   * @returns void
   */
  const deleteExistingTask = async (taskIndex: number) => {
    setNewTasks(newTasks.filter((v, i) => i !== taskIndex));
  }

  /**
   * @desc modify the list for the day of appearances
   * 
   * @param day the index of the day to be modified
   * 
   * @example
   * 
   * updateDayOfAppearance(0)
   * // the day of appearance for Sunday will be toggled since Sunday is day 0
   * updateDayOfAppearance(1)
   * // the day of appearance for Sunday will be toggled since Monday is day 1
   * 
   * @returns void
   */
  const updateDayOfAppearance = (day: number) => {
    // create a copy of the days of appearances
    let d = [...newDayOfAppearance];
    
    // toggle the day of appearance of day i
    d[day] = !d[day];
    
    // update the days of appearances
    setNewDayOfAppearance(d);
  }

  return (
    <div className='wrapper'>
      <div>
        <div className='title-container'>
          <input style={{backgroundColor: newColor}} className='title' placeholder='task group title' type="text" defaultValue={data.name} onChange={e => setNewName(e.target.value)} />
          <input className='color' type="text" defaultValue={data.color} onChange={e => setNewColor(e.target.value)} />
        </div>
        <div className='tasks-container container-secondary'>
          {newTasks.map((task, i) => <div className='task'>
            <div className='left'>
              <div className='square' style={{backgroundColor: newColor}}></div>
              <input type="text" defaultValue={task.title} placeholder='task name' onKeyDown={e => {
                if (e.key === 'Enter') _addNewTask();
              }} onChange={e => updateExistingTaskTitle(e.target.value, i)} />
            </div>
            <Trash className='right btn' style={{color: '#E73333'}} onClick={() => deleteExistingTask(i)} />
          </div>)}
          <div className='new-task-btn-container'>
            <div className='new-task-btn' onClick={_addNewTask}>
              <PlusCircle />
              <p>New Task</p>
            </div>
          </div>
        </div>
      </div>
      <div className='date-container'>
        <p>I NEED TO COMPLETE ALL THE TASKS ABOVE ON EVERY</p>
        <div className='dates'>
          {newDayOfAppearance.map((e, i) => <div>
            <button className={`date-btn ${e ? 'checked' : ''}`} onClick={() => updateDayOfAppearance(i)}>{_dayStr[i]}</button>
          </div>)}
        </div>
        <Pocket className='btn' onClick={() => userContext!.saveTaskGroup(data.id, newDayOfAppearance, newName, newTasks, newColor)} />
      </div>
    </div>
  )
}

export default TaskGroupEdit