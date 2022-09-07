import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from './firebase';
import './App.css'
import { useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from './interfaces';

function App() {
	auth.onAuthStateChanged((user) => {
		if (!user) return;

		// get user doc
		getDoc(doc(db, 'users', user.uid)).then((res) => {
	
			// if the doc does not exist, create a new doc for the user
			if (!res.exists()) {
				
				// initialize a default user object
				const newUser: User = {
					taskGroups: [],
					analytics: {
						dateOfCreation: new Date(),
						totalTasks: 0,
						completionRateByDay: []
					}
				}
	
				// add the user object to user doc
				setDoc(doc(db, 'users', user.uid), newUser);
			}
	
			location.href = '/home';
		})
	})


	const login = () => {
		signInWithPopup(auth, new GoogleAuthProvider());
	}

	return (
		<div>
			<button onClick={login}>sign in</button>
		</div>
	)
}

export default App
