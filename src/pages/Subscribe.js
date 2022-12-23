import { Landscape } from '@mui/icons-material';
import { Box, Grid, Icon, Stack, Typography } from '@mui/material';
import MailchimpForm from '../components/form/MailchimpForm';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

const Subscribe = () => {
	return (
		<Box className='scroll-snap'>
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
				<Stack spacing={6} alignItems='center' m={2}>
					<div>
						<Icon sx={{ color: 'white' }} component={CardMembershipIcon} className='footer-media image' />
						<Typography color='white'>Adventure Awaits</Typography>
						<Typography color='white'>Sign up to our newsletter to receive exclusive rewards</Typography>
						<MailchimpForm />
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
		</Box>
	);
};

export default Subscribe;
