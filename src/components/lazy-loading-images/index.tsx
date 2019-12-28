// Libraries
import * as React from "react";
import { LazyImage, LazyImageRenderPropArgs, RefArg } from "react-lazy-images";
import Img from "gatsby-image";

// Component Prop
import { Placeholder } from "./styles";
import { IImageLazyProps } from "./types";
import { ContentSpinner } from "../content-spinner";

/**
 * @description Lazy Loading Image Component
 * @author  João Dias
 * @date  29/December/2018 at 01:17
 * @extends {React.FunctionComponent}
 */
/**
 * Lazy Loading Image Component
 *
 * @class LazyLoadingImage
 * @extends {React.PureComponent<IImageLazyProps>}
 */
export class LazyLoadingImage extends React.PureComponent<IImageLazyProps> {
	static defaultProps = {
		fluid: [],
		useNativeLazyLoading: false,
		width: 375,
		height: 375,
		debounce: 64,
		speed: 128,
		objectFit: "cover",
		objectPositionY: "center",
		objectPositionX: "center",
	};

	constructor(props: IImageLazyProps) {
		super(props);

		this.renderPlaceholder = this.renderPlaceholder.bind(this);
		this.renderActualComponent = this.renderActualComponent.bind(this);
	}

	/**
	 * Renders the Placeholder
	 *
	 * @memberof LazyLoadingImage
	 */
	renderPlaceholder = (args: LazyImageRenderPropArgs & RefArg) => {
		const { id, width, height, backgroundColor } = this.props;
		const { imageProps, ref } = args;
		const placeholderId = `${id}-placeholder`;

		return (
			<Placeholder
				id={placeholderId}
				ref={ref}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				preserveAspectRatio="xMaxYMax slice"
				role="img"
				width={width}
				height={height}
			>
				<title id="placeholder-title">{imageProps.alt}</title>
				<path className="placeholder__background" fill={backgroundColor} d="M0 0h24v24H0z" />
			</Placeholder>
		);
	};

	renderActualComponent() {
		const {
			fluid,
			useNativeLazyLoading,
			alt,
			backgroundColor,
			objectFit,
			objectPositionX,
			objectPositionY,
		} = this.props;

		const loading = useNativeLazyLoading ? "lazy" : undefined;
		const objectPosition = `${objectPositionX} ${objectPositionY}`;

		return (
			<Img
				fluid={fluid}
				title={alt}
				alt={alt}
				style={{
					position: "absolute",
				}}
				backgroundColor={backgroundColor}
				imgStyle={{
					position: "relative",
					objectFit,
					objectPosition,
				}}
				loading={loading}
			/>
		);
	}

	/**
	 * render
	 */
	render() {
		const { fluid, debounce } = this.props;

		if (fluid) {
			const { src, srcSet, sizes } = Array.isArray(fluid) ? fluid[0] : fluid;

			return (
				<LazyImage
					src={src}
					srcSet={srcSet}
					sizes={sizes}
					debounceDurationMs={debounce}
					placeholder={this.renderPlaceholder}
					actual={this.renderActualComponent}
				/>
			);
		}

		return <ContentSpinner />;
	}
}

export default LazyLoadingImage;
