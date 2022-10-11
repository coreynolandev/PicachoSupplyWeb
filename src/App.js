import './App.css';
import { Container, createTheme, CssBaseline, responsiveFontSizes, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ToxicHoodie from './pages/ToxicHoodie';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [colorMode, setColorMode] = useState(prefersDarkMode ? 'dark' : 'light');

	// useEffect(() => {
	// 	setColorMode(prefersDarkMode ? 'dark' : 'light');
	// }, []);

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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Navbar changeColorMode={changeColorMode} mode={colorMode} />
			<div className='App'>
				<div className='App-content'>
					<Container maxWidth='xl' sx={{ minHeight: '100%' }}>
						<ToxicHoodie mode={colorMode} />
					</Container>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
