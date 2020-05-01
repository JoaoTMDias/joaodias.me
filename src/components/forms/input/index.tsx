// Libraries
import React, { memo, useState} from "react";
import { TextInputWrapper } from "../styles";
import { ITextInputProps } from "../types";
import { FIELDS_BOUNDARIES } from '../validation-schema';

export const defaultProps = {
	disabled: false,
	fullWidth: true,
	helperText: "",
	id: "text-input-id",
	label: "",
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onChange: () => {},
	onBlur: () => {},
	placeholder: "text-input-placeholder",
	required: false,
	type: "text",
	value: "",
};

/**
 * Text Input component
 * Supports light and dark theme
 *
 * @extends {FunctionComponent<ITextInputProps>}
 * @returns {JSX.Element[]}
 */
export const TextInput: React.FunctionComponent<ITextInputProps> = memo(({
	id,
	label,
	value,
	className,
	type,
	placeholder,
	onChange,
	onBlur,
	required,
	pattern,
	disabled,
	helperText
}) => {
	const [focused, setFocused] = useState(false);

	const focusedClassName = focused ? "isFocused" : "";

	function handleFocus(event: React.FocusEvent<HTMLInputElement>, status: boolean) {
		if(!status) {
			onBlur(event);
		}
		setFocused(status);
	}

	return (
		<TextInputWrapper data-testid="component-text-wrapper" data-form="input" className={focusedClassName}>
			<label
				data-testid="component-text-label"
				className="content"
				htmlFor={`${id}`}
				aria-labelledby={`${label}-${id}`}
			>
				<span id={`${label}-${id}`} className="label">{`${label}`}</span>
				<input
					id={id}
					name={id}
					data-testid="component-text-input"
					className={`input ${className}`}
					type={type}
					placeholder={`${placeholder}`}
					defaultValue={`${value}`}
					onChange={onChange}
					required={required}
					disabled={disabled}
					pattern={pattern}
					onFocus={(event) => handleFocus(event, true)}
					onBlur={(event) => handleFocus(event, false)}
					minLength={FIELDS_BOUNDARIES.input.min}
					maxLength={FIELDS_BOUNDARIES.input.max}
				/>
				<p data-testid="component-text-helper" className="helper">
					{helperText}
				</p>
			</label>
		</TextInputWrapper>
	);
});

TextInput.defaultProps = defaultProps;

export default TextInput;
