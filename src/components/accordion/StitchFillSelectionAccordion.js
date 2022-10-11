import { Grid, IconButton, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { Accordion } from '../design/Accordion';
import { AccordionSummary } from './AccordionSummary';
import { AccordionDetails } from './AccordionDetails';
import Swatch from '../design/Swatch';

const StitchFillSelectionAccordion = ({
	stitchFillSelectionList,
	patternType,
	changePatternType,
	accordionNumber,
	expanded,
	changeExpandedAccordion,
	selectedStitchFill,
	setSelectedStitchFill
}) => {
	return (
		<Accordion key='stitchFillBase' expanded={expanded === accordionNumber} onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary aria-controls='stitch-fill-color' id='select-stitch-fill-color-header'>
				<Typography textAlign='left' fontFamily={'catamaran'}>
					{accordionNumber}. Choose a Fill{selectedStitchFill !== null && ` - ${stitchFillSelectionList[selectedStitchFill].alt}`}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<ToggleButtonGroup
					name='patternType'
					value={patternType}
					fullWidth
					onChange={(event) => changePatternType(event.target.value.toLowerCase())}
					color='warning'
					exclusive
					size='small'
					aria-label='Select solid or gradient fill color options'
					sx={{ marginBottom: 1 }}>
					<ToggleButton value={'solid'}>Solid</ToggleButton>
					<ToggleButton value={'gradient'}>Gradient</ToggleButton>
				</ToggleButtonGroup>
				<Grid container direction='row' justifyContent='flex-start'>
					{stitchFillSelectionList
						.filter((option) => option.type === patternType)
						.map((stitchFill, index) => {
							return (
								<Grid item xs={3} sm={2} key={`stitchFillOption${index}`}>
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
												selectedSwatch={selectedStitchFill}
												setSelectedSwatch={setSelectedStitchFill}
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

export default StitchFillSelectionAccordion;
