import { Card, CardActionArea, CardContent, CardHeader, Grid } from '@mui/material';
import HoodieThumbnail from '../assets2/models/hoodie_thumbnail.png';
import KrownThumbnail from '../assets2/Krown-001.png';
import ExplorerThumbnail from '../assets2/explorer-hat/ExplorerThumbnail.png';

// const styles = {
// 	cardContainer: {
// 		backgroundImage: `url(${ExplorerThumbnail})`
// 	}
// };

const Shop = () => {
	return (
		<Grid container spacing={2} mt={2} mb={2} p={2} justifyContent='center'>
			{/* <Grid item sm={12} md={6} className=' shop-card'>
				<Card style={styles.cardContainer} className='shop-card-content thumbnail'>
					some text
				</Card>
			</Grid>

			<Grid item sm={12} md={6} className=' shop-card'>
				<img src={ExplorerThumbnail} alt='Explorer Hat Thumbnail' className='shop-card-content thumbnail' />
			</Grid>

			<Grid item sm={12} md={6} className=' shop-card'>
				<img src={KrownThumbnail} alt='Krown Thumbnail' className='shop-card-content thumbnail' />
			</Grid>

			<Grid item sm={12} md={6} className=' shop-card'>
				<img src={HoodieThumbnail} alt='Hoodie Thumbnail' className='shop-card-content thumbnail' />
			</Grid>

			<Grid item sm={12} md={6} className=' shop-card'>
				<img src={ExplorerThumbnail} alt='Explorer Hat Thumbnail' className='shop-card-content thumbnail' />
			</Grid>

			<Grid item sm={12} md={6} className=' shop-card'>
				<img src={KrownThumbnail} alt='Krown Thumbnail' className='shop-card-content thumbnail' />
			</Grid> */}

			<Grid item sm={12} md={6} className=' shop-card'>
				<Card raised>
					<CardActionArea disableRipple href='/hoodies'>
						<CardHeader title='Lifestyle Hoodie' sx={{ paddingBottom: 0 }} />
						<CardContent className='shop-card-content'>
							<img src={HoodieThumbnail} alt='Hoodie Thumbnail' className='shop-card-content thumbnail' />
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>

			<Grid item sm={12} md={6} className=' shop-card'>
				<Card raised>
					<CardActionArea disableRipple href='/explorer-hat'>
						<CardHeader title='Explorer Hat' sx={{ paddingBottom: 0 }} />
						<CardContent className='shop-card-content'>
							<img src={ExplorerThumbnail} alt='Explorer Hat Thumbnail' className='shop-card-content thumbnail' />
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>

			<Grid item sm={12} md={6} className=' shop-card'>
				<Card raised>
					<CardActionArea disableRipple sx={{ cursor: 'auto' }}>
						<CardHeader title='More Coming Soon!' sx={{ paddingBottom: 0 }} />
						<CardContent className='shop-card-content'>
							<img src={KrownThumbnail} alt='Krown Thumbnail' className='shop-card-content thumbnail' />
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		</Grid>
	);
};

export default Shop;

// <Card
// raised
// sx={{ width: { sm: '100%', md: '60%' }, height: '100%', padding: 3, bgcolor: 'rgba(255,255,255, .5)', backdropFilter: 'blur(5px)' }}
// className='animate__animated animate__fadeInDown'>
// {/* <Card raised sx={{ width: '50%' }}> */}
// <Stack justifyContent='center' spacing={2} alignItems='center' className=''>
//     <Typography variant='h3'>PICACHO SUPPLY</Typography>
//     {/* <Typography variant='h6'>pronunciation: pi-ca-cho</Typography> */}
//     <Typography variant='h6'>definition: something about what picacho means/origin</Typography>
//     <Typography variant='h5'>Brief slogan... Or we could opt for something bigger like mission statement</Typography>
// </Stack>
// </Card>
// <Button role={'link'} href='/shop' variant='contained' color='primary' className='animate__animated  animate__pulse animate__slow animate__delay-2s animate__infinite'>
// Browse our Hoodies
// </Button>
