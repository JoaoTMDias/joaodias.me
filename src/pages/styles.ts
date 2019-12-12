import styled from "styled-components";
import { rem } from "polished";
import { above } from "../helpers/media-queries.helper";

// ////////
// STYLED COMPONENTS
// ////////
export const Wrapper = styled.section`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	margin-top: 0;
`;

export const List = styled.div`
	list-style-type: none;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: ${`repeat(auto-fill, ${rem("375px")})`};
	justify-content: flex-start;
	grid-gap: 1rem;

	${above.medium`
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 2rem;
	`};

	${above.large`
		grid-template-rows: ${`repeat(auto-fill, ${rem("480px")})`};
		grid-gap: 3rem;
	`};

	${above.xlarge`
		grid-template-rows: ${`repeat(auto-fill, ${rem("560px")})`};

	`};
`;

export default List;
