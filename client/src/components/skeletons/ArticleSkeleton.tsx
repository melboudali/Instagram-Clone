import styled from "styled-components";
import Skeleton from "./Skeleton";

const ArticleContainer = styled.article`
	display: block;
	background-color: #fff;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
	margin-bottom: 60px;
`;

const ArticleHeader = styled.header`
	display: flex;
	align-items: center;
	flex-direction: row;
	height: 60px;
	padding: 16px;
	border-bottom: 1px solid #efefef;
`;

const ArticleNameContainer = styled.div`
	margin-left: 14px;
`;

const ArticleDetails = styled.div`
	padding: 0 16px;
`;

const ArticleIconsContainer = styled.section`
	margin: 8px 0;
	display: flex;
	span {
		margin-right: 5px;
		&:nth-child(1) {
			margin-left: -8px;
		}
		&:last-of-type {
			display: inline-block;
			margin-left: auto;
			margin-right: -10px;
		}
	}
`;

const ArticleDescription = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 8px;
	& > * {
		margin: 0 0 8px;
	}
`;

const Article = () => {
	return (
		<ArticleContainer>
			<ArticleHeader>
				<Skeleton height="40px" width="40px" radius="50%" />
				<ArticleNameContainer>
					<Skeleton height="12px" width="100px" radius="2px" />
				</ArticleNameContainer>
			</ArticleHeader>
			<Skeleton height="250px" width="612px" />
			<ArticleDetails>
				<ArticleIconsContainer>
					<span>
						<Skeleton height="30px" width="30px" />
					</span>
					<span>
						<Skeleton height="30px" width="30px" />
					</span>
					<span>
						<Skeleton height="30px" width="30px" />
					</span>
					<span>
						<Skeleton height="30px" width="30px" />
					</span>
				</ArticleIconsContainer>
				<div>
					<ArticleDescription>
						<Skeleton height="12px" width="100%" />
						<Skeleton height="12px" width="100%" />
						<Skeleton height="12px" width="100%" />
						<Skeleton height="12px" width="100%" />
					</ArticleDescription>
				</div>
			</ArticleDetails>
		</ArticleContainer>
	);
};

export default Article;
