const Swatch = ({ swatchImage, type, alt, number, selectedSwatch, setSelectedSwatch }) => {
	const isSelected = number === selectedSwatch;
	const labelName = `${alt}${number}swatch`;
	return (
		<label htmlFor={labelName} onClick={() => setSelectedSwatch(number)} className={`swatch-label${isSelected ? ' selected' : ''}`}>
		{/* <label htmlFor={labelName} title={alt} onClick={() => setSelectedSwatch(number)}> */}
			<img id={labelName} src={swatchImage} className={`${type}${isSelected ? ' selected' : ''}`} alt={alt} />
		</label>
	);
};

export default Swatch;
