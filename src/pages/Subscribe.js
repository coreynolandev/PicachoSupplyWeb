import { Landscape } from '@mui/icons-material';
import { Box, Grid, Icon, Stack, Typography } from '@mui/material';
import MailchimpForm from '../components/form/MailchimpForm';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { DarkSeparatorBottom, DarkSeparatorTop } from '../components/design/Separators';

const Subscribe = () => {
	return (
		<Box className='scroll-snap' pt={2} pb={2}>
			<DarkSeparatorTop />
			<Stack spacing={0} direction='column' alignItems='center' justifyContent='flex-start' className='home-media container dark '>
				<Stack spacing={4} alignItems='center' m={2}>
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

			<DarkSeparatorBottom />
		</Box>
	);
};

export default Subscribe;
