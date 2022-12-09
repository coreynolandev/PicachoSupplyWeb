import { Box, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ProcessingTimeout = ({ resetSubmitOrder }) => {
	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		if (disabled) {
			var timeoutAnimation = setTimeout(() => {
				setDisabled(false);
			}, 5000);
			return () => {
				clearTimeout(timeoutAnimation);
			};
		}
	}, [disabled]);

	const handleReset = () => {
		if (!disabled) {
			dispatch(resetSubmitOrder());
		}
	};

	return (
		<>
			<Box>
				<Button sx={{ width: '100%' }} variant='contained' color={disabled ? 'inherit' : 'error'} onClick={() => handleReset()}>
					{disabled ? <CircularProgress size={28} color='success' /> : 'Something went wrong :\' (\nClick to try again'}
				</Button>
			</Box>
		</>
	);
};

export default ProcessingTimeout;
