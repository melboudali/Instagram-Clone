import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const SpinnerAnimation = keyframes`
			0% {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}`;

const LoadingSpinnerContainer = styled.div<{ margin: string }>`
	margin: ${({ margin }) => margin};
	width: 100%;
	text-align: center;
	svg {
		width: 25px;
		margin: 0 auto;
		animation: ${SpinnerAnimation} 1.2s steps(12) infinite;
		rect {
			fill: #555555;
			height: 6px;
			width: 25px;
		}
	}
`;

interface LoadingSpinnerProps {
	margin: string;
}

const LoadingSpinner = ({ margin }: LoadingSpinnerProps) => (
	<LoadingSpinnerContainer margin={margin}>
		<svg viewBox="0 0 100 100">
			<rect opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" x="72" y="47" />
			<rect opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" x="72" y="47" />
			<rect opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" x="72" y="47" />
			<rect opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" x="72" y="47" />
			<rect opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" x="72" y="47" />
			<rect opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" x="72" y="47" />
			<rect opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" x="72" y="47" />
			<rect opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" x="72" y="47" />
			<rect opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" x="72" y="47" />
			<rect opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" x="72" y="47" />
			<rect opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" x="72" y="47" />
			<rect opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" x="72" y="47" />
		</svg>
	</LoadingSpinnerContainer>
);

LoadingSpinner.propTypes = {
	margin: PropTypes.string.isRequired
};

export default LoadingSpinner;
