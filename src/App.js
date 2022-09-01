import logo from './logo.svg';
import './App.css';
import LogoBlue from './assets/toxic-wave-logo/logo_blue.png';
import LogoBlueGreenGradient from './assets/toxic-wave-logo/logo_blue_green_gradient.png';
import LogoPinkOrangeGradient from './assets/toxic-wave-logo/logo_pink_orange_gradient.png';
import LogoWhite from './assets/toxic-wave-logo/logo_white.png';
import StitchSwatchBlue from './assets/swatch/swatch_blue.png';
import StitchSwatchBlueGreenGradient from './assets/swatch/swatch_blue_green_gradient.png';
import StitchSwatchPinkOrangeGradient from './assets/swatch/swatch_pink_orange_gradient.png';
import StitchSwatchWhite from './assets/swatch/swatch_white.png';
import HoodieArmy from './assets/hoodie/hoodie_army.png';
import HoodieBlack from './assets/hoodie/hoodie_black.png';
import HoodieBlue from './assets/hoodie/hoodie_blue.png';
import HoodieLavender from './assets/hoodie/hoodie_lavender.png';
import HoodiePlum from './assets/hoodie/hoodie_plum.png';
import HoodieYellow from './assets/hoodie/hoodie_yellow.png';
import { forwardRef, useState } from 'react';
import Swatch from './components/Swatch';
import { Container, IconButton, StepButton, Tooltip, Typography } from '@mui/material';

import HoodieSwatchArmy from './assets/hoodie/swatch/army.png';
import HoodieSwatchBlack from './assets/hoodie/swatch/black.png';
import HoodieSwatchBlue from './assets/hoodie/swatch/blue.png';
import HoodieSwatchLavender from './assets/hoodie/swatch/lavender.png';
import HoodieSwatchPlum from './assets/hoodie/swatch/plum.png';
import HoodieSwatchYellow from './assets/hoodie/swatch/yellow.png';

// import { Swatch } from '@sajari/react-components';

function App() {
	const [selectedSwatch, setSelectedSwatch] = useState(0);
	const [selectedHoodie, setSelectedHoodie] = useState(0);

	const swatchSelectionList = [
		{ logo: LogoBlue, swatchImage: StitchSwatchBlue, alt: 'Blue', order: 0 },
		{ logo: LogoBlueGreenGradient, swatchImage: StitchSwatchBlueGreenGradient, alt: 'Blue Green Gradient', order: 1 },
		{ logo: LogoPinkOrangeGradient, swatchImage: StitchSwatchPinkOrangeGradient, alt: 'Pink Orange Gradient', order: 2 },
		{ logo: LogoWhite, swatchImage: StitchSwatchWhite, alt: 'White', order: 3 }
	];

	const hoodieSelectionList = [
		{ logo: HoodieArmy, swatchImage: HoodieSwatchArmy, alt: 'Army', order: 0 },
		{ logo: HoodieBlack, swatchImage: HoodieSwatchBlack, alt: 'Black', order: 1 },
		{ logo: HoodieBlue, swatchImage: HoodieSwatchBlue, alt: 'Blue', order: 2 },
		{ logo: HoodieLavender, swatchImage: HoodieSwatchLavender, alt: 'Lavender', order: 3 },
		{ logo: HoodiePlum, swatchImage: HoodieSwatchPlum, alt: 'Plum', order: 4 },
		{ logo: HoodieYellow, swatchImage: HoodieSwatchYellow, alt: 'Yellow', order: 5 }
	];

	return (
		<div className='App'>
			<Container maxWidth='sm'>
				<div className='hoodie-stitch container'>
					<img className='toxic-wave-logo hoodie-stitch stitch' src={swatchSelectionList[selectedSwatch].logo} alt='Stitch' />
					<img className='hoodie-base hoodie-stitch hoodie' src={hoodieSelectionList[selectedHoodie].logo} alt='Hoodie' />
				</div>
				<div className='swatch-group'>
					<div className='swatch-selector-group'>
						<Typography sx={{ width: 100 }}>Stitching</Typography>

						{swatchSelectionList.map((swatch) => {
							return (
								<Tooltip title={swatch.alt} placement='top'>
									<IconButton
										sx={{
											borderRadius: 0,
											borderColor: 'primary.main',
											margin: 0,
											padding: 0
										}}>
										<Swatch
											swatchImage={swatch.swatchImage}
											type='color-swatch'
											alt={swatch.alt}
											number={swatch.order}
											selectedSwatch={selectedSwatch}
											setSelectedSwatch={setSelectedSwatch}
										/>
									</IconButton>
								</Tooltip>
							);
						})}
					</div>

					<div className='swatch-selector-group'>
						<Typography sx={{ width: 100 }}>Base</Typography>
						{hoodieSelectionList.map((swatch) => {
							return (
								<Tooltip title={swatch.alt}>
									<IconButton
										sx={{
											borderRadius: 0,
											borderColor: 'primary.main',
											margin: 0,
											padding: 0
										}}>
										<Swatch
											swatchImage={swatch.swatchImage}
											type='color-swatch'
											alt={swatch.alt}
											number={swatch.order}
											selectedSwatch={selectedHoodie}
											setSelectedSwatch={setSelectedHoodie}
										/>
									</IconButton>
								</Tooltip>
							);
						})}
					</div>
				</div>
			</Container>
		</div>
	);
}

export default App;
