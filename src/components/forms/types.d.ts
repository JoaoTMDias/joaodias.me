interface IInputProps {
	id: string;
	className?: string | undefined;
	value: string;
	label: string;
	helperText?: string | undefined;
	placeholder: string;
	maxLength: number;
	required: boolean;
	disabled?: boolean | undefined;
}

export interface ITextAreaInputProps extends IInputProps {
	onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export interface ITextInputProps extends IInputProps {
	type: string;
	onChange(event: React.ChangeEvent<HTMLInputElement>): void;
	fullWidth?: boolean | undefined;
	pattern?: string | undefined;
	maxNumber?: number | undefined;
}

export interface ITextInputState {
	focused: boolean;
}

export interface IFormState {
	name: string;
	email: string;
	message: string;
	wasSent: boolean;
}
