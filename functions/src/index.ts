/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


import { schedule } from "firebase-functions/v1/pubsub";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { auth, db } from './firebase';
import { signInAnonymously } from "@firebase/auth";
import { User } from './interfaces';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const updateUsersData = async () => {
  const usersDoc = await getDocs(collection(db, 'users'));
  const users: any = [];
  const userIds: any = [];
  const todaysDay = new Date().getDay();

  usersDoc.forEach(user => {
    userIds.push(user.id);
    users.push(user.data());
  })


  users.forEach(async (user: User, i: number) => {
    let totalTaskCompleted = 0;
    let totalTasks = 0;

    user.taskGroups.forEach(taskGroup => {
      const taskGroupAppearanceDay = taskGroup.dayOfAppearance.flatMap((bool, index) => bool ? index : []);
      if (taskGroupAppearanceDay.includes(todaysDay)) {
        taskGroup.tasks.forEach(task => {
          if (task.status !== 'ignored') {
            totalTasks++;
            task.totalDay++;
            if (task.status === 'checked') {
              task.totalCompletionDay++;
              totalTaskCompleted++;
            }
          }
          task.status = 'unchecked';
        })
      }
      taskGroup.tasks.forEach(task => {
        task.status = 'unchecked';
      })
    })

    if (totalTasks === 0 && totalTaskCompleted === 0) user.analytics.completionRateByDay.push(100);
    else {
      if (totalTasks === 0) totalTasks = 1;
      user.analytics.completionRateByDay.push(totalTaskCompleted / totalTasks * 100);
    }

    user.lastLogInDay = diffBtwDates(new Date(user.analytics.dateOfCreation), new Date());

    await setDoc(doc(db, 'users', userIds[i]), user)
  })
};

const diffBtwDates = (date1: Date, date2: Date) => {
	if (!date1) return 0;
	const diff = Math.abs(date2.getTime() - new Date(date1).getTime());
	return Math.ceil(diff / (1000 * 3600 * 24));
}

export const refreshFunction = schedule('0 0 * * *').timeZone('SGT').onRun(async (context) => {
	await signInAnonymously(auth);
	await updateUsersData();
})
