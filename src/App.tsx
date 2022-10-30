import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from './firebase';
import './styles/global.scss'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from './interfaces';

function App() {
	auth.onAuthStateChanged(async (user) => {
		if (!user) return;

		// get user doc
		const userDoc = await getDoc(doc(db, 'users', user.uid));
	
		// if the doc does not exist, create a new doc for the user
		if (!userDoc.exists()) {
			
			// initialize a default user object
			const newUser: User = {
				lastLogInDay: 0,
				theme: 'light',
				taskGroups: [],
				analytics: {
					dateOfCreation: new Date().getTime(),
					completionRateByDay: []
				}
			}

			// add the user object to user doc
			await setDoc(doc(db, 'users', user.uid), newUser);
		}

		location.href = '/home';
	})

	/**
	 * @desc logs the user into the website
	 * 
	 * @returns void
	 */
	const _login = () => {
		signInWithPopup(auth, new GoogleAuthProvider());
	}

	return (
		<div>
			<button onClick={_login}>sign in</button>
		</div>
	)
}

export default App
