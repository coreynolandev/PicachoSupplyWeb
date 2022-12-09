import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetSubmitOrder } from '../features/cartSlice';

const Completed = () => {
	const refNum = useSelector((state) => state.cart.previousOrderId);
	console.log(refNum);
	const dispatch = useDispatch();
	dispatch(resetSubmitOrder());
	return (
		<Box className='scroll-snap'>
			<Card raised sx={{ padding: 1, margin: 2 }}>
				<Stack spacing={0} direction='column' alignItems='center' justifyContent='center'>
					<Stack justifyContent='center' spacing={4} alignItems='center' className='landing-area'>
						<Typography variant='h3'>Thank you for choosing Picacho Supply!</Typography>
						<Typography variant='h5'>Your order reference number is {refNum}</Typography>
						<Typography variant='h3'>A team member will be reaching out shortly to confirm your order details and create an invoice on Stripe.</Typography>
						<Stack sx={{ direction: { xs: 'column', sm: 'row' } }} spacing={3} justifyContent='space-between'>
							<Button
								role={'link'}
								href='/shop'
								variant='contained'
								color='primary'
								size='large'
								className='animate__animated  animate__pulse animate__slower animate__delay-2s '
								sx={{ borderRadius: '24px' }}>
								Return to Home
							</Button>

							<Button
								role={'link'}
								href='/shop'
								variant='contained'
								color='primary'
								size='large'
								className='animate__animated  animate__pulse animate__slower animate__delay-2s '
								sx={{ borderRadius: '24px' }}>
								Keep Shopping
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Card>
		</Box>
	);
};

export default Completed;
