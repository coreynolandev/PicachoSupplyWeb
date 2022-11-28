import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import QuantitySelector from '../components/buttons/QuantitySelector';
import OrderItemDetail from '../components/design/OrderItemDetail';
import { emptyCart, removeItem } from '../features/cartSlice';

const ReviewOrder = () => {
	const [hoodieOrPreview, setHoodieOrPreview] = useState('hoodie');

	var cart = useSelector((state) => state.cart);
	var orders = cart?.order;
	const numberOfItemsInCart = orders.length;

	var sumOfTotalCost = 0;
	orders.map((item) => (sumOfTotalCost += item.quantity * item.cost));

	const dispatch = useDispatch();

	const deleteItemFromOrder = (id) => {
		dispatch(removeItem(id));
	};

	const OrderDetails = () => {
		return (
			<Box sx={{ width: { sm: '100%', md: '33.3333%' }, marginLeft: { sm: 'inherit', md: '1rem' } }}>
				<Card m={1} raised>
					<Typography variant='h4'>Order Details</Typography>
					<Stack direction='column' justifyContent='space-between' spacing={2} m={2}>
						{orders.map((item) => {
							return (
								<Stack direction='row' justifyContent='space-between'>
									<Typography>
										{item.type} x{item.quantity}
									</Typography>
									<Typography>
										${item.cost} x{item.quantity}
									</Typography>
								</Stack>
							);
						})}
						<Divider />
						<Stack direction='row' justifyContent='space-between'>
							<Typography>Item Total</Typography>
							<Typography>${sumOfTotalCost}</Typography>
						</Stack>
						<Stack direction='row' justifyContent='space-between'>
							<Typography>Est. S+H</Typography>
							<Typography>$12</Typography>
						</Stack>

						<Divider />

						<Stack direction='row' justifyContent='space-between'>
							<Typography>Total</Typography>
							<Typography>${sumOfTotalCost + 12}</Typography>
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
				<Box position={'relative'} className='hoodie-stitch container'>
					{hoodie.borderColorImg && <img className='toxic-wave-logo hoodie-stitch-only outline' src={hoodie.borderColorImg} alt='Border' />}
					{hoodie.fillColorImg && <img className='toxic-wave-logo hoodie-stitch-only stitch' src={hoodie.fillColorImg} alt='Stitch' />}
					{hoodie.gradientColorImg && <img className='toxic-wave-logo hoodie-stitch-only stitch gradient' src={hoodie.gradientColorImg} alt='Gradient' />}
					{hoodie.baseColorImg && <img className='hoodie-base hoodie-stitch-only hoodie' src={hoodie.baseColorImg} alt='Hoodie' />}
				</Box>
			</>
		);

		return (
			<Card key={`realhoodie${index}`} raised>
				<Stack direction={{ sm: 'column', md: 'row' }} spacing={3} p={2} justifyContent='space-between' alignItems='center'>
					<Stack direction='column' spacing={1} alignItems='center'>
						<Box
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
							color={hoodieOrPreview === 'hoodie' ? 'warning' : 'secondary'}
							variant={hoodieOrPreview === 'hoodie' ? 'contained' : 'contained'}
							onClick={(event) => (hoodieOrPreview === 'hoodie' ? setHoodieOrPreview('preview') : setHoodieOrPreview('hoodie'))}
							sx={{ width: '200px', marginBottom: 1 }}>
							{hoodieOrPreview === 'hoodie' ? 'Show Logo' : 'Show Hoodie'}
						</Button>
					</Stack>

					<Stack direction='column' spacing={1} alignSelf={{ sm: 'center', md: 'flex-end' }} alignItems='center' sx={{ width: '100%', maxWidth: '300px' }} mt={2}>
						<Typography variant='h6' sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{hoodie.type}
						</Typography>
						<OrderItemDetail label='Base' value={hoodie.baseColor} />
						<OrderItemDetail label='Border' value={hoodie.borderColor} />
						<OrderItemDetail label='Fill' value={hoodie.fillColor} />
						<OrderItemDetail label='Gradient' value={hoodie.gradientColor} />
						{/* {hoodie.gradientColor && } */}
						<OrderItemDetail label='Size' value={hoodie.size} />
						<QuantitySelector orderItem={hoodie} />
						<Stack direction='row' spacing={2} justifyContent='center' sx={{ marginTop: '2rem !important' }}>
							<Button variant='contained'>
								<Link to={'/hoodies'} state={{ editId: hoodie.id }} style={{ textDecoration: 'none', color: 'white' }}>
									Edit
								</Link>
							</Button>
							<Button color='error' variant='outlined' onClick={() => deleteItemFromOrder(hoodie.id)}>
								Remove
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Card>
		);
	};

	const emptyMyCart = () => {
		dispatch(emptyCart());
	};

	return (
		<div className='checkout container'>
			<Typography variant='h2'>Review Order</Typography>

			<Stack direction={{ sm: 'column', md: 'row' }} justifyContent='center'>
				{numberOfItemsInCart > 0 ? (
					<>
						<Stack direction='column' spacing={2} sx={{ width: { sm: '100%', md: '66.666%' }, height: '100%' }} mb={2}>
							{orders.map((hoodie, index) => {
								return RealHoodie(hoodie, index);
							})}
						</Stack>
						{OrderDetails()}
					</>
				) : (
					<Card raised>
						<Stack direction='column' alignItems='center' justifyContent={'center'} m={2} spacing={2}>
							<Typography>No Items in Cart</Typography>
							<Button m={3} variant='contained' component='a' href='/hoodies'>
								Browse Our Hoodies!
							</Button>
						</Stack>
					</Card>
				)}
				{/* {numberOfItemsInCart < 1 ? (
					<Card raised>
						<Stack direction='column' alignItems='center' m={2} spacing={2}>
							<Typography>No Items in Cart</Typography>
							<Button m={3} variant='contained' component='a' href='/hoodies'>
								Browse Our Hoodies!
							</Button>
						</Stack>
					</Card>
				) : (
					OrderDetails()
				)} */}
			</Stack>
		</div>
	);
};

export default ReviewOrder;