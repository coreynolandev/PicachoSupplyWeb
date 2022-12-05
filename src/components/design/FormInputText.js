import { InfoRounded } from '@mui/icons-material';
import { Grid, InputAdornment, TextField, Tooltip } from '@mui/material';
import { Controller } from 'react-hook-form';

const FormInputText = ({
	name,
	control,
	label,
	autoComplete,
	id,
	isRequired,
	multiline,
	alwaysFull,
	threeLine,
	showErrors,
	type,
	fieldDescription,
	variant = 'outlined',
	placeholder
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
				<Grid item xs={12} sm={alwaysFull ? 12 : threeLine ? 4 : 6}>
					<TextField
						name={name}
						error={showErrors && isRequired && value.length === 0}
						size='medium'
						type={type || 'text'}
						inputMode={type}
						autoComplete={autoComplete}
						multiline={multiline}
						rows={multiline ? 4 : 1}
						id={id}
						required={isRequired}
						onChange={onChange}
						value={value || ''}
						fullWidth={true}
						placeholder={placeholder || ''}
						label={label}
						variant={variant}
						InputProps={
							fieldDescription !== undefined
								? {
										endAdornment: (
											<InputAdornment position='end'>
												<Tooltip title={fieldDescription} enterTouchDelay={0} leaveTouchDelay={5000}>
													<InfoRounded />
												</Tooltip>
											</InputAdornment>
										)
								  }
								: { style: { minHeight: '3rem' } }
						}
					/>
				</Grid>
			)}
		/>
	);
};

export default FormInputText;
