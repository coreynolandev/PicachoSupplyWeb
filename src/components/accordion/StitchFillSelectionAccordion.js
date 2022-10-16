import { IconButton, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { Accordion } from '../design/Accordion';
import { AccordionSummary } from '../design/AccordionSummary';
import { AccordionDetails } from '../design/AccordionDetails';
import Swatch from '../design/Swatch';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const StitchFillSelectionAccordion = ({
	patternType,
	changePatternType,
	stitchFillSelectionList,
	stitchGradientSelectionList,
	accordionNumber,
	expanded,
	changeExpandedAccordion,
	selectedStitchFill,
	selectedStitchGradient,
	changeStitchFill
}) => {
	var name = selectedStitchFill !== null ? ` - ${stitchFillSelectionList[selectedStitchFill].alt}` : '';
	if (selectedStitchGradient !== null) {
		if (name !== '') {
			name += `/${stitchFillSelectionList[selectedStitchGradient].alt}`;
		} else {
			name = `${stitchGradientSelectionList[selectedStitchGradient].alt}`;
		}
	}

	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 1536 },
			items: Math.ceil(stitchFillSelectionList.length / 2),
			slidesToSlide: Math.ceil(stitchFillSelectionList.length / 2) // optional, default to 1.
			// partialVisibilityGutter: 80
		},
		desktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 1536, min: 900 },
			items: Math.ceil(stitchFillSelectionList.length / 2),
			slidesToSlide: Math.ceil(stitchFillSelectionList.length / 2) // optional, default to 1.
			// partialVisibilityGutter: 80
		},
		tablet: {
			breakpoint: { max: 900, min: 600 },
			items: Math.ceil(stitchFillSelectionList.length / 3),
			slidesToSlide: Math.ceil(stitchFillSelectionList.length / 3) // optional, default to 1.
			// partialVisibilityGutter: 50
		},
		mobile: {
			breakpoint: { max: 600, min: 0 },
			items: Math.ceil(stitchFillSelectionList.length / 4),
			slidesToSlide: Math.ceil(stitchFillSelectionList.length / 4) // optional, default to 1.
			// partialVisibilityGutter: 80
		}
	};

	const colorSetList = patternType === 'fill' ? stitchFillSelectionList : stitchGradientSelectionList;
	const currentSwatchChosen = patternType === 'fill' ? selectedStitchFill : selectedStitchGradient;
	const isSelected = expanded === accordionNumber;

	return (
		<Accordion
			sx={{ bgcolor: isSelected ? 'white' : 'rgba(255,255,255,0.8)' }}
			key='stitchFillBase'
			expanded={isSelected}
			onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary aria-controls='stitch-fill-color' id='select-stitch-fill-color-header' expanded={isSelected}>
				<Typography textAlign='left' fontFamily={'catamaran'}>
					{accordionNumber}. Choose a Fill{name !== '' && name}
				</Typography>
			</AccordionSummary>

			<AccordionDetails sx={{ position: 'relative', padding: '10px 50px  10px 50px' }}>
				<ToggleButtonGroup
					name='patternType'
					value={patternType}
					fullWidth
					onChange={(event) => changePatternType(event.target.value.toLowerCase())}
					color='warning'
					exclusive
					size='small'
					aria-label='Select fill or gradient fill color options'
					sx={{ marginBottom: 1 }}>
					<ToggleButton value={'fill'}>Base Fill</ToggleButton>
					<ToggleButton value={'gradient'}>Gradient (Optional)</ToggleButton>
				</ToggleButtonGroup>
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
					{colorSetList.map((stitchFill, index) => {
						return (
							<div>
								<Tooltip
									title={stitchFill.alt}
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
											swatchImage={stitchFill.swatchImage}
											type='color-swatch'
											alt={stitchFill.alt}
											number={stitchFill.order}
											selectedSwatch={currentSwatchChosen}
											setSelectedSwatch={changeStitchFill}
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

export default StitchFillSelectionAccordion;
