import { IconButton, Tooltip, Typography } from '@mui/material';
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
			items: Math.ceil(hoodieSelectionList.length / 2),
			slidesToSlide: Math.ceil(hoodieSelectionList.length / 2) // optional, default to 1.
			// partialVisibilityGutter: 80
		},
		desktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 1536, min: 900 },
			items: Math.ceil(hoodieSelectionList.length / 2),
			slidesToSlide: Math.ceil(hoodieSelectionList.length / 2) // optional, default to 1.
			// partialVisibilityGutter: 80
		},
		tablet: {
			breakpoint: { max: 900, min: 600 },
			items: Math.ceil(hoodieSelectionList.length / 3),
			slidesToSlide: Math.ceil(hoodieSelectionList.length / 3) // optional, default to 1.
			// partialVisibilityGutter: 50
		},
		mobile: {
			breakpoint: { max: 600, min: 0 },
			items: Math.ceil(hoodieSelectionList.length / 4),
			slidesToSlide: Math.ceil(hoodieSelectionList.length / 4) // optional, default to 1.
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
			<AccordionDetails sx={{ position: 'relative', padding: '10px 50px  10px 50px' }}>
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
					// focusOnSelect={true}
					// keyBoardControl={true}
					// transitionDuration={300}
					containerClass='carousel-container'
					// removeArrowOnDeviceType={['tablet', 'mobile']}
					// dotListClass='custom-dot-list-style'
					// itemClass='swatch-carousel item'
				>
					{hoodieSelectionList.map((swatch) => {
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
			</AccordionDetails>
		</Accordion>
	);
};

export default HoodieSelectionAccordion;
