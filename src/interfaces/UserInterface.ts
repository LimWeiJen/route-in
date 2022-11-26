import Analytics from "./AnalyticsInterface";
import Styles from "./StylesInterface";
import TaskGroup from "./TaskGroupInterface";

export default interface User {
	lastLogInDay: number,
	styles: Styles,
	taskGroups: Array<TaskGroup>,
	analytics: Analytics
}