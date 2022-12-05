import { Box, Button, Card, Checkbox, Divider, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import FormInputText from '../components/design/FormInputText';
import { sendTestEmail } from '../api/sendOrderEmail';
import { AddressAutofill } from '@mapbox/search-js-react';

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
					{orders.map((item, index) => {
						return (
							<Stack key={`type-quantity-cost-checkout-${index}`} direction='row' justifyContent='space-between'>
								<Typography sx={{ textAlign: 'left' }}>
									{item.type} x{item.quantity}
								</Typography>
								<Typography sx={{ marginLeft: '3rem' }}>
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
						<Typography>Est. Total</Typography>
						<Typography>${(sumOfTotalCost + 12).toFixed(2)}</Typography>
					</Stack>
				</Stack>
			</Box>
		);
	};

	const [subscribe, setSubscribe] = useState(true);

	const defaultValues = {
		email: '',
		phoneNumber: '',
		name: '',
		orders: orders,
		questions: '',
		address: '',
		apartment: '',
		city: '',
		state: '',
		postcode: '',
		wantsToSubscribe: subscribe
	};

	const { handleSubmit, register, control } = useForm({ defaultValues });
	const myForm = useRef(null);

	const sendEmail = async (formData) => {
		const templateType = 'template_b78fphq';
		const sendEmail = false;
		// console.log(formData.orders.length);

		var orderHtml = '<p>';
		formData.orders.map(
			(order, index) =>
				(orderHtml += `<br/>Item # ${index + 1} - ${order.type}
	<br/> &emsp;Hoodie Base Color: ${order.baseColor}
	<br/> &emsp;Border Color: ${order.borderColor}
	<br/> &emsp;Fill Color: ${order.fillColor}
	<br/> &emsp;Gradient Color: ${order.gradientColor ? order.gradientColor : 'N/A'}
	<br/> &emsp;Size: ${order.size}
	<br/> &emsp;Quantity: ${order.quantity}
	<br/> &emsp;Cost: ${order.cost}
	<br/>

`)
		);
		orderHtml += '</p>';

		let emailHtml = `<a href='mailto: ${formData.email}?subject=Picacho%20Order%20Confirmation'>${formData.email}</a>`;
		let phoneHtml = `<a href='tel:${formData.phoneNumber}'>${formData.phoneNumber}</a>`;
		let formAddressQuery = '';
		if (formData.address) {
			formAddressQuery += formData.address;
			if (formData.apartment) {
				formAddressQuery += ' ' + formData.apartment + ',';
			} else {
				formAddressQuery += ',';
			}

			if (formData.city) {
				formAddressQuery += formData.city + ',';
				if (formData.state) {
					formAddressQuery += formData.state + ',';
					if (formData.postcode) {
						formAddressQuery += formData.postcode + ',';
					}
				}
			}
		}

		let addressHtml = `<a href='http://maps.google.com/maps?q=${formAddressQuery}'>View Address</a>`;

		let htmlFormData = {
			...formData,
			orderDetailsHtml: orderHtml,
			emailHtml: emailHtml,
			phoneHtml: phoneHtml,
			addressHtml: addressHtml
		};

		console.log(htmlFormData);

		sendEmail && sendTestEmail(htmlFormData, templateType);
	};

	return (
		<div className='checkout container'>
			<Typography variant='h2'>Confirm your Order Request</Typography>
			<Card raised sx={{ padding: '1rem', margin: '1rem auto', maxWidth: '800px', width: '100%', minWidth: '300px', alignSelf: 'center' }}>
				<Stack direction='column' spacing={2}>
					<Typography>We handle secure payment using Stripe. A team member will contact you shortly to confirm your order!</Typography>
					{OrderDetails()}

					<form onSubmit={handleSubmit(sendEmail)} ref={myForm}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant='h6' sx={{ textAlign: 'left' }}>
									Contact Info
								</Typography>
							</Grid>
							<FormInputText
								key='name'
								showErrors={false}
								isRequired={true}
								name='name'
								alwaysFull={true}
								type='name'
								control={control}
								label='Full Name'
								autoComplete='given-name'
								id='name'
							/>
							<FormInputText
								key='email'
								showErrors={false}
								isRequired={true}
								type='email'
								alwaysFull={true}
								name='email'
								control={control}
								label='Email'
								autoComplete='email'
								id='email'
							/>
							<FormInputText
								key='phoneNumber'
								showErrors={false}
								isRequired={true}
								alwaysFull={true}
								type='tel'
								name='phoneNumber'
								control={control}
								label='Phone Number'
								autoComplete='tel'
								id='phoneNumber'
							/>

							<Grid item xs={12}>
								<Typography variant='h6' sx={{ textAlign: 'left' }}>
									Shipping Info
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<AddressAutofill accessToken='pk.eyJ1IjoiY29yZXlwaWNhY2hvIiwiYSI6ImNsYmI2cHdmbjBnZTI0MG1rM284OWgwcjUifQ.9NuczsXFBN3TDJ8Zgyigfg'>
									<FormInputText
										key='Address'
										showErrors={false}
										isRequired={true}
										alwaysFull
										name='address'
										placeholder='Begin Typing Address...'
										type='text'
										control={control}
										label='Address'
										autoComplete='address-line1'
										id='Address'
									/>
								</AddressAutofill>
							</Grid>
							<FormInputText
								key='Apartment'
								id='Apartment'
								label='Address Line 2'
								placeholder='Apt, Unit, Building, Floor, etc.'
								control={control}
								name='apartment'
								type='text'
								autoComplete='address-line2'
							/>
							<FormInputText
								threeLine={true}
								key='City'
								id='City'
								label='City'
								control={control}
								isRequired={true}
								name='city'
								type='text'
								autoComplete='address-level2'
							/>
							<FormInputText
								key='State'
								id='State'
								label='State'
								size='medium'
								control={control}
								threeLine={true}
								isRequired={true}
								variant='outlined'
								name='state'
								type='text'
								autoComplete='address-level1'
							/>
							<FormInputText
								key='Postcode'
								id='Postcode'
								label='Zip Code'
								threeLine={true}
								control={control}
								isRequired={true}
								variant='outlined'
								name='postcode'
								type='text'
								autoComplete='postal-code'
							/>
							<Grid item xs={12}>
								<Typography variant='h6' sx={{ textAlign: 'left' }}>
									Questions or Additional Requests?
								</Typography>
							</Grid>
							<FormInputText
								key='questions'
								showErrors={false}
								isRequired={false}
								type='text'
								name='questions'
								control={control}
								alwaysFull
								multiline
								// label='Questions or Additional Requests'
								id='questions'
								// variant='filled'
							/>
							<input
								readOnly
								hidden
								{...register('requestDate')}
								value={new Date().toLocaleString('en-US', {
									timeZone: 'America/New_York',
									hourCycle: 'h23',
									hour: '2-digit',
									minute: '2-digit',
									timeZoneName: 'short',
									year: 'numeric',
									month: '2-digit',
									day: '2-digit'
								})}
							/>

							<input readOnly hidden {...register('totalCostMinusSandH')} value={sumOfTotalCost} />

							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox checked={subscribe} {...register('wantsToSubscribe')} onClick={() => setSubscribe(!subscribe)} />}
									label='Subscribe to our newsletter'
								/>
							</Grid>
						</Grid>

						<Stack direction='row' justifyContent='center' spacing={3} mt={2}>
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
