import { object, string } from 'yup';

export const FIELDS_BOUNDARIES = {
	input: {
		min: 3,
		max: 50
	},
	textarea: {
		min: 10,
		max: 500
	}
}

export const CONTACT_FORM_SCHEMA = object().shape({
	name: string()
		.min(FIELDS_BOUNDARIES.input.min, `Min of ${FIELDS_BOUNDARIES.input.min} characters`)
		.max(FIELDS_BOUNDARIES.input.max, 'Woa, hold there, champ. The max is 50 characters')
		.required('Name is required'),
	email: string()
		.email(`That's not really an email, is it?`)
		.min(FIELDS_BOUNDARIES.input.min, `Min of ${FIELDS_BOUNDARIES.input.min} characters`)
		.max(FIELDS_BOUNDARIES.input.max, `A long-ass email. The max is 50 ok?`)
		.required('Email is required'),
	message: string()
		.min(FIELDS_BOUNDARIES.textarea.min, `Min of ${FIELDS_BOUNDARIES.textarea.min} characters`)
		.max(FIELDS_BOUNDARIES.textarea.max, 'Try typing a shorter message. The maximum characters is 500')
		.required('A message is required'),
});
