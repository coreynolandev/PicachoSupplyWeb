import { useEffect, useState } from 'react';
import HoodieBlank from '../assets/build_adventure.png';
import { Box, Button, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, Tooltip } from '@mui/material';

import HoodieSelectionAccordion from '../components/accordion/HoodieSelectionAccordion';
import BorderSelectionAccordion from '../components/accordion/BorderSelectionAccordion';
import StitchFillSelectionAccordion from '../components/accordion/StitchFillSelectionAccordion';
import SizeSelectionAccordion from '../components/accordion/SizeSelectionAccordion';
import { Refresh, Shuffle } from '@mui/icons-material';
import { HOODIE_SELECTION_LIST } from '../components/toxic-build/Hoodies';
import { BORDERS_SELECTION_LIST } from '../components/toxic-build/Borders';
import { FILLS_SELECTION_LIST, GRADIENTS_SELECTION_LIST } from '../components/toxic-build/Fills';
import { Accordion } from '../components/design/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { addHoodie, updateHoodie } from '../features/cartSlice';
import uuid from 'react-uuid';

import { useLocation } from 'react-router-dom';

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

function ToxicHoodie() {
	// console.log();
	const location = useLocation();
	const { editId } = location.state || { editId: null };
	const orders = useSelector((state) => state.cart.order);
	const editItem = editId ? orders.find((item) => item.id === editId) : null;
	const editMode = editItem !== null;

	const dispatch = useDispatch();
	const [expanded, setExpanded] = useState(1);
	const [selectedHoodie, setSelectedHoodie] = useState(editItem !== null && editItem?.baseColorId !== null ? editItem?.baseColorId : null);
	const [selectedBorder, setSelectedBorder] = useState(editItem !== null && editItem?.borderColorId !== null ? editItem?.borderColorId : null);
	const [selectedStitchFill, setSelectedStitchFill] = useState({
		fill: editItem !== null && editItem?.fillColorId !== null ? editItem?.fillColorId : null,
		gradient: editItem !== null && editItem?.gradientColorId !== null ? editItem?.gradientColorId : null
	});
	const [patternType, setPatternType] = useState('fill');
	const [selectedSize, setSelectedSize] = useState(editItem !== null && editItem?.sizeId !== null ? editItem.sizeId : null);
	const [orderMaterials, setOrderMaterials] = useState({ hoodie: selectedHoodie, border: selectedBorder, stitchFill: selectedStitchFill });
	const [hoodieOrPreview, setHoodieOrPreview] = useState('hoodie');
	const [fillColor, setFillColor] = useState(editItem !== null && editItem?.fillColorId !== null ? editItem?.fillColorId : null);
	const [gradientColor, setGradientColor] = useState(editItem !== null && editItem?.gradientColorId !== null ? editItem?.gradientColorId : null);

	const changeExpandedAccordion = (accordionNumber) => {
		if (accordionNumber === expanded) {
			setExpanded(0);
		} else {
			setExpanded(accordionNumber);
		}
	};

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
			setHoodieOrPreview('hoodie');
			setSelectedHoodie(null);
			setSelectedBorder(null);
			setFillColor(null);
			setGradientColor(null);
			setSelectedStitchFill({ fill: null, gradient: null });
			setPatternType('fill');
			setSelectedSize(null);
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

	const defaultAddOrUpdateTitle = editMode ? 'Update Item' : 'Add to Cart';
	const defaultAddOrUpdateCompleteTitle = editMode ? 'Updated Item!' : 'Added to Cart!';
	const [justAddedOrUpdated, setJustAddedOrUpdated] = useState(false);
	const [addOrUpdateButtonTitle, setAddOrUpdateButtonTitle] = useState(defaultAddOrUpdateTitle);

	useEffect(() => {
		setJustAddedOrUpdated(false);
		setAddOrUpdateButtonTitle(defaultAddOrUpdateTitle);
	}, [selectedHoodie, selectedBorder, selectedSize, selectedStitchFill, defaultAddOrUpdateTitle]);

	const addToCart = () => {
		console.log('hoodie: ' + hoodieSelectionList[selectedHoodie]?.alt);
		console.log('border: ' + borderSelectionList[selectedBorder]?.alt);
		console.log('stitchFill: ' + stitchFillSelectionList[fillColor]?.alt);
		console.log('stitchGradient: ' + stitchGradientSelectionList[gradientColor]?.alt);
		console.log('size: ' + sizeSelectionList[selectedSize]?.size);
		if (hoodieSelectionList[selectedHoodie] && borderSelectionList[selectedBorder] && stitchFillSelectionList[fillColor] && sizeSelectionList[selectedSize]) {
			setAddOrUpdateButtonTitle(editMode ? 'Updating...' : 'Adding...');
			var id = editMode ? editId : uuid();
			const hoodie = {
				id: id,
				size: sizeSelectionList[selectedSize]?.size,
				sizeId: selectedSize,
				baseColor: hoodieSelectionList[selectedHoodie]?.alt,
				baseColorImg: hoodieSelectionList[selectedHoodie]?.logo,
				baseColorId: selectedHoodie,
				borderColor: borderSelectionList[selectedBorder]?.alt,
				borderColorImg: borderSelectionList[selectedBorder]?.logo,
				borderColorId: selectedBorder,
				fillColor: stitchFillSelectionList[fillColor]?.alt,
				fillColorImg: stitchFillSelectionList[fillColor]?.logo,
				fillColorId: fillColor,
				gradientColor: stitchGradientSelectionList[gradientColor]?.alt,
				gradientColorImg: stitchGradientSelectionList[gradientColor]?.logo,
				gradientColorId: gradientColor,
				quantity: 1,
				cost: 50,
				type: 'Toxic Wave Hoodie'
			};

			if (editItem) {
				var updated = dispatch(updateHoodie(hoodie));
				console.log(updated);
			} else {
				var added = dispatch(addHoodie(hoodie));
				console.log(added);
			}
			setJustAddedOrUpdated(true);
			setAddOrUpdateButtonTitle(defaultAddOrUpdateCompleteTitle);
		} else {
			setNeedMoreOptions(true);
			setJustAddedOrUpdated(false);
		}
	};

	const [needMoreOptions, setNeedMoreOptions] = useState(false);

	const handleClose = () => {
		console.log('closing');
		setNeedMoreOptions(false);
	};

	function SelectMoreOptionsDialog(props) {
		const { open } = props;

		return (
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle>Please select more hoodie options</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>You must select a Base, Border, Fill, and Size before adding to your bag.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' onClick={handleClose} autoFocus>
						Got it!
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	return (
		<Stack
			direction={{ sm: 'column', md: 'row' }}
			justifyContent='space-around'
			alignItems={{ sm: 'center', md: 'flex-start' }}
			sx={{ width: '100%' }}
			mt={2}
			mb={2}
			spacing={2}>
			<Stack alignItems={'center'} sx={{ overflow: 'hidden' }} className=''>
				{/* <Stack alignItems={'center'} sx={{ overflow: 'hidden' }} className='animate__animated animate__slideInLeft'> */}
				{hoodieOrPreview === 'hoodie' ? (
					<Box component='div' sx={{ overflow: 'hidden' }} position={'relative'} className='hoodie-stitch container'>
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
				{selectedHoodie !== null && (selectedBorder !== null || fillColor !== null || gradientColor || null) ? (
					<Button
						color={hoodieOrPreview === 'hoodie' ? 'warning' : 'secondary'}
						variant={hoodieOrPreview === 'hoodie' ? 'contained' : 'contained'}
						onClick={(event) => (hoodieOrPreview === 'hoodie' ? setHoodieOrPreview('preview') : setHoodieOrPreview('hoodie'))}
						sx={{ width: '50%', marginBottom: 1 }}>
						{hoodieOrPreview === 'hoodie' ? 'Show Logo' : 'Show Hoodie'}
					</Button>
				) : (
					<Button color='info' variant='outlined' sx={{ width: '50%', marginBottom: 1 }}>
						Select more options
					</Button>
				)}
			</Stack>

			<Stack
				className=' '
				// className='animate__animated animate__slideInRight '
				direction={'column'}
				alignItems='flex-start'
				flexShrink={0}
				sx={{ marginRight: { sm: 'none', md: '1rem !important' }, maxWidth: { sm: '100%', md: '500px', lg: '700px' }, background: 'transparent', willChange: 'transform' }}>
				{/* <Card raised sx={{ width: '100%', padding: 2 }} className={mode === 'dark' ? 'darkcard' : 'lightcard'}> */}
				<Stack spacing={2} width='100%'>
					<Stack padding={-2}>
						<Accordion>
							<Grid container bgcolor={'white'} alignItems='center' border={'1px solid rgba(0, 0, 0, 0.03)'} sx={{ borderBottom: 'none' }}>
								<Grid item xs={2}>
									<Tooltip title={'Reset All Selections'} enterDelay={1000} enterNextDelay={1000} disableInteractive={true}>
										<IconButton onClick={() => resetAllSelections()}>
											{/* <Clear /> */}
											<Refresh />
										</IconButton>
									</Tooltip>
								</Grid>
								<Grid item xs={8}>
									<CardHeader title='Toxic Wave Hoodie' sx={{ fontWeight: 600, padding: 0, margin: 0 }} />
								</Grid>
								<Grid item xs={2}>
									<Tooltip title={'Randomize Hoodie'} enterDelay={1000} enterNextDelay={1000} disableInteractive={true}>
										<IconButton onClick={() => randomizeSelections()} sx={{ padding: 0 }}>
											<Shuffle />
										</IconButton>
									</Tooltip>
								</Grid>
							</Grid>
						</Accordion>

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

					{/* <Stack>
							<Stack direction='row' justifyContent='space-between' mb={1}>
								<FormControl fullWidth sx={{bgcolor: 'white'}}>
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
						</Stack> */}

					<Stack justifyContent='space-between' spacing={1} direction='row'>
						<Button fullWidth color={editMode ? 'secondary' : 'primary'} variant={'contained'} onClick={addToCart}>
							{/* TODO: change it to grey and say item added to cart. switch back to add if they change something */}
							{/* TODO: make the #1 bounce? */}
							{addOrUpdateButtonTitle}
						</Button>
					</Stack>
				</Stack>
				{/* </Card> */}
			</Stack>

			{/* {needMoreOptions && selectMoreOptions} */}
			<SelectMoreOptionsDialog open={needMoreOptions} />
			{/* {selectMoreOptions} */}
		</Stack>
	);
}

export default ToxicHoodie;
