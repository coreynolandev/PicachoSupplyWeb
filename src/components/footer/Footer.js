import { Box, Icon, Stack, Typography } from '@mui/material';
import UsaFlag from '../../assets2/usa.png';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const Footer = () => {
	return (
		<Box className={'home-media container dark'} >
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
					<Typography color='white'>At Picacho, our 100% Satistfaction Guarantee means your product is not final until you're happy.</Typography>
				</div>
			</Stack>
		</Box>
	);
};

export default Footer;
