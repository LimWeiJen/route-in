class Task {
	constructor(title: string, completionRate: number = 0, checked: boolean = false) {
		this.title = title;
		this.completionRate = completionRate;
		this.checked = checked;
	}
	
	private title: string;
	public getTitle = () => this.title;
	public setTitle = (newTitle: string) => this.title = newTitle;

	private completionRate: number;
	public getCompletionRate = () => this.completionRate;
	public setCompletionRate = (newCompletionRate: number) => {
		if (newCompletionRate < 0) throw TypeError('newCompletionRate cannot be negative');
		this.completionRate = newCompletionRate;
	}

	private checked: boolean;
	public getChecked = () => this.checked;
	public setChecked = (newCheckedStatus: boolean) => this.checked = newCheckedStatus;
	public toggleChecked = () => this.checked = !this.checked;
}

export default Task;