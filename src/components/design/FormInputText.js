import { InfoRounded } from '@mui/icons-material';
import { Grid, InputAdornment, TextField, Tooltip } from '@mui/material';
import { Controller } from 'react-hook-form';

const FormInputText = ({ name, control, label, autoComplete, id, isRequired, multiline, alwaysFull, showErrors, type, fieldDescription }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
				<Grid item xs={12} sm={alwaysFull ? 12 : 6}>
					<TextField
						name={name}
						error={showErrors && isRequired && value.length === 0}
						size='large'
						type={type || 'text'}
						inputMode={type}
						autoComplete={autoComplete}
						multiline={multiline}
						rows={multiline ? 4 : 1}
						id={id}
						required={isRequired}
						onChange={onChange}
						value={value}
						fullWidth
						label={label}
						variant='outlined'
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
								: {}
						}
					/>
				</Grid>
			)}
		/>
	);
};

export default FormInputText;
