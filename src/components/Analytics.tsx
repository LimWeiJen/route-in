import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import CompletionRateGraph from './CompletionRateGraph';

const Analytics = () => {
  const userContext = useContext(UserContext);

  const _calculateCompletionRate = () => {
    let sumOfCompletionRate =  userContext?.analytics?.completionRateByDay.reduce((p, a) => p + a, 0) || 0;
    let totalDays = userContext?.totalDaysPassed || 1;
    return Math.round((sumOfCompletionRate / totalDays) * 100) / 100;
  }

  const _calculateTotalTask = () => {
    let res = 0;
    userContext?.taskGroups?.forEach(taskGroup => res += taskGroup.tasks.length)
    return res;
  }

  return (
    <div>
      <div>
        {userContext?.totalDaysPassed} days passed
      </div>
      <div>
        {_calculateCompletionRate()}% completion rate
      </div>
      <div>
        {_calculateTotalTask()} tasks in total
      </div>
      <div>
        <CompletionRateGraph />
      </div>
    </div>
  )
}

export default Analytics