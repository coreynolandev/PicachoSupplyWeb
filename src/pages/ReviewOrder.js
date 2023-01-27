import { Box, Button, Card, Divider, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import HoodieForCheckout from '../components/design/HoodieForCheckout';
import { changeShippingAndHandlingCost, removeJustUpdated, updatePromosAdded } from '../features/cartSlice';
import HatForCheckout from '../components/design/HatForCheckout';

const ReviewOrder = ({ shippingAndHandlingCost }) => {
	var orders = useSelector((state) => state.cart.order);
	var promoCodes = useSelector((state) => state.cart.promoCode);
	const numberOfItemsInCart = orders.length;

	const justUpdated = useSelector((state) => state.cart.justUpdated);
	const dispatch = useDispatch();

	var sumOfTotalCost = 0;
	orders.map((item) => (sumOfTotalCost += item.quantity * item.cost));

	const [promoCodeValue, setPromoCodeValue] = useState('');
	const tryPromoCode = () => {
		const appliedPromo = promoCodes.find((promo) => promo.code.toUpperCase() === promoCodeValue.toUpperCase());
		if (appliedPromo) {
			switch (appliedPromo.valueChanged) {
				case 'S+H':
					dispatch(changeShippingAndHandlingCost(0));
					dispatch(updatePromosAdded({ type: 'S+H', message: 'Free S+H' }));
					setPromoSnackbarError(false);
					setPromoSnackbarOpen(true);
					break;
				default:
					console.log('no codes!');
			}
		} else {
			setPromoSnackbarOpen(true);
			setPromoSnackbarError(true);
			console.log('bad code');
		}
		// var cor = Object.values(promoCodes);
		// var cor2 = Object.keys(promoCodes);
		// console.log(cor2);
		// console.log(cor);
		// if (promoCodeValue.toUpperCase() === )
		// useDispatch(changeShippingAndHandlingCost())
	};

	const [promoSnackbarError, setPromoSnackbarError] = useState(false);

	// TODO: make this scroll down if u have a big checkout list
	const OrderDetails = () => {
		return (
			<Box key='allOrderDetails' sx={{ width: { sm: '100%', md: '33.3333%' }, marginLeft: { sm: 'inherit', md: '1rem' } }}>
				<Card m={1} raised>
					<Typography variant='h4'>Order Details</Typography>
					<Stack direction='column' justifyContent='space-between' spacing={2} m={2}>
						{orders.map((item, index) => {
							return (
								<Stack key={`type-quantity-cost-${index}`} direction='row' justifyContent='space-between'>
									<Typography key={`type-quantity-x-${index}`}>
										{item.type} x{item.quantity}
									</Typography>
									<Typography key={`cost-quantity-x-${index}`}>
										${item.cost.toFixed(2)} x{item.quantity}
									</Typography>
								</Stack>
							);
						})}
						<Divider />
						<Stack direction='row' justifyContent='space-between'>
							<Typography key='item-total-label'>Item Total</Typography>
							<Typography key='item-total-cost'>${sumOfTotalCost.toFixed(2)}</Typography>
						</Stack>
						<Stack direction='row' justifyContent='space-between'>
							<Typography key='s-h-est-label'>Est. S+H</Typography>
							<Typography key='s-h-est-cost'>${shippingAndHandlingCost.toFixed(2)}</Typography>
						</Stack>

						<Divider />

						<Stack direction='row' justifyContent='space-between'>
							<Typography key='cart-total-label'>Total</Typography>
							<Typography key='cart-total-cost'>${(sumOfTotalCost + shippingAndHandlingCost).toFixed(2)}</Typography>
						</Stack>

						<TextField
							name={'Promo Code'}
							// error={}
							size='medium'
							type={'text'}
							onChange={(e) => setPromoCodeValue(e.target.value.toUpperCase())}
							value={promoCodeValue}
							fullWidth={true}
							placeholder={'Enter Promo Code'}
							label={'Promo Code'}
							InputProps={{
								endAdornment: (
									<Button color='secondary' variant='contained' onClick={() => tryPromoCode()}>
										Apply
									</Button>
								)
							}}
						/>

						<Stack direction='row' justifyContent='center'>
							<Button variant='contained'>
								<Link to='/checkout' style={{ textDecoration: 'none', color: 'white' }}>
									Proceed to Checkout
								</Link>
							</Button>
						</Stack>
					</Stack>
				</Card>
			</Box>
		);
	};

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [promoSnackbarOpen, setPromoSnackbarOpen] = useState(false);

	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	var clickawayCount = 0;
	const handlePromoSnackbarClose = (event, reason) => {
		if (reason === 'clickaway' && clickawayCount < 1) {
			clickawayCount++;
			return;
		}
		setPromoSnackbarOpen(false);
		setPromoSnackbarError(false);
		clickawayCount = 0;
	};
	const handleUpdatedSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			dispatch(removeJustUpdated());

			return;
		}
		console.log('removing just updated');
		dispatch(removeJustUpdated());
	};

	return (
		<div key='checkout-container' className='checkout container'>
			<Snackbar
				sx={{ marginTop: { xs: '80px !important', sm: '64px !important' } }}
				anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
				open={snackbarOpen}
				autoHideDuration={5000}
				onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity='info' sx={{ width: '100%' }}>
					Removed Item
				</Alert>
			</Snackbar>
			{justUpdated && (
				<Snackbar
					sx={{ marginTop: { xs: '80px !important', sm: '64px !important' } }}
					anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
					open={true}
					autoHideDuration={5000}
					onClose={handleUpdatedSnackbarClose}>
					<Alert onClose={handleUpdatedSnackbarClose} severity='success' sx={{ width: '100%' }}>
						Updated Item
					</Alert>
				</Snackbar>
			)}

			<Snackbar
				sx={{ minWidth: '300px', width: '100%', maxWidth: '600px', marginTop: { xs: '80px !important', sm: '64px !important' } }}
				anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
				open={promoSnackbarOpen}
				autoHideDuration={5000}
				onClose={handlePromoSnackbarClose}>
				<Alert onClose={handlePromoSnackbarClose} severity={promoSnackbarError ? 'error' : 'success'} sx={{ width: '100%' }}>
					{promoSnackbarError ? <span>Invalid Promo Code</span> : <span>Success! Enjoy the free stuff</span>}
				</Alert>
			</Snackbar>
			<Typography key='reviewOrder' variant='h2'>
				Review Order
			</Typography>

			<Stack key='all-cart-items' direction={{ sm: 'column', md: 'row' }} justifyContent='center'>
				{numberOfItemsInCart > 0 ? (
					<>
						<Stack key='main-hoodie-stack-items' direction='column' spacing={2} sx={{ width: { sm: '100%', md: '66.666%' }, height: '100%' }} mb={2}>
							{orders.map((hoodie, index) => {
								if (hoodie.type.includes('Hoodie')) {
									return <HoodieForCheckout key={`hoodie-for-checkout-${index}`} hoodie={hoodie} index={index} setSnackbarOpen={setSnackbarOpen} />;
								}
								if (hoodie.type.includes('Hat')) {
									return <HatForCheckout key={`hat-for-checkout-${index}`} hat={hoodie} index={index} setSnackbarOpen={setSnackbarOpen} />;
								} else {
									return <HoodieForCheckout key={`hoodie-for-checkout-${index}`} hoodie={hoodie} index={index} setSnackbarOpen={setSnackbarOpen} />;
								}
							})}
						</Stack>
						{OrderDetails()}
					</>
				) : (
					<Card key='empty-hoodie-cart' raised sx={{ width: { sm: '100%', md: '820px' } }}>
						<Stack direction='column' alignItems='center' justifyContent={'center'} m={2} spacing={2}>
							<Typography key='no-item-text'>No Items in Cart</Typography>
							<Button key='no-item-browseHoodieButton' m={3} variant='contained' component='a' href='/shop'>
								Browse Our Products
							</Button>
						</Stack>
					</Card>
				)}
			</Stack>
		</div>
	);
};

export default ReviewOrder;
