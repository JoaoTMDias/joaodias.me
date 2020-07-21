// Libraries
import React, { useState, useContext, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import { Wrapper, Icon } from "./styles";
import ThemeContext, { ETHEME } from "../../../context/theme-context";

/**
 * @description Component Description
 * @returns {React.FunctionComponent}
 */
const ThemeButton: React.FunctionComponent = () => {
	const { theme, onChange } = useContext(ThemeContext);
	const [isDark, setIsDark] = useState(false);
	const sun = {
		sphere: useSpring({
			transform: `scale(${isDark ? 0 : 1})`,
			config: config.stiff,
		}),
		rays: useSpring({
			opacity: isDark ? 0 : 1,
			transform: isDark ? "scale(0) rotate(0turn)" : "scale(1) rotate(4turn)",
			config: config.stiff,
			delay: 64,
		}),
	};
	const moon = {
		sphere: useSpring({
			opacity: isDark ? 1 : 0,
			transform: isDark ? "scale(1) rotate(0)" : "scale(0) rotate(-0.75turn)",
			config: config.stiff,
			delay: 192,
		}),
		star: {
			regular: useSpring({
				opacity: isDark ? 1 : 0,
				transform: `scale(${isDark ? 1 : 0})`,
				config: config.stiff,
				delay: 64,
			}),
			small: useSpring({
				opacity: isDark ? 1 : 0,
				transform: `scale(${isDark ? 1 : 0})`,
				config: config.stiff,
				delay: 128,
			}),
		},
	};

	useEffect(() => {
		setIsDark(!!(theme === ETHEME.dark));
	}, [theme, isDark]);

	/**
	 *
	 *
	 */
	function handleOnClick() {
		onChange();
	}

	const ariaLabel = `Current theme is ${theme}. Click to toggle`;

	return (
		<Wrapper
			type="button"
			id="theme-button-toggle"
			className="theme-button"
			data-testid="component-theme-button-toggle"
			title="Toggle theme"
			data-current-theme={theme}
			aria-live="assertive"
			aria-label={ariaLabel}
			onClick={handleOnClick}
		>
			<Icon
				width="48"
				height="48"
				className="theme-button__icon"
				viewBox="0 0 48 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g className="moon">
					<animated.path
						className="moon__sphere"
						d="M27.5719 31.9875C23.2078 32.8172 19.2047 29.4703 19.2047 25.0641C19.2047 22.5234 20.5641 20.1891 22.7719 18.9328C23.1141 18.7406 23.025 18.225 22.6406 18.15C17.0953 17.1281 12 21.375 12 27C12 31.9687 16.0219 36 20.9906 36C23.7656 36 26.2969 34.7391 27.975 32.6672C28.2234 32.3625 27.9516 31.9125 27.5719 31.9875Z"
						fill="#E11C1C"
						style={{
							opacity: moon.sphere.opacity,
							transform: moon.sphere.transform,
						}}
					/>
					<animated.path
						className="moon__star--small"
						d="M27 15L26.25 16.5L25.5 15L24 14.25L25.5 13.5L26.25 12L27 13.5L28.5 14.25L27 15Z"
						fill="#E11C1C"
						style={{
							opacity: moon.star.small.opacity,
							transform: moon.star.small.transform,
						}}
					/>
					<animated.path
						className="moon__star"
						d="M32.25 18L33.5016 20.4984L36 21.75L33.5016 23.0016L32.25 25.5L30.9984 23.0016L28.5 21.75L30.9984 20.4984L32.25 18Z"
						fill="#E11C1C"
						style={{
							opacity: moon.star.regular.opacity,
							transform: moon.star.regular.transform,
						}}
					/>
				</g>
				<g className="sun">
					<animated.path
						className="sun__rays"
						d="M35.5511 23.2734L31.1119 21.0562L32.6823 16.35C32.8932 15.7125 32.2885 15.1078 31.6556 15.3234L26.9492 16.8938L24.7272 12.45C24.4272 11.85 23.574 11.85 23.274 12.45L21.0567 16.8891L16.3455 15.3188C15.708 15.1078 15.1033 15.7125 15.3189 16.3453L16.8893 21.0516L12.45 23.2734C11.85 23.5734 11.85 24.4266 12.45 24.7266L16.8893 26.9437L15.3189 31.6547C15.108 32.2922 15.7127 32.8969 16.3455 32.6812L21.052 31.1109L23.2693 35.55C23.5693 36.15 24.4225 36.15 24.7225 35.55L26.9398 31.1109L31.6463 32.6812C32.2838 32.8922 32.8885 32.2875 32.6729 31.6547L31.1025 26.9484L35.5418 24.7312C36.1512 24.4266 36.1512 23.5734 35.5511 23.2734ZM28.243 28.2422C25.9038 30.5812 22.0974 30.5812 19.7582 28.2422C17.419 25.9031 17.419 22.0969 19.7582 19.7578C22.0974 17.4187 25.9038 17.4187 28.243 19.7578C30.5822 22.0969 30.5822 25.9031 28.243 28.2422Z"
						fill="#4B8E2B"
						style={{
							opacity: sun.rays.opacity,
							transform: sun.rays.transform,
						}}
					/>
					<animated.path
						className="sun__sphere"
						d="M19.5004 24C19.5004 21.5203 21.5208 19.5 24.0006 19.5C26.4804 19.5 28.5008 21.5203 28.5008 24C28.5008 26.4797 26.4804 28.5 24.0006 28.5C21.5208 28.5 19.5004 26.4797 19.5004 24Z"
						fill="#4B8E2B"
						style={{
							transform: sun.sphere.transform,
						}}
					/>
				</g>
			</Icon>
		</Wrapper>
	);
};

export default ThemeButton;
