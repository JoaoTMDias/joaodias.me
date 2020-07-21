import React, { useRef, useEffect } from "react";
import { Success } from "./styles";

export function SuccessMessage() {
	const successMessage = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof document !== "undefined") {
			if (successMessage && successMessage.current) {
				successMessage.current.focus();
			}
		}
	}, []);

	return (
		<Success
			ref={successMessage}
			id="success-message"
			data-testid="success-message"
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
			aria-labelledby="success-title"
			aria-describedby="success-message"
		>
			<figure role="presentation" aria-label="Paperplane icon" className="success__image">
				<svg
					className="paper"
					width="72"
					height="72"
					viewBox="0 0 72 72"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						className="paper-plane"
						d="M71.2084 34.4538L18.8944 9.14072C18.6455 9.02006 18.3665 8.97556 18.0924 9.01278C17.8183 9.05001 17.5613 9.1673 17.3535 9.34997C17.1459 9.53266 16.9966 9.77248 16.9244 10.0395C16.8523 10.3065 16.8604 10.5888 16.9477 10.8513L22.7445 28.2421L13.2832 34.55C12.8915 34.8108 12.657 35.2497 12.657 35.72C12.657 36.1902 12.8915 36.6291 13.2832 36.89L22.7445 43.1973L16.9477 60.5887C16.8604 60.8511 16.8523 61.1334 16.9245 61.4004C16.9967 61.6674 17.1459 61.9072 17.3535 62.0898C17.5613 62.2724 17.8183 62.3897 18.0924 62.427C18.3665 62.4642 18.6454 62.4198 18.8944 62.2992L71.2086 36.9862C72.2512 36.4808 72.2765 34.9707 71.2086 34.4538H71.2084ZM16.5981 35.72L23.6668 31.0079L25.2373 35.72L23.6668 40.432L16.5981 35.72ZM27.7334 37.1262H38.1105C38.8872 37.1262 39.5173 36.4966 39.5173 35.72C39.5173 34.9432 38.8873 34.3137 38.1105 34.3137H27.7334L20.6702 13.1243L64.4612 34.3137H50.7672C49.9905 34.3137 49.3609 34.9432 49.3609 35.72C49.3609 36.4966 49.9905 37.1262 50.7672 37.1262H64.4612L20.6702 58.3156L27.7334 37.1262Z"
						fill="#020202"
					/>
					<g className="paper-trail-wrapper">
						<path
							className="paper-trail"
							d="M15.4693 27.2819C15.4693 28.0586 14.8397 28.6882 14.0631 28.6882H5.625C4.84833 28.6882 4.21875 28.0586 4.21875 27.2819C4.21875 26.5057 4.84833 25.8757 5.625 25.8757H14.0631C14.8397 25.8757 15.4693 26.5057 15.4693 27.2819Z"
							fill="#020202"
						/>
						<path
							className="paper-trail"
							d="M5.625 34.3137C6.40167 34.3137 7.03125 34.9432 7.03125 35.72C7.03125 36.4966 6.40167 37.1262 5.625 37.1262H1.40625C0.629578 37.1262 0 36.4966 0 35.72C0 34.9432 0.629578 34.3137 1.40625 34.3137H5.625Z"
							fill="#020202"
						/>
						<path
							className="paper-trail"
							d="M14.0631 42.7512C14.8397 42.7512 15.4693 43.3812 15.4693 44.1575C15.4693 44.9343 14.8397 45.5643 14.0631 45.5643H5.625C4.84833 45.5643 4.21875 44.9341 4.21875 44.1575C4.21875 43.3812 4.84833 42.7512 5.625 42.7512H14.0631Z"
							fill="#020202"
						/>
					</g>
				</svg>
			</figure>
			<h2 id="success-title" className="success__title">
				Off it goes!
			</h2>
			<p id="success-message" className="success__message">
				Thanks! Your message has been sent to me, so i&apos;ll get back to you as soon as I can. In the mean time, feel
				free to browser my site wherever you want.
			</p>
		</Success>
	);
}
