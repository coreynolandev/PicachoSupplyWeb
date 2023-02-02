import { Box, Card, Grid } from '@mui/material';

import KrownThumbnail from '../assets2/shop/KROWN Icon.png';
import KrownThumbnailHover from '../assets2/shop/KROWN Icon Hover.png';
import HoodieThumbnail from '../assets2/shop/Hoodie Icon.png';
import HoodieThumbnailHover from '../assets2/shop/Hoodie Icon Hover.png';
import ExplorerThumbnail from '../assets2/shop/Hat Icon.png';
import ExplorerThumbnailHover from '../assets2/shop/Hat Icon Hover.png';
import { useState } from 'react';

const Shop = () => {
	const [hoodieHover, setHoodieHover] = useState(false);
	const [explorerHover, setExplorerHover] = useState(false);
	const [krownHover, setKrownHover] = useState(false);

	return (
		<Grid container spacing={3} mb={2} p={2} justifyContent='center'>
			<Grid item sm={12} md={6} className=' shop-card'>
				<Card raised>
					<Box className='shop-card-content' component='a' href='/hoodies'>
						<img
							src={hoodieHover ? HoodieThumbnailHover : HoodieThumbnail}
							onMouseOver={() => setHoodieHover(true)}
							onMouseOut={() => setHoodieHover(false)}
							alt='Lifestyle Hoodie'
							className='shop-card-content thumbnail'
						/>
					</Box>
				</Card>
			</Grid>

			<Grid item sm={12} md={6} className=' shop-card'>
				<Card raised>
					<Box className='shop-card-content' component='a' href='/explorer-hat'>
						<img
							src={explorerHover ? ExplorerThumbnailHover : ExplorerThumbnail}
							onMouseOver={() => setExplorerHover(true)}
							onMouseOut={() => setExplorerHover(false)}
							alt='Explorer Hat'
							className='shop-card-content thumbnail'
						/>
					</Box>
				</Card>
			</Grid>

			<Grid item sm={12} md={6} className=' shop-card'>
				<Card raised>
					<Box className='shop-card-content link' sx={{ cursor: 'auto  !important' }}>
						<img
							src={krownHover ? KrownThumbnailHover : KrownThumbnail}
							onMouseOver={() => setKrownHover(true)}
							onMouseOut={() => setKrownHover(false)}
							alt='Krown Hat'
							className='shop-card-content thumbnail'
						/>
					</Box>
				</Card>
			</Grid>
		</Grid>
	);
};

export default Shop;
