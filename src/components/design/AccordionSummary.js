import { styled } from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { Add, Remove } from '@mui/icons-material';

export const AccordionSummary = styled((props) => (
	<MuiAccordionSummary expandIcon={props.expanded ? <Remove sx={{ fontSize: '1.2rem' }} /> : <Add sx={{ fontSize: '1.2rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
	flexDirection: 'row',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(0deg)'
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1)
	}
}));
