import styled, { css } from "styled-components";

const LikesAndComments = css`
	display: flex;
	align-items: center;
	color: #fff;
	font-size: 18px;
	font-weight: 500;
	svg {
		margin-right: 8px;
	}
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 293px);
	grid-gap: 28px;
	justify-content: center;
	position: relative;
`;

const ImageAndCommentsCount = styled.div`
	display: none;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.3);
`;

const ImageContainer = styled.div`
	width: 100%;
	height: 293px;
	position: relative;
	&:hover {
		${ImageAndCommentsCount} {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
`;

const Image = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
`;

const LikesContainer = styled.div`
	${LikesAndComments}
	margin-right: 30px;
`;

const CommentsContainer = styled.div`
	${LikesAndComments}
`;

type PostsProps = {};

const Posts = ({}: PostsProps) => {
	const Images = [
		"https://images.unsplash.com/photo-1523485431143-3810f5cf96ff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=638&q=80",
		"https://images.unsplash.com/photo-1611565573230-a71119618906?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
		"https://images.unsplash.com/photo-1611509656000-71879f5e950d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=683&q=80",
		"https://images.unsplash.com/photo-1611489704223-fd10d4fb0afb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
		"https://images.unsplash.com/photo-1611336085385-206d880d3f7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
		"https://images.unsplash.com/photo-1611505197505-b86e9d9a4498?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
		"https://images.unsplash.com/photo-1550346948-b4d527a4c069?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
		"https://images.unsplash.com/photo-1611448746246-2bdf63986449?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80",
		"https://images.unsplash.com/photo-1514489024785-d5ba8dfb2198?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80",
		"https://images.unsplash.com/photo-1598188306155-25e400eb5078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
		"https://images.unsplash.com/photo-1607473129381-ca8345af56ac?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
		"https://images.unsplash.com/photo-1607748233848-459627765cf0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
		"https://images.unsplash.com/photo-1611522377974-76f7871dfad5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
		"https://images.unsplash.com/photo-1587614380862-0294308ae58b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
		"https://images.unsplash.com/photo-1611553083772-d5a64708046a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80",
		"https://images.unsplash.com/photo-1476900543704-4312b78632f8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
		"https://images.unsplash.com/photo-1581867225533-c25da1bf99a9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
		"https://images.unsplash.com/photo-1499117901949-e34ef1b2444a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80",
		"https://images.unsplash.com/photo-1601673897009-63e01d95203d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
		"https://images.unsplash.com/photo-1520468447370-264ed2d81430?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
		"https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
		"https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
		"https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
		"https://images.unsplash.com/photo-1455225761879-2ed774963809?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
	];
	return (
		<Container>
			{Images.map(image => (
				<ImageContainer>
					<Image src={image} alt="post" />
					<ImageAndCommentsCount>
						<LikesContainer>
							<svg
								width="18"
								height="16"
								viewBox="0 0 18 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M13.4167 0.541748C15.7917 0.541748 17.75 2.70841 17.75 5.33341C17.75 8.16675 15.2917 9.91675 12.9583 12.0001C10.625 14.0834 9.41667 15.2084 9 15.4584C8.54167 15.1667 7.04167 13.7917 5.04167 12.0001C2.66667 9.91675 0.25 8.16675 0.25 5.33341C0.25 2.70841 2.20833 0.541748 4.58333 0.541748C6.33333 0.541748 7.29167 1.37508 7.95833 2.33341C8.75 3.41675 8.875 3.95841 9 3.95841C9.125 3.95841 9.25 3.41675 10.0417 2.33341C10.7083 1.37508 11.6667 0.541748 13.4167 0.541748Z"
									fill="white"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M17.75 5.33341C17.75 2.70841 15.7917 0.541748 13.4167 0.541748C11.6667 0.541748 10.7083 1.37508 10.0417 2.33341C9.25 3.41675 9.125 3.95841 9 3.95841C8.875 3.95841 8.75 3.41675 7.95833 2.33341C7.29167 1.37508 6.33333 0.541748 4.58333 0.541748C2.20833 0.541748 0.25 2.70841 0.25 5.33341C0.25 8.16675 2.66667 9.91675 5.04167 12.0001C7.04167 13.7917 8.54167 15.1667 9 15.4584C9.41667 15.2084 10.625 14.0834 12.9583 12.0001C15.2917 9.91675 17.75 8.16675 17.75 5.33341Z"
									fill="white"
								/>
							</svg>
							0
						</LikesContainer>
						<CommentsContainer>
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M17.3333 8.79167C17.3333 10.4583 16.9167 11.7083 16.25 12.9583C16.1667 13.125 16.125 13.3333 16.1667 13.5417L17.0417 17.0417L13.5833 16.1667C13.375 16.125 13.1667 16.125 13 16.25C12.25 16.6667 10.8333 17.3333 8.83333 17.3333C4.08333 17.3333 0.25 13.5 0.25 8.79167C0.25 4.08333 4.08333 0.25 8.79167 0.25C13.5 0.25 17.3333 4.08333 17.3333 8.79167Z"
									fill="white"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M16.25 12.9583C16.9167 11.7083 17.3333 10.4583 17.3333 8.79167C17.3333 4.08333 13.5 0.25 8.79167 0.25C4.08333 0.25 0.25 4.08333 0.25 8.79167C0.25 13.5 4.08333 17.3333 8.83333 17.3333C10.8333 17.3333 12.25 16.6667 13 16.25C13.1667 16.125 13.375 16.125 13.5833 16.1667L17.0417 17.0417L16.1667 13.5417C16.125 13.3333 16.1667 13.125 16.25 12.9583Z"
									fill="white"
								/>
							</svg>
							0
						</CommentsContainer>
					</ImageAndCommentsCount>
				</ImageContainer>
			))}
		</Container>
	);
};

export default Posts;
