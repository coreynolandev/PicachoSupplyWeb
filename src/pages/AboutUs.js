import { Box, Card, CardContent, Grid, Icon, Stack, Typography } from '@mui/material';
import FindPeak from '../assets2/FIND PEAK.png';
import LandSky from '../assets2/Land Sky.png';
import MeetTeam from '../assets2/MEET TEAM.png';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';

const AboutUs = () => {
	const [flip, setFlip] = useState(false);
	const [flipCardOne, setFlipCardOne] = useState(false);
	const [flipCardTwo, setFlipCardTwo] = useState(false);
	const [flipCardThree, setFlipCardThree] = useState(false);

	return (
		<Grid container p={2} spacing={2} alignItems='center' justifyContent={'center'}>
			<Grid item xs={12} sm={6}>
				<ReactCardFlip isFlipped={flipCardOne} flipDirection='horizontal'>
					<Card className='fullcard navy' onClick={() => setFlipCardOne(!flipCardOne)}>
						<CardContent className='centered-content'>
							<img className='about-us-img-text' src={LandSky} alt='Picacho' />
						</CardContent>
					</Card>
					<Card className='fullcard' onClick={() => setFlipCardOne(!flipCardOne)}>
						<CardContent className='centered-content'>
							<Typography variant='h5' color=''>
								The apex of the peak is where the land meets the sky. We believe that once you have found your peak, you will find balance yourself.
								<br />
								<br />
								<br />
								<Typography variant='h6' color=''>
									"Everything you see exists together, in a delicate balance."
									<br />- The Lion King
								</Typography>
							</Typography>
						</CardContent>
					</Card>
				</ReactCardFlip>
			</Grid>

			<Grid item xs={12} sm={6}>
				<ReactCardFlip isFlipped={flipCardTwo} flipDirection='horizontal'>
					<Card className='fullcard navy' onClick={() => setFlipCardTwo(!flipCardTwo)}>
						<CardContent className='centered-content'>
							<img className='about-us-img-text' src={FindPeak} alt='Picacho' />
						</CardContent>
					</Card>
					<Card className='fullcard' onClick={() => setFlipCardTwo(!flipCardTwo)}>
						<CardContent className='centered-content'>
							<Typography variant='h5'>
								The peak represents an outdoor experience that gives you innermost joy. Whether it's doing a double cork on skis, hucking a 50-foot cliff,
								kickflipping a 5 stair, or riding a tube on your surfboard, the PICACHO lifestyle strives to help everyone find their peak. Our mission is to
								encourage people to go outside and to see what the natural world has in store.
							</Typography>
						</CardContent>
					</Card>
				</ReactCardFlip>
			</Grid>

			<Grid item xs={12} sm={6}>
				<ReactCardFlip isFlipped={flipCardThree} flipDirection='horizontal'>
					<Card className='fullcard navy' onClick={() => setFlipCardThree(!flipCardThree)}>
						<CardContent className='centered-content'>
							<img className='about-us-img-text' src={MeetTeam} alt='Picacho' />
						</CardContent>
					</Card>
					<Card className='fullcard' onClick={() => setFlipCardThree(!flipCardThree)}>
						<CardContent className='centered-content'>
							<Stack direction='column' spacing={2}>
								<div>
									<Typography variant='h5'>Andrew Jeffries</Typography>
									<span>a@picachosupply.com</span>
								</div>

								<div>
									<Typography variant='h5'>Peter Jeffries</Typography>
									<span>peter@picachosupply.com</span>
								</div>

								<div>
									<Typography variant='h5'>Corey Nolan</Typography>
									<span>corey@picachosupply.com</span>
								</div>
							</Stack>
						</CardContent>
					</Card>
				</ReactCardFlip>
			</Grid>
		</Grid>

		// <Box className='scroll-snap'>
		// 	<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container  '>
		// 		<Stack justifyContent='space-between' spacing={2} alignItems='center' sx={{ width: '100%', minHeight: '80vh' }}>
		// 			<div></div>
		// 			<Stack spacing={4} justifyContent='center' alignItems={'center'}>
		// 				<img className='about-us-img-text' src={LandSky} alt='Picacho' />

		// 				<Card className='fullcard navy'>
		// 					<CardContent>
		// 						<Typography variant='h4' color='white'>
		// 							The apex of the peak is where the land meets the sky. We believe that once you have found your peak, you will find balance yourself.
		// 							<br />
		// 							<br />
		// 							<br />
		// 							<Typography variant='h6' color='white'>
		// 								"Everything you see exists together, in a delicate balance."
		// 								<br />- The Lion King
		// 							</Typography>
		// 						</Typography>
		// 					</CardContent>
		// 				</Card>
		// 			</Stack>

		// 			<div className=' '>
		// 				<Icon sx={{ color: 'white' }} fontSize='large' component={KeyboardDoubleArrowDownIcon} />
		// 			</div>
		// 		</Stack>
		// 	</Stack>
		// 	<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container  '>
		// 		<Stack justifyContent='space-between' spacing={2} alignItems='center' sx={{ width: '100%', minHeight: '80vh' }}>
		// 			{/* <div className=' '>
		// 				<Icon sx={{ color: 'white' }} fontSize='large' component={KeyboardDoubleArrowUpIcon} />
		// 			</div> */}

		// 			<Stack spacing={4} justifyContent='center' alignItems={'center'}>
		// 				<img className='about-us-img-text' src={FindPeak} alt='Picacho' />

		// 				<Card className='fullcard navy'>
		// 					<CardContent>
		// 						<Typography variant='h4' color='white'>
		// 							The peak represents an outdoor experience that gives you innermost joy. Whether it's doing a double cork on skis, hucking a 50-foot cliff,
		// 							kickflipping a 5 stair, or riding a tube on your surfboard, the PICACHO lifestyle strives to help everyone find their peak. Our mission is to
		// 							encourage people to go outside and to see what the natural world has in store.
		// 						</Typography>
		// 					</CardContent>
		// 				</Card>
		// 			</Stack>
		// 			<div className=' '>
		// 				<Icon sx={{ color: 'white' }} fontSize='large' component={KeyboardDoubleArrowDownIcon} />
		// 			</div>
		// 		</Stack>
		// 	</Stack>
		// 	<Stack spacing={0} direction='column' alignItems='center' justifyContent='center' className='home-media container  '>
		// 		<Stack justifyContent='space-between' spacing={2} alignItems='center' sx={{ width: '100%', minHeight: '80vh' }}>
		// 			{/* <div className=' '>
		// 				<Icon sx={{ color: 'white' }} fontSize='large' component={KeyboardDoubleArrowUpIcon} />
		// 			</div> */}

		// 			<Stack spacing={4} justifyContent='center' alignItems={'center'}>
		// 				<img className='about-us-img-text' src={MeetTeam} alt='Picacho' />

		// 				<Card className='fullcard navy'>
		// 					<CardContent>
		// 						<Typography variant='h4' color='white'>
		// 							The apex of the peak is where the land meets the sky. We believe that once you have found your peak, you will find balance yourself.
		// 							<br />
		// 							<br />
		// 							<br />
		// 							"Everything you see exists together, in a delicate balance."
		// 							<br />- The Lion King
		// 						</Typography>
		// 					</CardContent>
		// 				</Card>
		// 			</Stack>
		// 			{/* <div></div> */}
		// 		</Stack>
		// 	</Stack>
		// </Box>
	);
};

export default AboutUs;
