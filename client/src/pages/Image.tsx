/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Caption from "../components/home/articles/common/Caption";
import Comment from "../components/home/articles/common/Comment";
import CommentInput from "../components/home/articles/common/CommentInput";
import Header from "../components/home/articles/common/Header";
import { useGetImageCommentsQuery, useGetImageQuery } from "../generated/graphql";
import { usePalette } from "react-palette";
import Icons from "../components/home/articles/common/Icons";

const ImageContainer = styled.main`
	background-color: black;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

const ModalClose = styled.button`
	display: none;
	position: absolute;
	background: none;
	border: none;
	outline: none;
	top: 10px;
	right: 10px;
	cursor: pointer;
	svg {
		fill: #ffffff;
		height: 24px;
		width: 24px;
	}
	@media (min-width: 800px) {
		display: block;
	}
`;

const ImageWrapper = styled.main`
	display: block;
	width: 100%;
	height: 100%;
	background-color: var(--backgroudColor);

	@media (min-width: 800px) {
		width: 90%;
		height: 90%;
		display: flex;
		flex-direction: row;
	}
`;

const BlurBackground = styled.div<{ backgroundColor: string }>`
	position: absolute;
	background-image: url(${({ backgroundColor }) => backgroundColor});
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	width: 100%;
	height: 100%;
	opacity: 0.5;
	&:before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(2px);
	}
`;

const ImageMain = styled.a<{ backgroundColor: string }>`
	--displayValue: none;
	position: relative;
	text-decoration: none;
	display: var(--displayValue) !important;
	width: 100%;
	height: 100%;
	background-color: ${({ backgroundColor }) => backgroundColor ?? "#161616"};
	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
		z-index: 1;
	}
	&:hover {
		cursor: zoom-in;
	}
	@media (min-width: 800px) {
		--displayValue: flex;
		align-items: center;
		justify-content: center;
	}
`;

const ImageAside = styled.aside`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	a {
		text-decoration: none;
		width: 100%;
		max-height: 60%;
	}
	@media (min-width: 800px) {
		width: 700px;
	}
`;

const ImageElement = styled.img`
	width: 100%;
	max-height: 100%;
	object-fit: cover;
	text-decoration: none;
	&:hover {
		cursor: zoom-in;
	}
	@media (min-width: 800px) {
		display: none;
	}
`;

const ImageDescriptionContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding-left: 10px;
`;

const ImageDescription = styled.section`
	width: 100%;
	height: 100%;
	padding-right: 17px;
	overflow-y: scroll;
	box-sizing: content-box;
`;

const EmptyComments = styled.div`
	height: calc(100% - 57px);
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	h1 {
		color: var(--textColorDarkGray);
	}
`;

const CommentInputContainer = styled.section`
	margin-top: auto;
	padding: 0 10px;
`;

interface ImageProps {
	match: { params: { imageId: string } };
}

const Image = ({
	match: {
		params: { imageId }
	}
}: ImageProps) => {
	const history = useHistory();
	const { data: comments } = useGetImageCommentsQuery({ variables: { imageId } });

	const { data } = useGetImageQuery({ variables: { imageId } });
	const {
		data: { darkMuted }
	} = usePalette(data?.getImage.image?.image_url as string);

	return (
		<ImageContainer>
			<ModalClose onClick={() => history.goBack()}>
				<svg viewBox="0 0 48 48">
					<path d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"></path>
				</svg>
			</ModalClose>
			<ImageWrapper>
				<ImageMain
					backgroundColor={darkMuted!}
					href={data?.getImage.image?.image_url}
					target="_noblank">
					<BlurBackground backgroundColor={data?.getImage.image?.image_url!} />
					<img src={data?.getImage.image?.image_url} alt={data?.getImage.image?.caption} />
				</ImageMain>
				<ImageAside>
					<Header
						name={data?.getImage.image?.user.username!}
						logo={data?.getImage.image?.user.image_link!}
						showCloseBtn={true}
					/>
					<a href={data?.getImage.image?.image_url} target="_noblank">
						<ImageElement src={data?.getImage.image?.image_url} />
					</a>
					<ImageDescriptionContainer>
						<ImageDescription>
							<Caption
								name={data?.getImage.image?.user.username!}
								description={data?.getImage.image?.caption!}
								image={data?.getImage.image?.user.image_link}
							/>
							{comments && !!comments.getImageComments.length ? (
								comments.getImageComments.map(({ id, text, user: { username } }) => (
									<Comment key={id} username={username} text={text} />
								))
							) : (
								<EmptyComments>
									<h1>No Comments</h1>
								</EmptyComments>
							)}
						</ImageDescription>
					</ImageDescriptionContainer>
					<CommentInputContainer>
						<Icons liked={false} articleId={data?.getImage.image?.id!} showComment={false} />
						<CommentInput imageId={data?.getImage.image?.id!} />
					</CommentInputContainer>
				</ImageAside>
			</ImageWrapper>
		</ImageContainer>
	);
};

Image.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			imageId: PropTypes.string.isRequired
		})
	})
};

export default Image;
