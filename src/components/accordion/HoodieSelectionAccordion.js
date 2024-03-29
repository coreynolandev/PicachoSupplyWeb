import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Accordion } from '../design/Accordion';
import { AccordionSummary } from '../design/AccordionSummary';
import { AccordionDetails } from '../design/AccordionDetails';
import Swatch from '../design/Swatch';

const HoodieSelectionAccordion = ({ hoodieSelectionList, accordionNumber, expanded, changeExpandedAccordion, selectedHoodie, setSelectedHoodie }) => {
	return (
		<Accordion expanded={expanded} sx={{ bgcolor: expanded ? 'white' : 'rgba(255,255,255,0.8)' }} key='hoodieBase' onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary key='hoodieaccdsummary' aria-controls='hoodie-color' id='select-hoodie-color-header' expanded={expanded}>
				<Typography textAlign='left'>
					{accordionNumber}. Base*{selectedHoodie !== null && ` - ${hoodieSelectionList[selectedHoodie].alt} `}
				</Typography>
			</AccordionSummary>
			<AccordionDetails key='hoodie-selection-accordion-details' className='color-swatch-accordion-details'>
				<Grid container>
					{hoodieSelectionList.map((swatch, index) => {
						return (
							<Grid item xs={1.5} sm={1} key={`hoodieswatchcaro${index}`}>
								<Tooltip
									title={swatch.alt + (swatch.isInStock ? '' : ' - Out of Stock')}
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
												// backgroundColor: 'transparent',
												cursor: 'pointer'
											}
										}}>
										<Swatch
											key={`hoodieswatch${index}`}
											swatchImage={swatch.swatchImage}
											type='color-swatch'
											alt={swatch.alt}
											number={swatch.order}
											selectedSwatch={selectedHoodie}
											setSelectedSwatch={setSelectedHoodie}
											isInStock={swatch.isInStock}
										/>
									</IconButton>
								</Tooltip>
							</Grid>
						);
					})}
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default HoodieSelectionAccordion;
