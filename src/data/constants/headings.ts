export enum EHeadingSize {
	SMALL = "small",
	MEDIUM = "medium",
	LARGE = "large",
}

export interface IHeadings {
	[EHeadingSize.SMALL]: number[];
	[EHeadingSize.MEDIUM]: number[];
	[EHeadingSize.LARGE]: number[];
}

export const RESPONSIVE_HEADING = {
	small: [24, 20, 19, 18, 17, 16],
	medium: [28, 24, 22, 20, 18, 16],
	large: [40, 32, 28, 24, 20, 18],
};
