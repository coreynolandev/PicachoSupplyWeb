import { Box, Button, Card, Divider, Snackbar, Stack, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import HoodieForCheckout from '../components/design/HoodieForCheckout';

const ReviewOrder = () => {
	var orders = useSelector((state) => state.cart.order);
	const numberOfItemsInCart = orders.length;

	var sumOfTotalCost = 0;
	orders.map((item) => (sumOfTotalCost += item.quantity * item.cost));

	const OrderDetails = () => {
		return (
			<Box key='allOrderDetails' sx={{ width: { sm: '100%', md: '33.3333%' }, marginLeft: { sm: 'inherit', md: '1rem' } }}>
				<Card m={1} raised>
					<Typography variant='h4'>Order Details</Typography>
					<Stack direction='column' justifyContent='space-between' spacing={2} m={2}>
						{orders.map((item, index) => {
							return (
								<Stack key={`type-quantity-cost-${index}`} direction='row' justifyContent='space-between'>
									<Typography>
										{item.type} x{item.quantity}
									</Typography>
									<Typography>
										${item.cost.toFixed(2)} x{item.quantity}
									</Typography>
								</Stack>
							);
						})}
						<Divider />
						<Stack direction='row' justifyContent='space-between'>
							<Typography>Item Total</Typography>
							<Typography>${sumOfTotalCost.toFixed(2)}</Typography>
						</Stack>
						<Stack direction='row' justifyContent='space-between'>
							<Typography>Est. S+H</Typography>
							<Typography>$12.00</Typography>
						</Stack>

						<Divider />

						<Stack direction='row' justifyContent='space-between'>
							<Typography>Total</Typography>
							<Typography>${(sumOfTotalCost + 12).toFixed(2)}</Typography>
						</Stack>

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
		<div key='checkout-container' className='checkout container'>
			<Snackbar sx={{ marginTop: '80px' }} anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity='info' sx={{ width: '100%' }}>
					Removed Item
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
								return <HoodieForCheckout hoodie={hoodie} index={index} setSnackbarOpen={setSnackbarOpen} />;
							})}
						</Stack>
						{OrderDetails()}
					</>
				) : (
					<Card key='empty-hoodie-cart' raised sx={{ width: { sm: '100%', md: '820px' } }}>
						<Stack direction='column' alignItems='center' justifyContent={'center'} m={2} spacing={2}>
							<Typography key='no-item-text'>No Items in Cart</Typography>
							<Button key='no-item-browseHoodieButton' m={3} variant='contained' component='a' href='/hoodies'>
								Browse Our Hoodies!
							</Button>
						</Stack>
					</Card>
				)}
			</Stack>
		</div>
	);
};

export default ReviewOrder;
