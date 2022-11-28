import { Box, Button, Card, Divider, FormGroup, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import FormInputText from '../components/design/FormInputText';

const Checkout = () => {
	var cart = useSelector((state) => state.cart);
	var orders = cart?.order;
	var sumOfTotalCost = 0;
	orders.map((item) => (sumOfTotalCost += item.quantity * item.cost));

	const OrderDetails = () => {
		return (
			<Box sx={{ border: '1px solid gray', borderRadius: '4px', alignSelf: 'center' }}>
				<Typography variant='h4'>Order Details</Typography>
				<Stack direction='column' justifyContent='space-between' spacing={2} m={2}>
					{orders.map((item) => {
						return (
							<Stack direction='row' justifyContent='space-between'>
								<Typography sx={{ textAlign: 'left' }}>
									{item.type} x{item.quantity}
								</Typography>
								<Typography sx={{ marginLeft: '3rem' }}>
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
				</Stack>
			</Box>
		);
	};

	const defaultValues = {
		email: '',
		phoneNumber: '',
		contactName: '',
		orders: orders,
		cart: cart
	};

	const { handleSubmit, reset, control, setValue, watch, register, getValues } = useForm({ defaultValues });

	const sendEmail = (formData) => {
		console.log(formData);
		// sendWithSES(formData);
		// console.log()
		// const templateType = isQuote ? 'template_unx8qqv' : 'template_ppm0qln';
		// const sendEmail = false;
		// sendEmail && sendTestEmail(formData, templateType);
		// setNotSaved(false);
	};

	const myForm = useRef(null);

	return (
		<div className='checkout container'>
			<Typography variant='h2'>Confirm your Order Request</Typography>
			<Card raised sx={{ padding: '1rem', margin: '1rem auto', maxWidth: '800px', width: '100%', minWidth: '300px', alignSelf: 'center' }}>
				<Stack direction='column' spacing={2}>
					<Typography>We handle secure payment outside of our website. We will contact you with the next steps.</Typography>
					{OrderDetails()}

					<form onSubmit={handleSubmit(sendEmail)} ref={myForm}>
						<FormInputText
							showErrors={false}
							isRequired={true}
							name='contactName'
							type='contactName'
							control={control}
							label='Name'
							autoComplete='given-name'
							id='contactName'
						/>
						<FormInputText showErrors={false} isRequired={true} type='email' name='email' control={control} label='Email' autoComplete='email' id='email' />
						<FormInputText
							showErrors={false}
							isRequired={true}
							type='tel'
							name='phoneNumber'
							control={control}
							label='Phone Number'
							autoComplete='tel'
							id='phoneNumber'
						/>
						<Stack direction='row' justifyContent='center' spacing={3}>
							<Button variant='contained' color='inherit'>
								<Link to={'/review-order'} style={{ textDecoration: 'none', color: 'black' }}>
									Back to Review Order
								</Link>
							</Button>

							<Button type='submit' variant='contained'>
								Submit Order
							</Button>
						</Stack>
					</form>
				</Stack>
			</Card>
		</div>
	);
};

export default Checkout;