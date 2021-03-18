import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Caption from "../components/home/articles/common/Caption";
import Comment from "../components/home/articles/common/Comment";
import CommentInput from "../components/home/articles/common/CommentInput";
import Header from "../components/home/articles/common/Header";
import { useGetImageQuery } from "../generated/graphql";

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
`;

const ImageWrapper = styled.main`
	width: 90%;
	height: 90%;
	background-color: var(--backgroudColor);
	display: flex;
	flex-direction: column;
`;

const ImageElement = styled.img`
	width: 100%;
	height: 20%;
	object-fit: cover;
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

const CommentInputContainer = styled.section`
	margin-top: auto;
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
	const { data } = useGetImageQuery({ variables: { imageId } });
	const comments = [
		{ user: "brown.julianna", comment: "❤️❤️❤️" },
		{ user: "faybrookepracht", comment: "😍" },
		{ user: "brown.julianna", comment: "❤️❤️❤️" },
		{ user: "faybrookepracht", comment: "😍" },
		{ user: "brown.julianna", comment: "❤️❤️❤️" },
		{ user: "faybrookepracht", comment: "😍" },
		{ user: "brown.julianna", comment: "❤️❤️❤️" },
		{ user: "faybrookepracht", comment: "😍" },
		{ user: "brown.julianna", comment: "❤️❤️❤️" },
		{ user: "faybrookepracht", comment: "😍" },
		{ user: "brown.julianna", comment: "❤️❤️❤️" },
		{ user: "faybrookepracht", comment: "😍" },
		{ user: "brown.julianna", comment: "❤️❤️❤️" },
		{ user: "faybrookepracht", comment: "😍" },
		{ user: "brown.julianna", comment: "❤️❤️❤️" },
		{ user: "faybrookepracht", comment: "😍" },
		{ user: "brown.julianna", comment: "❤️❤️❤️" },
		{ user: "faybrookepracht", comment: "😍" }
	];
	return (
		<ImageContainer>
			<ModalClose onClick={() => history.goBack()}>
				<svg viewBox="0 0 48 48">
					<path d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"></path>
				</svg>
			</ModalClose>
			<ImageWrapper>
				<Header
					name={data?.getImage.image?.user.username!}
					logo={data?.getImage.image?.user.image_link!}
				/>
				<ImageElement src={data?.getImage.image?.image_url} />
				<ImageDescriptionContainer>
					<ImageDescription>
						<Caption
							name={data?.getImage.image?.user.username!}
							description={data?.getImage.image?.caption!}
							image={data?.getImage.image?.user.image_link}
						/>
						{comments.map(({ user, comment }, id) => (
							<Comment key={id} user={user} comment={comment} />
						))}
					</ImageDescription>
				</ImageDescriptionContainer>
				<CommentInputContainer>
					<CommentInput />
				</CommentInputContainer>
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
