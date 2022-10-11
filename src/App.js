import logo from './logo.svg';
import './App.css';
import LogoBlue from './assets/toxic-wave-logo/logo_blue.png';
import LogoBlueGreenGradient from './assets/toxic-wave-logo/logo_blue_green_gradient.png';
import LogoPinkOrangeGradient from './assets/toxic-wave-logo/logo_pink_orange_gradient.png';
import LogoWhite from './assets/toxic-wave-logo/logo_white.png';
import StitchSwatchBlue from './assets/swatch/swatch_blue.png';
import StitchSwatchBlueGreenGradient from './assets/swatch/swatch_blue_green_gradient.png';
import StitchSwatchPinkOrangeGradient from './assets/swatch/swatch_pink_orange_gradient.png';
import StitchSwatchWhite from './assets/swatch/swatch_white.png';
import HoodieArmy from './assets/hoodie/hoodie_army.png';
import HoodieBlack from './assets/hoodie/hoodie_black.png';
import HoodieBlue from './assets/hoodie/hoodie_blue.png';
import HoodieLavender from './assets/hoodie/hoodie_lavender.png';
import HoodiePlum from './assets/hoodie/hoodie_plum.png';
import HoodieYellow from './assets/hoodie/hoodie_yellow.png';
import { forwardRef, useEffect, useState } from 'react';
import Swatch from './components/Swatch';
import {
	Box,
	Button,
	Card,
	CardHeader,
	Container,
	createTheme,
	CssBaseline,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	responsiveFontSizes,
	Select,
	Stack,
	StepButton,
	Tooltip,
	Typography,
	useMediaQuery
} from '@mui/material';

import HoodieSwatchArmy from './assets/hoodie/swatch/army.png';
import HoodieSwatchBlack from './assets/hoodie/swatch/black.png';
import HoodieSwatchBlue from './assets/hoodie/swatch/blue.png';
import HoodieSwatchLavender from './assets/hoodie/swatch/lavender.png';
import HoodieSwatchPlum from './assets/hoodie/swatch/plum.png';
import HoodieSwatchYellow from './assets/hoodie/swatch/yellow.png';
import { getMap } from './fetchit';
import { ThemeProvider } from '@emotion/react';
import Home from './components/Home';

import desktopImage from './mountain_bg2.jpg';
import mobileImage from './mountain_bg3.jpg';
import HoodieSelectionAccordion from './components/HoodieSelectionAccordion';
import MyNewAccordion from './components/MyNewAccordion';
import ToxicHoodie from './pages/ToxicHoodie';

// import { Swatch } from '@sajari/react-components';

function App() {
	const [selectedSwatch, setSelectedSwatch] = useState(0);
	const [selectedHoodie, setSelectedHoodie] = useState(0);
	const [selectedSize, setSelectedSize] = useState(null);
	const [quantity, setQuantity] = useState(1);

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [colorMode, setColorMode] = useState('dark');

	useEffect(() => {
		setColorMode(prefersDarkMode ? 'dark' : 'light');
	}, []);

	let theme = createTheme({
		palette: {
			mode: colorMode
		},
		typography: {
			fontFamily: ['Catamaran', 'sans-serif'].join(','),
			fontSize: 16,
			fontWeightLight: 300,
			fontWeightMedium: 400,
			fontWeightRegular: 500,
			fontWeightBold: 600
		}
	});
	// fontFamily: ['Catamaran', 'sans-serif'].join(',')
	theme = responsiveFontSizes(theme);

	const changeColorMode = () => {
		console.log('changing mode!');
		const newMode = colorMode === 'dark' ? 'light' : 'dark';
		setColorMode(newMode);
	};

	const swatchSelectionList = [
		{ logo: LogoBlue, swatchImage: StitchSwatchBlue, alt: 'Blue', order: 0 },
		{ logo: LogoBlueGreenGradient, swatchImage: StitchSwatchBlueGreenGradient, alt: 'Blue / Green', order: 1 },
		{ logo: LogoPinkOrangeGradient, swatchImage: StitchSwatchPinkOrangeGradient, alt: 'Pink  / Orange', order: 2 },
		{ logo: LogoWhite, swatchImage: StitchSwatchWhite, alt: 'White', order: 3 }
	];

	const hoodieSelectionList = [
		{ logo: HoodieArmy, swatchImage: HoodieSwatchArmy, alt: 'Army', order: 0 },
		{ logo: HoodieBlack, swatchImage: HoodieSwatchBlack, alt: 'Black', order: 1 },
		{ logo: HoodieBlue, swatchImage: HoodieSwatchBlue, alt: 'Blue', order: 2 },
		{ logo: HoodieLavender, swatchImage: HoodieSwatchLavender, alt: 'Lavender', order: 3 },
		{ logo: HoodiePlum, swatchImage: HoodieSwatchPlum, alt: 'Plum', order: 4 },
		{ logo: HoodieYellow, swatchImage: HoodieSwatchYellow, alt: 'Yellow', order: 5 },
		{ logo: HoodieYellow, swatchImage: HoodieSwatchYellow, alt: 'Yellow', order: 6 }
	];

	const sizeSelectionList = [
		{ size: 'S', order: 0 },
		{ size: 'M', order: 1 },
		{ size: 'L', order: 2 },
		{ size: 'XL', order: 3 }
	];

	// const imageUrl = window.innerWidth >= 650 ? desktopImage : mobileImage;

	return (
		<ThemeProvider theme={theme}>
			{/* <Home /> */}
			<CssBaseline />
			<div className='App'>
				{/* <div className='App' style={{ backgroundImage: `url(${imageUrl})` }}> */}
				<div className='App-content'>
					<Container maxWidth='xl' sx={{ minHeight: '100%' }}>
						<ToxicHoodie />
					</Container>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
