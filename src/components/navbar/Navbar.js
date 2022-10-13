import { DarkModeOutlined, LightModeOutlined, ShoppingCartCheckout } from '@mui/icons-material';
import { AppBar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
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
		<AppBar position='sticky' color='default' sx={{}}>
			<Container maxWidth='none' disableGutters>
				<Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
					{/* <Box sx={{ display: { xs: 'flex', sm: 'none' } }}></Box> */}

					<Box className='logo container' component='img' src={mode === 'dark' ? PicachoLogoDark : PicachoLogo} alt='Picacho Logo' sx={{ maxHeight: '90px' }} />
					<Box sx={{ justifyContent: 'flex-end', alignItems: 'center', display: 'flex' }}>
						<IconButton onClick={changeColorMode} color='inherit'>
							{mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
						</IconButton>
						<IconButton color='inherit'>
							<ShoppingCartCheckout />
						</IconButton>
						<IconButton size='large' aria-label='expand options' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorPosition={{ top: 100 }}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							// anchorPosition={{top:60, left: 10}}
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
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
