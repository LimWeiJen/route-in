import { Task, TaskGroup } from ".";


export default interface UserContextInterface {
	taskGroups?: Array<TaskGroup>,
	deleteTaskGroup: (taskGroupId: string) => Promise<void>,
	saveTaskGroup: (taskGroupId: string, newDayOfAppearance: Array<boolean>, newName: string, newTasks: Array<Task>) => Promise<void>
}