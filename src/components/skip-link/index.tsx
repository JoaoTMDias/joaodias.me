/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import { SkipLinks } from "@jtmdias/react-a11y-tools";
import "./index.module.scss";

interface ISkipLink {
	target: string;
	text: string;
	as?: "link" | "button";
}

interface ISkipLinkProps {
	items: ISkipLink[];
}

function SkipLink({ items }: ISkipLinkProps) {
	return <SkipLinks items={items} />;
}

export default SkipLink;
