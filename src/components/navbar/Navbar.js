import { AppBar, Box, Container, IconButton, List, ListItem, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';

import PicachoLogo from '../../assets2/picacho_logo.png';
import MyShoppingCart from '../../assets2/shopping-cart.png';
import { useState } from 'react';

const Navbar = ({ changeColorMode, mode }) => {
	var orders = useSelector((state) => state.cart.order);
	const numberOfItemsInCart = orders.reduce(function (acc, obj) {
		return acc + obj.quantity;
	}, 0);

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

		// event.stopPropagation();
	};

	return (
		<AppBar position='sticky' color='default' className='topnav' sx={{ boxShadow: 'none' }}>
			{/* <AppBar position='sticky' color='default' sx={{ background: 'transparent', boxShadow: 'none' }}> */}
			<Container maxWidth='none' disableGutters sx={{ height: '100%' }}>
				<Toolbar disableGutters sx={{ justifyContent: 'space-between', background: 'transparent', width: '100%', maxHeight: '80px' }}>
					<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
						<IconButton size='small' aria-label='expand options' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
							<MenuIcon />
						</IconButton>
						<section className='newsidebar ' hidden={!isSideNavOpen} onClick={(event) => stopProp(event)}>
							<div className='left80p animate__animated animate__slideInLeft animate__faster' onClick={(event) => doProp(event)}>
								<List>
									<ListItem key='X-item' className='row80' onClick={handleCloseNavMenu}>
										<ListItemText disableTypography primary={<Typography style={{ color: '#FFFFFF' }}>X</Typography>} />
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
								{/* <header className='row80' onClick={handleCloseNavMenu}>
									X
								</header>
								<div className='reststack'>
									<nav>
										<div>home</div>
										<div>home</div>
										<div>home</div>
									</nav>
								</div> */}
							</div>
						</section>
						{/* <Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorPosition={{ top: 60, left: 10 }}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block' }
							}}>
							<MenuItem sx={{ justifyContent: 'flex-end' }} key={`menu-item-home`} onClick={handleCloseNavMenu}>
								<Typography className='navlink' component='a' href={`/`} key={`navbarLink-home`}>
									Home
								</Typography>
							</MenuItem>
							{pages.map((page) => (
								<MenuItem sx={{ justifyContent: 'flex-end' }} key={`menu-item-${page.name}`} onClick={handleCloseNavMenu}>
									<Typography className='navlink' component='a' href={`/${page.link}`} key={`navbarLink-${page.link}`}>
										{page.name}
									</Typography>
								</MenuItem>
							))}
						</Menu> */}
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
						<a className='shopping-cart' href='/review-order'>
							<IconButton color='inherit'>
								<Box component='img' src={MyShoppingCart} alt='Cart' />
								{/* <ShoppingCart /> */}
								{/* <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
									<path d='M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.305-15l-3.432 12h-10.428l-3.777-9h-2.168l4.615 11h13.239l3.474-12h1.929l.743-2h-4.195z' />
								</svg> */}
							</IconButton>
							<Typography className='icon animate__animated animate__bounceIn' sx={{ fontFamily: 'sans-serif' }}>
								{numberOfItemsInCart}
							</Typography>
						</a>
					</Stack>

					<Box sx={{ justifyContent: 'flex-end', alignItems: 'center', display: { xs: 'block', sm: 'none' } }}>
						<a className='shopping-cart' href='/review-order'>
							<IconButton color='inherit'>
								<Box component='img' src={MyShoppingCart} alt='Cart' />
								{/* <ShoppingCart /> */}
								{/* <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
									<path d='M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.305-15l-3.432 12h-10.428l-3.777-9h-2.168l4.615 11h13.239l3.474-12h1.929l.743-2h-4.195z' />
								</svg> */}
							</IconButton>
							<Typography className='icon animate__animated animate__bounceIn' sx={{ fontFamily: 'sans-serif' }}>
								{numberOfItemsInCart}
							</Typography>
						</a>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
