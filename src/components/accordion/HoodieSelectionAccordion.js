import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { Accordion } from '../design/Accordion';
import { AccordionSummary } from '../design/AccordionSummary';
import { AccordionDetails } from '../design/AccordionDetails';
import Swatch from '../design/Swatch';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const HoodieSelectionAccordion = ({ hoodieSelectionList, accordionNumber, expanded, changeExpandedAccordion, selectedHoodie, setSelectedHoodie }) => {
	const isSelected = expanded === accordionNumber;

	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 1536 },
			items: 12,
			slidesToSlide: 12 // optional, default to 1.
			// partialVisibilityGutter: 80
		},
		desktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 1536, min: 900 },
			items: 12,
			slidesToSlide: 12 // optional, default to 1.
			// partialVisibilityGutter: 80
		},
		tablet: {
			breakpoint: { max: 900, min: 600 },
			items: 9,
			slidesToSlide: 9 // optional, default to 1.
			// partialVisibilityGutter: 50
		},
		mobile: {
			breakpoint: { max: 600, min: 0 },
			items: 6,
			slidesToSlide: 6 // optional, default to 1.
			// partialVisibilityGutter: 80
		}
	};

	return (
		<Accordion
			sx={{ bgcolor: isSelected ? 'white' : 'rgba(255,255,255,0.8)' }}
			key='hoodieBase'
			expanded={isSelected}
			onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary aria-controls='hoodie-color' id='select-hoodie-color-header' expanded={isSelected}>
				<Typography textAlign='left'>
					{accordionNumber}. Choose a Base{selectedHoodie !== null && ` - ${hoodieSelectionList[selectedHoodie].alt}`}
				</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ position: 'relative', padding: '10px 32px  10px 32px' }}>
				<Carousel
					swipeable={true}
					draggable={false}
					// showDots={true}
					// renderDotsOutside={true}
					responsive={responsive}
					infinite={false}
					autoPlay={false}
					// renderButtonGroupOutside={true}
					// centerMode={true}
					// partialVisbile={true}
					focusOnSelect={true}
					keyBoardControl={true}
					transitionDuration={1000}
					containerClass='carousel-container'
					// removeArrowOnDeviceType={['tablet', 'mobile']}
					// dotListClass='custom-dot-list-style'
					// itemClass='swatch-carousel item'
				>
					{hoodieSelectionList.map((swatch, index) => {
						return (
							<div>
								<Tooltip
									title={swatch.alt}
									enterDelay={1000}
									enterNextDelay={1000}
									disableInteractive={true}
									PopperProps={{
										modifiers: [
											{
												name: 'offset',
												options: {
													offset: [0, -22]
												}
											}
										]
									}}>
									<IconButton
										sx={{
											borderRadius: 0,
											borderColor: 'primary.main',
											margin: 0,
											padding: 0,
											'&:hover': {
												// backgroundColor: 'transparent',
												cursor: 'pointer'
											}
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
							</div>
						);
					})}
				</Carousel>

				{/* <Card raised>
					<div className='swatch-carousel container'>
						<Carousel responsive={responsive} partialVisible={true}>
							{hoodieSelectionList.map((swatch, index) => {
								return (
									<div className='swatch-carousel item'>
										<Tooltip
											title={swatch.alt}
											enterDelay={1000}
											enterNextDelay={1000}
											disableInteractive={true}
											PopperProps={{
												modifiers: [
													{
														name: 'offset',
														options: {
															offset: [0, -22]
														}
													}
												]
											}}>
											<IconButton
												sx={{
													borderRadius: 0,
													borderColor: 'primary.main',
													margin: 0,
													padding: 0,
													'&:hover': {
														// backgroundColor: 'transparent',
														cursor: 'pointer'
													}
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
									</div>
								);
							})}
						</Carousel>
					</div>
				</Card> */}

				{/* <Grid container direction='row' justifyContent='flex-start'>
					{hoodieSelectionList.map((swatch, index) => {
						return (
							<Grid item xs={3} sm={2} key={`hoodieOption${index}`}>
								<Tooltip
									title={swatch.alt}
									enterDelay={1000}
									enterNextDelay={1000}
									disableInteractive={true}
									PopperProps={{
										modifiers: [
											{
												name: 'offset',
												options: {
													offset: [0, -22]
												}
											}
										]
									}}>
									<IconButton
										sx={{
											borderRadius: 0,
											borderColor: 'primary.main',
											margin: 0,
											padding: 0,
											'&:hover': {
												// backgroundColor: 'transparent',
												cursor: 'pointer'
											}
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
							</Grid>
						);
					})}
				</Grid> */}
				{/* </Carousel> */}
			</AccordionDetails>
		</Accordion>
	);
};

export default HoodieSelectionAccordion;
