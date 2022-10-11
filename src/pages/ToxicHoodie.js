import { useState } from 'react';
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
import { Box, Button, Card, CardHeader, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';

import HoodieSwatchArmy from '../assets/hoodie/swatch/army.png';
import HoodieSwatchBlack from '../assets/hoodie/swatch/black.png';
import HoodieSwatchBlue from '../assets/hoodie/swatch/blue.png';
import HoodieSwatchLavender from '../assets/hoodie/swatch/lavender.png';
import HoodieSwatchPlum from '../assets/hoodie/swatch/plum.png';
import HoodieSwatchYellow from '../assets/hoodie/swatch/yellow.png';
import HoodieSelectionAccordion from '../components/HoodieSelectionAccordion';
import BorderSelectionAccordion from '../components/BorderSelectionAccordion';
import StitchFillSelectionAccordion from '../components/StitchFillSelectionAccordion';
import BorderWhite from '../assets/border/border_white.png';
import BorderNavy from '../assets/border/border_navy.png';
import BorderBlack from '../assets/border/border_black.png';
import FillWhite from '../assets/solid-fill/fill_white.png';
import StitchBorderSwatchBlue from '../assets/swatch/swatch_blue.png';
import StitchBorderSwatchBlack from '../assets/hoodie/swatch/black.png';
import StitchBorderSwatchWhite from '../assets/swatch/swatch_white.png';
import SizeSelectionAccordion from '../components/SizeSelectionAccordion';
import { Refresh } from '@mui/icons-material';

const ToxicHoodie = () => {
	const [expanded, setExpanded] = useState(1);
	const [selectedHoodie, setSelectedHoodie] = useState(null);
	const [selectedBorder, setSelectedBorder] = useState(null);
	const [patternType, setPatternType] = useState('solid');
	const [selectedStitchFill, setSelectedStitchFill] = useState(null);
	const [selectedSize, setSelectedSize] = useState(null);
	const [quantity, setQuantity] = useState(1);

	const changeExpandedAccordion = (accordionNumber) => {
		if (accordionNumber === expanded) {
			setExpanded(0);
		} else {
			setExpanded(accordionNumber);
		}
	};

	const changePatternType = (newPatternType) => {
		setSelectedStitchFill(null);
		setPatternType(newPatternType);
	};

	const hoodieSelectionList = [
		{ logo: HoodieArmy, swatchImage: HoodieSwatchArmy, alt: 'Army', order: 0 },
		{ logo: HoodieBlack, swatchImage: HoodieSwatchBlack, alt: 'Black', order: 1 },
		{ logo: HoodieBlue, swatchImage: HoodieSwatchBlue, alt: 'Blue', order: 2 },
		{ logo: HoodieLavender, swatchImage: HoodieSwatchLavender, alt: 'Lavender', order: 3 },
		{ logo: HoodiePlum, swatchImage: HoodieSwatchPlum, alt: 'Plum', order: 4 },
		{ logo: HoodieYellow, swatchImage: HoodieSwatchYellow, alt: 'Yellow', order: 5 }
	];

	const borderSelectionList = [
		{ logo: BorderWhite, swatchImage: StitchBorderSwatchWhite, alt: 'White', order: 0 },
		{ logo: BorderNavy, swatchImage: StitchBorderSwatchBlue, alt: 'Navy', order: 1 },
		{ logo: BorderBlack, swatchImage: StitchBorderSwatchBlack, alt: 'Black', order: 2 }
	];

	const stitchFillSelectionList = [
		{ id: 1, logo: LogoBlue, swatchImage: StitchSwatchBlue, alt: 'Blue', order: 0, type: 'solid' },
		{ id: 2, logo: LogoBlueGreenGradient, swatchImage: StitchSwatchBlueGreenGradient, alt: 'Blue / Green', order: 1, type: 'gradient' },
		{ id: 3, logo: LogoPinkOrangeGradient, swatchImage: StitchSwatchPinkOrangeGradient, alt: 'Pink  / Orange', order: 2, type: 'gradient' },
		{ id: 4, logo: FillWhite, swatchImage: StitchSwatchWhite, alt: 'White', order: 3, type: 'solid' }
	];

	const sizeSelectionList = [
		{ size: 'S', order: 0 },
		{ size: 'M', order: 1 },
		{ size: 'L', order: 2 },
		{ size: 'XL', order: 3 }
	];

	return (
		<Stack direction={{ sm: 'column', md: 'row' }} justifyContent='center' alignItems='center' sx={{ width: '100%' }} mt={2}>
			<Box position={'relative'} className='hoodie-stitch container'>
				{selectedHoodie !== null && selectedBorder !== null && (
					<img className='toxic-wave-logo hoodie-stitch outline' src={borderSelectionList[selectedBorder]?.logo} alt='Border' />
				)}
				{selectedHoodie !== null && selectedStitchFill !== null && (
					<img className='toxic-wave-logo hoodie-stitch stitch' src={stitchFillSelectionList[selectedStitchFill]?.logo} alt='Stitch' />
				)}
				{selectedHoodie !== null ? (
					<img className='hoodie-base hoodie-stitch hoodie' src={hoodieSelectionList[selectedHoodie]?.logo} alt='Hoodie' />
				) : (
					<img className=' hoodie-base hoodie-stitch hoodie' src={HoodieBlank} alt='Hoodie' />
				)}
			</Box>

			<Stack direction={'column'} alignItems='flex-start' flexShrink={0} sx={{ width: { xs: '100%', md: 'auto' }, maxWidth: { xs: '600px' } }}>
				<Card raised sx={{ backgroundColor: 'rgb(0,0,0,0.8)', width: '100%', padding: 2 }}>
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
								accordionNumber={3}
								expanded={expanded}
								changeExpandedAccordion={changeExpandedAccordion}
								selectedStitchFill={selectedStitchFill}
								setSelectedStitchFill={setSelectedStitchFill}
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
							<Button variant='contained'>Add to Cart</Button>
							<IconButton>
								<Refresh />
							</IconButton>
						</Stack>
					</Stack>
				</Card>
			</Stack>
		</Stack>
	);
};

export default ToxicHoodie;
