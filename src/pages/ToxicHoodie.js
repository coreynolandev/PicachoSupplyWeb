import { useEffect, useState } from 'react';
import LogoBlue from '../assets/toxic-wave-logo/logo_blue.png';
import LogoBlueGreenGradient from '../assets/toxic-wave-logo/logo_blue_green_gradient.png';
import LogoPinkOrangeGradient from '../assets/toxic-wave-logo/logo_pink_orange_gradient.png';
import LogoWhite from '../assets/toxic-wave-logo/logo_white.png';
import StitchSwatchBlue from '../assets/swatch/swatch_blue.png';
import StitchSwatchBlueGreenGradient from '../assets/swatch/swatch_blue_green_gradient.png';
import StitchSwatchPinkOrangeGradient from '../assets/swatch/swatch_pink_orange_gradient.png';
import StitchSwatchWhite from '../assets/swatch/swatch_white.png';
// import HoodieBlank from '../assets/hoodie/hoodie_blank.png';
import HoodieBlank from '../assets/build_adventure.png';
import HoodieArmy from '../assets/hoodie/hoodie_army.png';
import HoodieBlack from '../assets/hoodie/hoodie_black.png';
import HoodieBlue from '../assets/hoodie/hoodie_blue.png';
import HoodieLavender from '../assets/hoodie/hoodie_lavender.png';
import HoodiePlum from '../assets/hoodie/hoodie_plum.png';
import HoodieYellow from '../assets/hoodie/hoodie_yellow.png';
import { Box, Button, Card, CardHeader, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';

import HoodieSwatchArmy from '../assets/hoodie/swatch/army.png';
import HoodieSwatchBlack from '../assets/hoodie/swatch/black.png';
import HoodieSwatchBlue from '../assets/hoodie/swatch/blue.png';
import HoodieSwatchLavender from '../assets/hoodie/swatch/lavender.png';
import HoodieSwatchPlum from '../assets/hoodie/swatch/plum.png';
import HoodieSwatchYellow from '../assets/hoodie/swatch/yellow.png';
import HoodieSelectionAccordion from '../components/accordion/HoodieSelectionAccordion';
import BorderSelectionAccordion from '../components/accordion/BorderSelectionAccordion';
import StitchFillSelectionAccordion from '../components/accordion/StitchFillSelectionAccordion';
import BorderWhite from '../assets/border/border_white.png';
import BorderNavy from '../assets/border/border_navy.png';
import BorderBlack from '../assets/border/border_black.png';
import FillWhite from '../assets/solid-fill/fill_white.png';
import StitchBorderSwatchBlue from '../assets/swatch/swatch_blue.png';
import StitchBorderSwatchBlack from '../assets/hoodie/swatch/black.png';
import StitchBorderSwatchWhite from '../assets/swatch/swatch_white.png';
import SizeSelectionAccordion from '../components/accordion/SizeSelectionAccordion';
import { Clear, Refresh, Shuffle } from '@mui/icons-material';
import { HOODIE_SELECTION_LIST } from '../components/toxic-build/Hoodies';
import { BORDERS_SELECTION_LIST } from '../components/toxic-build/Borders';
import { FILLS_SELECTION_LIST, GRADIENTS_SELECTION_LIST } from '../components/toxic-build/Fills';

const hoodieSelectionList = HOODIE_SELECTION_LIST;
const borderSelectionList = BORDERS_SELECTION_LIST;
const stitchFillSelectionList = FILLS_SELECTION_LIST;
const stitchGradientSelectionList = GRADIENTS_SELECTION_LIST;

const sizeSelectionList = [
	{ size: 'S', order: 0 },
	{ size: 'M', order: 1 },
	{ size: 'L', order: 2 },
	{ size: 'XL', order: 3 }
];

const ToxicHoodie = ({ mode }) => {
	const [expanded, setExpanded] = useState(1);
	const [selectedHoodie, setSelectedHoodie] = useState(null);
	const [selectedBorder, setSelectedBorder] = useState(null);
	const [selectedStitchFill, setSelectedStitchFill] = useState({ fill: null, gradient: null });
	const [patternType, setPatternType] = useState('fill');
	const [selectedSize, setSelectedSize] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [orderMaterials, setOrderMaterials] = useState({ hoodie: selectedHoodie, border: selectedBorder, stitchFill: selectedStitchFill });

	const changeExpandedAccordion = (accordionNumber) => {
		if (accordionNumber === expanded) {
			setExpanded(0);
		} else {
			setExpanded(accordionNumber);
		}
	};

	const [fillColor, setFillColor] = useState(null);
	const [gradientColor, setGradientColor] = useState(null);

	const changeStitchFill = (newColor) => {
		if (patternType === 'fill') {
			if (fillColor === newColor) {
				console.log('null fill');
				setFillColor(null);
				setSelectedStitchFill({ ...selectedStitchFill, fill: null });
			} else {
				console.log('new fill');
				setFillColor(newColor);
				setSelectedStitchFill({ ...selectedStitchFill, fill: newColor });
			}
		} else if (gradientColor === newColor) {
			setGradientColor(null);
			console.log('null gradient');
			setSelectedStitchFill({ ...selectedStitchFill, gradient: null });
		} else {
			setGradientColor(newColor);
			console.log('new gradient');
			setSelectedStitchFill({ ...selectedStitchFill, gradient: newColor });
		}
	};

	const changePatternType = (newPatternType) => {
		setPatternType(newPatternType);
	};

	const resetAllSelections = () => {
		var confirmReset = window.confirm('Reset all Selections?');
		if (confirmReset) {
			setSelectedHoodie(null);
			setSelectedBorder(null);
			setFillColor(null);
			setGradientColor(null);
			setSelectedStitchFill({ fill: null, gradient: null });
			setPatternType('fill');
			setSelectedSize(null);
			setQuantity(1);
		}
	};

	function areMaterialsEqual(newMaterials) {
		return newMaterials.hoodie === orderMaterials.hoodie && newMaterials.border === orderMaterials.border && newMaterials.stitchFill === orderMaterials.stitchFill;
	}

	const randomizeSelections = () => {
		var confirmRandomize = true;
		const lastSelections = { hoodie: selectedHoodie, border: selectedBorder, stitchFill: selectedStitchFill };

		if (!areMaterialsEqual(lastSelections) && (selectedHoodie !== null || selectedBorder !== null || selectedStitchFill !== null)) {
			confirmRandomize = window.confirm('Let the Great Hawk randomize your hoodie? All current selections will be lost.');
		}
		if (confirmRandomize) {
			const hoodieRandom = Math.floor(Math.random() * hoodieSelectionList.length);
			const borderRandom = Math.floor(Math.random() * borderSelectionList.length);
			const stitchFillRandom = Math.floor(Math.random() * stitchFillSelectionList.length);
			const shouldSetGradient = Math.random() >= 0.5;
			var stitchGradientRandom = null;
			if (shouldSetGradient) {
				stitchGradientRandom = Math.floor(Math.random() * stitchFillSelectionList.length);
			}

			setSelectedHoodie(hoodieRandom);
			setSelectedBorder(borderRandom);
			setFillColor(stitchFillRandom);
			setGradientColor(stitchGradientRandom);
			const newStitchFillObject = { fill: stitchFillRandom, gradient: stitchGradientRandom };
			setSelectedStitchFill(newStitchFillObject);
			// setPatternType('');
			setOrderMaterials({ hoodie: hoodieRandom, border: borderRandom, stitchFill: newStitchFillObject });
		}
	};

	const [hoodieOrPreview, setHoodieOrPreview] = useState('hoodie');

	return (
		<Stack direction={{ sm: 'column', md: 'row' }} justifyContent='space-around' alignItems={{ sm: 'center', md: 'flex-start' }} sx={{ width: '100%' }} mt={2} mb={2} spacing={2}>
			<Stack alignItems={'center'}>
				{hoodieOrPreview === 'hoodie' ? (
					<Box position={'relative'} className='hoodie-stitch container'>
						{selectedHoodie !== null && selectedBorder !== null && (
							<img className='toxic-wave-logo hoodie-stitch outline' src={borderSelectionList[selectedBorder]?.logo} alt='Border' />
						)}
						{selectedHoodie !== null && fillColor !== null && (
							<img className='toxic-wave-logo hoodie-stitch stitch' src={stitchFillSelectionList[fillColor]?.logo} alt='Stitch' />
						)}
						{selectedHoodie !== null && gradientColor !== null && (
							<img className='toxic-wave-logo hoodie-stitch stitch gradient' src={stitchGradientSelectionList[gradientColor]?.logo} alt='Stitch' />
						)}
						{selectedHoodie !== null ? (
							<img className='hoodie-base hoodie-stitch hoodie' src={hoodieSelectionList[selectedHoodie]?.logo} alt='Hoodie' />
						) : (
							<img className=' hoodie-base hoodie-stitch hoodie' src={HoodieBlank} alt='Hoodie' />
						)}
					</Box>
				) : (
					<Box position={'relative'} className='hoodie-stitch container'>
						{selectedBorder !== null && <img className='toxic-wave-logo hoodie-stitch-only outline' src={borderSelectionList[selectedBorder]?.logo} alt='Border' />}
						{fillColor !== null && <img className='toxic-wave-logo hoodie-stitch-only stitch' src={stitchFillSelectionList[fillColor]?.logo} alt='Stitch' />}
						{gradientColor !== null && (
							<img className='toxic-wave-logo hoodie-stitch-only stitch gradient' src={stitchGradientSelectionList[gradientColor]?.logo} alt='Stitch' />
						)}
						<img
							className='hoodie-base hoodie-stitch-only hoodie'
							src={selectedHoodie !== null ? hoodieSelectionList[selectedHoodie]?.logo : hoodieSelectionList[0]?.logo}
							alt='Hoodie'
						/>
					</Box>
				)}
				{selectedHoodie !== null && (selectedBorder !== null || fillColor !== null || gradientColor || null) && (
					<Button
						color='warning'
						variant={hoodieOrPreview === 'hoodie' ? 'outlined' : 'contained'}
						onClick={(event) => (hoodieOrPreview === 'hoodie' ? setHoodieOrPreview('preview') : setHoodieOrPreview('hoodie'))}
						sx={{ width: '50%' }}>
						Show Preview
					</Button>
				)}
			</Stack>

			<Stack direction={'column'} alignItems='flex-start' flexShrink={0} sx={{ width: { xs: '100%', md: 'auto' }, maxWidth: { md: '500px', lg: '600px' } }}>
				<Card raised sx={{ width: '100%', padding: 2 }} className={mode === 'dark' ? 'darkcard' : 'lightcard'}>
					<Stack spacing={2}>
						<CardHeader title='Toxic Wave Hoodie' sx={{ fontWeight: 600, padding: 0, margin: 0 }} />

						<Stack sx={{ padding: -2 }}>
							<HoodieSelectionAccordion
								hoodieSelectionList={hoodieSelectionList}
								accordionNumber={1}
								expanded={expanded}
								changeExpandedAccordion={changeExpandedAccordion}
								selectedHoodie={selectedHoodie}
								setSelectedHoodie={setSelectedHoodie}
							/>
							<BorderSelectionAccordion
								borderSelectionList={borderSelectionList}
								accordionNumber={2}
								expanded={expanded}
								changeExpandedAccordion={changeExpandedAccordion}
								selectedBorder={selectedBorder}
								setSelectedBorder={setSelectedBorder}
							/>
							<StitchFillSelectionAccordion
								patternType={patternType}
								changePatternType={changePatternType}
								stitchFillSelectionList={stitchFillSelectionList}
								stitchGradientSelectionList={stitchGradientSelectionList}
								accordionNumber={3}
								expanded={expanded}
								changeExpandedAccordion={changeExpandedAccordion}
								selectedStitchFill={fillColor}
								selectedStitchGradient={gradientColor}
								changeStitchFill={changeStitchFill}
							/>
							<SizeSelectionAccordion
								sizeSelectionList={sizeSelectionList}
								accordionNumber={4}
								expanded={expanded}
								changeExpandedAccordion={changeExpandedAccordion}
								selectedSize={selectedSize}
								setSelectedSize={setSelectedSize}
							/>
						</Stack>

						<Stack>
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

						<Stack justifyContent='space-between' spacing={1} direction='row'>
							<Button fullWidth variant='contained'>
								Add to Cart
							</Button>
							<Tooltip title={'Reset All Selections'} enterDelay={1000} enterNextDelay={1000} disableInteractive={true}>
								<IconButton onClick={() => resetAllSelections()}>
									{/* <Clear /> */}
									<Refresh />
								</IconButton>
							</Tooltip>
							<Tooltip title={'Randomize Hoodie'} enterDelay={1000} enterNextDelay={1000} disableInteractive={true}>
								<IconButton onClick={() => randomizeSelections()}>
									<Shuffle />
								</IconButton>
							</Tooltip>
						</Stack>
					</Stack>
				</Card>
			</Stack>
		</Stack>
	);
};

export default ToxicHoodie;
