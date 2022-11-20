import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from './firebase';
import './styles/global.scss'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from './interfaces';
import './styles/homepage.scss'
import logo from './images/Routine Tracker.svg'
import backgroundImg from './images/Background Image 2.png'

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

		window.location.href = '/home';
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
		<div className='background'>
			<div className='navbar'>
				<div className='left'>
					<img src={logo} />
					<h1>RouteIn</h1>
				</div>
				<div className='right'>
					<button className='button' onClick={_login}>Log In</button>
				</div>
			</div>
			<div className='heading'>
				<div className='heading-left'>
					<div className='heading-container'>
						<div>
							<h1>You Are What You Repeatedly Do</h1>
							<p>routine tracker and habit builder to get you back on track with your life</p>
						</div>
						<div>
							<button className='button' onClick={_login}>Get Started</button>
						</div>
						<p>created by @limweijen ^_^</p>
					</div>
				</div>
				<img className='bg-img' src={backgroundImg} alt="" />
			</div>
			<div className='divider'></div>
			<footer>
				<div className='socials'>
					<div>Lim Wei Jen</div>
					<div>
						<p>Follow me on <a href="https://www.instagram.com/limweijen96/" target="_blank">Instagram</a></p>
						<br />
						<p>Support me on <a href="https://github.com/LimWeiJen" target="_blank">Github</a></p>
						<br />
						<p>Get in touch with me on <a href="discordapp.com/users/974579792248700938" target="_blank">Discord</a></p>
						<br />
						<div>
							<p>Email</p>
							<p>limweijen96@gmail.com</p>
						</div>
					</div>
				</div>
				<div className='banner'>
					<div className='left'>
						<img src={logo} alt="logo" />
						<div>
							<h1>Route In</h1>
							<p>You Are What You Repeatedly Do</p>
						</div>
					</div>
					<button className='button' onClick={_login}>Get Started</button>
				</div>
			</footer>
		</div>
	)
}

export default App
