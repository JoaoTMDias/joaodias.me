import { CSSProperties } from "react";

// Component Props
export interface IContentSpinnerProps {
	center?: boolean;
	color?: string;
	delay?: number;
	duration?: number;
	fullPage?: boolean;
	size?: number;
	style?: CSSProperties;
	temporary?: boolean;
}
