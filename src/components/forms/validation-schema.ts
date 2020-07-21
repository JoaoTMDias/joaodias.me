import { object, string } from "yup";

export const FIELDS_BOUNDARIES = {
	name: {
		min: 3,
		max: 50,
	},
	email: {
		min: 5,
		max: 50,
	},
	textarea: {
		min: 10,
		max: 500,
	},
};

export const CONTACT_FORM_SCHEMA = object().shape({
	name: string()
		.min(FIELDS_BOUNDARIES.name.min, `Minimum of ${FIELDS_BOUNDARIES.name.min} characters`)
		.max(FIELDS_BOUNDARIES.name.max, "The maximum is 50 characters")
		.required("A name is required"),
	email: string()
		.email(`That's not really an email, is it?`)
		.min(FIELDS_BOUNDARIES.email.min, `Minimum of ${FIELDS_BOUNDARIES.email.min} characters`)
		.max(FIELDS_BOUNDARIES.email.max, `The maximum is 50 characters`)
		.required("An email is required"),
	message: string()
		.min(FIELDS_BOUNDARIES.textarea.min, `Minimum of ${FIELDS_BOUNDARIES.textarea.min} characters`)
		.max(FIELDS_BOUNDARIES.textarea.max, "The maximum is 500. Try typing a shorter message.")
		.required("A message is required"),
});
