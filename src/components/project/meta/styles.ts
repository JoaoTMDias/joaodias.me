import styled from "styled-components";
import { rem } from "polished";
import { above } from "../../../helpers/media-queries.helper";

export const Wrapper = styled.div`
	width: calc(100% - 1rem);
	padding: 2rem;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: column;
	background-color: hsl(227, 12%, 9%);
	padding: ${rem("24px")} 0;
	border-radius: ${rem("24px")};
	margin-top: ${rem("32px")} !important;
	margin-bottom: ${rem("32px")} !important;
	display: grid;
	grid-template-columns: 1fr;

	${above.medium`
    width: calc(100% - 2rem);
    flex-direction: row;
    padding: ${rem("32px")};
		box-shadow: 0 8px 24px 0 rgba(108, 158, 195, 0.11);
		grid-template-columns: repeat(2, 1fr);
	`};

	${above.large`
    width: 100%;
    margin-top: ${rem("64px")} !important;
		margin-bottom: ${rem("64px")} !important;
		grid-template-columns: repeat(4, 1fr);
	`};
`;

export default Wrapper;
