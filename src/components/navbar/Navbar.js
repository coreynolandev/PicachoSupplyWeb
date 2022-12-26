import { AppBar, Box, Container, IconButton, List, ListItem, ListItemText, Slide, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import PicachoLogo from '../../assets2/picacho_logo.png';
import { useEffect, useState } from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined
	});
	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight
			});
		}
		// Add event listener
		window.addEventListener('resize', handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
}

const Navbar = ({ changeColorMode, mode }) => {
	var orders = useSelector((state) => state.cart.order);
	const numberOfItemsInCart = orders.reduce(function (acc, obj) {
		return acc + obj.quantity;
	}, 0);

	const [animateQuantity, setAnimateQuantity] = useState(false);

	useEffect(() => {
		numberOfItemsInCart !== 0 && setAnimateQuantity(true);
	}, [numberOfItemsInCart]);

	const [isSideNavOpen, setIsSideNavOpen] = useState(false);
	var trigger = useScrollTrigger({ threshold: isSideNavOpen ? 10000 : 16 });

	const size = useWindowSize();

	useEffect(() => {
		if (size.width >= 600) setIsSideNavOpen(false);
	}, [size]);

	const handleOpenNavMenu = (event) => {
		setIsSideNavOpen(true);
	};

	const handleCloseNavMenu = () => {
		setIsSideNavOpen(false);
	};

	const stopProp = (event) => {
		console.log(event);
		event.stopPropagation();
		setIsSideNavOpen(false);
	};

	const doProp = (event) => {
		console.log('hello');
		console.log(event);
		event.stopPropagation();
	};

	var animationRubberClass = animateQuantity ? 'animate__animated animate__rubberBand' : '';
	var animationBounceClass = animateQuantity ? 'animate__animated animate__bounce' : '';

	return (
		<Slide appear={false} in={!trigger}>
			<AppBar position='sticky' color='default' className='topnav' sx={{ boxShadow: 'none' }}>
				<Container maxWidth='none' disableGutters sx={{ height: '100%' }}>
					<Toolbar
						disableGutters
						sx={{
							justifyContent: 'space-between',
							background: 'transparent',
							width: '100%',
							maxHeight: '80px',
							minHeight: '80px !important'
						}}>
						<Box
							sx={{
								display: { xs: 'block', sm: 'none' },
								marginLeft: 1
							}}>
							<IconButton aria-label='expand options' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='primary'>
								<MenuIcon sx={{ fontSize: '30px' }} />
							</IconButton>
							<section className='newsidebar ' hidden={!isSideNavOpen} onClick={(event) => stopProp(event)}>
								<div className='left80p animate__animated animate__slideInLeft animate__faster' onClick={(event) => doProp(event)}>
									<List>
										<ListItem key='X-item' className='row80' onClick={handleCloseNavMenu}>
											<ListItemText
												disableTypography
												primary={
													<Typography component='a' className='x-text'>
														X
													</Typography>
												}
											/>
										</ListItem>

										<ListItem key='Home-item'>
											<ListItemText
												disableTypography
												primary={
													<Typography component='a' href='/'>
														Home
													</Typography>
												}
											/>
										</ListItem>

										<ListItem key='Shop-item'>
											<ListItemText
												disableTypography
												primary={
													<Typography component='a' href='/shop'>
														Shop
													</Typography>
												}
											/>
										</ListItem>

										<ListItem key='About Us-item'>
											<ListItemText
												disableTypography
												primary={
													<Typography component='a' href='/about-us'>
														About Us
													</Typography>
												}
											/>
										</ListItem>
										<ListItem key='Subscribe to Newsletter-item'>
											<ListItemText
												disableTypography
												primary={
													<Typography component='a' href='/subscribe'>
														Subscribe to Newsletter
													</Typography>
												}
											/>
										</ListItem>
									</List>
								</div>
							</section>
						</Box>

						{/* Logo */}
						<Box className='logo container' sx={{ display: 'flex', alignItems: 'center', paddingLeft: { sm: '11px' } }}>
							<a href='/' style={{ width: '100%', height: '100%', lineHeight: 0 }}>
								<Box className=' navbar-image' component='img' src={PicachoLogo} alt='Picacho Logo' />
							</a>
						</Box>

						{/* SM+ Links */}
						<Stack justifyContent={'space-between'} alignItems='center' direction='row' sx={{ display: { xs: 'none', sm: 'flex' }, marginRight: '10px' }} spacing={2}>
							<Typography className='navlink' component='a' href={`/shop`} key={`navbarLink-full-shop`}>
								Shop
							</Typography>
							<Typography className='navlink' component='a' href={`/about-us`} key={`navbarLink-full-about-us`}>
								About Us
							</Typography>
							<a className={`shopping-cart ${animationRubberClass}`} onAnimationEnd={() => setAnimateQuantity(false)} href='/review-order'>
								<IconButton color='primary'>
									<ShoppingBagIcon sx={{ fontSize: '30px' }} />
								</IconButton>
								{numberOfItemsInCart !== null && numberOfItemsInCart > 0 && (
									<Typography className={`icon ${animationBounceClass}`} onAnimationEnd={() => setAnimateQuantity(false)}>
										{numberOfItemsInCart}
									</Typography>
								)}
							</a>
						</Stack>

						{/* XS Cart */}
						<Box
							sx={{
								display: { xs: 'block', sm: 'none' },
								marginRight: 1
							}}>
							<a className={`shopping-cart ${animationRubberClass}`} onAnimationEnd={() => setAnimateQuantity(false)} href='/review-order'>
								<IconButton color='primary'>
									<ShoppingBagIcon sx={{ fontSize: '30px' }} />
								</IconButton>
								{numberOfItemsInCart !== null && numberOfItemsInCart > 0 && (
									<Typography className={`icon ${animationBounceClass}`} onAnimationEnd={() => setAnimateQuantity(false)}>
										{numberOfItemsInCart}
									</Typography>
								)}
							</a>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</Slide>
	);
};

export default Navbar;
