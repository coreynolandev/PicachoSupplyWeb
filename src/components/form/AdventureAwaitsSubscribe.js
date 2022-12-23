import { Icon, Typography } from '@mui/material';
import MailchimpForm from './MailchimpForm';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

const AdventureAwaitsSubscribe = () => {
	return (
		<div>
			<Icon sx={{ color: 'white' }} component={CardMembershipIcon} className='footer-media image' />
			<Typography color='white'>Adventure Awaits</Typography>
			<Typography color='white'>
				Follow us on <a href='https://www.instagram.com/picachosupply/'>Instagram!</a>
			</Typography>
			<Typography color='white'>Sign up to our newsletter to receive exclusive rewards</Typography>

			<MailchimpForm />
		</div>
	);
};

export default AdventureAwaitsSubscribe;
