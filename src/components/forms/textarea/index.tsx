// Libraries
import React from "react";
import { TextAreaInputWrapper } from "../styles";
import { ITextAreaInputProps } from "../types";
import { FIELDS_BOUNDARIES } from "../validation-schema";

export const defaultProps = {
	helperText: "",
	id: "text-area-input",
	label: "",
	placeholder: "Text Area placeholder...",
	required: false,
	value: "",
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onChange: () => {},
	onBlur: () => {},
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
	helperText,
}) => {
	const [focused, setFocused] = React.useState(false);
	const helperId = helperText && helperText.length > 0 ? `${id}-helper` : undefined;
	const focusedClassName = focused ? "isFocused" : "";

	function handleFocus(event: React.FocusEvent<HTMLTextAreaElement>, status: boolean) {
		if (!status) {
			onBlur(event);
		}
		setFocused(status);
	}

	return (
		<TextAreaInputWrapper data-testid="component-text-area-wrapper" data-form="textarea" className={focusedClassName}>
			<label data-testid="component-text-area-label" className="content" htmlFor={id}>
				<span className="label">{label}</span>
				<textarea
					id={id}
					name={id}
					data-testid="component-text-area-input"
					className={`input ${className}`}
					placeholder={placeholder}
					defaultValue={value}
					onChange={onChange}
					required={required}
					disabled={disabled}
					cols={FIELDS_BOUNDARIES.textarea.max}
					onFocus={(event) => handleFocus(event, true)}
					onBlur={(event) => handleFocus(event, false)}
					minLength={FIELDS_BOUNDARIES.textarea.min}
					maxLength={FIELDS_BOUNDARIES.textarea.max}
				/>
				{helperText && (
					<p id={helperId} data-testid="component-text-area-helper" className="helper" aria-live="polite">
						{helperText}
					</p>
				)}
			</label>
		</TextAreaInputWrapper>
	);
};

TextAreaInput.defaultProps = defaultProps;

export default TextAreaInput;
