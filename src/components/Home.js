import logo from '../logo.svg';
import '../App.css';
import LogoBlue from '../assets/toxic-wave-logo/logo_blue.png';
import LogoBlueGreenGradient from '../assets/toxic-wave-logo/logo_blue_green_gradient.png';
import LogoPinkOrangeGradient from '../assets/toxic-wave-logo/logo_pink_orange_gradient.png';
import LogoWhite from '../assets/toxic-wave-logo/logo_white.png';
import StitchSwatchBlue from '../assets/swatch/swatch_blue.png';
import StitchSwatchBlueGreenGradient from '../assets/swatch/swatch_blue_green_gradient.png';
import StitchSwatchPinkOrangeGradient from '../assets/swatch/swatch_pink_orange_gradient.png';
import StitchSwatchWhite from '../assets/swatch/swatch_white.png';
import HoodieArmy from '../assets/hoodie/hoodie_army.png';
import HoodieBlack from '../assets/hoodie/hoodie_black.png';
import HoodieBlue from '../assets/hoodie/hoodie_blue.png';
import HoodieLavender from '../assets/hoodie/hoodie_lavender.png';
import HoodiePlum from '../assets/hoodie/hoodie_plum.png';
import HoodieYellow from '../assets/hoodie/hoodie_yellow.png';
import { forwardRef, useEffect, useState } from 'react';
import Swatch from './Swatch';
import {
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

import HoodieSwatchArmy from '../assets/hoodie/swatch/army.png';
import HoodieSwatchBlack from '../assets/hoodie/swatch/black.png';
import HoodieSwatchBlue from '../assets/hoodie/swatch/blue.png';
import HoodieSwatchLavender from '../assets/hoodie/swatch/lavender.png';
import HoodieSwatchPlum from '../assets/hoodie/swatch/plum.png';
import HoodieSwatchYellow from '../assets/hoodie/swatch/yellow.png';
import { getMap } from '../fetchit';
import { ThemeProvider } from '@emotion/react';

const Home = () => {
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
		{ logo: HoodieYellow, swatchImage: HoodieSwatchYellow, alt: 'Yellow', order: 5 }
	];

	const sizeSelectionList = [
		{ size: 'S', order: 0 },
		{ size: 'M', order: 1 },
		{ size: 'L', order: 2 },
		{ size: 'XL', order: 3 }
	];

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className='App'>
				<Container maxWidth='xl' sx={{ minHeight: '100%' }}>
					<Stack direction={{ sm: 'column', md: 'row' }} justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
						<div className='hoodie-stitch container'>
							<img className='toxic-wave-logo hoodie-stitch stitch' src={swatchSelectionList[selectedSwatch].logo} alt='Stitch' />
							<img className='hoodie-base hoodie-stitch hoodie' src={hoodieSelectionList[selectedHoodie].logo} alt='Hoodie' />
						</div>

						<div className='swatch-group'>
							<Card raised sx={{ backgroundColor: 'rgb(0,0,0,0.9)', padding: 2 }}>
								<Stack spacing={2}>
									<CardHeader title='Toxic Wave Hoodie - HOME' sx={{ fontWeight: 600 }} />
									<Stack>
										<Typography textAlign='left'>Select your Base - {hoodieSelectionList[selectedHoodie].alt}</Typography>
										<Stack direction='row' justifyContent='space-between'>
											{hoodieSelectionList.map((swatch) => {
												return (
													<Tooltip
														title={swatch.alt}
														enterDelay={1000}
														enterNextDelay={1000}
														disableInteractive={true}
														PopperProps={{
															modifiers: [
																{
																	name: 'offset',
																	options: {
																		offset: [0, -22]
																	}
																}
															]
														}}>
														<IconButton
															sx={{
																borderRadius: 0,
																borderColor: 'primary.main',
																margin: 0,
																padding: 0
															}}>
															<Swatch
																swatchImage={swatch.swatchImage}
																type='color-swatch'
																alt={swatch.alt}
																number={swatch.order}
																selectedSwatch={selectedHoodie}
																setSelectedSwatch={setSelectedHoodie}
															/>
														</IconButton>
													</Tooltip>
												);
											})}
										</Stack>
									</Stack>

									<Stack>
										<Typography textAlign='left'>Select your Stitching - {swatchSelectionList[selectedSwatch].alt}</Typography>
										<Stack direction='row' justifyContent='space-between'>
											{swatchSelectionList.map((swatch) => {
												return (
													<Tooltip
														title={swatch.alt}
														enterDelay={1000}
														enterNextDelay={1000}
														disableInteractive={true}
														PopperProps={{
															modifiers: [
																{
																	name: 'offset',
																	options: {
																		offset: [0, -22]
																	}
																}
															]
														}}>
														<IconButton
															sx={{
																borderRadius: 0,
																borderColor: 'primary.main',
																margin: 0,
																padding: 0
															}}>
															<Swatch
																swatchImage={swatch.swatchImage}
																type='color-swatch'
																alt={swatch.alt}
																number={swatch.order}
																selectedSwatch={selectedSwatch}
																setSelectedSwatch={setSelectedSwatch}
															/>
														</IconButton>
													</Tooltip>
												);
											})}
										</Stack>
									</Stack>

									<Stack>
										<Typography textAlign='left'>Select your Size{selectedSize !== null && ` - ${sizeSelectionList[selectedSize].size}`}</Typography>
										<Stack direction='row' justifyContent='space-between'>
											{sizeSelectionList.map((size, index) => {
												return (
													<Button
														sx={{
															borderRadius: 0,
															margin: '10px 10px 15.5px 10px',
															padding: 0,
															maxWidth: '30px',
															minWidth: '30px',
															maxHeight: '30px',
															minHeight: '30px'
														}}
														variant={selectedSize !== null && sizeSelectionList[selectedSize].order === index ? 'contained' : 'outlined'}
														onClick={() => setSelectedSize(index)}
														color='warning'>
														<Typography>{size.size}</Typography>
													</Button>
												);
											})}
										</Stack>
									</Stack>

									<Stack>
										{/* <Typography textAlign='left'>Select your Quantity</Typography> */}
										<Stack direction='row' justifyContent='space-between' mb={1}>
											<FormControl fullWidth>
												<InputLabel id='quantity-select-label'>Quantity</InputLabel>
												<Select
													labelId='quantity-select-label'
													id='quantity-select'
													value={quantity}
													label='Quantity'
													onChange={(event) => setQuantity(event.target.value)}>
													<MenuItem value={1}>1</MenuItem>
													<MenuItem value={2}>2</MenuItem>
													<MenuItem value={3}>3</MenuItem>
													<MenuItem value={4}>4</MenuItem>
													<MenuItem value={5}>5</MenuItem>
												</Select>
											</FormControl>
										</Stack>
									</Stack>

									<Button variant='contained'>Add to Cart</Button>
								</Stack>
							</Card>
						</div>
					</Stack>
				</Container>
			</div>
		</ThemeProvider>
	);
};

export default Home;
