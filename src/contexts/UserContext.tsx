import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { createContext, useState } from 'react'
import { v4 } from 'uuid';
import { auth, db } from '../firebase';
import { Analytics, Styles, Task, TaskGroup, User, UserContextInterface } from '../interfaces';

export const UserContext = createContext<UserContextInterface | null>(null);

export const UserProvider = ({children}: any) => {
  const [taskGroups, setTaskGroups] = useState<Array<TaskGroup>>();
  const [analytics, setAnalytics] = useState<Analytics>();
  const [totalDaysPassed, setTotalDaysPassed] = useState(0);
  const [isBusy, setIsBusy] = useState(true);
  const [styles, setStyles] = useState<Styles>({
    taskGroupsDisplay: 'row',
    theme: 'light'
  });

  // gets the user's data when the user is signed in
  auth.onAuthStateChanged(async (user) => {
    if (!user || taskGroups || analytics) return;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    let userData: User = JSON.parse(JSON.stringify(userDoc.data()));

    setIsBusy(false);
    setTotalDaysPassed(userData.lastLogInDay);
    setTaskGroups(userData.taskGroups);
    setAnalytics(userData.analytics);
    setStyles(userData.styles);
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
      name: 'sample task group',
      tasks: [],
      dayOfAppearance: [true, true, true, true, true, true, true],
      color: '#0f0f0f'
    }

    // add the new empty task to the task group
    const newTaskGroups = taskGroups;
    newTaskGroups?.push(emptyTaskGroup);
    setTaskGroups(newTaskGroups);

    // update the document
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      taskGroups: newTaskGroups
    });

    window.location.href = '/settings'
  }

  /**
   * @desc checks or unchecks a specified task in a task group
   * 
   * @param taskGroupId the id of the task group to be modified
   * @param taskIndex the index of the task in the task group to be modified
   * @param checked the new value of checked for the task
   * @returns void
   */
  const toggleChecked = async (taskGroupId: string, taskIndex: number, newStatus: 'checked' | 'unchecked' | 'ignored') => {
    if (!auth.currentUser) return;

    taskGroups!.forEach((taskGroup) => {
      if (taskGroup.id === taskGroupId) {
        taskGroup.tasks[taskIndex].status = newStatus;
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

    let newStyles = styles;
    newStyles!.theme = newTheme;

    await updateDoc(doc(db, 'users', auth.currentUser.uid), { styles: newStyles });
    window.location.reload();
  }

  /**
   * @desc switch the user's preferred task groups display
   * 
   * @param newDisplay the new display set by the user
   * @returns void
   */
  const switchTaskGroupsDisplay = async (newDisplay: 'grid' | 'row') => {
    if (!auth.currentUser) return;

    let newStyles = styles;
    newStyles!.taskGroupsDisplay = newDisplay;

    await updateDoc(doc(db, 'users', auth.currentUser.uid), { styles: newStyles });
    window.location.reload();
  }

  /**
   * @desc deletes all the user's task groups
   * 
   * @returns void
   */
  const deleteAllTasks = async () => {
    if (!window.confirm("This will delete all your tasks and all the completion records of your task. This action is irreversible. Are you sure?")) return;
    if (!auth.currentUser) return;
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      lastLogInDay: 0,
      taskGroups: [],
      analytics: {
        dateOfCreation: new Date().getTime(),
        completionRateByDay: []
      }
    })

    window.location.href = '/home';
  }

  /**
   * @desc deletes all the user's completion records
   * 
   * @returns void
   */
  const resetAllRecords = async () => {
    if (!window.confirm("This will delete all the completion records of your task. This action is irreversible. Are you sure?")) return;
    if (!auth.currentUser) return;

    taskGroups?.forEach(taskGroup => {
      taskGroup.tasks.forEach(task => {
        task.totalDay = 0;
        task.totalCompletionDay = 0;
      })
    })

    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      taskGroups,
      lastLogInDay: 0,
      analytics: {
        dateOfCreation: new Date().getTime(),
        completionRateByDay: []
      }
    })

    window.location.href = '/profile'
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
      styles,
      switchTheme,
      deleteAllTasks,
      resetAllRecords,
      isBusy,
      switchTaskGroupsDisplay
    }}>
      {children}
    </UserContext.Provider>
  )
}