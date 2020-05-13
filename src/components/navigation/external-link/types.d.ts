export interface IExternalLinkProps {
	id?: string;
	className?: string;
	title?: string;
	to: string;
	target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
	rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
}
