import { useState } from "react";
import { GetImageCommentsDocument, GetImageCommentsQuery, useInsertCommentMutation } from "../../../../generated/graphql";
import styled, { keyframes } from "styled-components";
import InsertCommentResponse from "./InsertCommentResponse";
import PropTypes from "prop-types";

const CommentInputContainer = styled.div`
	display: flex;
	align-items: center;
	border-top: 1px solid #efefef;
	font-size: 14px;
	line-height: 18px;
	min-height: 56px;
	padding: 0 16px;
`;

const CommentInputForm = styled.form`
	display: flex;
	flex: 1 1 100%;
`;

const CommentInputElement = styled.input`
	height: 18px;
	background: none;
	border: 0;
	color: var(--textColorDarkGray);
	flex-grow: 1;
	outline: 0;
	padding: 0;
	resize: none;
`;

const CommentInputSubmitButton = styled.button<{ active: boolean }>`
	font-weight: 600;
	color: var(--buttonLightBlue);
	opacity: ${({ active }) => (active ? "1" : "0.3")};
	font-weight: 600;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 10px;
	cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
`;

const LoadingAnimation = keyframes`
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
		animation: ${LoadingAnimation} 0.8s steps(8) infinite;
	}
`;

const Rect = styled.rect`
	fill: var(--buttonLightBlue);
	height: 10px;
	width: 28px;
`;

interface CommentInputProps {
	imageId: string;
}

const CommentInput = ({ imageId }: CommentInputProps) => {
	const [insertComment] = useInsertCommentMutation();
	const [textareaValue, setTextAreaValue] = useState("");
	const [loading, setLoading] = useState(false);
	const [inserted, setInserted] = useState(false);
	const [insertedError, setInsertedError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await insertComment({
				variables: { imageId, comment: textareaValue },
				update: (cache, { data }) => {
					const existedComments = cache.readQuery<GetImageCommentsQuery>({
						query: GetImageCommentsDocument,
						variables: { imageId }
					});
					if (existedComments?.getImageComments.comment && data?.insertComment.comment) {
						cache.writeQuery<GetImageCommentsQuery>({
							query: GetImageCommentsDocument,
							variables: { imageId },
							data: {
								...existedComments,
								getImageComments: {
									...existedComments.getImageComments,
									comment: [...existedComments.getImageComments.comment, data?.insertComment.comment]
								}
							}
						});
					}
				}
			});
			if (res.data?.insertComment.inserted) {
				setTextAreaValue("");
			} else {
				setInsertedError(res.data?.insertComment.message!);
			}
		} catch (error) {
			setInsertedError(error.message);
		}
		setLoading(false);
		setInserted(true);
		setTimeout(() => setInserted(false), 3000);
	};
	return (
		<CommentInputContainer>
			<InsertCommentResponse inserted={inserted} insertedError={insertedError} />
			<CommentInputForm onSubmit={onSubmit}>
				<CommentInputElement
					placeholder="Add a comment…"
					autoComplete="off"
					autoCorrect="off"
					value={textareaValue}
					onChange={e => setTextAreaValue(e.target.value)}
				/>
				<CommentInputSubmitButton active={!!textareaValue} type="submit" disabled={!textareaValue}>
					{loading ? (
						<LoadingContainer>
							<svg viewBox="0 0 100 100">
								<Rect opacity="0" rx="5" ry="5" transform="rotate(-90 50 50)" x="67" y="45"></Rect>
								<Rect opacity="0.125" rx="5" ry="5" transform="rotate(-45 50 50)" x="67" y="45"></Rect>
								<Rect opacity="0.25" rx="5" ry="5" transform="rotate(0 50 50)" x="67" y="45"></Rect>
								<Rect opacity="0.375" rx="5" ry="5" transform="rotate(45 50 50)" x="67" y="45"></Rect>
								<Rect opacity="0.5" rx="5" ry="5" transform="rotate(90 50 50)" x="67" y="45"></Rect>
								<Rect opacity="0.625" rx="5" ry="5" transform="rotate(135 50 50)" x="67" y="45"></Rect>
								<Rect opacity="0.75" rx="5" ry="5" transform="rotate(180 50 50)" x="67" y="45"></Rect>
								<Rect opacity="0.875" rx="5" ry="5" transform="rotate(225 50 50)" x="67" y="45"></Rect>
							</svg>
						</LoadingContainer>
					) : (
						"Post"
					)}
				</CommentInputSubmitButton>
			</CommentInputForm>
		</CommentInputContainer>
	);
};

CommentInput.propTypes = { imageId: PropTypes.string.isRequired };

export default CommentInput;
