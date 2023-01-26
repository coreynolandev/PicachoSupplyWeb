import { Box, Button, Grid, Snackbar, Stack, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import CC_BACK from '../assets2/explorer-hat/CC_BACK.jpg';
import CC_FRONT from '../assets2/explorer-hat/CC_FRONT.jpg';
import CC_INNER from '../assets2/explorer-hat/CC_INNER.jpg';
import CC_SIDE from '../assets2/explorer-hat/CC_SIDE.jpg';
import GW_BACK from '../assets2/explorer-hat/GW_BACK.jpg';
import GW_FRONT from '../assets2/explorer-hat/GW_FRONT.jpg';
import GW_INNER from '../assets2/explorer-hat/GW_INNER.jpg';
import GW_SIDE from '../assets2/explorer-hat/GW_SIDE.jpg';
import PBC_BACK from '../assets2/explorer-hat/PBC_BACK.jpg';
import PBC_FRONT from '../assets2/explorer-hat/PBC_FRONT.jpg';
import PBC_INNER from '../assets2/explorer-hat/PBC_INNER.jpg';
import PBC_SIDE from '../assets2/explorer-hat/PBC_SIDE.jpg';
import { addHoodie, updateHoodie } from '../features/cartSlice';

export const EXPLORER_HATS = [
	{ colorName: 'Cream & Chocolate', mainPic: CC_FRONT, sidePic: CC_SIDE, backPic: CC_BACK, innerPic: CC_INNER, order: 0, cost: 32.95 },
	{ colorName: 'Garnet & White', mainPic: GW_FRONT, sidePic: GW_SIDE, backPic: GW_BACK, innerPic: GW_INNER, order: 1, cost: 32.95 },
	{ colorName: 'Powder Blue & Chartreuse', mainPic: PBC_FRONT, sidePic: PBC_SIDE, backPic: PBC_BACK, innerPic: PBC_INNER, order: 2, cost: 32.95 }
];

const ExplorerHat = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const orders = useSelector((state) => state.cart.order);
	const { editId } = location.state || { editId: null };
	const editItem = editId ? orders.find((item) => item.id === editId) : null;
	const editMode = editItem !== null;

	console.log(editItem);
	const [selectedHat, setSelectedHat] = useState(editItem ? editItem.colorNameId : 0);
	const [selectedPreview, setSelectedPreview] = useState(0);
	const previewedHat = EXPLORER_HATS[selectedHat];
	const previewedImage =
		selectedPreview === 0
			? previewedHat.mainPic
			: selectedPreview === 1
			? previewedHat.sidePic
			: selectedPreview === 2
			? previewedHat.backPic
			: selectedPreview === 3
			? previewedHat.innerPic
			: previewedHat.mainPic;

	const defaultAddOrUpdateTitle = editMode ? 'Update Item' : 'Add to Cart';
	const [addOrUpdateButtonTitle, setAddOrUpdateButtonTitle] = useState(defaultAddOrUpdateTitle);
	const defaultAddOrUpdateCompleteTitle = editMode ? 'Updated Item!' : 'Added to Cart!';

	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};
	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});

	const addToCart = () => {
		console.log('hat: ' + EXPLORER_HATS[selectedHat].colorName);
		// Need a hoodie base, border color, and size to be able to add
		if (selectedHat !== null && selectedHat >= 0 && selectedHat <= 3) {
			// TODO: FINISH
			setAddOrUpdateButtonTitle(editMode ? 'Updating...' : 'Adding...');
			var id = editMode ? editId : uuid();
			const hat = {
				id: id,
				colorName: EXPLORER_HATS[selectedHat].colorName,
				colorNameId: selectedHat,
				quantity: 1,
				cost: 32.5,
				type: 'Explorer Hat',
				viewDetails: false
			};

			if (editItem) {
				const oldHat = orders.find((it) => it.id === id);
				// Keep quantity if in edit mode
				if (oldHat) {
					hat.quantity = oldHat.quantity;
				}
				var updated = dispatch(updateHoodie(hat));
				console.log(updated);
				navigate('/review-order');
			} else {
				var added = dispatch(addHoodie(hat));
				console.log(added);
			}
			setAddOrUpdateButtonTitle(defaultAddOrUpdateCompleteTitle);
			setSnackbarOpen(true);
		}
		window.scrollBy(0, -1);
	};

	return (
		<div className='explorer-hat-container'>
			<Typography variant='h4'>The Explorer Hat</Typography>

			<Grid container mb={3} mt={1}>
				<Grid item sx={{ display: { xs: 'inherit', sm: 'none' }, marginBottom: { xs: 2, sm: 0 } }}>
					<img style={{ width: '100%' }} src={previewedImage} alt={`${previewedHat.colorName} Preview`} />
				</Grid>
				<Grid item xs={12} sm={3} md={4}>
					<Grid container columns={{ xs: 12, sm: 3 }}>
						<Grid item xs={6}>
							<img
								onClick={() => setSelectedPreview(0)}
								className={`test-small-pic cord-hat-image-ratio ${0 === selectedPreview ? 'selected' : ''}`}
								src={previewedHat.mainPic}
								alt={`${previewedHat.colorName} Front`}
							/>
						</Grid>
						<Grid item xs={6}>
							<img
								onClick={() => setSelectedPreview(1)}
								className={`test-small-pic cord-hat-image-ratio ${1 === selectedPreview ? 'selected' : ''}`}
								src={previewedHat.sidePic}
								alt={`${previewedHat.colorName} Side`}
							/>
						</Grid>

						<Grid item xs={6}>
							<img
								onClick={() => setSelectedPreview(2)}
								className={`test-small-pic cord-hat-image-ratio ${2 === selectedPreview ? 'selected' : ''}`}
								src={previewedHat.backPic}
								alt={`${previewedHat.colorName} Back`}
							/>
						</Grid>

						<Grid item xs={6}>
							<img
								onClick={() => setSelectedPreview(3)}
								className={`test-small-pic cord-hat-image-ratio ${3 === selectedPreview ? 'selected' : ''}`}
								src={previewedHat.innerPic}
								alt={`${previewedHat.colorName} Inside`}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={9} md={8} sx={{ display: { xs: 'none', sm: 'inherit' } }}>
					<Box alignSelf={'center'} sx={{ width: '100%', maxWidth: '650px', marginLeft: { xs: 0, sm: '8px' } }}>
						<img className='cord-hat-image-ratio' style={{ width: '100%' }} src={previewedImage} alt={`${previewedHat.colorName} Preview`} />
					</Box>
				</Grid>
			</Grid>

			<Typography variant='h5'>CHOOSE A COLOR</Typography>
			{/* <Grid container */}

			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Stack direction='row' spacing={2} p={2} sx={{ overflowX: 'scroll' }}>
					{EXPLORER_HATS.map((hat, index) => {
						return (
							<Stack direction='column' className='cord-hat-scroll' mb={1}>
								<img
									className={`cord-hat-image-ratio ${index === selectedHat ? 'selected' : ''}`}
									style={{ height: 'auto', width: '100%' }}
									onClick={() => setSelectedHat(index)}
									src={hat.mainPic}
									alt={`${hat.colorName} Main`}
								/>
								<Typography variant='body1'>{hat.colorName}</Typography>
							</Stack>
						);
					})}
				</Stack>
				{/* <Grid container spacing={1} sx={{ width: { xs: '100%', sm: '90%' } }}>
					{EXPLORER_HATS.map((hat, index) => {
						return (
							<Grid item xs={4} sm={4}>
								<img
									className={`cord-hat-image-ratio ${index === selectedHat ? 'selected' : ''}`}
									style={{ height: 'auto', width: '100%' }}
									onClick={() => setSelectedHat(index)}
									src={hat.mainPic}
									alt={`${hat.colorName} Main`}
								/>
								<Typography variant='caption'>{hat.colorName}</Typography>
							</Grid>
						);
					})}
				</Grid> */}
			</Box>

			{/* TODO: make it so it updates! */}
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Button color={editMode ? 'edit' : 'primary'} variant={'contained'} onClick={addToCart} sx={{ width: { xs: '100%', sm: '90%' } }}>
					{addOrUpdateButtonTitle}
				</Button>
			</Box>

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
		</div>
	);
};

export default ExplorerHat;
