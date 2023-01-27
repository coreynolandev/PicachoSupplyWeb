import './App.css';
import { Container, createTheme, CssBaseline, responsiveFontSizes, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import LifestyleHoodie from './pages/LifestyleHoodie';
import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import 'animate.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Shop from './pages/Shop';
import ReviewOrder from './pages/ReviewOrder';
import Checkout from './pages/Checkout';
import Completed from './pages/Completed';
import Subscribe from './pages/Subscribe';
import ErrorPage from './pages/ErrorPage';
import ExplorerHat from './pages/ExplorerHat';
import { useSelector } from 'react-redux';
// import { getLists } from './api/mailchimpActions';

function App(props) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [colorMode, setColorMode] = useState(prefersDarkMode ? 'dark' : 'light');

	// getLists();

	let theme = createTheme({
		palette: {
			mode: 'light',
			background: {
				default: '#f5f5f5'
			},
			primary: {
				// navy blue
				// main: '#171612',
				main: '#14264E'
			},
			secondary: {
				main: '#FFBD29'
			},
			warning: {
				main: '#171612'
			},
			done: {
				main: '#000000'
			},
			edit: {
				main: '#FFBD29',
				contrastText: '#000000'
			},
			viewEmbroidery: {
				main: '#171612',
				contrastText: '#ffffff'
			},
			viewHoodie: {
				main: '#4a473a',
				contrastText: '#ffffff'
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

	var shippingAndHandlingCost = useSelector((state) => state.cart.shippingAndHandlingCost);

	const CheckoutThing = () => {
		return <Checkout shippingAndHandlingCost={shippingAndHandlingCost} />;
	};

	const ReviewThing = () => {
		return <ReviewOrder shippingAndHandlingCost={shippingAndHandlingCost} />;
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
			errorElement: <ErrorPage />
		},
		{
			path: 'shop',
			element: <Shop />,
			errorElement: <ErrorPage />
		},
		{
			path: 'about-us',
			element: <AboutUs />,
			errorElement: <ErrorPage />
		},
		{
			path: 'hoodies',
			element: <LifestyleHoodie />,
			errorElement: <ErrorPage />
		},
		{
			path: 'explorer-hat',
			element: <ExplorerHat />,
			errorElement: <ErrorPage />
		},
		{
			path: 'review-order',
			element: ReviewThing(),
			errorElement: <ErrorPage />
		},
		{
			path: 'checkout',
			element: CheckoutThing(),
			errorElement: <ErrorPage />
		},
		{
			path: 'completed',
			element: <Completed />,
			errorElement: <ErrorPage />
		},
		{
			path: 'subscribe',
			element: <Subscribe />,
			errorElement: <ErrorPage />
		}
	]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className='App'>
				<Navbar changeColorMode={changeColorMode} mode={colorMode} />
				<div className='App-content'>
					<Container disableGutters maxWidth='false' sx={{ minHeight: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
						{/* <Container disableGutters maxWidth='xl' sx={{ minHeight: '100%' }}> */}
						<RouterProvider router={router} />

						{/* <Outlet /> */}
					</Container>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
