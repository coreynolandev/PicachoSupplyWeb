import { IconButton, Tooltip, Typography } from '@mui/material';
import { Accordion } from '../design/Accordion';
import { AccordionSummary } from '../design/AccordionSummary';
import { AccordionDetails } from '../design/AccordionDetails';
import Swatch from '../design/Swatch';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const BorderSelectionAccordion = ({ borderSelectionList, accordionNumber, expanded, changeExpandedAccordion, selectedBorder, setSelectedBorder }) => {
	const isSelected = expanded === accordionNumber;

	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 1536 },
			items: Math.ceil(borderSelectionList.length / 2),
			slidesToSlide: Math.ceil(borderSelectionList.length / 2) // optional, default to 1.
			// partialVisibilityGutter: 80
		},
		desktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 1536, min: 900 },
			items: Math.ceil(borderSelectionList.length / 2),
			slidesToSlide: Math.ceil(borderSelectionList.length / 2) // optional, default to 1.
			// partialVisibilityGutter: 80
		},
		tablet: {
			breakpoint: { max: 900, min: 600 },
			items: Math.ceil(borderSelectionList.length / 3),
			slidesToSlide: Math.ceil(borderSelectionList.length / 3) // optional, default to 1.
			// partialVisibilityGutter: 50
		},
		mobile: {
			breakpoint: { max: 600, min: 0 },
			items: Math.ceil(borderSelectionList.length / 4),
			slidesToSlide: Math.ceil(borderSelectionList.length / 4) // optional, default to 1.
			// partialVisibilityGutter: 80
		}
	};
	return (
		<Accordion
			sx={{ bgcolor: isSelected ? 'white' : 'rgba(255,255,255,0.8)' }}
			key='borderBase'
			expanded={isSelected}
			onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary aria-controls='border-color' id='select-border-color-header' expanded={isSelected}>
				<Typography textAlign='left'>
					{accordionNumber}. Choose a Border{selectedBorder !== null && ` - ${borderSelectionList[selectedBorder].alt}`}
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
					{borderSelectionList.map((border, index) => {
						return (
							<div>
								<Tooltip
									title={border.alt}
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
												cursor: 'pointer'
											}
										}}>
										<Swatch
											swatchImage={border.swatchImage}
											type='color-swatch'
											alt={border.alt}
											number={border.order}
											selectedSwatch={selectedBorder}
											setSelectedSwatch={setSelectedBorder}
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

export default BorderSelectionAccordion;
