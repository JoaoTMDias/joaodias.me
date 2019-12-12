// Libraries
import React from "react";
import { TextInputWrapper } from "../styles";
import { ITextInputProps } from "../types";

/**
 * Text Input component
 * Supports light and dark theme
 *
 * @extends {FunctionComponent<ITextInputProps>}
 * @returns {JSX.Element[]}
 */
const TextInput: React.FunctionComponent<ITextInputProps> = ({
	id,
	label,
	value,
	className,
	type,
	placeholder,
	onChange,
	required,
	pattern,
	disabled,
	helperText,
	maxLength,
}) => {
	const [focused, setFocused] = React.useState(false);

	const focusedClassName = focused ? "is-focused" : "";

	return (
		<TextInputWrapper data-form="input" className={focusedClassName}>
			<label className="content" htmlFor={`${id}`} aria-labelledby={`${label}-${id}`}>
				<span id={`${label}-${id}`} className="label">{`${label}`}</span>
				<input
					id={id}
					name={id}
					className={`input ${className}`}
					type={type}
					placeholder={`${placeholder}`}
					defaultValue={`${value}`}
					onChange={onChange}
					required={required}
					disabled={disabled}
					pattern={pattern}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					maxLength={maxLength}
				/>
			</label>
			<p className="helper">{`${helperText}`}</p>
		</TextInputWrapper>
	);
};

TextInput.defaultProps = {
	type: "text",
	label: "",
	helperText: "",
	disabled: false,
	required: false,
	fullWidth: true,
	maxLength: 50,
};

export default TextInput;
