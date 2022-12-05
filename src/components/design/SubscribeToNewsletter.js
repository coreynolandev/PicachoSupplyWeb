import { Button, Grid, Stack, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const SubscribeToNewsletter = () => {
	const defaultValues = {
		email: ''
	};
	const [buttonName, setButtonName] = useState('Join the Adventure!');
	const [hasJoined, setHasJoined] = useState(false);
	const { handleSubmit, control } = useForm({ defaultValues });
	const myForm = useRef(null);

	const sendEmail = (formData) => {
		if (!hasJoined) {
			console.log(formData);
			setHasJoined(true);
			setButtonName('Subscribed!');
			// TODO: dispatch action to add email to mailchimp list
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(sendEmail)} ref={myForm}>
				<Stack direction='column' spacing={2} sx={{ width: '100%', maxWidth: '600px' }}>
					<Controller
						name={'email'}
						control={control}
						render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
							<Grid item xs={12}>
								<TextField
									key='email'
									// error={false}
									required={true}
									onChange={onChange}
									type='email'
									name='email'
									control={control}
									label='Email'
									autoComplete='email'
									id='email'
									variant='filled'
									sx={{ background: 'white', marginTop: 1 }}
									fullWidth
								/>
							</Grid>
						)}
					/>
					<Button type='submit' variant='contained' color='edit'>
						{buttonName}
					</Button>
				</Stack>
			</form>
		</>
	);
};

export default SubscribeToNewsletter;
