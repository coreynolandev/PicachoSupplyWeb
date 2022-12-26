import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Accordion } from '../design/Accordion';
import { AccordionSummary } from '../design/AccordionSummary';
import { AccordionDetails } from '../design/AccordionDetails';
import Swatch from '../design/Swatch';

const GradientSelectionAccordion = ({ gradientSelectionList, accordionNumber, expanded, changeExpandedAccordion, selectedGradient, setSelectedGradient }) => {
	const changeOrRemove = (newColorId) => {
		console.log(selectedGradient);
		console.log(newColorId);
		if (selectedGradient === newColorId) {
			setSelectedGradient(null);
		} else {
			setSelectedGradient(newColorId);
		}
	};
	return (
		<Accordion
			sx={{ bgcolor: expanded ? 'white' : 'rgba(255,255,255,0.8)' }}
			key='stitchFillBase'
			expanded={expanded}
			onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary aria-controls='stitch-gradient-color' id='select-stitch-gradient-color-header' expanded={expanded} sx={{marginLeft: 0}}>
				<Typography textAlign='left'>
					{accordionNumber}. Stitch Gradient (optional){selectedGradient !== null && ` - ${gradientSelectionList[selectedGradient].alt}`}
				</Typography>
			</AccordionSummary>

			<AccordionDetails key='gradient-selection-accordion' className='color-swatch-accordion-details'>
				<Grid container>
					{gradientSelectionList.map((stitchFill, index) => {
						return (
							<Grid item xs={1.5} sm={1} key={`gradientlistcarousel${index}`}>
								<Tooltip
									title={stitchFill.alt}
									enterDelay={0}
									enterNextDelay={0}
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
											selectedSwatch={selectedGradient}
											setSelectedSwatch={changeOrRemove}
										/>
									</IconButton>
								</Tooltip>
							</Grid>
						);
					})}
				</Grid>

				<Typography sx={{ color: 'grey !important', fontSize: '14px !important' }}>click again to remove color</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default GradientSelectionAccordion;
