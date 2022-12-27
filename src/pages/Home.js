import { Box, Button, Grid, Icon, Stack, Typography } from '@mui/material';
import PicachoWhiteLogo from '../assets2/big_logo.png';
import UsaFlag from '../assets2/usa.png';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Landscape } from '@mui/icons-material';
import MailchimpForm from '../components/form/MailchimpForm';
import { DarkSeparatorBottom, DarkSeparatorTop, LightSeparatorBottom, LightSeparatorTop } from '../components/design/Separators';

const Home = () => {
	return (
		<Box className='scroll-snap'>
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container  '>
				<Stack justifyContent='center' spacing={4} alignItems='center' className='landing-area'>
					<img className='picacho-white-logo' src={PicachoWhiteLogo} alt='Picacho' />
					
					<Typography component='h1' variant='h5' sx={{ WebkitTextStroke: '1px black', color: 'white', fontWeight: '800' }}>
						Outdoor clothing and gear for all sports and lifestyles. Picacho Supply is based in Denver, Colorado.
					</Typography>

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
			</Stack>

			<LightSeparatorTop />

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

			<LightSeparatorBottom />

			<div style={{ height: '30px' }}></div>

			<DarkSeparatorTop />
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='flex-start' className='home-media container dark '>
				<Stack spacing={6} alignItems='center' m={2}>
					<div>
						<img className='footer-media image' src={UsaFlag} alt='USA' />

						<Typography color='white'>Made in USA</Typography>
						<Typography color='white'>All products are handmade in America</Typography>
					</div>

					<div>
						<Icon sx={{ color: 'white' }} component={CardMembershipIcon} className='footer-media image' />
						<Typography color='white'>Adventure Awaits</Typography>
						<Typography color='white'>Sign up to our newsletter to receive exclusive rewards</Typography>
						<MailchimpForm />
					</div>
					<div>
						<Icon sx={{ color: 'white' }} component={WorkspacePremiumIcon} className='footer-media image' />
						<Typography color='white'>Satisfaction Guarantee</Typography>
						<Typography color='white'>At Picacho, our 100% Satistfaction Guarantee means our mission is not complete until you're happy.</Typography>
					</div>

					<Grid container alignItems={'center'} spacing={1} sx={{ width: '100%' }}>
						<Grid item xs={5} sm={2}>
							<Typography color='gray'>Picacho Supply</Typography>
						</Grid>
						<Grid item xs={2} sm={1}>
							<Landscape color='secondary' />
						</Grid>

						<Grid item xs={5} sm={2}>
							<Typography color='gray'>Denver, CO</Typography>
						</Grid>

						<Grid item xs={0} sm={1} sx={{ display: { xs: 'none', sm: 'inherit' } }}>
							<Landscape color='secondary' />
						</Grid>

						<Grid item xs={5} sm={2}>
							<Typography color='gray'>Est. 2021</Typography>
						</Grid>

						<Grid item xs={2} sm={1}>
							<Landscape color='secondary' />
						</Grid>

						<Grid item xs={5} sm={2}>
							<Typography color='gray'>
								Follow us on <a href='https://www.instagram.com/picachosupply/'>Instagram</a>
							</Typography>
						</Grid>
					</Grid>
				</Stack>
			</Stack>

			<DarkSeparatorBottom />
			<div style={{ height: '45px' }}></div>
		</Box>
	);
};

export default Home;
