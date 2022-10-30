import Analytics from "./AnalyticsInterface";
import TaskGroup from "./TaskGroupInterface";

export default interface User {
	lastLogInDay: number,
	theme: 'light' | 'dark',
	taskGroups: Array<TaskGroup>,
	analytics: Analytics
}