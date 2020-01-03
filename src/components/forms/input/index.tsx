// Libraries
import React from "react";
import { TextInputWrapper } from "../styles";
import { ITextInputProps } from "../types";

export const defaultProps = {
	disabled: false,
	fullWidth: true,
	helperText: "",
	id: "text-input-id",
	label: "",
	maxLength: 50,
	onChange: () => {},
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
export const TextInput: React.FunctionComponent<ITextInputProps> = ({
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

	const focusedClassName = focused ? "isFocused" : "";

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
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					maxLength={maxLength}
				/>
			</label>
			<p data-testid="component-text-helper" className="helper">
				{helperText}
			</p>
		</TextInputWrapper>
	);
};

TextInput.defaultProps = defaultProps;

export default TextInput;
