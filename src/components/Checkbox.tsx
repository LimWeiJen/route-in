import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { CheckCircle, Circle } from 'react-feather'

const Checkbox = ({defaultChecked, taskGroupId, taskIndex}: {defaultChecked: boolean, taskGroupId: string, taskIndex: number}) => {
	const [checked, setChecked] = useState(defaultChecked)

	const userContext = useContext(UserContext);

	const toggleChecked = () => {
		userContext?.toggleChecked(taskGroupId, taskIndex, !checked);
		setChecked(!checked);
	}

	return (
    <div className='btn' onClick={toggleChecked}>
	{checked ? <div>
		<CheckCircle className='ico' style={{color: 'green'}} />
	</div> : <div>
		<Circle className='ico' />
	</div>}
    </div>
  )
}

export default Checkbox