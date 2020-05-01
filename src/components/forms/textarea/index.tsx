// Libraries
import React from "react";
import { TextAreaInputWrapper } from "../styles";
import { ITextAreaInputProps } from "../types";
import { FIELDS_BOUNDARIES } from '../validation-schema';

export const defaultProps = {
	helperText: "",
	id: "text-area-input",
	label: "",
	placeholder: "Text Area placeholder...",
	required: false,
	value: "",
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onChange: () => {},
	onBlur: () => {}
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
	onBlur,
	required,
	disabled,
	helperText
}) => {
	const [focused, setFocused] = React.useState(false);

	const focusedClassName = focused ? "isFocused" : "";

	function handleFocus(event: React.FocusEvent<HTMLTextAreaElement>, status: boolean) {
		if(!status) {
			onBlur(event);
		}
		setFocused(status);
	}

	return (
		<TextAreaInputWrapper data-testid="component-text-area-wrapper" data-form="textarea" className={focusedClassName}>
			<label data-testid="component-text-area-label" className="content" htmlFor={id}>
				<span className="label">{label}</span>
				<textarea
					className={`input ${className}`}
					cols={FIELDS_BOUNDARIES.textarea.max}
					data-testid="component-text-area-input"
					defaultValue={value}
					disabled={disabled}
					id={id}
					name={id}
					onChange={onChange}
					onFocus={(event) => handleFocus(event, true)}
					onBlur={(event) => handleFocus(event, false)}
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
