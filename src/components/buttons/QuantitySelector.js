import { Add, Remove } from '@mui/icons-material';
import { Button, ButtonGroup, Icon } from '@mui/material';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decreaseQuantity } from '../../features/cartSlice';

const QuantitySelector = ({ orderItem }) => {
	const dispatch = useDispatch();
	return (
		<ButtonGroup>
			<Button className='stepper-button' onClick={() => dispatch(decreaseQuantity(orderItem.id))}>
				<Icon component={Remove} fontSize='small' />
			</Button>
			<Button disableRipple className='stepper-quantity'>
				{orderItem.quantity}
			</Button>
			<Button className='stepper-button' onClick={() => dispatch(incrementQuantity(orderItem.id))}>
				<Icon component={Add} fontSize='small' />
			</Button>
		</ButtonGroup>
	);
};

export default QuantitySelector;
