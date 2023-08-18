import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from './firebase';
import './styles/global.scss'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './styles/homepage.scss'
import logo from './images/Routine Tracker.svg'
import { defaultUserObject } from './constants/defaultUserObjectData';

function App() {
	auth.onAuthStateChanged(async (user) => {
		if (!user) return;

		// get user doc
		const userDoc = await getDoc(doc(db, 'users', user.uid));
	
		// if the doc does not exist, create a new doc for the user
		if (!userDoc.exists()) {
			// add the user object to user doc
			await setDoc(doc(db, 'users', user.uid), defaultUserObject);
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
					<img alt='logo' src={logo} />
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
							<h1>Route In</h1>
							<p>Routine tracker and habit builder to get you back on track with your life</p>
						</div>
						<div>
							<button className='button' onClick={_login}>Get Started</button>
						</div>
						<p className='credit'>created by @limweijen ^_^</p>
					</div>
				</div>
				<div className='circles'>
					<div className='circle' style={{top: '1rem', left: '-1rem', width: '5rem', height: '5rem'}}></div>
					<div className='circle' style={{top: '-2rem', left: '14rem', width: '6rem', height: '6rem'}}></div>
					<div className='circle' style={{top: '10rem', left: '20rem', width: '10rem', height: '10rem'}}></div>
					<div className='circle' style={{top: '15rem', left: '-10rem', width: '3rem', height: '3rem'}}></div>
					<div className='circle' style={{top: '19rem', left: '-39rem', width: '4rem', height: '4rem'}}></div>
					<div className='circle' style={{top: '7rem', left: '1rem', width: '2rem', height: '2rem'}}></div>
					<div className='circle' style={{top: '16rem', left: '-29rem', width: '4rem', height: '4rem'}}></div>
					<div className='circle' style={{top: '21rem', left: '-19rem', width: '8rem', height: '8rem'}}></div>
					<div className='circle' style={{top: '14rem', left: '-10rem', width: '54rem', height: '54rem'}}></div>
					<div className='circle' style={{top: '5rem', left: '-22rem', width: '7rem', height: '7rem'}}></div>
					<div className='circle' style={{top: '1rem', left: '-15rem', width: '5rem', height: '5rem'}}></div>
				</div>
			</div>
			<div className='divider'></div>
			<footer>
				<div className='socials'>
					<div>Lim Wei Jen</div>
					<div>
						<p>Follow me on <a rel='noreferrer' href="https://www.instagram.com/limweijen96/" target="_blank">Instagram</a></p>
						<br />
						<p>Support me on <a rel='noreferrer' href="https://github.com/LimWeiJen" target="_blank">Github</a></p>
						<br />
						<p>Get in touch with me on <a rel='noreferrer' href="discordapp.com/users/974579792248700938" target="_blank">Discord</a></p>
						<br />
						<div>
							<p>Email</p>
							<p>limweijen96@gmail.com</p>
						</div>
					</div>
				</div>
				<div className='banner'>
					<div className='banner-left'>
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