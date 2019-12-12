import styled from "styled-components";
import { rem } from "polished";

export const List = styled.ol`
	list-style-type: none;
	display: flex;
	flex-direction: column;

	li {
		font-size: ${rem("14px")};

		&:not(:first-child) {
			color: var(--color-gray2, #dfe0e5);
			font-weight: 400;
		}

		&:focus {
			outline-color: var(--color-gray4, #c0c3cc);
			outline-width: 1px;
			outline-style: dashed;
		}
	}
`;

export const Item = styled.li`
	margin-bottom: calc(--global-margin * 0.5);
	font-weight: 400;
	color: var(--color-gray6, #9a9fae);
`;
