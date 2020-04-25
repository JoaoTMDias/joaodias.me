import React from "react";

export enum ETHEME {
	light = "light",
	dark = "dark",
}

export const THEMES = Object.entries(ETHEME).map((item) => item[1]);

export interface IThemeContext {
	theme: ETHEME;
	onChange(): void;
}

export const defaultThemeContext: IThemeContext = {
	theme: ETHEME.light,
	onChange: () => {},
};

/**
 * @description Context for Themes
 * @author João Dias
 * @param {IThemeContext}
 * @returns
 */
const ThemeContext = React.createContext<IThemeContext>(defaultThemeContext);

export default ThemeContext;
