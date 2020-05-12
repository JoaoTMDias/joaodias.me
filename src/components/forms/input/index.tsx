// Libraries
import React, { memo, useState } from "react";
import classnames from "classnames";
import { TextInputWrapper } from "../styles";
import { ITextInputProps } from "../types";
import { FIELDS_BOUNDARIES } from "../validation-schema";

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
export const TextInput: React.FunctionComponent<ITextInputProps> = memo(
	({ id, label, value, className, type, placeholder, onChange, onBlur, required, pattern, disabled, helperText }) => {
		const [focused, setFocused] = useState(false);
		const helperId = helperText && helperText.length > 0 ? `${id}-helper` : undefined;
		const wrapperClassname = classnames({
			isFocused: focused,
			"has-errors": helperText && helperText.length > 0,
		});
		const inputTestId = `component-text-input-${id}`;

		function handleFocus(event: React.FocusEvent<HTMLInputElement>, status: boolean) {
			if (!status) {
				onBlur(event);
			}
			setFocused(status);
		}

		return (
			<TextInputWrapper data-testid="component-text-wrapper" data-form="input" className={wrapperClassname}>
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
						data-testid={inputTestId}
						className={`input ${className}`}
						type={type}
						placeholder={`${placeholder}`}
						defaultValue={`${value}`}
						onChange={onChange}
						required={required}
						disabled={disabled}
						pattern={pattern}
						aria-labelledby={helperId}
						onFocus={(event) => handleFocus(event, true)}
						onBlur={(event) => handleFocus(event, false)}
						minLength={type === "email" ? FIELDS_BOUNDARIES.email.min : FIELDS_BOUNDARIES.name.min}
						maxLength={type === "email" ? FIELDS_BOUNDARIES.email.max : FIELDS_BOUNDARIES.name.max}
					/>
					{helperText && (
						<p id={helperId} data-testid="component-text-helper" className="helper" aria-live="polite">
							{helperText}
						</p>
					)}
				</label>
			</TextInputWrapper>
		);
	},
);

TextInput.defaultProps = defaultProps;

export default TextInput;
