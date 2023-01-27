const Swatch = ({ swatchImage, type, alt, number, selectedSwatch, setSelectedSwatch, isInStock = true }) => {
	const isSelected = number === selectedSwatch;
	const labelName = `${alt}${number}swatch`;
	const changeSelectedSwatch = () => {
		if (isInStock) {
			setSelectedSwatch(number);
		} else {
			console.error('item is not in stock!');
		}
	};
	return (
		<label htmlFor={labelName} onClick={() => changeSelectedSwatch()} className={`swatch-label${isSelected ? ' selected' : ''}${isInStock ? '' : ' out-of-stock'}`}>
			{/* <label htmlFor={labelName} title={alt} onClick={() => setSelectedSwatch(number)}> */}
			<img id={labelName} src={swatchImage} className={`${type}${isSelected ? ' selected' : ''}`} alt={alt} />
		</label>
	);
};

export default Swatch;
