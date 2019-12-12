// Libraries
import React from "react";
import { TextAreaInputWrapper } from "../styles";
import { ITextAreaInputProps } from "../types";

/**
 * Text Area Input component
 * Supports light and dark theme
 *
 * @class TextAreaInputWrapper
 * @extends {PureComponent}
 */
const TextAreaInput: React.FunctionComponent<ITextAreaInputProps> = ({
	id,
	label,
	value,
	className,
	placeholder,
	onChange,
	required,
	disabled,
	helperText,
	maxLength,
}) => {
	const [focused, setFocused] = React.useState(false);

	const focusedClassName = focused ? "is-focused" : "";

	return (
		<TextAreaInputWrapper data-form="textarea" className={`${focusedClassName}`}>
			<label className="content" htmlFor={`${id}`}>
				<span className="label">{`${label}`}</span>
				<textarea
					id={`${id}`}
					name={`${id}`}
					className={`input ${className}`}
					placeholder={`${placeholder}`}
					defaultValue={`${value}`}
					onChange={onChange}
					required={required}
					disabled={disabled}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					cols={maxLength}
				/>
			</label>
			<p className="helper">{`${helperText}`}</p>
		</TextAreaInputWrapper>
	);
};

TextAreaInput.defaultProps = {
	label: "",
	helperText: "",
	required: false,
	maxLength: 50,
};

export default TextAreaInput;
