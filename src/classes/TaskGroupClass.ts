import Task from "./TaskClass";

class TaskGroup {
	constructor(name: string, tasks: Array<Task> = []) {
		this.name = name;
		this.tasks = tasks;
	}

	private name: string;
	public getName = () => this.name;
	public setName = (newName: string) => this.name = newName;

	private tasks: Array<Task>;
	public getTasks = () => this.tasks;
	public setTasks = (newTasks: Array<Task>) => this.tasks = newTasks;
	public getTasksCount = () => this.tasks.length;
}

export default TaskGroup;