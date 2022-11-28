import { Stack, Typography } from '@mui/material';

const OrderItemDetail = ({ label, value }) => {
	return (
		<Stack direction='row' justifyContent={'space-between'} sx={{width: '100%'}}>
			<Typography>{label}: </Typography>
			<Typography>{value || 'N/A'}</Typography>
		</Stack>
	);
};

export default OrderItemDetail;