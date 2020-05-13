import React, { useRef } from "react";
import { useIntersectionObserver } from "../../helpers";
import { IImageLazyProps } from "./types";
import { IFluidObject } from "../project/item/types";
import { Placeholder, Picture, Image } from "./styles";
import { ContentSpinner } from "../content-spinner";

/**
 * Lazy Loading Image
 *
 * @export
 * @param {IImageLazyProps} IImageLazyProps
 * @returns
 */
export const LazyLoadingImage: React.FunctionComponent<IImageLazyProps> = ({
	alt,
	backgroundColor,
	fluid,
	height,
	id,
	objectFit,
	objectPositionX,
	objectPositionY,
	onError,
	onLoad,
	speed,
	title,
	useNativeLazyLoading,
	width,
}) => {
	const target = useRef<HTMLDivElement>(null);
	const hasIntersected = useIntersectionObserver(target, {
		rootMargin: "0px 0px 0px 0px",
		once: true,
	});

	/**
	 * Renders an SVG placeholder when the image is not on the viewport
	 *
	 * @returns
	 */
	function renderPlaceholder(): JSX.Element {
		const placeholderId = `${id}-placeholder`;

		return (
			<Placeholder
				id={placeholderId}
				data-testid="lazy-loading-images-placeholder"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				preserveAspectRatio="xMaxYMax slice"
				role="img"
				width={width}
				height={height}
			>
				<title id="placeholder-title">{title}</title>
				<path className="placeholder__background" fill={backgroundColor} d="M0 0h24v24H0z" />
			</Placeholder>
		);
	}

	/**
	 * Returns the Picture sources and a fallback image
	 *
	 *
	 * @param {IFluidObject} { src, srcSet, srcSetWebp, sizes }
	 * @returns
	 */
	function getImageSources({ src, srcSet, srcSetWebp, sizes }: IFluidObject) {
		const loading = useNativeLazyLoading ? "lazy" : undefined;
		const objectPosition = `${objectPositionX} ${objectPositionY}`;
		const styles: React.CSSProperties = {
			backgroundColor,
			objectFit,
			objectPosition,
		};
		const imageId = `${id}-image`;

		return (
			<>
				{srcSetWebp && (
					<source data-testid="lazy-loading-images-source-webp" type="image/webp" srcSet={srcSetWebp} sizes={sizes} />
				)}
				<source data-testid="lazy-loading-images-source" srcSet={srcSet} sizes={sizes} />
				<Image
					id={imageId}
					data-testid="lazy-loading-images-img"
					src={src}
					srcSet={srcSet}
					sizes={sizes}
					width={width}
					height={height}
					alt={alt}
					title={title}
					loading={loading}
					style={styles}
					speed={speed}
					onLoad={onLoad}
					onError={onError}
				/>
			</>
		);
	}

	/**
	 * Renders the Image component or a Content Spinner.
	 *
	 * @returns {JSX.Element}
	 */
	function renderImage(): JSX.Element {
		if (fluid) {
			const data = Array.isArray(fluid) ? fluid[0] : fluid;
			const sources = getImageSources(data);

			return <Picture data-testid="lazy-loading-images-picture">{sources}</Picture>;
		}

		return <ContentSpinner />;
	}

	return (
		<div ref={target} data-testid="lazy-loading-images-wrapper" className="lazy-loading-image__wrapper">
			{hasIntersected ? renderImage() : renderPlaceholder()}
		</div>
	);
};

LazyLoadingImage.defaultProps = {
	useNativeLazyLoading: false,
	width: 375,
	height: 375,
	speed: 256,
	objectFit: "cover",
	objectPositionY: "center",
	objectPositionX: "center",
};

export default LazyLoadingImage;
