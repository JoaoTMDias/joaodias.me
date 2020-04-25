// Libraries
import React from "react";
import { TextAreaInputWrapper } from "../styles";
import { ITextAreaInputProps } from "../types";

export const defaultProps = {
	helperText: "",
	id: "text-area-input",
	label: "",
	maxLength: 50,
	placeholder: "Text Area placeholder...",
	required: false,
	value: "",
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onChange: () => {},
};

/**
 * Text Area Input component
 * Supports light and dark theme
 *
 * @class TextAreaInputWrapper
 * @extends {PureComponent}
 */
export const TextAreaInput: React.FunctionComponent<ITextAreaInputProps> = ({
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

	const focusedClassName = focused ? "isFocused" : "";

	return (
		<TextAreaInputWrapper data-testid="component-text-area-wrapper" data-form="textarea" className={focusedClassName}>
			<label data-testid="component-text-area-label" className="content" htmlFor={id}>
				<span className="label">{label}</span>
				<textarea
					className={`input ${className}`}
					cols={maxLength}
					data-testid="component-text-area-input"
					defaultValue={value}
					disabled={disabled}
					id={id}
					name={id}
					onBlur={() => setFocused(false)}
					onChange={onChange}
					onFocus={() => setFocused(true)}
					placeholder={placeholder}
					required={required}
				/>
			</label>
			<p data-testid="component-text-area-helper" className="helper">{`${helperText}`}</p>
		</TextAreaInputWrapper>
	);
};

TextAreaInput.defaultProps = defaultProps;

export default TextAreaInput;
