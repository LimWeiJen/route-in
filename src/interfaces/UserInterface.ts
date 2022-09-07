import Analytics from "./AnalyticsInterface";
import TaskGroup from "./TaskGroupInterface";

export default interface User {
	taskGroups: Array<TaskGroup>,
	analytics: Analytics
}