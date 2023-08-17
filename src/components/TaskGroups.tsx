import { UserContext } from '../contexts/UserContext';
import React, { useContext } from 'react'
import '../styles/taskgroups.scss';
import TaskGroup from './TaskGroup';

const TaskGroups = () => {	
  const userContext = useContext(UserContext);

  const _getTodaysDay = () => new Date().getDay()
	
  return (
	<div className={`wrapper ${userContext?.styles?.taskGroupsDisplay}`}>
		{userContext!.taskGroups?.filter(taskGroup => taskGroup.dayOfAppearance[_getTodaysDay()]).map((taskGroup, i) => <div className='task-group-container' key={i}>
			<div className='title' style={{backgroundColor: taskGroup.color}}>{taskGroup.name.toUpperCase()}</div>
			<div className='tasks'>
				<TaskGroup taskGroup={taskGroup} />
			</div>
			<br />
		</div>)}
	</div>
  )
}

export default TaskGroups