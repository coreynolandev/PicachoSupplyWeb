import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem } from '../../features/cartSlice';
import QuantitySelector from '../buttons/QuantitySelector';
import OrderItemDetail from './OrderItemDetail';

import CC_BACK from '../../assets2/explorer-hat/CC_BACK.jpg';
import CC_FRONT from '../../assets2/explorer-hat/CC_FRONT.jpg';
import CC_INNER from '../../assets2/explorer-hat/CC_INNER.jpg';
import CC_SIDE from '../../assets2/explorer-hat/CC_SIDE.jpg';
import GW_BACK from '../../assets2/explorer-hat/GW_BACK.jpg';
import GW_FRONT from '../../assets2/explorer-hat/GW_FRONT.jpg';
import GW_INNER from '../../assets2/explorer-hat/GW_INNER.jpg';
import GW_SIDE from '../../assets2/explorer-hat/GW_SIDE.jpg';
import PBC_BACK from '../../assets2/explorer-hat/PBC_BACK.jpg';
import PBC_FRONT from '../../assets2/explorer-hat/PBC_FRONT.jpg';
import PBC_INNER from '../../assets2/explorer-hat/PBC_INNER.jpg';
import PBC_SIDE from '../../assets2/explorer-hat/PBC_SIDE.jpg';

export const EXPLORER_HATS = [
	{ colorName: 'Cream & Chocolate', mainPic: CC_FRONT, sidePic: CC_SIDE, backPic: CC_BACK, innerPic: CC_INNER, order: 0, cost: 32.95 },
	{ colorName: 'Garnet & White', mainPic: GW_FRONT, sidePic: GW_SIDE, backPic: GW_BACK, innerPic: GW_INNER, order: 1, cost: 32.95 },
	{ colorName: 'Powder Blue & Chartreuse', mainPic: PBC_FRONT, sidePic: PBC_SIDE, backPic: PBC_BACK, innerPic: PBC_INNER, order: 2, cost: 32.95 }
];

const HatForCheckout = ({ hat, index, setSnackbarOpen }) => {

    console.log(hat)
	const dispatch = useDispatch();

	const deleteItemFromOrder = (id) => {
		dispatch(removeItem(id));
		setSnackbarOpen(true);
	};

    const selectedHat = EXPLORER_HATS.find(h => h.colorName === hat.colorName)

	return (
		<Card key={`realhoodie${index}`} raised>
			<Stack key={`wholeOrderStack-${index}`} direction={{ sm: 'column', md: 'row' }} spacing={3} p={2} justifyContent='space-between' alignItems='center'>
				<Stack key={`hoodieImage-${index}`} direction='column' spacing={1} alignItems='center'>
					<Box
						key={`fullorzoomedhoodie-${index}`}
						component='div'
						sx={{
							overflow: 'hidden',
							minWidth: '300px',
							width: '30%'
						}}
						position={'relative'}
						className='hoodie-stitch container '>
						<Box key={`unzoomed-hoodie-${index}`} className='hoodie-stitch container' sx={{display: 'flex', alignItems: 'center'}}>
							<img key='base-color-img' className=' hoodie-stitch-only hoodie' src={selectedHat.mainPic} alt='Hoodie' />
						</Box>
					</Box>
				</Stack>

				<Stack
					key={`orderItemList-${index}`}
					direction='column'
					spacing={1}
					alignSelf={{ sm: 'center', md: 'flex-end' }}
					alignItems='center'
					sx={{ width: '100%', maxWidth: '300px' }}
					m={'auto !important'}>
					<Typography key={`itemtype-${index}`} variant='h6' sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
						{hat.type}
					</Typography>
					<OrderItemDetail key={`orderItem-Hat-Base-${index}`} label='Color' value={hat.colorName} />
					<Stack key='edit-remove-buttons' direction='row' spacing={2} justifyContent='center' sx={{  marginTop: '2rem !important' }}>
						<Button key={`edithoodie-${index}`} variant='contained' color='edit'>
							<Link to={'/hoodies'} state={{ editId: hat.id }} style={{ textDecoration: 'none', color: 'black' }}>
								Edit
							</Link>
						</Button>
						<Button key={`removehoodie-${index}`} color='error' variant='outlined' onClick={() => deleteItemFromOrder(hat.id)}>
							Remove
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Card>
	);
};

export default HatForCheckout;
