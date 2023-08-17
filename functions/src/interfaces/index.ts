export interface User {
	lastLogInDay: number,
	taskGroups: Array<TaskGroup>,
	analytics: Analytics
}

interface TaskGroup {
	id: string,
	name: string,
	tasks: Array<Task>,
	dayOfAppearance: Array<boolean>,
	color: string
}

interface Task {
	title: string,
	totalCompletionDay: number,
	totalDay: number,
	checked: boolean,
	status: 'checked' | 'unchecked' | 'ignored'
}

interface Analytics {
	dateOfCreation: number,
	totalTasks: number,
	completionRateByDay: Array<number>
}