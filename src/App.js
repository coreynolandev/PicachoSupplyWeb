import './App.css';
import { Container, createTheme, CssBaseline, responsiveFontSizes, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ToxicHoodie from './pages/ToxicHoodie';
import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import 'animate.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Shop from './pages/Shop';
import ReviewOrder from './pages/ReviewOrder';
import Checkout from './pages/Checkout';

function App(props) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [colorMode, setColorMode] = useState(prefersDarkMode ? 'dark' : 'light');

	let theme = createTheme({
		palette: {
			mode: 'light',
			background: {
				default: '#f5f5f5'
			}
		},
		typography: {
			fontFamily: ['Raleway', 'sans-serif'].join(','),
			// fontFamily: ['Montserrat', 'sans-serif'].join(','),
			fontSize: 16,
			fontWeightLight: 300,
			fontWeightMedium: 400,
			fontWeightRegular: 500,
			fontWeightBold: 600
		}
	});

	theme = responsiveFontSizes(theme);

	const changeColorMode = () => {
		console.log('changing mode!');
		const newMode = colorMode === 'dark' ? 'light' : 'dark';
		setColorMode(newMode);
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />
		},
		{
			path: 'shop',
			element: <Shop />
		},
		{
			path: 'about-us',
			element: <AboutUs />
		},
		{
			path: 'hoodies',
			element: <ToxicHoodie />
		},
		{
			path: 'review-order',
			element: <ReviewOrder />
		},
		{
			path: 'checkout',
			element: <Checkout />
		}
	]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className='App'>
				<Navbar changeColorMode={changeColorMode} mode={colorMode} />
				<div className='App-content'>
					<Container disableGutters maxWidth='false' sx={{ minHeight: '100%' }}>
						{/* <Container disableGutters maxWidth='xl' sx={{ minHeight: '100%' }}> */}
						<RouterProvider router={router} />
					</Container>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
