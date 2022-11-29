import { Box, Card, CardContent, Icon, Stack, Typography } from '@mui/material';
import FindPeak from '../assets2/FIND PEAK.png';
import LandSky from '../assets2/Land Sky.png';
import MeetTeam from '../assets2/MEET TEAM.png';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const AboutUs = () => {
	return (
		<Box className='scroll-snap'>
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container  '>
				<Stack justifyContent='space-between' spacing={2} alignItems='center' sx={{ width: '100%', minHeight: '80vh' }}>
					<div></div>
					<Stack spacing={4} justifyContent='center' alignItems={'center'}>
						<img className='about-us-img-text' src={LandSky} alt='Picacho' />

						<Card className='fullcard navy'>
							<CardContent>
								<Typography variant='h4' color='white'>
									The apex of the peak is where the land meets the sky. We believe that once you have found your peak, you will find balance yourself.
									<br />
									<br />
									<br />
									<Typography variant='h6' color='white'>
										"Everything you see exists together, in a delicate balance."
										<br />- The Lion King
									</Typography>
								</Typography>
							</CardContent>
						</Card>
					</Stack>

					<div className=' '>
						<Icon sx={{ color: 'white' }} fontSize='large' component={KeyboardDoubleArrowDownIcon} />
					</div>
				</Stack>
			</Stack>
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container  '>
				<Stack justifyContent='space-between' spacing={2} alignItems='center' sx={{ width: '100%', minHeight: '80vh' }}>
					{/* <div className=' '>
						<Icon sx={{ color: 'white' }} fontSize='large' component={KeyboardDoubleArrowUpIcon} />
					</div> */}

					<Stack spacing={4} justifyContent='center' alignItems={'center'}>
						<img className='about-us-img-text' src={FindPeak} alt='Picacho' />

						<Card className='fullcard navy'>
							<CardContent>
								<Typography variant='h4' color='white'>
									The peak represents an outdoor experience that gives you innermost joy. Whether it's doing a double cork on skis, hucking a 50-foot cliff,
									kickflipping a 5 stair, or riding a tube on your surfboard, the PICACHO lifestyle strives to help everyone find their peak. Our mission is to
									encourage people to go outside and to see what the natural world has in store.
								</Typography>
							</CardContent>
						</Card>
					</Stack>
					<div className=' '>
						<Icon sx={{ color: 'white' }} fontSize='large' component={KeyboardDoubleArrowDownIcon} />
					</div>
				</Stack>
			</Stack>
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container  '>
				<Stack justifyContent='space-between' spacing={2} alignItems='center' sx={{ width: '100%', minHeight: '80vh' }}>
					{/* <div className=' '>
						<Icon sx={{ color: 'white' }} fontSize='large' component={KeyboardDoubleArrowUpIcon} />
					</div> */}

					<Stack spacing={4} justifyContent='center' alignItems={'center'}>
						<img className='about-us-img-text' src={MeetTeam} alt='Picacho' />

						<Card className='fullcard navy'>
							<CardContent>
								<Typography variant='h4' color='white'>
									The apex of the peak is where the land meets the sky. We believe that once you have found your peak, you will find balance yourself.
									<br />
									<br />
									<br />
									"Everything you see exists together, in a delicate balance."
									<br />- The Lion King
								</Typography>
							</CardContent>
						</Card>
					</Stack>
					{/* <div></div> */}
				</Stack>
			</Stack>
		</Box>
	);
};

export default AboutUs;
