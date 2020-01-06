type LinkProperties = Pick<HTMLAnchorElement, "target" | "rel">;

export interface IExternalLinkProps extends LinkProperties {
	id?: string;
	className?: string;
	title?: string;
	to: string;
}
