import { forwardRef, useEffect, useState } from 'react';
import HoodieBlank from '../assets2/build_adventure.png';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	IconButton,
	Snackbar,
	Stack,
	Tooltip,
	Typography
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import HoodieSelectionAccordion from '../components/accordion/HoodieSelectionAccordion';
import BorderSelectionAccordion from '../components/accordion/BorderSelectionAccordion';
import SizeSelectionAccordion from '../components/accordion/SizeSelectionAccordion';
import { Refresh, Shuffle } from '@mui/icons-material';
import { HOODIE_SELECTION_LIST } from '../components/toxic-build/Hoodies';
import { BORDERS_SELECTION_LIST } from '../components/toxic-build/Borders';
import { FILLS_SELECTION_LIST, GRADIENTS_SELECTION_LIST } from '../components/toxic-build/Fills';
import { Accordion } from '../components/design/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { addHoodie, updateHoodie } from '../features/cartSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import FillSelectionAccordion from '../components/accordion/FillSelectionAccordion';
import GradientSelectionAccordion from '../components/accordion/GradientSelectionAccordion';

const hoodieSelectionList = HOODIE_SELECTION_LIST;
const borderSelectionList = BORDERS_SELECTION_LIST;
const fillSelectionList = FILLS_SELECTION_LIST;
const gradientSelectionList = GRADIENTS_SELECTION_LIST;

const sizeSelectionList = [
	{ size: 'S', order: 0 },
	{ size: 'M', order: 1 },
	{ size: 'L', order: 2 },
	{ size: 'XL', order: 3 },
	{ size: 'XXL', order: 4 }
];
const picachoFavorites = [
	{
		baseColorNum: 10,
		borderColorNum: 5,
		fillColorNum: 12,
		gradientColorNum: 14
	},
	{
		baseColorNum: 7,
		borderColorNum: 0,
		fillColorNum: 1,
		gradientColorNum: null
	},
	{
		baseColorNum: 1,
		borderColorNum: 18,
		fillColorNum: 0,
		gradientColorNum: null
	},
	{
		baseColorNum: 13, //yellow/bklack.white
		borderColorNum: 0,
		fillColorNum: 18,
		gradientColorNum: null
	},
	{
		baseColorNum: 9, //purple/white/leafgreen/forrest
		borderColorNum: 18,
		fillColorNum: 10,
		gradientColorNum: 5
	},
	{
		baseColorNum: 11, //smoke/blak/bluesky/jetblue
		borderColorNum: 0,
		fillColorNum: 15,
		gradientColorNum: 8
	},

	{
		baseColorNum: 9, //plum/black/yellow
		borderColorNum: 0,
		fillColorNum: 12,
		gradientColorNum: null
	},
	{
		baseColorNum: 16, // cardinal/black/white
		borderColorNum: 0,
		fillColorNum: 18,
		gradientColorNum: null
	},
	{
		baseColorNum: 12, // stormblue/nblack/white/cherryred
		borderColorNum: 0,
		fillColorNum: 18,
		gradientColorNum: 1
	},
	{
		baseColorNum: 3, // bone/black/tangerine/yellow
		borderColorNum: 0,
		fillColorNum: 16,
		gradientColorNum: 12
	},
	{
		baseColorNum: 3, // bone/coffee/choclate
		borderColorNum: 3,
		fillColorNum: 2,
		gradientColorNum: null
	},
	{
		baseColorNum: 14, // black-grey/black/grey
		borderColorNum: 0,
		fillColorNum: 6,
		gradientColorNum: null
	}
];

function LifestyleHoodie() {
	const location = useLocation();
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.cart.order);

	const { editId } = location.state || { editId: null };
	const editItem = editId ? orders.find((item) => item.id === editId) : null;
	const editMode = editItem !== null;

	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const [expanded, setExpanded] = useState(1);
	const [selectedHoodie, setSelectedHoodie] = useState(editItem !== null && editItem?.baseColorId !== null ? editItem?.baseColorId : null);
	const [selectedBorder, setSelectedBorder] = useState(editItem !== null && editItem?.borderColorId !== null ? editItem?.borderColorId : null);
	const [selectedFill, setSelectedFill] = useState(editItem !== null && editItem?.fillColorId !== null ? editItem?.fillColorId : null);
	const [selectedGradient, setSelectedGradient] = useState(editItem !== null && editItem?.gradientColorId !== null ? editItem?.gradientColorId : null);

	const [selectedSize, setSelectedSize] = useState(editItem !== null && editItem?.sizeId !== null ? editItem.sizeId : null);
	const [orderMaterials, setOrderMaterials] = useState({ hoodie: selectedHoodie, border: selectedBorder, fill: selectedFill, gradient: selectedGradient });
	const [hoodieOrPreview, setHoodieOrPreview] = useState('hoodie');

	const changeExpandedAccordion = (accordionNumber) => {
		if (accordionNumber === expanded) {
			setExpanded(0);
		} else {
			setExpanded(accordionNumber);
		}
	};

	// const changeStitchFill = (newColor) => {
	// 	if (patternType === 'fill') {
	// 		if (fillColor === newColor) {
	// 			console.log('null fill');
	// 			setFillColor(null);
	// 			setSelectedStitchFill({ ...selectedStitchFill, fill: null });
	// 		} else {
	// 			console.log('new fill');
	// 			setFillColor(newColor);
	// 			setSelectedStitchFill({ ...selectedStitchFill, fill: newColor });
	// 		}
	// 	} else if (gradientColor === newColor) {
	// 		setGradientColor(null);
	// 		console.log('null gradient');
	// 		setSelectedStitchFill({ ...selectedStitchFill, gradient: null });
	// 	} else {
	// 		setGradientColor(newColor);
	// 		console.log('new gradient');
	// 		setSelectedStitchFill({ ...selectedStitchFill, gradient: newColor });
	// 	}
	// };

	// const changePatternType = (newPatternType) => {
	// 	setPatternType(newPatternType);
	// };

	const resetAllSelections = () => {
		var confirmReset = window.confirm('Reset all Selections?');
		if (confirmReset) {
			setHoodieOrPreview('hoodie');
			setSelectedHoodie(null);
			setSelectedBorder(null);
			setSelectedFill(null);
			setSelectedGradient(null);
			// setSelectedStitchFill({ fill: null, gradient: null });
			// setPatternType('fill');
			setSelectedSize(null);
		}
	};

	function areMaterialsEqual(newMaterials) {
		console.log(newMaterials);
		console.log(orderMaterials);
		return (
			newMaterials.hoodie === orderMaterials.hoodie &&
			newMaterials.border === orderMaterials.border &&
			newMaterials.fill === orderMaterials.fill &&
			newMaterials.gradient === orderMaterials.gradient
		);
	}

	const [lastThreeRandom, setLastThreeRandom] = useState([]);
	const [fullRandom, setFullRandom] = useState([]);

	const randomizeSelections = () => {
		var confirmRandomize = true;
		const lastSelections = { hoodie: selectedHoodie, border: selectedBorder, fill: selectedFill, gradient: selectedGradient };

		if (!areMaterialsEqual(lastSelections) && (selectedHoodie !== null || selectedBorder !== null || selectedFill !== null)) {
			confirmRandomize = window.confirm('Let the Great Hawk randomize your hoodie? All current selections will be lost.');
		}
		if (confirmRandomize) {
			const hoodieRandom = Math.floor(Math.random() * hoodieSelectionList.length);
			const borderRandom = Math.floor(Math.random() * borderSelectionList.length);
			const fillRandom = Math.floor(Math.random() * fillSelectionList.length);
			var shouldSetGradient = Math.random() >= 0.5;
			var gradientRandom = null;
			if (lastThreeRandom.length < 3) {
				lastThreeRandom.push(shouldSetGradient ? 1 : 0);
				fullRandom.push(shouldSetGradient ? 1 : 0);
				setLastThreeRandom(lastThreeRandom);
				setFullRandom(fullRandom);
			} else {
				console.log(lastThreeRandom);
				console.log(fullRandom);
				const sum = lastThreeRandom.reduce((partialSum, a) => partialSum + a, 0);
				if (sum === 0) shouldSetGradient = true;
				if (sum === 3) shouldSetGradient = false;
				lastThreeRandom.shift();
				lastThreeRandom.push(shouldSetGradient ? 1 : 0);

				fullRandom.push(shouldSetGradient ? 1 : 0);
				const sum2 = fullRandom.reduce((partialSum, a) => partialSum + a, 0);
				console.log(sum2 / fullRandom.length);

				setFullRandom(fullRandom);

				setLastThreeRandom(lastThreeRandom);
			}

			if (shouldSetGradient) {
				gradientRandom = Math.floor(Math.random() * fillSelectionList.length);
			}

			setSelectedHoodie(hoodieRandom);
			setSelectedBorder(borderRandom);
			setSelectedFill(fillRandom);
			setSelectedGradient(gradientRandom);
			// const newStitchFillObject = { fill: fillRandom, gradient: gradientRandom };
			// setSelectedStitchFill(newStitchFillObject);
			// setPatternType('');
			setOrderMaterials({ hoodie: hoodieRandom, border: borderRandom, fill: fillRandom, gradient: gradientRandom });
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
		} else if (!sizeSelectionList[selectedSize]) {
			setCanAddToCart(false);
			setAddOrUpdateButtonTitle('Select a Size');
		} else {
			setCanAddToCart(true);
			setAddOrUpdateButtonTitle(defaultAddOrUpdateTitle);
		}
	}, [selectedHoodie, selectedBorder, selectedSize, selectedFill, selectedGradient, defaultAddOrUpdateTitle]);

	const navigate = useNavigate();

	const fillFromCollection = (hoodie) => {
		setSelectedHoodie(hoodie.baseColorNum);
		setSelectedBorder(hoodie.borderColorNum);
		setSelectedFill(hoodie.fillColorNum);
		setSelectedGradient(hoodie.gradientColorNum);
		window.scroll(0, 0);
	};

	const addToCart = () => {
		window.scrollBy(0, -1);
		console.log('hoodie: ' + hoodieSelectionList[selectedHoodie]?.alt);
		console.log('border: ' + borderSelectionList[selectedBorder]?.alt);
		console.log('stitchFill: ' + fillSelectionList[selectedFill]?.alt);
		console.log('stitchGradient: ' + gradientSelectionList[selectedGradient]?.alt);
		console.log('size: ' + sizeSelectionList[selectedSize]?.size);
		// Need a hoodie base, border color, and size to be able to add
		if (hoodieSelectionList[selectedHoodie] && borderSelectionList[selectedBorder] && sizeSelectionList[selectedSize]) {
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
				fillColor: fillSelectionList[selectedFill]?.alt,
				fillColorImg: fillSelectionList[selectedFill]?.logo,
				fillColorId: selectedFill,
				gradientColor: gradientSelectionList[selectedGradient]?.alt,
				gradientColorImg: gradientSelectionList[selectedGradient]?.logo,
				gradientColorId: selectedGradient,
				quantity: 1,
				cost: 50.0,
				type: 'Lifestyle Hoodie',
				viewDetails: false
			};

			if (editItem) {
				const oldHoodie = orders.find((it) => it.id === id);
				// Keep quantity if in edit mode
				if (oldHoodie) {
					hoodie.quantity = oldHoodie.quantity;
				}
				var updated = dispatch(updateHoodie(hoodie));
				console.log(updated);
				navigate('/review-order');
			} else {
				var added = dispatch(addHoodie(hoodie));
				console.log(added);
			}
			setAddOrUpdateButtonTitle(defaultAddOrUpdateCompleteTitle);
			setSnackbarOpen(true);
		} else {
			// If they don't have appropriate options selected, open dialog. This is no longer used.
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

	const scrollOver = (shouldScrollRight) => {
		const scrollTarget = document.getElementById('scroll-collection');
		scrollTarget.scrollBy(shouldScrollRight ? 200 : -200, 0);
	};

	return (
		<Stack
			direction={{ sm: 'column', md: 'row' }}
			justifyContent='space-around'
			alignItems={{ sm: 'center', md: 'flex-start' }}
			sx={{ width: '100%' }}
			mt={2}
			mb={0}
			spacing={2}>
			<Stack alignItems={'center'} sx={{ overflow: 'hidden' }}>
				{/* <Stack alignItems={'center'} sx={{ overflow: 'hidden' }} className='animate__animated animate__slideInLeft'> */}
				{hoodieOrPreview === 'hoodie' ? (
					<Box component='div' sx={{ overflow: 'hidden' }} position={'relative'} className='hoodie-stitch container'>
						{selectedHoodie !== null && selectedBorder !== null && (
							<img className='toxic-wave-logo hoodie-stitch outline' src={borderSelectionList[selectedBorder]?.logo} alt='Border' />
						)}
						{selectedHoodie !== null && selectedFill !== null && (
							<img className='toxic-wave-logo hoodie-stitch stitch' src={fillSelectionList[selectedFill]?.logo} alt='Stitch' />
						)}
						{selectedHoodie !== null && selectedGradient !== null && (
							<img className='toxic-wave-logo hoodie-stitch stitch gradient' src={gradientSelectionList[selectedGradient]?.logo} alt='Stitch' />
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
						{selectedFill !== null && <img className='toxic-wave-logo hoodie-stitch-only stitch' src={fillSelectionList[selectedFill]?.logo} alt='Stitch' />}
						{selectedGradient !== null && (
							<img className='toxic-wave-logo hoodie-stitch-only stitch gradient' src={gradientSelectionList[selectedGradient]?.logo} alt='Stitch' />
						)}
						<img
							className='hoodie-base hoodie-stitch-only hoodie'
							src={selectedHoodie !== null ? hoodieSelectionList[selectedHoodie]?.logo : hoodieSelectionList[0]?.logo}
							alt='Hoodie'
						/>
					</Box>
				)}
				{selectedHoodie !== null && (selectedBorder !== null || selectedFill !== null || selectedGradient || null) ? (
					<Button
						color={hoodieOrPreview === 'hoodie' ? 'viewEmbroidery' : 'viewHoodie'}
						variant={hoodieOrPreview === 'hoodie' ? 'contained' : 'contained'}
						onClick={(event) => (hoodieOrPreview === 'hoodie' ? setHoodieOrPreview('preview') : setHoodieOrPreview('hoodie'))}
						sx={{ width: '50%', marginBottom: 1, position: 'relative', top: { xs: '-110px', md: '-30px' } }}>
						{hoodieOrPreview === 'hoodie' ? 'View Embroidery' : 'View Hoodie'}
					</Button>
				) : (
					<Button className='disabledButton' variant='contained' sx={{ width: '50%', marginBottom: 1, position: 'relative', top: { xs: '-110px', md: '-30px' } }}>
						Select options
					</Button>
				)}
			</Stack>

			<Stack
				className=' '
				direction={'column'}
				alignItems='flex-start'
				flexShrink={0}
				sx={{
					marginRight: { sm: 'none', md: '1rem !important' },
					maxWidth: { sm: '100%', md: '500px', lg: '700px' },
					background: 'transparent',
					position: { xs: 'relative', sm: 'relative', md: 'initial' },
					top: { xs: '-80px', sm: '-97px', md: '0px' }
				}}>
				<Stack spacing={2} width='100%'>
					<Stack padding={-2}>
						<Accordion>
							<Grid container bgcolor={'white'} alignItems='center' border={'1px solid rgba(0, 0, 0, 0.03)'} sx={{ borderBottom: 'none' }}>
								<Grid item xs={2}>
									<Tooltip title={'Reset All Selections'} enterDelay={0} enterNextDelay={0} disableInteractive={true}>
										<IconButton onClick={() => resetAllSelections()} sx={{ padding: 0 }}>
											<Refresh />
										</IconButton>
									</Tooltip>
									<Typography fontSize={'10px !important'}>reset</Typography>
								</Grid>
								<Grid item xs={8}>
									<CardHeader title='Lifestyle Hoodie' sx={{ fontWeight: 600, padding: 0, margin: 0 }} />
								</Grid>
								<Grid item xs={2}>
									<Tooltip title={'Randomize Hoodie'} enterDelay={0} enterNextDelay={0} disableInteractive={true}>
										<IconButton onClick={() => randomizeSelections()} sx={{ padding: 0 }}>
											<Shuffle className='animate__animated  animate__swing animate__delay-2s animate__repeat-3 ' />
										</IconButton>
									</Tooltip>
									<Typography fontSize={'10px !important'}>randomize</Typography>
								</Grid>
							</Grid>
						</Accordion>

						<HoodieSelectionAccordion
							hoodieSelectionList={hoodieSelectionList}
							accordionNumber={1}
							expanded={expanded === 1}
							changeExpandedAccordion={changeExpandedAccordion}
							selectedHoodie={selectedHoodie}
							setSelectedHoodie={setSelectedHoodie}
						/>
						<BorderSelectionAccordion
							borderSelectionList={borderSelectionList}
							accordionNumber={2}
							expanded={expanded === 2}
							changeExpandedAccordion={changeExpandedAccordion}
							selectedBorder={selectedBorder}
							setSelectedBorder={setSelectedBorder}
						/>
						<FillSelectionAccordion
							fillSelectionList={fillSelectionList}
							accordionNumber={3}
							expanded={expanded === 3}
							changeExpandedAccordion={changeExpandedAccordion}
							selectedFill={selectedFill}
							setSelectedFill={setSelectedFill}
						/>
						<GradientSelectionAccordion
							gradientSelectionList={gradientSelectionList}
							accordionNumber={4}
							expanded={expanded === 4}
							changeExpandedAccordion={changeExpandedAccordion}
							selectedGradient={selectedGradient}
							setSelectedGradient={setSelectedGradient}
						/>
						<SizeSelectionAccordion
							sizeSelectionList={sizeSelectionList}
							accordionNumber={5}
							expanded={expanded === 5}
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

					<Card bgcolor={'white'}>
						<CardHeader title={`Picacho Collection Favorites`} sx={{ fontWeight: 600, padding: 0, margin: 0 }} />
						<CardContent sx={{ position: 'relative', padding: '1rem 0 0 0' }}>
							<Stack direction='row' position={'relative'} pr={2.5} pl={2.5}>
								<div className='scrollArrows left' onClick={() => scrollOver(false)}>
									<svg width='9' height='12' viewBox='0 0 9 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<path opacity='0.9' d='M9 6L0 11.1962V0.803848L9 6Z' fill='#4a473a' />
									</svg>
								</div>

								<Stack id='scroll-collection' key='main-hoodie-stack-items' direction='row' sx={{ overflowX: 'scroll' }}>
									{picachoFavorites.map((hoodie, index) => {
										return (
											<Box
												key={`unzoomed-hoodie-${index}`}
												sx={{ minWidth: '200px', position: 'relative' }}
												className='hovercollection'
												onClick={() => fillFromCollection(hoodie)}>
												<img key='border-color-img' className=' collection' src={borderSelectionList[hoodie.borderColorNum].logo} alt='Border' />
												<img key='fill-color-img' className=' collection' src={fillSelectionList[hoodie.fillColorNum].logo} alt='Stitch' />
												{hoodie.gradientColorNum == null ? (
													<></>
												) : (
													<img
														key='gradient-color-img'
														className='  collection'
														src={gradientSelectionList[hoodie.gradientColorNum].logo}
														alt='Gradient'
													/>
												)}
												<img
													key='base-color-img'
													className='hoodie-base hoodie-stitch hoodie'
													src={hoodieSelectionList[hoodie.baseColorNum].logo}
													alt='Hoodie'
												/>
											</Box>
										);
									})}
								</Stack>
								<div className='scrollArrows right' onClick={() => scrollOver(true)}>
									<svg width='9' height='12' viewBox='0 0 9 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<path opacity='0.9' d='M9 6L0 11.1962V0.803848L9 6Z' fill='#4a473a' />
									</svg>
								</div>
							</Stack>
						</CardContent>
					</Card>
				</Stack>
			</Stack>

			<SelectMoreOptionsDialog open={needMoreOptions} />

			<Snackbar
				sx={{ marginTop: { xs: '80px !important', sm: '64px !important' } }}
				anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
				open={snackbarOpen}
				autoHideDuration={5000}
				onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity='success' sx={{ width: '100%' }}>
					{editMode ? 'Updated Item!' : 'Added to Cart!'}
				</Alert>
			</Snackbar>
		</Stack>
	);
}

export default LifestyleHoodie;
