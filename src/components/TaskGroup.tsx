import { UserContext } from '../contexts/UserContext';
import React, { useContext, useState } from 'react'
import { TaskGroup as TaskGroupInterface } from '../interfaces'
import '../styles/taskgroup.scss'
import Checkbox from './Checkbox';

const TaskGroup = ({taskGroup}: {taskGroup: TaskGroupInterface}) => {
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
						{task.totalCompletionDay / task.totalDay * 100 || 0}
					</div>
					<Checkbox defaultChecked={task.checked} taskGroupId={taskGroup.id} taskIndex={j} />
				</div>
			</div>)}
		</div>
	)
}

export default TaskGroup