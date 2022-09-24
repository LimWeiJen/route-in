import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { createContext, useState } from 'react'
import { auth, db } from '../firebase';
import { Task, TaskGroup, User, UserContextInterface } from '../interfaces';

export const UserContext = createContext<UserContextInterface | null>(null);

export const UserProvider = ({children}: any) => {
  const [taskGroups, setTaskGroups] = useState<Array<TaskGroup>>();

  auth.onAuthStateChanged(async (user) => {
    if (!user) return;

    // get user data
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData: User = JSON.parse(JSON.stringify(userDoc.data()));

    // get all user's task groups
    setTaskGroups(userData.taskGroups);
  })
  
  const deleteTaskGroup = async (taskGroupId: string) => {
    if (!auth.currentUser) return;

    const newTaskGroups = taskGroups?.filter(taskGroup => taskGroup.id !== taskGroupId);
    
    // get user data
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    const userData: User = JSON.parse(JSON.stringify(userDoc.data()));
    userData.taskGroups = newTaskGroups!;

    await updateDoc(doc(db, 'users', auth.currentUser.uid), JSON.parse(JSON.stringify(userData)));
  }
 
  const saveTaskGroup = async (taskGroupId: string, newDayOfAppearance: Array<boolean>, newName: string, newTasks: Array<Task>) => {
    if (!auth.currentUser) return;

    // update the task group
    taskGroups!.forEach((taskGroup) => {
      if (taskGroup.id === taskGroupId) {
        taskGroup.dayOfAppearance = newDayOfAppearance;
        taskGroup.name = newName;
        taskGroup.tasks = newTasks;
      }
    })

    // update the user document
    await updateDoc(doc(db, 'users', auth.currentUser.uid), { taskGroups });
    location.href = '/home';
  }

  return (
    <UserContext.Provider value={{
      taskGroups,
      deleteTaskGroup,
      saveTaskGroup
    }}>
      {children}
    </UserContext.Provider>
  )
}