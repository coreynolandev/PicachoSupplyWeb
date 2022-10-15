import { Grid, IconButton, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { Accordion } from '../design/Accordion';
import { AccordionSummary } from '../design/AccordionSummary';
import { AccordionDetails } from '../design/AccordionDetails';
import Swatch from '../design/Swatch';

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

	const colorSetList = patternType === 'fill' ? stitchFillSelectionList : stitchGradientSelectionList;
	const currentSwatchChosen = patternType === 'fill' ? selectedStitchFill : selectedStitchGradient;
	const isSelected = expanded === accordionNumber;

	return (
		<Accordion
			sx={{ bgcolor: isSelected ? 'white' : 'rgba(255,255,255,0.8)' }}
			key='stitchFillBase'
			expanded={isSelected}
			onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary aria-controls='stitch-fill-color' id='select-stitch-fill-color-header' expanded={isSelected} >
				<Typography textAlign='left' fontFamily={'catamaran'}>
					{accordionNumber}. Choose a Fill{name !== '' && name}
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
					aria-label='Select fill or gradient fill color options'
					sx={{ marginBottom: 1 }}>
					<ToggleButton value={'fill'}>Base Fill</ToggleButton>
					<ToggleButton value={'gradient'}>Gradient (Optional)</ToggleButton>
				</ToggleButtonGroup>
				<Grid container direction='row' justifyContent='flex-start'>
					{colorSetList.map((stitchFill, index) => {
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
											selectedSwatch={currentSwatchChosen}
											setSelectedSwatch={changeStitchFill}
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
