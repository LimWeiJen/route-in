import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from './firebase';
import './App.css'

function App() {
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
