import React, { useRef } from "react";
import { useFormik } from 'formik';
import { Submit, FormWrapper, Fieldset } from "./styles";
import { TextInput } from "./input";
import { TextAreaInput } from "./textarea";
import ExternalServices from "../../data/services/external-services";
import { Logger } from "../../helpers/logger.helper";
import { INITIAL_VALUES } from './initial-values';
import { CONTACT_FORM_SCHEMA } from './validation-schema';
import { IFormState } from './types';
import { SuccessMessage } from './success-message';

/**
 * @description Contact Form
 */
const Form = () => {
	const sent = useRef(false);
	const button = useRef<HTMLButtonElement>(null);

	/**
	 * Handles the form submission
	 *
	 * @param {IFormState} values
	 */
	async function onSubmitForm(values: IFormState) {
		try {
			const submit = {
				...values,
				wasSent: true
			}
			
			const response = await ExternalServices.postUserForm(submit);
			
			if (response === "OK") {
				sent.current = true;

				if (button && button.current) {
					const pressed = button.current.getAttribute("aria-disabled") === "false";
					button.current.setAttribute("aria-pressed", `${!pressed}`);
				}
			}
		} catch (error) {
			Logger({
				type: "error",
				message: error,
			});
		}
	}

	const formik = useFormik<IFormState>({
		initialValues: INITIAL_VALUES,
		validationSchema: CONTACT_FORM_SCHEMA,
		onSubmit: onSubmitForm
	});

	/**
	 * Renders the form submit button
	 */
	function renderFormButton() {
		let formIsValid = "";
		let ariaDisabled = true;

		const hasErrors = Object.keys(formik.errors).filter((field) => {
			return field !== null && field !== undefined;
		}).length > 0;

		if (!hasErrors && formik.dirty) {
			formIsValid = "is-valid";
			ariaDisabled = false;
		}

		return (
			<Submit
				ref={button}
				id="submit"
				data-testid="submit-button"
				className={`${formIsValid}`}
				aria-disabled={ariaDisabled}
				type="submit"
			>
				Send Message
			</Submit>
		);
	}

	return (
		<div id="contact-form" className="layout__row">
			<FormWrapper
				name="contact-form"
				method="POST"
				data-testid="contact-form"
				data-id="contact-form"
				data-netlify="true"
				data-netlify-honeypot="bot-field"
				aria-label="Contact form. Includes a name,email a message inputs."
				onSubmit={formik.handleSubmit}
			>
				{sent.current && <SuccessMessage />}
				<Fieldset aria-hidden={sent.current} role="group">
					<TextInput
						id="name"
						label="Name"
						type="text"
						placeholder="What's your name?"
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						helperText={formik.errors.name && formik.touched.name ? formik.errors.name : undefined}
						required
					/>
					<TextInput
						id="email"
						label="Email"
						type="email"
						placeholder="Your fancy email"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						helperText={formik.errors.email && formik.touched.email ? formik.errors.email : undefined}
						required
					/>
					<TextAreaInput
						id="message"
						label="Message"
						placeholder="Got something you want to say?"
						value={formik.values.message}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						helperText={formik.errors.message && formik.touched.message ? formik.errors.message : undefined}
						required
					/>
					<input hidden className="hidden" name="bot-field" />
					<input type="hidden" name="form-name" value="contact-form" />
				</Fieldset>
				<Fieldset aria-hidden={sent.current}>{renderFormButton()}</Fieldset>
				<div data-netlify-recaptcha />
			</FormWrapper>
		</div>
	);
};

export default Form;
