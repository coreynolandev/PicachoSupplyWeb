import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem } from '../../features/cartSlice';
import QuantitySelector from '../buttons/QuantitySelector';
import OrderItemDetail from './OrderItemDetail';

const HoodieForCheckout = ({ hoodie, index, setSnackbarOpen }) => {
	const dispatch = useDispatch();

	const deleteItemFromOrder = (id) => {
		dispatch(removeItem(id));
		setSnackbarOpen(true);
	};
	const [hoodieOrPreview, setHoodieOrPreview] = useState('hoodie');
	const FullHoodie = () => (
		<Box key={`unzoomed-hoodie-${index}`}>
			{hoodie !== null && hoodie.borderColorImg && <img key='border-color-img' className='toxic-wave-logo hoodie-stitch outline' src={hoodie.borderColorImg} alt='Border' />}
			{hoodie !== null && hoodie.fillColorImg && <img key='fill-color-img' className='toxic-wave-logo hoodie-stitch stitch' src={hoodie.fillColorImg} alt='Stitch' />}
			{hoodie !== null && hoodie.gradientColorImg && <img key='gradient-color-img' className='toxic-wave-logo hoodie-stitch stitch gradient' src={hoodie.gradientColorImg} alt='Gradient' />}
			{hoodie !== null && hoodie.baseColorImg && <img key='base-color-img' className='hoodie-base hoodie-stitch hoodie' src={hoodie.baseColorImg} alt='Hoodie' />}
		</Box>
	);

	const ZoomedLogo = () => (
			<Box key={`zoomedLogo-${index}`} position={'relative'} className='hoodie-stitch container'>
				{hoodie.borderColorImg && <img key='border-color-zoom-img' className='toxic-wave-logo hoodie-stitch-only outline' src={hoodie.borderColorImg} alt='Border' />}
				{hoodie.fillColorImg && <img key='fill-color-zoom-img' className='toxic-wave-logo hoodie-stitch-only stitch' src={hoodie.fillColorImg} alt='Stitch' />}
				{hoodie.gradientColorImg && <img key='gradient-color-zoom-img' className='toxic-wave-logo hoodie-stitch-only stitch gradient' src={hoodie.gradientColorImg} alt='Gradient' />}
				{hoodie.baseColorImg && <img key='base-color-zoom-img' className='hoodie-base hoodie-stitch-only hoodie' src={hoodie.baseColorImg} alt='Hoodie' />}
			</Box>
	);

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
						{hoodieOrPreview === 'hoodie' ? FullHoodie() : ZoomedLogo()}
					</Box>
					<Button
						key={`fullorzoomedhoodiebutton-${index}`}
						color={hoodieOrPreview === 'hoodie' ? 'viewEmbroidery' : 'viewHoodie'}
						variant={hoodieOrPreview === 'hoodie' ? 'contained' : 'contained'}
						onClick={() => setHoodieOrPreview(hoodieOrPreview === 'hoodie' ? 'preview' : 'hoodie')}
						sx={{ width: '200px', marginBottom: 1 }}>
						{hoodieOrPreview === 'hoodie' ? 'View Embroidery' : 'View Hoodie'}
					</Button>
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
						{hoodie.type}
					</Typography>
					<OrderItemDetail key={`orderItem-Base-${index}`} label='Base' value={hoodie.baseColor} />
					<OrderItemDetail key={`orderItem-Border-${index}`} label='Border' value={hoodie.borderColor} />
					<OrderItemDetail key={`orderItem-Fill-${index}`} label='Fill' value={hoodie.fillColor} />
					<OrderItemDetail key={`orderItem-Gradient-${index}`} label='Gradient' value={hoodie.gradientColor} />
					<OrderItemDetail key={`orderItem-Size-${index}`} label='Size' value={hoodie.size} />
					<QuantitySelector key={`quantitySelector-${index}`} orderItem={hoodie} />
					<Stack key='edit-remove-buttons' direction='row' spacing={2} justifyContent='center' sx={{ margin: '2rem !important' }}>
						<Button key={`edithoodie-${index}`} variant='contained' color='edit'>
							<Link to={'/hoodies'} state={{ editId: hoodie.id }} style={{ textDecoration: 'none', color: 'black' }}>
								Edit
							</Link>
						</Button>
						<Button key={`removehoodie-${index}`} color='error' variant='outlined' onClick={() => deleteItemFromOrder(hoodie.id)}>
							Remove
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Card>
	);
};

export default HoodieForCheckout;
