import { UserContext } from '../contexts/UserContext';
import React, { useContext, useState } from 'react'
import { TaskGroup as TaskGroupInterface } from '../interfaces'
import '../styles/taskgroup.scss'

const TaskGroup = ({taskGroup}: {taskGroup: TaskGroupInterface}) => {
  const userContext = useContext(UserContext);
  return (
    <div className='tasks'>
	{taskGroup.tasks.map((task, j) => <div key={j}>
		<div className='left'>
			<div className='square' style={{backgroundColor: taskGroup.color}}></div>
			<div className='task-title'>
				{task.title}
			</div>
		</div>
		<div className='right'>
			<div className='completion-rate'>
				{task.completionRate}
			</div>
			<input type="checkbox" checked={task.checked} onClick={() => userContext?.toggleChecked(taskGroup.id, j, !task.checked)} />
		</div>
	</div>)}
    </div>
  )
}

export default TaskGroup