import { Box, Button, Card, CardContent, Grid, Icon, Stack, Typography } from '@mui/material';
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
		<>
			<div style={{ height: '30px' }}></div>

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

			<Stack spacing={0} sx={{ padding: '0px !important' }} direction='column' alignItems='center' justifyContent='center' className='home-media container light '>
				{/* <Box className={'home-media container light  '}> */}
				{/* <Stack direction='column' sx={{ height: 'calc(100vh - 80px - 2rem)' }}> */}
				<div className='dontfill'>
					<Typography variant='h3' m={1}>
						WHERE THE LAND MEETS THE SKY
					</Typography>

					<Typography variant='h5' m={3} mb={0}>
						The apex of the peak is where the land meets the sky. We believe that once you have found your peak, you will find balance yourself.
						<br />
						<br />
						<br />
						<Typography variant='h6' color=''>
							"Everything you see exists together, in a delicate balance."
							<br />- The Lion King
						</Typography>
					</Typography>
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

			<div style={{ height: '30px' }}></div>

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

			<Stack spacing={0} sx={{ padding: '0px !important' }} direction='column' alignItems='center' justifyContent='center' className='home-media container dark '>
				{/* <Box className={'home-media container light  '}> */}
				{/* <Stack direction='column' sx={{ height: 'calc(100vh - 80px - 2rem)' }}> */}
				<div className='dontfill'>
					<Typography color='white' variant='h3' m={1}>
						FIND YOUR PEAK
					</Typography>

					<Typography color='white' variant='h5' m={3} mb={0}>
						The peak represents an outdoor experience that gives you innermost joy. Whether it's doing a double cork on skis, hucking a 50-foot cliff, kickflipping a 5
						stair, or riding a tube on your surfboard, the PICACHO lifestyle strives to help everyone find their peak. Our mission is to encourage people to go outside
						and to see what the natural world has in store.
					</Typography>
				</div>
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
			<div style={{ height: '30px' }}></div>

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

			<Stack spacing={0} sx={{ padding: '0px !important' }} direction='column' alignItems='center' justifyContent='center' className='home-media container light '>
				{/* <Box className={'home-media container light  '}> */}
				{/* <Stack direction='column' sx={{ height: 'calc(100vh - 80px - 2rem)' }}> */}
				<div className='dontfill'>
					<Typography variant='h3' m={1}>
						MEET THE TEAM
					</Typography>

					<Stack direction='column' spacing={2} sx={{ margin: 3, marginBottom: 0}}>
						<div>
							<Typography variant='h5'>Andrew Jeffries</Typography>
							<Typography component='a' href='mailto: a@picachosupply.com?subject=Picacho%20Supply%20Inquiry'>
								a@picachosupply.com
							</Typography>
						</div>

						<div>
							<Typography variant='h5'>Peter Jeffries</Typography>
							<Typography component='a' href='mailto: peter@picachosupply.com?subject=Picacho%20Supply%20Inquiry'>
								peter@picachosupply.com
							</Typography>
						</div>

						<div>
							<Typography variant='h5'>Corey Nolan</Typography>
							<Typography component='a' href='mailto: corey@picachosupply.com?subject=Picacho%20Supply%20Inquiry'>
								corey@picachosupply.com
							</Typography>
						</div>
					</Stack>
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
			<div style={{ height: '45px' }}></div>
		</>
	);
};

export default AboutUs;
