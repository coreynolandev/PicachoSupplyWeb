import { AppBar, Box, Container, IconButton, List, ListItem, ListItemText, Slide, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';

import PicachoLogo from '../../assets2/picacho_logo.png';
import MyShoppingCart from '../../assets2/shopping-cart.png';
import { useEffect, useState } from 'react';

const Navbar = ({ changeColorMode, mode }) => {
	var orders = useSelector((state) => state.cart.order);
	const numberOfItemsInCart = orders.reduce(function (acc, obj) {
		return acc + obj.quantity;
	}, 0);

	const [animateQuantity, setAnimateQuantity] = useState(false);

	var trigger = useScrollTrigger({ threshold: 16 });

	useEffect(() => {
		numberOfItemsInCart !== 0 && setAnimateQuantity(true);
		window.scrollBy(0, -1);
	}, [numberOfItemsInCart]);

	const [isSideNavOpen, setIsSideNavOpen] = useState(false);

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
		<Slide appear={true} direction='down' in={!trigger}>
			<AppBar position='sticky' color='default' className='topnav' sx={{ boxShadow: 'none' }}>
				{/* <AppBar position='sticky' color='default' sx={{ background: 'transparent', boxShadow: 'none' }}> */}
				<Container maxWidth='none' disableGutters sx={{ height: '100%' }}>
					<Toolbar disableGutters sx={{ justifyContent: 'space-between', background: 'transparent', width: '100%', maxHeight: '80px' }}>
						<Box sx={{ display: { xs: 'block', sm: 'none' }, width: {xs: '48px', sm: '0px'} }}>
							<IconButton size='small' aria-label='expand options' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
								<MenuIcon />
							</IconButton>
							<section className='newsidebar ' hidden={!isSideNavOpen} onClick={(event) => stopProp(event)}>
								<div className='left80p animate__animated animate__slideInLeft animate__faster' onClick={(event) => doProp(event)}>
									<List>
										<ListItem key='X-item' className='row80' onClick={handleCloseNavMenu}>
											<ListItemText
												disableTypography
												primary={
													<Typography className='x-text' style={{ color: '#FFFFFF' }}>
														X
													</Typography>
												}
											/>
										</ListItem>

										<ListItem key='Home-item'>
											<ListItemText
												disableTypography
												primary={
													<Typography component='a' href='/' style={{ color: '#FFFFFF' }}>
														Home
													</Typography>
												}
											/>
										</ListItem>

										<ListItem key='Shop-item'>
											<ListItemText
												disableTypography
												primary={
													<Typography component='a' href='/shop' style={{ color: '#FFFFFF' }}>
														Shop
													</Typography>
												}
											/>
										</ListItem>

										<ListItem key='About Us-item'>
											<ListItemText
												disableTypography
												primary={
													<Typography component='a' href='/about-us' style={{ color: '#FFFFFF' }}>
														About Us
													</Typography>
												}
											/>
										</ListItem>
									</List>
								</div>
							</section>
						</Box>

						<a href='/'>
							<Box className='logo container' component='img' src={mode === 'dark' ? PicachoLogo : PicachoLogo} alt='Picacho Logo' />
						</a>

						<Stack justifyContent={'space-between'} alignItems='center' direction='row' sx={{ display: { xs: 'none', sm: 'flex' } }} spacing={2}>
							<Typography className='navlink' component='a' href={`/shop`} key={`navbarLink-full-shop`}>
								Shop
							</Typography>
							<Typography className='navlink' component='a' href={`/about-us`} key={`navbarLink-full-about-us`}>
								About Us
							</Typography>
							<a className={`shopping-cart ${animationRubberClass}`} onAnimationEnd={() => setAnimateQuantity(false)} href='/review-order'>
								<IconButton color='inherit'>
									<Box component='img' src={MyShoppingCart} alt='Cart' />
								</IconButton>
								<Typography className={`icon ${animationBounceClass}`} onAnimationEnd={() => setAnimateQuantity(false)} sx={{ fontFamily: 'sans-serif' }}>
									{numberOfItemsInCart}
								</Typography>
							</a>
						</Stack>

						<Box sx={{ justifyContent: 'flex-end', alignItems: 'center', display: { xs: 'block', sm: 'none' } }}>
							<a className={`shopping-cart ${animationRubberClass}`} onAnimationEnd={() => setAnimateQuantity(false)} href='/review-order'>
								<IconButton color='inherit'>
									<Box component='img' src={MyShoppingCart} alt='Cart' />
								</IconButton>
								<Typography className={`icon ${animationBounceClass}`} sx={{ fontFamily: 'sans-serif' }}>
									{numberOfItemsInCart}
								</Typography>
							</a>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</Slide>
	);
};

export default Navbar;
