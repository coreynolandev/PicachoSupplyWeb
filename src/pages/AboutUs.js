import { Box, Stack, Typography } from '@mui/material';
import { DarkSeparatorBottom, DarkSeparatorTop, LightSeparatorBottom, LightSeparatorTop } from '../components/design/Separators';
import MailchimpForm from '../components/form/MailchimpForm';

const AboutUs = () => {
	return (
		<>
			<div style={{ height: '30px' }}></div>

			<LightSeparatorTop />

			<Stack spacing={0} sx={{ padding: '0px !important' }} direction='column' alignItems='center' justifyContent='center' className='home-media container light '>
				{/* <Box className={'home-media container light  '}> */}
				{/* <Stack direction='column' sx={{ height: 'calc(100vh - 80px - 2rem)' }}> */}
				<div className='dontfill'>
					<Typography variant='h3' m={1}>
						WHERE THE LAND MEETS THE SKY
					</Typography>

					<Typography variant='h5' m={3} mb={0}>
						The apex of the peak is where the land meets the sky. We believe that once you have found your peak, you will find inner balance. Mastering the flip you've
						been hung up on, shredding a wave you thought might wipe you out, or just literally reaching the peak of a mountain as mighty as you are, is what it's all
						about.
						<br />
						<br />
						<Typography variant='h6' color=''>
							"Everything you see exists together, in a delicate balance."
							<br />- The Lion King
						</Typography>
					</Typography>
				</div>
			</Stack>

			<LightSeparatorBottom />

			<div style={{ height: '30px' }}></div>

			<DarkSeparatorTop />

			<Stack spacing={0} sx={{ padding: '0px !important' }} direction='column' alignItems='center' justifyContent='center' className='home-media container dark '>
				{/* <Box className={'home-media container light  '}> */}
				{/* <Stack direction='column' sx={{ height: 'calc(100vh - 80px - 2rem)' }}> */}
				<div className='dontfill'>
					<Typography color='white' variant='h3' m={1}>
						FIND YOUR PEAK
					</Typography>

					<Typography color='white' variant='h5' m={3} mb={2}>
						The peak represents an outdoor experience that gives you innermost joy. Whether it's doing a cork on skis, hucking a 50 foot cliff, or riding a tube on your
						surfboard, the Picacho lifestyle is about finding your peak.
					</Typography>
				</div>
			</Stack>

			<DarkSeparatorBottom />
			<div style={{ height: '30px' }}></div>

			<LightSeparatorTop />

			<Stack spacing={0} sx={{ padding: '0px !important' }} direction='column' alignItems='center' justifyContent='center' className='home-media container light '>
				{/* <Box className={'home-media container light  '}> */}
				{/* <Stack direction='column' sx={{ height: 'calc(100vh - 80px - 2rem)' }}> */}
				<div className='dontfill'>
					<Typography variant='h3' m={1}>
						THE TEAM
					</Typography>

					<Stack direction='column' spacing={2} sx={{ margin: 3, marginBottom: 0 }}>
						<div>
							<Typography variant='h5'>Andrew Jeffries</Typography>
							<Typography component='a' href='mailto: a@picachosupply.com?subject=Picacho%20Supply%20Inquiry' className='on-light-bg'>
								a@picachosupply.com
							</Typography>
						</div>

						<div>
							<Typography variant='h5'>Peter Jeffries</Typography>
							<Typography component='a' href='mailto: peter@picachosupply.com?subject=Picacho%20Supply%20Inquiry' className='on-light-bg'>
								peter@picachosupply.com
							</Typography>
						</div>

						<div>
							<Typography variant='h5'>Corey Nolan</Typography>
							<Typography component='a' href='mailto: corey@picachosupply.com?subject=Picacho%20Supply%20Inquiry' className='on-light-bg'>
								corey@picachosupply.com
							</Typography>
						</div>

						<div>
							<Typography variant='h5'>Cavin Winfrey</Typography>
						</div>
					</Stack>
				</div>
			</Stack>

			<LightSeparatorBottom />

			<div style={{ height: '30px' }}></div>

			<DarkSeparatorTop />

			<Stack spacing={0} sx={{ padding: '0px !important' }} direction='column' alignItems='center' justifyContent='center' className='home-media container dark '>
				{/* <Box className={'home-media container light  '}> */}
				{/* <Stack direction='column' sx={{ height: 'calc(100vh - 80px - 2rem)' }}> */}
				<div className='dontfill'>
					<Typography color='white' variant='h3' m={1}>
						JOIN THE ADVENTURE
					</Typography>

					<Typography color='white' variant='h5' m={3} mb={0}>
						Follow us on <a href='https://www.instagram.com/picachosupply/'>Instagram</a>
					</Typography>

					<Typography variant='h5' color='white' m={3} mb={0}>
						Sign up to our newsletter to receive exclusive rewards.
					</Typography>

					<Box p={3}>
						<MailchimpForm />
					</Box>
				</div>
			</Stack>

			<DarkSeparatorBottom />
			<div style={{ height: '45px' }}></div>
		</>
	);
};

export default AboutUs;
