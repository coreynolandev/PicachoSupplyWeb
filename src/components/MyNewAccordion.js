import { Stack } from '@mui/material';
import { useState } from 'react';
import BorderSelectionAccordion from './BorderSelectionAccordion';
import HoodieSelectionAccordion from './HoodieSelectionAccordion';
import StitchFillSelectionAccordion from './StitchFillSelectionAccordion';

const MyNewAccordion = () => {
	const [expanded, setExpanded] = useState(1);
	const [selectedSwatch, setSelectedSwatch] = useState(0);
	const [selectedHoodie, setSelectedHoodie] = useState(null);
	const [selectedBorder, setSelectedBorder] = useState(null);
	const [selectedStitchFill, setSelectedStitchFill] = useState(null);
	const [selectedSize, setSelectedSize] = useState(null);
	const [quantity, setQuantity] = useState(1);

    const changeExpandedAccordion = (accordionNumber) => {
        if (accordionNumber === expanded) {
            setExpanded(0)
        } else {
            setExpanded(accordionNumber)
        }
    }

	return (
		<Stack>
			<HoodieSelectionAccordion accordionNumber={1} expanded={expanded} changeExpandedAccordion={changeExpandedAccordion} selectedHoodie={selectedHoodie} setSelectedHoodie={setSelectedHoodie} />
			<BorderSelectionAccordion accordionNumber={2} expanded={expanded} changeExpandedAccordion={changeExpandedAccordion} selectedBorder={selectedBorder} setSelectedBorder={setSelectedBorder} />
			<StitchFillSelectionAccordion
				accordionNumber={3}
				expanded={expanded}
				changeExpandedAccordion={changeExpandedAccordion}
				selectedStitchFill={selectedStitchFill}
				setSelectedStitchFill={setSelectedStitchFill}
			/>
		</Stack>
	);
};

export default MyNewAccordion;
