import { Button, Grid, Typography } from '@mui/material';
import { Accordion } from '../design/Accordion';
import { AccordionSummary } from '../design/AccordionSummary';
import { AccordionDetails } from '../design/AccordionDetails';

const SizeSelectionAccordion = ({ sizeSelectionList, accordionNumber, expanded, changeExpandedAccordion, selectedSize, setSelectedSize }) => {
	return (
		<Accordion sx={{ bgcolor: expanded ? 'white' : 'rgba(255,255,255,0.8)' }} key='hoodieBase' expanded={expanded} onChange={() => changeExpandedAccordion(accordionNumber)}>
			<AccordionSummary aria-controls='hoodie-color' id='select-hoodie-color-header' expanded={expanded}>
				<Typography textAlign='left'>
					{accordionNumber}. Size*{selectedSize !== null && ` - ${sizeSelectionList[selectedSize].size}`}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container direction='row' justifyContent='center'>
					{sizeSelectionList.map((size, index) => {
						return (
							<Grid item xs={2} sm={2} key={`sizeOption${index}`}>
								<Button
									sx={{
										borderRadius: 0,
										margin: '10px 10px 5px 10px',
										padding: 0,
										maxWidth: '40px',
										minWidth: '40px',
										maxHeight: '30px',
										minHeight: '30px'
									}}
									variant={selectedSize !== null && sizeSelectionList[selectedSize].order === index ? 'contained' : 'outlined'}
									onClick={() => setSelectedSize(index)}
									color='primary'>
									<Typography>{size.size}</Typography>
								</Button>
							</Grid>
						);
					})}
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default SizeSelectionAccordion;
