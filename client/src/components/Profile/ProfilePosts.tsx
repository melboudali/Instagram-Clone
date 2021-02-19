import styled, { css } from "styled-components";
import { User_Image_Data } from "../../generated/graphql";

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

const ProfilePostsContainer = styled.div`
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

const ProfilePostsImages = styled.div`
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

const PostImage = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
`;

const PostLikesContainer = styled.div`
	${LikesAndComments}
	margin-right: 30px;
`;

const PostCommentsContainer = styled.div`
	${LikesAndComments}
`;

interface ProfilePostsProps {
	posts: User_Image_Data[];
}

const ProfilePosts = ({ posts }: ProfilePostsProps) => {
	return (
		<ProfilePostsContainer>
			{posts.map((image, id) => (
				<ProfilePostsImages key={id}>
					<PostImage src={image.image_url} alt="post" />
					<ImageAndCommentsCount>
						<PostLikesContainer>
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
									fillRule="evenodd"
									clipRule="evenodd"
									d="M17.75 5.33341C17.75 2.70841 15.7917 0.541748 13.4167 0.541748C11.6667 0.541748 10.7083 1.37508 10.0417 2.33341C9.25 3.41675 9.125 3.95841 9 3.95841C8.875 3.95841 8.75 3.41675 7.95833 2.33341C7.29167 1.37508 6.33333 0.541748 4.58333 0.541748C2.20833 0.541748 0.25 2.70841 0.25 5.33341C0.25 8.16675 2.66667 9.91675 5.04167 12.0001C7.04167 13.7917 8.54167 15.1667 9 15.4584C9.41667 15.2084 10.625 14.0834 12.9583 12.0001C15.2917 9.91675 17.75 8.16675 17.75 5.33341Z"
									fill="white"
								/>
							</svg>
							0
						</PostLikesContainer>
						<PostCommentsContainer>
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
									fillRule="evenodd"
									clipRule="evenodd"
									d="M16.25 12.9583C16.9167 11.7083 17.3333 10.4583 17.3333 8.79167C17.3333 4.08333 13.5 0.25 8.79167 0.25C4.08333 0.25 0.25 4.08333 0.25 8.79167C0.25 13.5 4.08333 17.3333 8.83333 17.3333C10.8333 17.3333 12.25 16.6667 13 16.25C13.1667 16.125 13.375 16.125 13.5833 16.1667L17.0417 17.0417L16.1667 13.5417C16.125 13.3333 16.1667 13.125 16.25 12.9583Z"
									fill="white"
								/>
							</svg>
							0
						</PostCommentsContainer>
					</ImageAndCommentsCount>
				</ProfilePostsImages>
			))}
		</ProfilePostsContainer>
	);
};

export default ProfilePosts;
