import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import CompletionRateGraph from './CompletionRateGraph';
import { Book, Calendar, CheckCircle } from 'react-feather'
import '../styles/analytics.scss'

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
    <div className='wrapper analytics-wrapper'>
      <div className='top'>
        <div className='container'>
          <p style={{color: '#1270B0'}}><h1>{userContext?.totalDaysPassed}</h1><br /> days passed</p>
          <Calendar style={{color: '#17A1FA'}}/>
        </div>
        <div className='container' style={{color: '#17B026'}}>
          <p><h1>{_calculateCompletionRate()}%</h1><br /> completion rate</p>
          <CheckCircle />
        </div>
        <div className='container' style={{color: '#AE0F52'}}>
          <p><h1>{_calculateTotalTask()}</h1><br /> tasks in total</p>
          <Book />
        </div>
      </div>
      <div className='container'>
        <CompletionRateGraph />
      </div>
    </div>
  )
}

export default Analytics