import React from 'react'
import { TaskGroup } from '../interfaces'

const TaskGroupEdit = ({data}: {data: TaskGroup}) => {
  return (
    <div>
      {data.name}
      {data.id}
    </div>
  )
}

export default TaskGroupEdit