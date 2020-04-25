import React, { useState, useRef } from "react";
import { Submit, FormWrapper, Fieldset, Success, Container } from "./styles";
import { TextInput } from "./input";
import { TextAreaInput } from "./textarea";
import ExternalServices from "../../data/services/external-services";
import { Logger } from "../../helpers/logger.helper";

/**
 * Returns if the email is valid or not
 *
 * @param {string} email
 * @returns
 */
function validateEmail(email: string) {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(email).toLowerCase());
}

/**
 * @description Contact Form
 * @date 2018-10-19
 * @class Form
 * @extends {PureComponent}
 */
const Form = () => {
	const button = useRef<HTMLButtonElement>(null);
	const successMessage = useRef<HTMLDivElement>(null);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [wasSent, setWasSent] = useState(false);

	/**
	 * Toggles the aria-pressed attribute when the u
	 */
	function toggleAriaRole() {
		if (button && button.current) {
			const pressed = button.current.getAttribute("aria-disabled") === "false";
			button.current.setAttribute("aria-pressed", `${!pressed}`);
		}
	}

	/**
	 *
	 *
	 * @param {React.FormEvent<HTMLFormElement>} event
	 */
	async function onSubmitForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		toggleAriaRole();

		try {
			const state = {
				name,
				email,
				message,
				wasSent,
			};
			const submit = await ExternalServices.postUserForm(state);

			if (submit) {
				setWasSent(true);
			}
		} catch (error) {
			Logger({
				type: "error",
				message: error,
			});
		}
	}

	/**
	 *
	 */
	function renderFormButton() {
		let formIsValid = "";
		let ariaDisabled = true;

		if (name.length > 2 && message.length > 2 && validateEmail(`${email}`)) {
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

	/**
	 *
	 *
	 * @returns
	 */
	function renderSuccessMessage() {
		return (
			<Success
				ref={successMessage}
				id="success-message"
				data-testid="success-message"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
			>
				<figure role="presentation" aria-label="Paperplane icon" className="success__image">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
						<path d="M83.29 12.18a1.4 1.4 0 0 0-1.41 0L56.11 27.43a1.41 1.41 0 1 0 1.43 2.43L76 18.92 41.59 54.66l-17.13-5.24L46.81 36.2a1.41 1.41 0 1 0-1.43-2.42l-25.1 14.84a1.4 1.4 0 0 0-.49 1.92 1.36 1.36 0 0 0 .8.63l20.46 6.26 9 16.43a1.44 1.44 0 0 0 .66.58 1.42 1.42 0 0 0 1.53-.29L62.66 64l19.52 6A1.41 1.41 0 0 0 84 68.67V13.41a1.42 1.42 0 0 0-.71-1.23zM50.15 58.3a1.33 1.33 0 0 0-.25.8v8.6l-6.17-11.22L71 28.19 50.15 58.3zm2.56 11.54V61l6.89 2.11zm28.48-3.07l-27.64-8.45 27.64-39.89z" />
						<path d="M35.12 60.88a1.41 1.41 0 0 0-2 0L20 74a1.39 1.39 0 0 0 0 2 1.38 1.38 0 0 0 2 0l13.12-13.13a1.41 1.41 0 0 0 0-2zM17.63 78.36a1.4 1.4 0 0 0-2 0l-3.22 3.24a1.41 1.41 0 0 0 0 2 1.44 1.44 0 0 0 1 .41 1.4 1.4 0 0 0 1-.41l3.23-3.24a1.41 1.41 0 0 0-.01-2zm14.43 3.16a1.41 1.41 0 0 0-2.4 1 1.45 1.45 0 0 0 .41 1 1.43 1.43 0 0 0 1 .41 1.41 1.41 0 0 0 1-.41 1.45 1.45 0 0 0 .41-1 1.41 1.41 0 0 0-.42-1zm10.46-10.47a1.41 1.41 0 0 0-2 0l-7 7a1.41 1.41 0 0 0 0 2 1.41 1.41 0 0 0 2 0l7-7a1.41 1.41 0 0 0 0-2zm24-.53a1.41 1.41 0 0 0-2 0l-7 7a1.41 1.41 0 0 0 0 2 1.36 1.36 0 0 0 1 .41 1.4 1.4 0 0 0 1-.41l7-7a1.41 1.41 0 0 0 0-2zM51.87 31.17a1.43 1.43 0 0 0-1-.41 1.4 1.4 0 0 0-1.4 1.4 1.43 1.43 0 0 0 .41 1 1.41 1.41 0 0 0 1 .41 1.4 1.4 0 0 0 1.41-1.41 1.41 1.41 0 0 0-.42-.99z" />
					</svg>
				</figure>
				<h2 aria-label="Status Message: Success" className="success__title">
					Off it goes!
				</h2>
				<p aria-label="Status Message description" className="success__message">
					Thanks! Your message has been sent to me, so i&apos;ll get back to you as soon as I can. In the mean time,
					feel free to browser my site wherever you want.
				</p>
			</Success>
		);
	}

	if (typeof document !== "undefined") {
		if (successMessage && successMessage.current) {
			successMessage.current.focus();
		}
	}

	return (
		<div id="contact-form" className="layout__row">
			<FormWrapper
				name="contact-form"
				data-id="contact-form"
				onSubmit={onSubmitForm}
				method="POST"
				data-netlify="true"
				data-netlify-honeypot="bot-field"
				aria-label="Contact form. Includes a name,email a message inputs."
			>
				{wasSent && renderSuccessMessage()}
				<Fieldset role="group">
					<TextInput
						id="name"
						label="Name"
						type="text"
						placeholder="What's your name?"
						value={name}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
						maxLength={50}
						required
					/>
					<TextInput
						id="email"
						label="Email"
						type="email"
						placeholder="Your fancy email"
						value={email}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
						maxLength={200}
						required
					/>
					<TextAreaInput
						id="message"
						label="Message"
						placeholder="Got something you want to say?"
						value={message}
						onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(event.target.value)}
						maxLength={50}
						required
					/>
					<input hidden className="hidden" name="bot-field" />
					<input type="hidden" name="form-name" value="contact-form" />
				</Fieldset>
				<Fieldset>{renderFormButton()}</Fieldset>
				<div data-netlify-recaptcha />
			</FormWrapper>
		</div>
	);
};

export default Form;
