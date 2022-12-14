import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Accordion } from '../design/Accordion';
import { AccordionSummary } from '../design/AccordionSummary';
import { AccordionDetails } from '../design/AccordionDetails';
import Swatch from '../design/Swatch';

const FillSelectionAccordion = ({ fillSelectionList, accordionNumber, expanded, changeExpandedAccordion, selectedFill, setSelectedFill }) => {
	const changeOrRemove = (newColorId) => {
		console.log(selectedFill);
		console.log(newColorId);
		if (selectedFill === newColorId) {
			setSelectedFill(null);
		} else {
			setSelectedFill(newColorId);
		}
	};
	return (
		<Accordion
			sx={{ bgcolor: expanded ? 'white' : 'rgba(255,255,255,0.8)' }}
			key='stitchFillBase'
			expanded={expanded}
			onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary aria-controls='stitch-fill-color' id='select-stitch-fill-color-header' expanded={expanded}>
				<Typography textAlign='left'>
					{accordionNumber}. Stitch Fill (optional){selectedFill !== null && ` - ${fillSelectionList[selectedFill].alt}`}
				</Typography>
			</AccordionSummary>

			<AccordionDetails key='fill-selection-accordion' className='color-swatch-accordion-details'>
				<Grid container>
					{fillSelectionList.map((stitchFill, index) => {
						return (
							<Grid item xs={1.5} sm={1} key={`colorsetlistcarousel${index}`}>
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
											selectedSwatch={selectedFill}
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

export default FillSelectionAccordion;
