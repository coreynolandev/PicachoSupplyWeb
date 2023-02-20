import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';

import KrownThumbnail from '../assets2/shop/KROWN Icon.png';
import KrownThumbnailHover from '../assets2/shop/KROWN Icon Hover.png';
import HoodieThumbnail from '../assets2/shop/Hoodie Icon.png';
import HoodieThumbnailHover from '../assets2/shop/Hoodie Icon Hover.png';
import ExplorerThumbnail from '../assets2/shop/Hat Icon.png';
import ExplorerThumbnailHover from '../assets2/shop/Hat Icon Hover.png';
import { useState } from 'react';
import { INITIAL_HAT_COST } from './ExplorerHat';

const Shop = () => {
	const [hoodieHover, setHoodieHover] = useState(false);
	const [explorerHover, setExplorerHover] = useState(false);
	const [krownHover, setKrownHover] = useState(false);

	return (
		<Grid container spacing={3} mb={2} p={3} justifyContent='center'>
			<Grid
				item
				sm={12}
				md={4}
				className=' shop-card-content'
				onMouseOver={() => setHoodieHover(true)}
				onMouseOut={() => setHoodieHover(false)}
				onTouchStart={() => setHoodieHover(true)}
				onTouchEnd={() => setHoodieHover(false)}>
				<Stack direction='column' spacing={1} component='a' href='/hoodies' sx={{ textDecoration: 'none' }}>
					<Card raised>
						<Box sx={{ display: 'flex', height: '100%' }}>
							<img src={hoodieHover ? HoodieThumbnailHover : HoodieThumbnail} alt='Lifestyle Hoodie' className='shop-card-content' />
						</Box>
					</Card>

					<Card raised>
						<Stack direction={'row'} justifyContent='space-between' p={1}>
							<Typography>Lifestyle Hoodie</Typography>
							<Typography>$50.00</Typography>
						</Stack>
					</Card>
				</Stack>
			</Grid>

			<Grid
				item
				sm={12}
				md={4}
				className=' shop-card-content'
				onMouseOver={() => setExplorerHover(true)}
				onMouseOut={() => setExplorerHover(false)}
				onTouchStart={() => setExplorerHover(true)}
				onTouchEnd={() => setExplorerHover(false)}>
				<Stack direction='column' spacing={1} component='a' href='/explorer-hat' sx={{ textDecoration: 'none' }}>
					<Card raised>
						<Box sx={{ display: 'flex', height: '100%' }}>
							<img src={explorerHover ? ExplorerThumbnailHover : ExplorerThumbnail} alt='Explorer Hat' className='shop-card-content ' />
						</Box>
					</Card>

					<Card raised>
						<Stack direction={'row'} justifyContent='space-between' p={1}>
							<Typography>Explorer Hat</Typography>
							<Typography>${INITIAL_HAT_COST.toFixed(2)}</Typography>
						</Stack>
					</Card>
				</Stack>
			</Grid>

			<Grid
				item
				sm={12}
				md={4}
				className=' shop-card-content'
				onMouseOver={() => setKrownHover(true)}
				onMouseOut={() => setKrownHover(false)}
				onTouchStart={() => setKrownHover(true)}
				onTouchEnd={() => setKrownHover(false)}>
				<Stack direction='column' spacing={1}>
					<Card raised>
						<Box sx={{ display: 'flex', height: '100%' }}>
							<img src={krownHover ? KrownThumbnailHover : KrownThumbnail} alt='Krown Hat' className='shop-card-content' />
						</Box>
					</Card>

					<Card raised>
						<Stack direction={'row'} justifyContent='space-between' p={1}>
							<Typography>Krown Hat</Typography>
							<Typography>TBD</Typography>
						</Stack>
					</Card>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default Shop;
