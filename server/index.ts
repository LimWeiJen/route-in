import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from './firebase';
import { User } from './interfaces';
import express from 'express'

const app = express();

let updatedUserData = false;

const updateUsersData = async () => {
  const usersDoc = await getDocs(collection(db, 'users'));
  const users: Array<User> = [];
  const userIds: Array<string> = [];
  const todaysDay = new Date().getDay();

  usersDoc.forEach(user => {
    userIds.push(user.id);
    users.push(user.data());
  })


  users.forEach(async (user, i) => {
    let totalTaskCompleted = 0;
    let totalTasks = 0;

    user.taskGroups.forEach(taskGroup => {
      const taskGroupAppearanceDay = taskGroup.dayOfAppearance.flatMap((bool, index) => bool ? index : []);
      if (taskGroupAppearanceDay.includes(todaysDay)) {
        totalTasks += taskGroup.tasks.length;
        taskGroup.tasks.forEach(task => {
          if (task.checked === true) totalTaskCompleted++;
          task.checked = false;
        })
      }
    })

    if (totalTasks === 0) totalTasks = 1;
    user.analytics.completionRateByDay.push(totalTaskCompleted / totalTasks * 100);

    user.lastLogInDay = diffBtwDates(new Date(user.analytics.dateOfCreation), new Date());

    await setDoc(doc(db, 'users', userIds[i]), user)
  })
};

const diffBtwDates = (date1: Date, date2: Date) => {
  if (!date1) return 0;
  const diff = Math.abs(date2.getTime() - new Date(date1).getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
}

setInterval(() => {
  // if it is time to send trivia
  if (new Date().getUTCHours() === 0 && !updatedUserData) {
    updateUsersData().then(() => {
      console.log('success')
      updatedUserData = true;
    })
  } else {
    updatedUserData = false;
  }
}, 6000);

app.get('/', (req, res) => res.send('hello world'))

app.listen(3000, () => console.log('server running'))