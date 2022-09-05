class Analytics{
	constructor(dateOfCreation = new Date(), completionRate = 0, totalTasks = 0, completionRateByDay = []) {
		this.dateOfCreation = dateOfCreation;
		this.totalTasks = totalTasks;
		this.completionRateByDay = completionRateByDay;
	}

	private dateOfCreation: Date;
	public getDaysPassed = () => {
		const today = new Date();
		return (today.getTime() - this.dateOfCreation.getTime()) / (1000 * 60 * 60 * 24);
	}
	
	private totalTasks: number;
	public getTotalTasks = () => this.totalTasks;
	public incrementTotalTasks = () => this.totalTasks++;
	public decrementTotalTasks = () => this.totalTasks--;
	
	private completionRateByDay: Array<number>;
	public getCompletionRateByDay = () => this.completionRateByDay;
	public getTotalCompletionRate = () => this.completionRateByDay.reduce((a, b) => a + b, 0);;
	public addNewDay = (completionRateOfNewDay: number) => {
		this.completionRateByDay.push(completionRateOfNewDay);
	}
}

export default Analytics;