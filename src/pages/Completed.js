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
						<Typography variant='h5'>
							You should receive a receipt of your order request from sales@picachosupply.com. If you don't receive an email soon, reach out to
							{' '}<Typography component='a' href='mailto: sales@picachosupply.com?subject=Picacho%20Supply%20Inquiry'>
								sales@picachosupply.com
							</Typography>{' '}
							with your reference number: <h6>{refNum}</h6>
						</Typography>
						<Typography variant='h5'>
							Additionally, a team member will be reaching out shortly to confirm your order details and create an invoice on Stripe.
						</Typography>
						<Stack sx={{ direction: { xs: 'column', sm: 'row' } }} spacing={3} justifyContent='space-between'>
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
