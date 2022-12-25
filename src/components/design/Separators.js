export const DarkSeparatorTop = () => {
	return (
		<div className='separator top'>
			<svg
				className='separator__svg'
				width='100%'
				height='10vh'
				viewBox='0 0 100 100'
				preserveAspectRatio='none'
				fill='#14274e'
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M 100 100 V 10 L 0 100' />
				<path d='M 0 100 L 100 30 V 0 Z' fill='#FFBD29' strokeWidth='0' />
			</svg>
		</div>
	);
};

export const LightSeparatorTop = () => {
	return (
		<div className='separator top'>
			<svg
				className='separator__svg'
				width='100%'
				height='10vh'
				viewBox='0 0 100 100'
				preserveAspectRatio='none'
				fill='#ffffff'
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M 100 100 V 10 L 0 100' />
				<path d='M 0 100 L 100 30 V 0 Z' fill='#14264E' strokeWidth='0' />
			</svg>
		</div>
	);
};

export const DarkSeparatorBottom = () => {
	return (
		<div className='separator bottom'>
			<svg
				className='separator__svg'
				width='100%'
				height='10vh'
				viewBox='0 0 100 100'
				preserveAspectRatio='none'
				fill='#14274e'
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M 0 0 V 90 L 100 0' />
				<path d='M 100 0 L 0 70 V 100 Z' fill='#FFBD29' strokeWidth='0' />
			</svg>
		</div>
	);
};

export const LightSeparatorBottom = () => {
	return (
		<div className='separator bottom'>
			<svg
				className='separator__svg'
				width='100%'
				height='10vh'
				viewBox='0 0 100 100'
				preserveAspectRatio='none'
				fill='#ffffff'
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M 0 0 V 90 L 100 0' />
				<path d='M 100 0 L 0 70 V 100 Z' fill='#14264E' strokeWidth='0' />
			</svg>
		</div>
	);
};
