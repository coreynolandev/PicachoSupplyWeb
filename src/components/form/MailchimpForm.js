import React, { useState, useEffect, useRef } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material';

import Reaptcha from 'reaptcha';

const CustomForm = ({ status, message, onValidated }) => {
	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');

	const [captchaToken, setCaptchaToken] = useState(null);
	const captchaRef = useRef(null);

	const verify = () => {
		captchaRef.current.getResponse().then((res) => {
			setCaptchaToken(res);
		});
	};

	const handleErrorOrExpire = () => {
		setCaptchaToken(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (captchaToken && email && fullName && email.indexOf('@') > -1) {
			onValidated({
				MERGE0: email,
				MERGE1: fullName
			});
			captchaRef.current.reset();
		}
	};

	useEffect(() => {
		if (status === 'success') clearFields();
	}, [status]);

	const clearFields = () => {
		setFullName('');
		setEmail('');
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<Stack direction='column' spacing={2} sx={{ width: '100%', maxWidth: '600px' }}>
				{status === 'sending' && (
					<Alert severity='info' sx={{ width: '100%' }}>
						<span>Subscribing....</span>
					</Alert>
				)}

				{status === 'error' && (
					<Alert severity={'error'} sx={{ width: '100%' }}>
						<div className='mc__alert mc__alert--error' dangerouslySetInnerHTML={{ __html: message }} />
					</Alert>
				)}

				{status === 'success' && (
					<Alert severity={'success'} sx={{ width: '100%' }}>
						<div className='mc__alert mc__alert--success' dangerouslySetInnerHTML={{ __html: message }} />
					</Alert>
				)}

				<TextField
					variant='filled'
					sx={{ background: 'white', marginTop: 1 }}
					fullWidth
					label='Full Name'
					type={'text'}
					onChange={(e) => setFullName(e.target.value)}
					value={fullName}
					required
				/>
				<TextField
					variant='filled'
					sx={{ background: 'white', marginTop: 1 }}
					fullWidth
					label='Email'
					type={'email'}
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
				/>
				<div style={{ maxWidth: '600px' }}>
					<Reaptcha
						theme='light'
						ref={captchaRef}
						sitekey={process.env.REACT_APP_RECAPTCHA_SECRET_KEY}
						onVerify={verify}
						onError={handleErrorOrExpire}
						onExpire={handleErrorOrExpire}
					/>
				</div>

				{status === 'success' ? (
					<Button variant='contained' color='success'>
						Subscribed!
					</Button>
				) : status === 'sending' ? (
					<Button variant='contained' color='edit'>
						<CircularProgress />
					</Button>
				) : (
					<Button type={captchaToken && 'submit'} variant={captchaToken ? 'contained' : 'outlined'} color='edit'>
						Join the Adventure!
					</Button>
				)}
			</Stack>
		</form>
	);
};

const MailchimpForm = (props) => {
	const postUrl = `https://Picachosupply.us21.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MC_U}&id=${process.env.REACT_APP_MC_ID}`;

	return (
		<div className='mc__form-container'>
			<MailchimpSubscribe
				url={postUrl}
				render={({ subscribe, status, message }) => <CustomForm status={status} message={message} onValidated={(formData) => subscribe(formData)} />}
			/>
		</div>
	);
};

export default MailchimpForm;
