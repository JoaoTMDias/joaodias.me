interface IInputProps {
	className?: string | undefined;
	disabled?: boolean | undefined;
	helperText?: string | undefined;
	id: string;
	label: string;
	placeholder: string;
	required: boolean;
	value: string;
}

export interface ITextAreaInputProps extends IInputProps {
	onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
	onBlur(event: React.FocusEvent<HTMLTextAreaElement>): void;
}

export interface ITextInputProps extends IInputProps {
	type: string;
	onChange(event: React.ChangeEvent<HTMLInputElement>): void;
	onBlur(event: React.FocusEvent<HTMLInputElement>): void;
	fullWidth?: boolean | undefined;
	pattern?: string | undefined;
}

export interface ITextInputState {
	focused: boolean;
}

export interface IFormState {
	name: string;
	email: string;
	message: string;
}
