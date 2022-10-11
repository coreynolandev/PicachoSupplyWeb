import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Accordion } from './accordion/Accordion';
import { AccordionSummary } from './accordion/AccordionSummary';
import { AccordionDetails } from './accordion/AccordionDetails';
import Swatch from './Swatch';

const HoodieSelectionAccordion = ({ hoodieSelectionList, accordionNumber, expanded, changeExpandedAccordion, selectedHoodie, setSelectedHoodie }) => {
	return (
		<Accordion key='hoodieBase' expanded={expanded === accordionNumber} onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary aria-controls='hoodie-color' id='select-hoodie-color-header'>
				<Typography textAlign='left'>
					{accordionNumber}. Choose a Base{selectedHoodie !== null && ` - ${hoodieSelectionList[selectedHoodie].alt}`}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container direction='row' justifyContent='flex-start'>
					{hoodieSelectionList.map((swatch) => {
						return (
							<Grid item xs={3} sm={2}>
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
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default HoodieSelectionAccordion;
