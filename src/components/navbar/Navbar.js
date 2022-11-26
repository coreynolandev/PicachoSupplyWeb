import { DarkModeOutlined, LightModeOutlined, ShoppingCartCheckout } from '@mui/icons-material';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import PicachoLogo from '../../assets/picacho_logo.png';
import PicachoLogoDark from '../../assets/dark_picacho_logo.png';
import { useState } from 'react';

const pages = [
	{ name: 'Shop', link: 'shop' },
	{ name: 'About Us', link: 'about-us' }
];

const Navbar = ({ changeColorMode, mode }) => {
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position='sticky' color='default' sx={{background: 'linear-gradient(90deg, #F8F8F8 0%, #EAEBEA 101.99%);', boxShadow: 'none', minHeight: '6vh'}}>
			
			{/* <AppBar position='sticky' color='default' sx={{ background: 'transparent', boxShadow: 'none' }}> */}
			<Container maxWidth='none' disableGutters>
				<Toolbar disableGutters sx={{ justifyContent: 'space-between', background: 'transparent', width: '100%', maxHeight: '80px' }}>
					<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
						<IconButton size='small' aria-label='expand options' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
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
						</Menu>
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
						<IconButton color='inherit'>
							<ShoppingCartCheckout />
						</IconButton>
					</Stack>

					<Box sx={{ justifyContent: 'flex-end', alignItems: 'center', display: { xs: 'block', sm: 'none' } }}>
						<IconButton size='small' color='inherit'>
							<ShoppingCartCheckout />
						</IconButton>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
