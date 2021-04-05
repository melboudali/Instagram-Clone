import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const SubmitButtonSection = styled.section`
	display: flex;
	justify-content: center;
	padding: 15px 0;
	@media (min-width: 800px) {
		margin-left: 157px;
		justify-content: flex-start;
	}
`;

const ButtonElement = styled.button<{ active: boolean; width: string }>`
	opacity: ${({ active }) => (active ? "1" : "0.3")};
	background-color: var(--buttonLightBlue);
	border-radius: 4px;
	color: #fff;
	font-weight: 600;
	font-size: 14px;
	padding: 8px 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${({ width }) => width};
	cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
`;

const LoadingAnimation = keyframes`
	0% {
		transform: rotate(180deg);
	}
	to {
		transform: rotate(540deg);
	}
`;

const LoadingContainer = styled.div`
	height: 18px;
	width: 18px;
	svg {
		animation: ${LoadingAnimation} 0.8s steps(8) infinite;
		rect {
			fill: var(--backgroudColor);
			height: 10px;
			width: 28px;
		}
	}
`;

interface SubmitButtonProps {
	active?: boolean;
	loading: boolean;
	children: React.ReactNode;
	width: string;
}

const SubmitButton = ({ active = true, loading, width, children }: SubmitButtonProps) => (
	<SubmitButtonSection>
		<ButtonElement active={active} type="submit" disabled={!active} width={width}>
			{loading ? (
				<LoadingContainer>
					<svg aria-label="Loading..." viewBox="0 0 100 100">
						<rect opacity="0" rx="5" ry="5" transform="rotate(-90 50 50)" x="67" y="45" />
						<rect opacity="0.125" rx="5" ry="5" transform="rotate(-45 50 50)" x="67" y="45" />
						<rect opacity="0.25" rx="5" ry="5" transform="rotate(0 50 50)" x="67" y="45" />
						<rect opacity="0.375" rx="5" ry="5" transform="rotate(45 50 50)" x="67" y="45" />
						<rect opacity="0.5" rx="5" ry="5" transform="rotate(90 50 50)" x="67" y="45" />
						<rect opacity="0.625" rx="5" ry="5" transform="rotate(135 50 50)" x="67" y="45" />
						<rect opacity="0.75" rx="5" ry="5" transform="rotate(180 50 50)" x="67" y="45" />
						<rect opacity="0.875" rx="5" ry="5" transform="rotate(225 50 50)" x="67" y="45" />
					</svg>
				</LoadingContainer>
			) : (
				children
			)}
		</ButtonElement>
	</SubmitButtonSection>
);

SubmitButton.propTypes = {
	active: PropTypes.bool,
	loading: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
	width: PropTypes.string.isRequired
};

export default SubmitButton;
