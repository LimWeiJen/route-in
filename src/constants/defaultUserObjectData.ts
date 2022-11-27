import { User } from '../interfaces';

export const defaultUserObject: User = {
	lastLogInDay: 0,
	taskGroups: [
		{
			id: 'id1',
			name: 'sample task group',
			tasks: [
				{
					title: "Hello there! Welcome to the website! It's nice to have you here!",
					totalCompletionDay: 0,
					totalDay: 0,
					checked: false
				},
				{
					title: 'You can edit this task group on the "settings" tab',
					totalCompletionDay: 0,
					totalDay: 0,
					checked: false
				},
			],
			dayOfAppearance: [true, true, true, true, true, true, true],
			color: '#33E745'
		},
		{
			id: 'id2',
			name: 'creating a new task group',
			tasks: [
				{
					title: "You can create a new task group by pressing on the '+' button",
					totalCompletionDay: 0,
					totalDay: 0,
					checked: false
				},
				{
					title: 'Once again, you can edit all of your task groups in the "settings" tab',
					totalCompletionDay: 0,
					totalDay: 0,
					checked: false
				},
			],
			dayOfAppearance: [true, true, true, true, true, true, true],
			color: '#E73333'
		},
		{
			id: 'id3',
			name: 'a special task group',
			tasks: [
				{
					title: "This task group only appears every Sunday",
					totalCompletionDay: 0,
					totalDay: 0,
					checked: false
				},
			],
			dayOfAppearance: [true, false, false, false, false, false, false],
			color: '#8C26BC'
		},
		{
			id: 'id4',
			name: "that's all!",
			tasks: [
				{
					title: "Thank you for using this website! For any enquiries, please message me at limweijen96@gmail.com",
					totalCompletionDay: 0,
					totalDay: 0,
					checked: false
				},
			],
			dayOfAppearance: [true, true, true, true, true, true, true],
			color: '#3386E7'
		}
	],
	analytics: {
		dateOfCreation: new Date().getTime(),
		completionRateByDay: []
	},
	styles: {
		theme: 'light',
		taskGroupsDisplay: 'row'
	}
}