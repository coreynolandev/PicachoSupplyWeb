import { Stack, Typography } from '@mui/material';

const OrderItemDetail = ({ label, value }) => {
	return (
		<Stack key={label} direction='row' justifyContent={'space-between'} sx={{width: '100%'}}>
			<Typography>{label}:&nbsp;</Typography>
			<Typography>{value || 'N/A'}</Typography>
		</Stack>
	);
};

export default OrderItemDetail;
