import { TaskGroup as TaskGroupInterface } from '../interfaces'
import '../styles/taskgroup.scss'
import Checkbox from './Checkbox';

const TaskGroup = ({taskGroup}: {taskGroup: TaskGroupInterface}) => {
	return (
		<div>
			{taskGroup.tasks.map((task, j) => <div key={j} className='task'>
				<div className='left'>
					<div className='square' style={{backgroundColor: taskGroup.color}}></div>
					<div className='task-title'>
						{task.title}
					</div>
				</div>
				<div className='right'>
					<div className='completion-rate text-secondary'>
						{(task.totalCompletionDay / task.totalDay * 100).toFixed(2) || 0}
					</div>
					<Checkbox defaultStatus={task.status} taskGroupId={taskGroup.id} taskIndex={j} />
				</div>
			</div>)}
		</div>
	)
}

export default TaskGroup