import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from './firebase';
import './App.css'
import { useEffect } from 'react';

function App() {
	useEffect(() => { if (auth.currentUser) location.href = '/home' });

	const signIn = () => {
		signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
			location.href = '/home';
		});
	}

	return (
		<div>
			<button onClick={signIn}>sign in</button>
		</div>
	)
}

export default App
