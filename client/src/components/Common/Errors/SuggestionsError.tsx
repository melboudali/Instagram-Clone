import styled from "styled-components";

const Container = styled.div`
	text-align: center;
	margin: 30px auto;
	svg {
		width: 100px;
		path {
			fill: var(--textColorGray);
		}
	}
`;

const Message = styled.h3`
	color: var(--borderDarkColor);
	font-weight: 300;
	letter-spacing: 4px;
	margin: 20px 0 0 0;
	text-transform: uppercase;
`;

const SuggestionsError = () => {
	return (
		<Container>
			<svg viewBox="0 0 640 512">
				<path d="M320,64a79.94,79.94,0,0,1,45,146.05l25.67,20.21C415.71,209.73,432,178.94,432,144A111.93,111.93,0,0,0,320,32c-44.42,0-82.41,26-100.53,63.44l25.91,20.4A80,80,0,0,1,320,64ZM544,224a80,80,0,1,0-80-80A80,80,0,0,0,544,224Zm0-128a48,48,0,1,1-48,48A48,48,0,0,1,544,96Zm20,160H524a72.22,72.22,0,0,0-41.09,12.91A135.38,135.38,0,0,1,508.3,291.3,39.79,39.79,0,0,1,524,288h40c24.2,0,44,21.5,44,48a16,16,0,0,0,32,0C640,291.91,605.91,256,564,256ZM176,448a16,16,0,0,1-16-16V387.2a83.2,83.2,0,0,1,14.09-46.4C187.91,320.3,212.5,308,239.8,308c21.3,0,32.15,7.19,56,10.42L242.09,276.1c-.77,0-1.39-.1-2.18-.1-36.32,0-71.61,16.2-92.32,46.91A114.63,114.63,0,0,0,128,387.2V432a48,48,0,0,0,48,48H464a47.73,47.73,0,0,0,26.7-8.13L460.39,448ZM26,106a79.12,79.12,0,0,0-10,38,79.7,79.7,0,0,0,133.45,59.15L123.83,183a47.86,47.86,0,0,1-72.28-56.92Zm131.06,163A72.73,72.73,0,0,0,116,256H76c-41.91,0-76,35.91-76,80a16,16,0,0,0,32,0c0-26.5,19.8-48,44-48h40a39.79,39.79,0,0,1,15.7,3.3A138.6,138.6,0,0,1,157.09,268.91ZM23,1.8A7.88,7.88,0,0,0,11.77,3l-10,12.5A7.94,7.94,0,0,0,3,26.71L617,510.23A8,8,0,0,0,628.2,509l10-12.5a7.86,7.86,0,0,0-1.21-11.2Z"></path>
			</svg>
			<Message>no suggestions</Message>
		</Container>
	);
};

export default SuggestionsError;
