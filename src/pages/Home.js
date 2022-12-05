import { Box, Button, Grid, Icon, Stack, TextField, Typography } from '@mui/material';
import PicachoWhiteLogo from '../assets2/big_logo.png';
import UsaFlag from '../assets2/usa.png';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SpacerT from '../assets2/spacer.svg';

const Home = () => {
	const defaultValues = {
		email: ''
	};

	const [buttonName, setButtonName] = useState('Join the Adventure!');
	const [hasJoined, setHasJoined] = useState(false);
	const { handleSubmit, control } = useForm({ defaultValues });
	const myForm = useRef(null);

	const sendEmail = (formData) => {
		console.log(formData);
		setHasJoined(true);
		setButtonName('Subscribed!');
	};

	return (
		<Box className='scroll-snap'>
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container  '>
				<Stack justifyContent='center' spacing={4} alignItems='center' className='landing-area'>
					<img className='picacho-white-logo' src={PicachoWhiteLogo} alt='Picacho' />

					<Button
						role={'link'}
						href='/shop'
						variant='contained'
						color='primary'
						size='large'
						className='animate__animated  animate__pulse animate__slower animate__delay-2s animate__infinite'
						sx={{ borderRadius: '24px' }}>
						Browse our Hoodies
					</Button>
				</Stack>
				{/* <Typography color='white' m={3}>
					Scroll to find more
				</Typography>

				<div className=' animate__animated  animate__bounce animate__slow animate__delay-2s animate__infinite'>
					<Icon sx={{ color: 'white' }} fontSize='large' component={KeyboardDoubleArrowDownIcon} />
				</div> */}
			</Stack>

			<div className='separator top'>
			<svg
					className='separator__svg'
					width='100%'
					height='10vh'
					viewBox='0 0 100 100'
					preserveAspectRatio='none'
					fill='#ffffff'
					version='1.1'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M 100 100 V 10 L 0 100' />
					<path d='M 0 100 L 100 30 V 0 Z' fill='#14264E' strokeWidth='0' />
				</svg>
			</div>

			<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container light '>
				{/* <Box className={'home-media container light  '}> */}
				{/* <Stack direction='column' sx={{ height: 'calc(100vh - 80px - 2rem)' }}> */}
				<div className='dontfill'>
					<Typography variant='h3' m={3} mt={0}>
						THE DEAN'S LIST
					</Typography>

					<Typography variant='h6' m={3}>
						The Dean's List is a documentary style ski film that we had the opportunity to work with during the 2022 Winter. The film features mostly CU Boulder
						students who exhibit the picacho lifestyle. Check out the video to see what we’re all about!
					</Typography>
				</div>
				<div className='home-media video-wrapper'>
					<iframe
						width='100%'
						height='100%'
						src='https://www.youtube-nocookie.com/embed/VEg61BRc5FA'
						title='YouTube video player'
						// frameborder='0'
						frameBorder={0}
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen></iframe>
				</div>
			</Stack>

			<div className='separator bottom'>
				<svg
					className='separator__svg'
					width='100%'
					height='10vh'
					viewBox='0 0 100 100'
					preserveAspectRatio='none'
					fill='#ffffff'
					version='1.1'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M 0 0 V 90 L 100 0' />
					<path d='M 100 0 L 0 70 V 100 Z' fill='#14264E' strokeWidth='0' />
				</svg>
			</div>

			{/* space! */}
			<div style={{height: '30px'}}></div>


			<div className='separator top'>
			<svg
					className='separator__svg'
					width='100%'
					height='10vh'
					viewBox='0 0 100 100'
					preserveAspectRatio='none'
					fill='#000000'
					version='1.1'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M 100 100 V 10 L 0 100' />
					<path d='M 0 100 L 100 30 V 0 Z' fill='#FFBD29' strokeWidth='0' />
				</svg>
			</div>
			{/* </Box> */}
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='flex-start' className='home-media container dark '>
				{/* <Box className={'home-media container dark'}> */}
				<Stack spacing={3} alignItems='center' m={2}>
					<div>
						<img className='footer-media image' src={UsaFlag} alt='USA' />

						<Typography color='white'>Made in USA</Typography>
						<Typography color='white'>All products are handmade in America</Typography>
					</div>
					<div>
						<Icon sx={{ color: 'white' }} component={CardMembershipIcon} className='footer-media image' />
						<Typography color='white'>Adventure Awaits</Typography>
						<Typography color='white'>Sign up to our newsletter to receive exclusive rewards.</Typography>

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
					</div>

					<div>
						<Icon sx={{ color: 'white' }} component={WorkspacePremiumIcon} className='footer-media image' />
						<Typography color='white'>Satisfaction Guarantee</Typography>
						<Typography color='white'>At Picacho, our 100% Satistfaction Guarantee means our mission is not complete until you're happy.</Typography>
					</div>
				</Stack>
			</Stack>

			<div className='separator bottom'>
				<svg
					className='separator__svg'
					width='100%'
					height='10vh'
					viewBox='0 0 100 100'
					preserveAspectRatio='none'
					fill='#000000'
					version='1.1'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M 0 0 V 90 L 100 0' />
					<path d='M 100 0 L 0 70 V 100 Z' fill='#FFBD29' strokeWidth='0' />
				</svg>
			</div>
			<div style={{height: '30px'}}></div>

		</Box>
	);
};

export default Home;
