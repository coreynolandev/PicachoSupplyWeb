import { Box, Button, Card, CardHeader, Container, Grid, Icon, Stack, Typography } from '@mui/material';
import PicachoWhiteLogo from '../assets2/big_logo.png';
import DeansList from '../assets2/deans_list.jpg';
import Footer from '../components/footer/Footer';
import UsaFlag from '../assets2/usa.png';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const Home = () => {
	return (
		<Box className='scroll-snap'>
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container  '>
				<Stack justifyContent='center' spacing={2} alignItems='center' sx={{ width: '100%', height: '70vh' }}>
					<img className='picacho-white-logo' src={PicachoWhiteLogo} alt='Picacho' />

					<Button
						role={'link'}
						href='/shop'
						variant='contained'
						color='inherit'
						size='large'
						// className='animate__animated  animate__pulse animate__slow animate__delay-2s animate__infinite'
						sx={{ borderRadius: '24px' }}>
						Browse our Hoodies
					</Button>
				</Stack>
				<Typography color='white' m={3}>
					Scroll to find more
				</Typography>

				<div className=' animate__animated  animate__bounce animate__slow animate__delay-2s animate__infinite'>
					<Icon sx={{ color: 'white' }} fontSize='large' component={KeyboardDoubleArrowDownIcon} />
				</div>
			</Stack>
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container light '>
				{/* <Box className={'home-media container light  '}> */}
				{/* <Stack direction='column' sx={{ height: 'calc(100vh - 80px - 2rem)' }}> */}
				<div className='dontfill'>
					<Typography variant='h2' m={3} mt={0}>
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
			{/* </Box> */}
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='flex-start' className='home-media container dark '>
				{/* <Box className={'home-media container dark'}> */}
				<Stack spacing={2}>
					<div>
						<img className='footer-media image' src={UsaFlag} alt='USA' />

						<Typography color='white'>Made in USA</Typography>
						<Typography color='white'>All products are handmade in America</Typography>
					</div>
					<div>
						<Icon sx={{ color: 'white' }} component={CardMembershipIcon} className='footer-media image' />
						<Typography color='white'>Adventure Awaits</Typography>
						<Typography color='white'>Sign up to our newsletter to receive exclusive rewards.</Typography>
					</div>

					<div>
						<Icon sx={{ color: 'white' }} component={WorkspacePremiumIcon} className='footer-media image' />
						<Typography color='white'>Satisfaction Guarantee</Typography>
						<Typography color='white'>At Picacho, our 100% Satistfaction Guarantee means our mission is not complete until you're happy.</Typography>
					</div>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Home;