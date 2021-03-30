import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
	GetAllImagesDocument,
	GetAllImagesQuery,
	MeQuery,
	useLikeImageMutation,
	useMeQuery
} from "../../../../generated/graphql";
import PropTypes from "prop-types";

const IconsContainer = styled.section`
	margin-top: 4px;
	display: flex;
	span {
		&:nth-child(1) {
			margin-left: -8px;
		}
		&:last-of-type {
			display: inline-block;
			margin-left: auto;
			margin-right: -10px;
		}
		button {
			align-items: center;
			background: 0 0;
			border: 0;
			cursor: pointer;
			display: flex;
			justify-content: center;
			padding: 8px;
		}
	}
`;

interface IconsProps {
	liked: boolean;
	imageId: string;
	showComment?: boolean;
	me: MeQuery | undefined;
}

const Icons = ({ me, liked, imageId, showComment = true }: IconsProps) => {
	const history = useHistory();
	const [likeImage] = useLikeImageMutation();
	const onClick = async () => {
		if (!liked) {
			try {
				const res = await likeImage({
					variables: { imageId },
					update: cache => {
						if (showComment) {
							const existedImages = cache.readQuery<GetAllImagesQuery>({
								query: GetAllImagesDocument,
								variables: { limit: 3, cursor: null }
							});

							if (existedImages?.getAllImages.images) {
								const newImages = existedImages.getAllImages.images.map(image => {
									if (image.id === imageId) {
										return {
											...image,
											like: [{ user: { username: me?.me?.username! } }]
										};
									}
									return image;
								});
								cache.writeQuery<GetAllImagesQuery>({
									query: GetAllImagesDocument,
									data: {
										...existedImages,
										getAllImages: {
											...existedImages.getAllImages,
											images: newImages
										}
									}
								});
							}
						} else {
						}
					}
				});

				if (res.data?.likeImage.liked) {
					console.log("Liked!");
				} else {
					console.log(res.data?.likeImage.message);
				}
			} catch (error) {
				console.log(error.message);
			}
		}
	};
	return (
		<IconsContainer>
			<span>
				<button type="button" onClick={onClick}>
					{liked ? (
						<svg fill="#ed4956" height="24" viewBox="0 0 48 48" width="24">
							<path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
						</svg>
					) : (
						<svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
							<path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
						</svg>
					)}
				</button>
			</span>
			{showComment && (
				<span>
					<button type="button" onClick={() => history.push(`/p/${imageId}`)}>
						<svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
							<path d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"></path>
						</svg>
					</button>
				</span>
			)}
			<span>
				<button type="button">
					<svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
						<path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
					</svg>
				</button>
			</span>
		</IconsContainer>
	);
};

Icons.propTypes = {};

export default Icons;
