import { Alert, Box, Button, Card, Divider, Snackbar, Stack, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import QuantitySelector from '../components/buttons/QuantitySelector';
import OrderItemDetail from '../components/design/OrderItemDetail';
import { removeItem } from '../features/cartSlice';
import MuiAlert from '@mui/material/Alert';

const ReviewOrder = () => {
	var cart = useSelector((state) => state.cart);
	var orders = cart?.order;
	const numberOfItemsInCart = orders.length;

	var sumOfTotalCost = 0;
	orders.map((item) => (sumOfTotalCost += item.quantity * item.cost));

	const dispatch = useDispatch();

	const deleteItemFromOrder = (id) => {
		dispatch(removeItem(id));
		setSnackbarOpen(true);
	};

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
										${(item.cost).toFixed(2)} x{item.quantity}
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
	const [hoodieOrPreview, setHoodieOrPreview] = useState('hoodie');

	const RealHoodie = (hoodie, index) => {

		const FullHoodie = () => (
			<>
				{hoodie !== null && hoodie.borderColorImg && <img className='toxic-wave-logo hoodie-stitch outline' src={hoodie.borderColorImg} alt='Border' />}
				{hoodie !== null && hoodie.fillColorImg && <img className='toxic-wave-logo hoodie-stitch stitch' src={hoodie.fillColorImg} alt='Stitch' />}
				{hoodie !== null && hoodie.gradientColorImg && <img className='toxic-wave-logo hoodie-stitch stitch gradient' src={hoodie.gradientColorImg} alt='Gradient' />}
				{hoodie !== null && hoodie.baseColorImg && <img className='hoodie-base hoodie-stitch hoodie' src={hoodie.baseColorImg} alt='Hoodie' />}
			</>
		);

		const ZoomedLogo = () => (
			<>
				<Box key={`zoomedLogo-${index}`} position={'relative'} className='hoodie-stitch container'>
					{hoodie.borderColorImg && <img className='toxic-wave-logo hoodie-stitch-only outline' src={hoodie.borderColorImg} alt='Border' />}
					{hoodie.fillColorImg && <img className='toxic-wave-logo hoodie-stitch-only stitch' src={hoodie.fillColorImg} alt='Stitch' />}
					{hoodie.gradientColorImg && <img className='toxic-wave-logo hoodie-stitch-only stitch gradient' src={hoodie.gradientColorImg} alt='Gradient' />}
					{hoodie.baseColorImg && <img className='hoodie-base hoodie-stitch-only hoodie' src={hoodie.baseColorImg} alt='Hoodie' />}
				</Box>
			</>
		);

		return (
			<Card key={`realhoodie${index}`} raised>
				<Stack key={`wholeOrderStack-${index}`} direction={{ sm: 'column', md: 'row' }} spacing={3} p={2} justifyContent='space-between' alignItems='center'>
					<Stack key={`hoodieImage-${index}`} direction='column' spacing={1} alignItems='center'>
						<Box
							key={`fullorzoomedhoodie-${index}`}
							component='div'
							sx={{
								overflow: 'hidden',
								minWidth: '300px',
								width: '30%'
							}}
							position={'relative'}
							className='hoodie-stitch container '>
							{hoodieOrPreview === 'hoodie' ? FullHoodie() : ZoomedLogo()}
						</Box>
						<Button
							key={`fullorzoomedhoodiebutton-${index}`}
							color={hoodieOrPreview === 'hoodie' ? 'viewEmbroidery' : 'viewHoodie'}
							variant={hoodieOrPreview === 'hoodie' ? 'contained' : 'contained'}
							onClick={(event) => (hoodieOrPreview === 'hoodie' ? setHoodieOrPreview('preview') : setHoodieOrPreview('hoodie'))}
							sx={{ width: '200px', marginBottom: 1 }}>
							{hoodieOrPreview === 'hoodie' ? 'View Embroidery' : 'View Hoodie'}
						</Button>
					</Stack>

					<Stack
						key={`orderItemList-${index}`}
						direction='column'
						spacing={1}
						alignSelf={{ sm: 'center', md: 'flex-end' }}
						alignItems='center'
						sx={{ width: '100%', maxWidth: '300px' }}
						mt={2}>
						<Typography key={`itemtype-${index}`} variant='h6' sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{hoodie.type}
						</Typography>
						<OrderItemDetail key={`orderItem-Base-${index}`} label='Base' value={hoodie.baseColor} />
						<OrderItemDetail key={`orderItem-Border-${index}`} label='Border' value={hoodie.borderColor} />
						<OrderItemDetail key={`orderItem-Fill-${index}`} label='Fill' value={hoodie.fillColor} />
						<OrderItemDetail key={`orderItem-Gradient-${index}`} label='Gradient' value={hoodie.gradientColor} />
						<OrderItemDetail key={`orderItem-Size-${index}`} label='Size' value={hoodie.size} />
						<QuantitySelector key={`quantitySelector-${index}`} orderItem={hoodie} />
						<Stack direction='row' spacing={2} justifyContent='center' sx={{ marginTop: '2rem !important' }}>
							<Button key={`edithoodie-${index}`} variant='contained' color='edit'>
								<Link to={'/hoodies'} state={{ editId: hoodie.id }} style={{ textDecoration: 'none', color: 'black' }}>
									Edit
								</Link>
							</Button>
							<Button key={`removehoodie-${index}`} color='error' variant='outlined' onClick={() => deleteItemFromOrder(hoodie.id)}>
								Remove
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Card>
		);
	};

	// const emptyMyCart = () => {
	// 	dispatch(emptyCart());
	// };

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
								return RealHoodie(hoodie, index);
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
