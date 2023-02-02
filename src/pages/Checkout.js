import { Box, Button, Card, Checkbox, Divider, FormControlLabel, Grid, Snackbar, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { forwardRef, useEffect, useRef, useState } from 'react';
import FormInputText from '../components/design/FormInputText';
import { AddressAutofill } from '@mapbox/search-js-react';
import { addToSubscription, processOrderAsync, resetSubmitOrder, sendCustomerOrderReceipt } from '../features/cartSlice';
import MuiAlert from '@mui/material/Alert';
import ProcessingTimeout from '../components/design/ProcessingTimeout';
import Reaptcha from 'reaptcha';

const Checkout = ({ shippingAndHandlingCost }) => {
	const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
	let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
	let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
	let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
	const formatYYYYMMDD = `${ye}-${mo}-${da}`;

	var cart = useSelector((state) => state.cart);
	var orders = cart?.order;
	var sumOfTotalCost = 0;
	orders.map((item) => (sumOfTotalCost += item.quantity * item.cost));
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarError, setSnackbarError] = useState(false);
	const navigate = useNavigate();

	// var shippingAndHandlingCost = useSelector((state) => state.cart.shippingAndHandlingCost);

	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});

	// const resetallstate = () => {
	// 	dispatch(resetAllState());
	// };
	var submitStatus = cart.processOrder;
	const OrderDetails = () => {
		return (
			<Box sx={{ border: '1px solid gray', borderRadius: '4px', alignSelf: 'center', width: '100%' }}>
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
						<Typography>${shippingAndHandlingCost.toFixed(2)}</Typography>
					</Stack>

					<Divider />

					<Stack direction='row' justifyContent='space-between'>
						<Typography>Est. Total</Typography>
						<Typography>${(sumOfTotalCost + shippingAndHandlingCost).toFixed(2)}</Typography>
					</Stack>
				</Stack>
			</Box>
		);
	};

	const [subscribe, setSubscribe] = useState(true);
	const [needRecaptcha, setNeedRecaptcha] = useState(false);
	const [captchaToken, setCaptchaToken] = useState(null);
	const captchaRef = useRef(null);

	const verify = () => {
		captchaRef.current.getResponse().then((res) => {
			setNeedRecaptcha(false);
			setCaptchaToken(res);
		});
	};

	const handleErrorOrExpire = () => {
		setCaptchaToken(null);
	};

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
		wantsToSubscribe: subscribe,
		templateType: process.env.REACT_APP_TEMPLATE_PICACHO_ORDER,
		orderId: cart.orderId,
		instaFollow: `<a href='https://www.instagram.com/picachosupply/'>on Instagram</a>`
	};

	const dispatch = useDispatch();
	const { handleSubmit, register, control } = useForm({ defaultValues });
	const myForm = useRef(null);

	// dispatch(addToSubscription(defaultValues));

	const promosAdded = useSelector((state) => state.cart.promosAdded);

	const sendEmail = async (formData) => {
		const sendEmail = true;

		if (captchaToken == null) {
			setNeedRecaptcha(true);
			return;
		}

		var orderHtml = '';
		// var orderHtml = '<p>';
		console.log(formData);
		console.log(formData, orders);
		formData.orders.map((order, index) =>
			order.type === 'Explorer Hat'
				? (orderHtml += `<br/>Item # ${index + 1} - ${order.type}
				<br/> &emsp;Hat Color: ${order.baseColor}
				<br/> &emsp;Quantity: ${order.quantity}
				<br/> &emsp;Cost: ${order.cost}
				<br/>
			
			`)
				: (orderHtml += `<br/>Item # ${index + 1} - ${order.type}
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
		orderHtml += '';

		console.log(promosAdded);

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

		console.log(formData.name);
		const replyEmail = `<a href='mailto:sales@picachosupply.com?subject=Order%20Issue'>sales@picachosupply.com</a>`;
		const subscribeToNewsletterEmailHtml = `<a href='https://picachosupply.com/subscribe'>subscribe to our newsletter</a>`;
		let htmlFormData = {
			...formData,
			orderDetailsHtml: orderHtml,
			emailHtml: emailHtml,
			phoneHtml: phoneHtml,
			addressHtml: addressHtml,
			replyEmailAddressHtml: replyEmail,
			subscribeToNewsletterEmailHtml: subscribeToNewsletterEmailHtml,
			templateTypeCustomer: process.env.REACT_APP_TEMPLATE_CUSTOMER,
			reply_to: 'sales@picachosupply.com',
			promosAdded: promosAdded?.message
		};

		console.log(htmlFormData);

		if (sendEmail) {
			const trySubmit = await dispatch(processOrderAsync(htmlFormData));
			console.log(trySubmit);
			if (trySubmit.error) {
				setSnackbarOpen(true);
				setSnackbarError(true);
			} else {
				if (trySubmit.payload.status === 200) {
					setSnackbarOpen(true);
					setSnackbarError(false);
					const newres = await dispatch(sendCustomerOrderReceipt(htmlFormData));
					console.log(newres);

					const newestres = await dispatch(addToSubscription(htmlFormData));
					console.log(newestres);
				} else {
					console.error('unknown issue....');
				}
			}
		} else {
			// const newestres = await dispatch(addToSubscription(htmlFormData));
			// console.log(newestres);
			console.log(htmlFormData);
			alert('Dev env');
		}
	};

	useEffect(() => {
		if (sumOfTotalCost === 0) {
			console.log(submitStatus);
			console.log('No items!');

			if (submitStatus.success) {
				console.log(cart);
				navigate('/completed');
			} else {
				navigate('/');
			}
		}
	}, [navigate, sumOfTotalCost]);

	const CheckoutButton = () => {
		return submitStatus.error ? (
			<>
				<Button variant='contained' color='error' onClick={() => dispatch(resetSubmitOrder())}>
					Something went wrong :' (<br />
					Click to try again
				</Button>
			</>
		) : submitStatus.processing ? (
			<ProcessingTimeout resetSubmitOrder={resetSubmitOrder} />
		) : (
			<Button type={captchaToken && 'submit'} variant={captchaToken ? 'contained' : 'outlined'}>
				{captchaToken ? 'Submit Order' : 'Validate Captcha'}
			</Button>
		);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
		setSnackbarError(false);
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

							<input readOnly hidden {...register('subjectRequestDate')} value={formatYYYYMMDD} />

							<input readOnly hidden {...register('totalCostMinusSandH')} value={sumOfTotalCost} />

							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox checked={subscribe} {...register('wantsToSubscribe')} onClick={() => setSubscribe(!subscribe)} />}
									label='Subscribe to our newsletter'
								/>
							</Grid>
							<Grid item xs={12}>
								<Reaptcha
									sx={{ width: '500px !important' }}
									theme='light'
									ref={captchaRef}
									sitekey={process.env.REACT_APP_RECAPTCHA_SECRET_KEY}
									onVerify={verify}
									onError={handleErrorOrExpire}
									onExpire={handleErrorOrExpire}
								/>
								{needRecaptcha && (
									<Box sx={{ marginTop: 2 }}>
										<Alert severity='error'>Please verify Recaptcha</Alert>
									</Box>
								)}
							</Grid>
						</Grid>

						<Stack justifyContent='center' spacing={3} mt={2} sx={{ direction: { xs: 'column', sm: 'row' } }}>
							<Button variant='contained' color='inherit'>
								<Link to={'/review-order'} style={{ textDecoration: 'none', color: 'black' }}>
									Back to Review Order
								</Link>
							</Button>

							{CheckoutButton()}
						</Stack>
					</form>

					<Snackbar
						sx={{ marginTop: { xs: '80px !important', sm: '64px !important' } }}
						anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
						open={snackbarOpen}
						autoHideDuration={30000}
						onClose={handleSnackbarClose}>
						<Alert onClose={handleSnackbarClose} severity={snackbarError ? 'error' : 'success'} sx={{ width: '100%' }}>
							{snackbarError ? (
								<span>
									Error submitting Order Request. Please contact <a href='mailto:corey@picachosupply.COM'>COREY@PICACHOSUPPLY.COM</a> for support
								</span>
							) : (
								<span>Success submitting Order Request! A team member will reach out to you shortly.</span>
							)}
						</Alert>
					</Snackbar>
				</Stack>
			</Card>
		</div>
	);
};

export default Checkout;
