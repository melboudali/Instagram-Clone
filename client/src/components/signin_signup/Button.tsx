import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.div`
	margin: 8px 40px;
`;

const ButtonElement = styled.button<{ active: boolean }>`
	opacity: ${({ active }) => (active ? "1" : "0.3")};
	border: 1px solid transparent;
	background-color: var(--buttonLightBlue);
	border-radius: 4px;
	color: var(--whiteColor);
	cursor: ${({ active }) => (active ? "pointer" : "default")};
	display: flex;
	justify-content: center;
	font-weight: 600;
	font-size: 14px;
	line-height: 18px;
	padding: 5px 9px;
	width: 100%;
`;

const IGCoreSpinnerSpin8 = keyframes`
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
		animation: ${IGCoreSpinnerSpin8} 0.8s steps(8) infinite;
		rect {
			fill: var(--backgroudColor);
			height: 10px;
			width: 28px;
		}
	}
`;

type buttonType = "submit" | "reset" | "button";

interface ButtonProps {
	active: boolean;
	loading: boolean;
	children: React.ReactNode;
	type: buttonType;
	onClickFunction: Function;
}

const Button = ({ active, loading, children, onClickFunction, type }: ButtonProps) => (
	<ButtonContainer>
		<ButtonElement
			active={active}
			type={type}
			onClick={e => {
				e.preventDefault();
				onClickFunction();
			}}
			disabled={!active}>
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
	</ButtonContainer>
);

Button.propTypes = {
	active: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
	type: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	onClickFunction: PropTypes.func.isRequired
};

export default Button;
