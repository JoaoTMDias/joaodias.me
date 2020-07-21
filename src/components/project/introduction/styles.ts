import styled from "styled-components";
import { rem } from "polished";
import { above } from "../../../helpers/media-queries.helper";

export const Wrapper = styled.div`
	height: auto;

	.title {
		width: auto;
		text-align: left;
		font-family: var(--heading-font-family);
		font-weight: 300;
		color: var(--color-primary);
		letter-spacing: 0.7px;

		font-size: ${rem("32px")};

		${above.medium`
      font-size: ${rem("48px")};
      line-height: 1.2;
      letter-spacing: 0.85px;
		`};

		${above.large`
			font-size: ${rem("56px")};
		`};
	}

	.description {
		font-family: var(--body-font-family);
		color: var(--color-gray0, #f9f9fa);
		text-align: left;
		margin-bottom: ${rem("16px")};
		font-size: ${rem("20px")};

		${above.medium`
					margin-bottom: ${rem("48px")};
		`};
	}

	.lead {
		font-weight: 300;
		line-height: 1.888;

		color: var(--color-gray4, #c0c3cc);
	}

	.lead,
	.description {
		font-size: ${rem("18px")};

		${above.medium`
			font-size: ${rem("22px")};
		`};

		${above.large`
			font-size: ${rem("24px")};
		`};
	}

	.title,
	.lead,
	.description {
		&:focus {
			outline-color: $color-gray3;
			outline-width: 1px;
			outline-style: dashed;
		}
	}
`;

export default Wrapper;
