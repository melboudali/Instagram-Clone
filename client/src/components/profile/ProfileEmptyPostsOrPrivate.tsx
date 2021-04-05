import styled from "styled-components";
import ArticlesError from "../common/errors/ArticlesError";
import OtherAssets from "../../assets/images/32f0a4f27407.png";
import Footer from "../common/footer/Footer";
import PropTypes from "prop-types";

const PrivateContainer = styled.div`
	background-color: var(--whiteColor);
	border-top: 1px solid var(--borderColor);
	border-left: 1px solid #efefef;
	border-bottom: 1px solid #efefef;
	border-right: 1px solid #efefef;
	border-radius: 0 3px;
	padding: 90px 0;
	margin-bottom: 70px;
	text-align: center;
`;

const EmptyContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 80px 0 100px 0;
`;

const NoTaggedLogoContainer = styled.div`
	background: url(${OtherAssets});
	background-repeat: no-repeat;
	background-position: -256px -269px;
	height: 62px;
	width: 62px;
	margin-bottom: 32px;
`;

const PrivateHeader = styled.h1`
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 25px;
	color: var(--textColorDarkGray);
`;

const PrivateMessage = styled.p`
	font-size: 14px;
	color: var(--textColorDarkGray);
`;

const EmptyMessage = styled.h1`
	font-size: 28px;
	font-weight: 300;
	color: var(--textColorDarkGray);
`;

interface ProfileEmptyPostsOrPrivateProps {
	type: "private" | "emptyImages" | "emptyTagged";
}

const ProfileEmptyPostsOrPrivate = ({ type }: ProfileEmptyPostsOrPrivateProps) => {
	if (type === "private") {
		return (
			<>
				<PrivateContainer>
					<PrivateHeader>This Account is Private</PrivateHeader>
					<PrivateMessage>Follow to see their photos and videos.</PrivateMessage>
				</PrivateContainer>
				<Footer />
			</>
		);
	}

	return (
		<>
			<EmptyContainer>
				{type === "emptyImages" ? (
					<ArticlesError />
				) : (
					<>
						<NoTaggedLogoContainer />
						<EmptyMessage>No Photos</EmptyMessage>
					</>
				)}
			</EmptyContainer>
			<Footer />
		</>
	);
};

ProfileEmptyPostsOrPrivate.propTypes = {
	type: PropTypes.string.isRequired
};

export default ProfileEmptyPostsOrPrivate;
