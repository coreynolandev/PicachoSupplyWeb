import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Accordion } from '../design/Accordion';
import { AccordionSummary } from '../design/AccordionSummary';
import { AccordionDetails } from '../design/AccordionDetails';
import Swatch from '../design/Swatch';

const BorderSelectionAccordion = ({ borderSelectionList, accordionNumber, expanded, changeExpandedAccordion, selectedBorder, setSelectedBorder }) => {
	const isSelected = expanded === accordionNumber;
	return (
		<Accordion
			sx={{ bgcolor: isSelected ? 'white' : 'rgba(255,255,255,0.8)' }}
			key='borderBase'
			expanded={isSelected}
			onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary aria-controls='border-color' id='select-border-color-header' expanded={isSelected} >
				<Typography textAlign='left'>
					{accordionNumber}. Choose a Border{selectedBorder !== null && ` - ${borderSelectionList[selectedBorder].alt}`}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container direction='row' justifyContent='flex-start'>
					{borderSelectionList.map((border, index) => {
						return (
							<Grid item xs={3} sm={2} key={`borderOption${index}`}>
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
							</Grid>
						);
					})}
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default BorderSelectionAccordion;
