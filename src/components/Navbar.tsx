import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import React from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { TaskGroup, User } from '../interfaces'
import { v4 } from 'uuid'

const Navbar = () => {
  const logout = () => {
    signOut(auth).then(() => location.href = '/');
  }

  const addNewTaskGroup = async () => {
    if (!auth.currentUser) return Error("unable to fetch user's auth data");
    
    // get user doc
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    const userData: User = JSON.parse(JSON.stringify(userDoc.data()));
    
    // initialize an empty task group
    const emptyTaskGroup: TaskGroup = {
      id: v4(),
      name: '',
      tasks: [],
      dayOfAppearance: [false, false, false, false, false, false, false]
    }

    // increment total tasks of user
    userData.analytics.totalTasks++;

    // add empty task group to task groups
    userData.taskGroups.push(emptyTaskGroup);

    await updateDoc(doc(db, 'users', auth.currentUser.uid), JSON.parse(JSON.stringify(userData)));

    location.href = `edit-tasks/${emptyTaskGroup.id}`
  }

  return (
    <div>
      <button onClick={logout}>sign out</button>
      <button onClick={addNewTaskGroup}>new task group</button>
    </div>
  )
}

export default Navbar