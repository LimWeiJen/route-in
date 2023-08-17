import React, { useContext } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { UserContext } from '../contexts/UserContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CompletionRateGraph = () => {
	const userContext = useContext(UserContext);
	const analytics = userContext?.analytics;

	const labels = [];
	for (let i = userContext?.totalDaysPassed || 0; i > 0; i--) {
		if (userContext?.totalDaysPassed! - i === 30) break;
		labels.unshift(`Day ${i}`);
	}
	
	const data = {
		labels,
		datasets: [
			{
				label: 'Completion Rate',
				lineTension: 0.2,
				data: analytics?.completionRateByDay.slice(-30),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			}
		],
	};

	const options = {
		scales: {
			yAxis: {
				min: 0,
				max: 100
			}
		},
	}

  return (
    <div>
	<Line data={data} options={options} />
    </div>
  )
}

export default CompletionRateGraph