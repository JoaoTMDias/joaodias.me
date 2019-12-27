import { CSSProperties } from "react";

// Component Props
export interface IContentSpinnerProps {
	theme?: any;
	color?: string;
	duration?: number;
	size?: number;
	center?: boolean;
	isTemporary?: boolean;
	isFullPage?: boolean;
	delay?: number;
	styles?: CSSProperties;
}
