import logo from './logo.svg';
import './App.css';
import BlackPink from './assets/BlackPink';
import BlueDarkBlueGradient from './assets/BlueDarkBlueGradient';
import GreenBlueGradient from './assets/GreenBlueGradient';
import LightBlue from './assets/LightBlue';
import PinkGradient from './assets/PinkGradient';
import PinkOrangeGradient from './assets/PinkOrangeGradient';
import PinkYellowGradient from './assets/PinkYellowGradient';
import WhiteBlack from './assets/WhiteBlack';
import YellowBlack from './assets/YellowBlack';
import mainLogo from './assets/new.png';

import { ReactComponent as NewOne } from './assets/ne2w.svg';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
					{/* <span dangerouslySetInnerHTML={{ __html: '<svg>...</svg>' }} />; Learn React */}
				</a>

				<BlackPink />
				<BlueDarkBlueGradient />
				<GreenBlueGradient />
				<LightBlue />
				<PinkGradient />
				<PinkOrangeGradient />
				<PinkYellowGradient />
				<WhiteBlack />
				<YellowBlack />
				<NewOne />
				<div className='container'>
					<img src={mainLogo} alt='fire' />
				</div>
				<img src='./assets/new.png' alt='corey'></img>
			</header>
		</div>
	);
}

export default App;
