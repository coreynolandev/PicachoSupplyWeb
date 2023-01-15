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

	const [selectedHat, setSelectedHat] = useState(0);
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
		window.scrollBy(0, -1);
		console.log('hat: ' + EXPLORER_HATS[selectedHat].colorName);
		// Need a hoodie base, border color, and size to be able to add
		if (selectedHat !== null && selectedHat >= 0 && selectedHat <= 3) {
			// TODO: FINISH
			setAddOrUpdateButtonTitle(editMode ? 'Updating...' : 'Adding...');
			var id = editMode ? editId : uuid();
			const hat = {
				id: id,
				colorName: EXPLORER_HATS[selectedHat].colorName,
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
				var updated = dispatch(updateHoodie(oldHat));
				console.log(updated);
				navigate('/review-order');
			} else {
				var added = dispatch(addHoodie(hat));
				console.log(added);
			}
			setAddOrUpdateButtonTitle(defaultAddOrUpdateCompleteTitle);
			setSnackbarOpen(true);
		}
	};

	return (
		<div className='explorer-hat-container'>
			<Typography variant='h5'>The Explorer Hat</Typography>

			<Grid container mb={4}>
				<Grid item sx={{ display: { xs: 'inherit', sm: 'none' }, marginBottom: { xs: 2, sm: 0 } }}>
					<img style={{ width: '100%' }} src={previewedImage} alt={`${previewedHat.colorName} Preview`} />
				</Grid>
				<Grid item xs={12} sm={3} md={4}>
					<Grid container columns={{ xs: 12, sm: 3 }}>
						<Grid item xs={6}>
							<img onClick={() => setSelectedPreview(0)} className='test-small-pic' src={previewedHat.mainPic} alt={`${previewedHat.colorName} Front`} />{' '}
						</Grid>
						<Grid item xs={6}>
							<img onClick={() => setSelectedPreview(1)} className='test-small-pic' src={previewedHat.sidePic} alt={`${previewedHat.colorName} Side`} />{' '}
						</Grid>

						<Grid item xs={6}>
							<img onClick={() => setSelectedPreview(2)} className='test-small-pic' src={previewedHat.backPic} alt={`${previewedHat.colorName} Back`} />{' '}
						</Grid>

						<Grid item xs={6}>
							<img onClick={() => setSelectedPreview(3)} className='test-small-pic' src={previewedHat.innerPic} alt={`${previewedHat.colorName} Inside`} />{' '}
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={9} md={8} sx={{ display: { xs: 'none', sm: 'inherit' } }}>
					<Box alignSelf={'center'} sx={{ width: '100%', maxWidth: '650px' }}>
						<img className='cord-hat-image-ratio' style={{ width: '100%' }} src={previewedImage} alt={`${previewedHat.colorName} Preview`} />
					</Box>
				</Grid>
			</Grid>

			<Typography variant='h6'>CHOOSE A COLOR</Typography>
			{/* <Grid container */}

			<Stack direction='row' justifyContent={'space-evenly'} spacing={2}>
				{EXPLORER_HATS.map((hat, index) => {
					return (
						<div>
							<img
								className='cord-hat-image-ratio'
								style={{ height: 'auto', width: '100%' }}
								onClick={() => setSelectedHat(index)}
								src={hat.mainPic}
								alt={`${hat.colorName} Main`}
							/>
							<Typography>{hat.colorName}</Typography>
						</div>
					);
				})}
			</Stack>

			<Stack justifyContent='space-between' spacing={1} direction='row'>
				<Button fullWidth color={editMode ? 'edit' : 'primary'} variant={'contained'} onClick={addToCart}>
					{addOrUpdateButtonTitle}
				</Button>
			</Stack>

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
