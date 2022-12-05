import { forwardRef, useEffect, useState } from 'react';
import HoodieBlank from '../assets2/build_adventure.png';
import { Box, Button, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Snackbar, Stack, Tooltip } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

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
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';

const hoodieSelectionList = HOODIE_SELECTION_LIST;
const borderSelectionList = BORDERS_SELECTION_LIST;
const stitchFillSelectionList = FILLS_SELECTION_LIST;
const stitchGradientSelectionList = GRADIENTS_SELECTION_LIST;

const sizeSelectionList = [
	{ size: 'S', order: 0 },
	{ size: 'M', order: 1 },
	{ size: 'L', order: 2 },
	{ size: 'XL', order: 3 },
	{ size: 'XXL', order: 4 }
];

function ToxicHoodie() {
	// console.log();
	const location = useLocation();
	const { editId } = location.state || { editId: null };
	const orders = useSelector((state) => state.cart.order);
	const editItem = editId ? orders.find((item) => item.id === editId) : null;
	const editMode = editItem !== null;

	const [snackbarOpen, setSnackbarOpen] = useState(false);

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

	const [canAddToCart, setCanAddToCart] = useState(false);

	const [addOrUpdateButtonTitle, setAddOrUpdateButtonTitle] = useState(defaultAddOrUpdateTitle);

	useEffect(() => {
		if (!hoodieSelectionList[selectedHoodie]) {
			setCanAddToCart(false);
			setAddOrUpdateButtonTitle('Select a Base');
		} else if (!borderSelectionList[selectedBorder]) {
			setCanAddToCart(false);
			setAddOrUpdateButtonTitle('Select a Border');
		} else if (!stitchFillSelectionList[fillColor]) {
			setCanAddToCart(false);
			setAddOrUpdateButtonTitle('Select a Fill');
		} else if (!sizeSelectionList[selectedSize]) {
			setCanAddToCart(false);
			setAddOrUpdateButtonTitle('Select a Size');
		} else {
			setCanAddToCart(true);
			setAddOrUpdateButtonTitle(defaultAddOrUpdateTitle);
		}
	}, [selectedHoodie, selectedBorder, selectedSize, fillColor, selectedStitchFill, defaultAddOrUpdateTitle]);

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
				cost: 50.0,
				type: 'Toxic Wave Hoodie'
			};

			if (editItem) {
				var updated = dispatch(updateHoodie(hoodie));
				console.log(updated);
			} else {
				var added = dispatch(addHoodie(hoodie));
				console.log(added);
			}
			setAddOrUpdateButtonTitle(defaultAddOrUpdateCompleteTitle);
			setSnackbarOpen(true);
		} else {
			setNeedMoreOptions(true);
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

	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	return (
		<Stack
			direction={{ sm: 'column', md: 'row' }}
			justifyContent='space-around'
			alignItems={{ sm: 'center', md: 'flex-start' }}
			sx={{ width: '100%' }}
			mt={2}
			mb={6}
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
						color={hoodieOrPreview === 'hoodie' ? 'viewEmbroidery' : 'viewHoodie'}
						variant={hoodieOrPreview === 'hoodie' ? 'contained' : 'contained'}
						onClick={(event) => (hoodieOrPreview === 'hoodie' ? setHoodieOrPreview('preview') : setHoodieOrPreview('hoodie'))}
						sx={{ width: '50%', marginBottom: 1, position: 'relative', top: '-30px' }}>
						{hoodieOrPreview === 'hoodie' ? 'View Embroidery' : 'View Hoodie'}
					</Button>
				) : (
					<Button className='disabledButton' variant='contained' sx={{ width: '50%', marginBottom: 1, position: 'relative', top: '-30px' }}>
						Select options
					</Button>
				)}
			</Stack>

			<Stack
				className=' '
				// className='animate__animated animate__slideInRight '
				direction={'column'}
				alignItems='flex-start'
				flexShrink={0}
				sx={{
					marginRight: { sm: 'none', md: '1rem !important' },
					maxWidth: { sm: '100%', md: '500px', lg: '700px' },
					background: 'transparent',
					position: { xs: 'relative', sm: 'relative', md: 'initial' },
					top: { xs: '-30px', sm: '-30px', md: '0px' }
				}}>
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

					<Stack justifyContent='space-between' spacing={1} direction='row'>
						<Button className={canAddToCart ? '' : 'disabledButton'} fullWidth color={editMode ? 'edit' : 'primary'} variant={'contained'} onClick={addToCart}>
							{addOrUpdateButtonTitle}
						</Button>
					</Stack>
				</Stack>
				{/* </Card> */}
			</Stack>

			{/* {needMoreOptions && selectMoreOptions} */}
			<SelectMoreOptionsDialog open={needMoreOptions} />
			{/* {selectMoreOptions} */}

			<Snackbar sx={{ marginTop: '80px' }} anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity='success' sx={{ width: '100%' }}>
					{editMode ? 'Updated Item!' : 'Added to Cart!'}
				</Alert>
			</Snackbar>
		</Stack>
	);
}

export default ToxicHoodie;
