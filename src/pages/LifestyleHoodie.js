import { forwardRef, useEffect, useState } from 'react';
import HoodieBlank from '../assets2/build_adventure.png';
import {
	AccordionDetails,
	AccordionSummary,
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
	Tooltip
} from '@mui/material';
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
import { useLocation, useNavigate } from 'react-router-dom';
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

	const navigate = useNavigate();

	const fillFromCollection = (hoodie) => {
		setSelectedHoodie(hoodie.baseColorNum);
		setSelectedBorder(hoodie.borderColorNum);
		setFillColor(hoodie.fillColorNum);
		setGradientColor(hoodie.gradientColorNum);
		window.scroll(0, 0);
	};

	const addToCart = () => {
		window.scrollBy(0, -1);
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
				type: 'Lifestyle Hoodie',
				viewDetails: false
			};

			if (editItem) {
				const oldHoodie = orders.find((it) => it.id === id);
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
			mb={2}
			spacing={2}>
			<Stack alignItems={'center'} sx={{ overflow: 'hidden' }} className='messingup'>
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
						sx={{ width: '50%', marginBottom: 1, position: 'relative', top: { xs: '-110px', md: '-30px' } }}>
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
										<IconButton onClick={() => resetAllSelections()}>
											<Refresh />
										</IconButton>
									</Tooltip>
								</Grid>
								<Grid item xs={8}>
									<CardHeader title='Lifestyle Hoodie' sx={{ fontWeight: 600, padding: 0, margin: 0 }} />
								</Grid>
								<Grid item xs={2}>
									<Tooltip title={'Randomize Hoodie'} enterDelay={0} enterNextDelay={0} disableInteractive={true}>
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

					<Card bgcolor={'white'}>
						<CardHeader title={`Picacho Collection Favorites`} sx={{ fontWeight: 600, padding: 0, margin: 0 }} />
						<CardContent>
							<Stack key='main-hoodie-stack-items' direction='row' overflow='scroll'>
								{picachoFavorites.map((hoodie, index) => {
									return (
										<Box
											key={`unzoomed-hoodie-${index}`}
											sx={{ minWidth: '200px', position: 'relative' }}
											className='hovercollection'
											onClick={() => fillFromCollection(hoodie)}>
											<img key='border-color-img' className=' collection' src={borderSelectionList[hoodie.borderColorNum].logo} alt='Border' />
											<img key='fill-color-img' className=' collection' src={stitchFillSelectionList[hoodie.fillColorNum].logo} alt='Stitch' />
											{hoodie.gradientColorNum == null ? (
												<></>
											) : (
												<img
													key='gradient-color-img'
													className='  collection'
													src={stitchGradientSelectionList[hoodie.gradientColorNum].logo}
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
