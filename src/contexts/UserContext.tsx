import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { createContext, useState } from 'react'
import { v4 } from 'uuid';
import { auth, db } from '../firebase';
import { Analytics, Task, TaskGroup, User, UserContextInterface } from '../interfaces';

export const UserContext = createContext<UserContextInterface | null>(null);

export const UserProvider = ({children}: any) => {
  const [taskGroups, setTaskGroups] = useState<Array<TaskGroup>>();
  const [analytics, setAnalytics] = useState<Analytics>();
  const [totalDaysPassed, setTotalDaysPassed] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // gets the user's data when the user is signed in
  auth.onAuthStateChanged(async (user) => {
    if (!user || taskGroups || analytics) return;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    let userData: User = JSON.parse(JSON.stringify(userDoc.data()));
    setTotalDaysPassed(userData.lastLogInDay);
    setTaskGroups(userData.taskGroups);
    setAnalytics(userData.analytics);
    setTheme(userData.theme);
  })
  
  /**
   * @desc deletes a task group
   * 
   * @param taskGroupId the id of the task group to be deleted
   * 
   * @returns void
   */
  const deleteTaskGroup = async (taskGroupId: string) => {
    if (!auth.currentUser) return;
    
    // filter the task group so that the task group with the id specified is not included
    const newTaskGroups = taskGroups?.filter(taskGroup => taskGroup.id !== taskGroupId);

    // update the user document
    await updateDoc(doc(db, 'users', auth.currentUser.uid), JSON.parse(JSON.stringify({
      taskGroups: newTaskGroups
    })));

    window.location.reload();
  }
 
  /**
   * @desc saves a task group after it is modified by the user
   * 
   * @param taskGroupId the id of the task group to be saved
   * @param newDayOfAppearance the new day of appearance for the task group set by the user
   * @param newName the new name for the task group set by the user
   * @param newTasks the new tasks in the task group set by the user
   * 
   * @returns void
   */
  const saveTaskGroup = async (taskGroupId: string, newDayOfAppearance: Array<boolean>, newName: string, newTasks: Array<Task>, newColor: string) => {
    if (!auth.currentUser) return;

    // find the task group specified by the id and update it
    taskGroups!.forEach((taskGroup) => {
      if (taskGroup.id === taskGroupId) {
        taskGroup.dayOfAppearance = newDayOfAppearance;
        taskGroup.name = newName;
        taskGroup.tasks = newTasks;
        taskGroup.color = newColor;
      }
    })

    // update the user document
    await updateDoc(doc(db, 'users', auth.currentUser.uid), { taskGroups });
    window.location.href = '/home';
  }

  /**
   * @desc adds a new empty task group
   * 
   * @returns void
   */
  const addNewTaskGroup = async () => {
    if (!auth.currentUser) return;
    
    // initialize an empty task group
    const emptyTaskGroup: TaskGroup = {
      id: v4(),
      name: '',
      tasks: [],
      dayOfAppearance: [false, false, false, false, false, false, false],
      color: '#fff'
    }

    // add the new empty task to the task group
    const newTaskGroups = taskGroups;
    newTaskGroups?.push(emptyTaskGroup);
    setTaskGroups(newTaskGroups);

    // update the document
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      taskGroups: newTaskGroups
    });

    window.location.href = `edit-tasks/${emptyTaskGroup.id}`
  }

  /**
   * @desc checks or unchecks a specified task in a task group
   * 
   * @param taskGroupId the id of the task group to be modified
   * @param taskIndex the index of the task in the task group to be modified
   * @param checked the new value of checked for the task
   * @returns void
   */
  const toggleChecked = async (taskGroupId: string, taskIndex: number, checked: boolean) => {
    if (!auth.currentUser) return;

    taskGroups!.forEach((taskGroup) => {
      if (taskGroup.id === taskGroupId) {
        taskGroup.tasks[taskIndex].checked = checked;
      }
    })

    await updateDoc(doc(db, 'users', auth.currentUser.uid), { taskGroups });
  }

  /**
   * @desc switch the user's preferred theme
   * 
   * @param newTheme the new theme set by the user
   * @returns void
   */
  const switchTheme = async (newTheme: 'light' | 'dark') => {
    if (!auth.currentUser) return;
    setTheme(newTheme);
    await updateDoc(doc(db, 'users', auth.currentUser.uid), { theme: newTheme });
  }

  return (
    <UserContext.Provider value={{
      taskGroups,
      analytics,
      deleteTaskGroup,
      saveTaskGroup,
      addNewTaskGroup,
      toggleChecked,
      totalDaysPassed,
      theme,
      switchTheme,
    }}>
      {children}
    </UserContext.Provider>
  )
}