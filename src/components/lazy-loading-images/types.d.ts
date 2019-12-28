import { IPortfolioItemProps } from "../project/item/types";

type PickerProperties = Pick<IPortfolioItemProps, "fluid" | "id" | "alt" | "title">;

export interface IImageLazyProps extends PickerProperties {
	useNativeLazyLoading?: boolean;
	width: number;
	height: number;
	debounce?: number;
	backgroundColor?: string;
	speed?: number;
	style?: React.CSSProperties;
	objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
	objectPositionY?: "center" | "inherit" | "initial" | "top" | "right" | "bottom" | "left" | "unset";
	objectPositionX?: "center" | "inherit" | "initial" | "top" | "right" | "bottom" | "left" | "unset";
	onLoad?: () => void;
	onError?: () => void;
}
