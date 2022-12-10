import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { CheckCircle, Circle, EyeOff } from 'react-feather'

const Checkbox = ({defaultStatus, taskGroupId, taskIndex}: {defaultStatus: 'checked' | 'unchecked' | 'ignored', taskGroupId: string, taskIndex: number}) => {
	const [status, setStatus] = useState<'checked' | 'unchecked' | 'ignored'>(defaultStatus);

	const userContext = useContext(UserContext);

	const toggleChecked = () => {
		let newStatus = status;
		switch (status) {
			case 'checked':
				setStatus('ignored');
				newStatus = 'ignored'
				break;
		
			case 'unchecked':
				setStatus('checked');
				newStatus = 'checked';
				break;

			case 'ignored':
				setStatus('unchecked');
				newStatus = 'unchecked';
				break;

			default:
				break;
		}
		userContext?.toggleChecked(taskGroupId, taskIndex, newStatus);
	}

	return (
    <div className='btn' onClick={toggleChecked}>
	{status === 'checked' ? <div>
		<CheckCircle className='ico' style={{color: 'green'}} />
	</div> : status === 'unchecked' ? <div>
		<Circle className='ico' />
	</div> : <div>
		<EyeOff className='ico' />
	</div>}
    </div>
  )
}

export default Checkbox