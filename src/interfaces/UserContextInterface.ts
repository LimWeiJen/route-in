import { Analytics, Task, TaskGroup, Styles } from ".";

export default interface UserContextInterface {
	taskGroups?: Array<TaskGroup>,
	analytics?: Analytics,
	deleteTaskGroup: (taskGroupId: string) => Promise<void>,
	saveTaskGroup: (taskGroupId: string, newDayOfAppearance: Array<boolean>, newName: string, newTasks: Array<Task>, newColor: string) => Promise<void>,
  	addNewTaskGroup: () => Promise<void>,
	toggleChecked: (taskGroupId: string, taskIndex: number, checked: boolean) => Promise<void>,
	switchTheme: (newTheme: 'light' | 'dark') => Promise<void>,
	switchTaskGroupsDisplay: (newDisplay: 'grid' | 'row') => Promise<void>,
	totalDaysPassed: number,
	styles?: Styles,
	deleteAllTasks: () => Promise<void>,
	resetAllRecords: () => Promise<void>,
	isBusy: boolean
}