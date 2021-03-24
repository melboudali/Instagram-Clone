import PropTypes from "prop-types";
import { useState } from "react";
import { useInsertCommentMutation } from "../../../../generated/graphql";
import styled from "styled-components";

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

const CommentInputTextArea = styled.textarea`
	height: 18px;
	background: none;
	border: 0;
	color: #262626;
	flex-grow: 1;
	outline: 0;
	padding: 0;
	resize: none;
`;

const CommentInputSubmitButton = styled.button<{ Active: boolean }>`
	cursor: pointer;
	background: 0 0;
	outline: 0;
	border: 0;
	font-weight: 600;
	color: #0095f6;
	${({ Active }) => !Active && "opacity:0.3"}
`;

interface CommentInputProps {
	imageId: string;
}

const CommentInput = ({ imageId }: CommentInputProps) => {
	const [textareaValue, setTextAreaValue] = useState<string>("");
	const [insertComment] = useInsertCommentMutation();
	const onClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		try {
			const res = await insertComment({
				variables: { imageId, comment: textareaValue },
				update: cache => {
					cache.evict({ fieldName: "getAllImages" });
					cache.evict({ fieldName: "getUserImages" });
				}
			});
			if (res.data?.insertComment === "Comment inserted") {
				console.log("Comment inserted");
			}
		} catch (error) {}
	};
	return (
		<CommentInputContainer>
			<CommentInputForm>
				<CommentInputTextArea
					placeholder="Add a comment…"
					autoComplete="off"
					autoCorrect="off"
					onChange={e => setTextAreaValue(e.target.value)}
				/>
				<CommentInputSubmitButton Active={!!textareaValue} onClick={onClick}>
					Post
				</CommentInputSubmitButton>
			</CommentInputForm>
		</CommentInputContainer>
	);
};

CommentInput.propTypes = {};

export default CommentInput;
