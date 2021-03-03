import styled from "styled-components";
import PropTypes from "prop-types";

const EditFormInputContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 15px;
	@media (min-width: 800px) {
		flex-direction: row;
		justify-content: left;
	}
`;

const InputSectionLabelContainer = styled.div<{ type: string | undefined }>`
	@media (min-width: 800px) {
		${({ type }) => (type !== "checkbox" ? "margin-top: 17px;" : "margin-top: 10px;")}
		position: relative;
		width: 160px;
		height: 10px;
		margin-right: 30px;
	}
`;

const InputSectionLabel = styled.label`
	font-size: 1rem;
	font-weight: 600;
	color: #262626;
	text-align: right;
	@media (min-width: 800px) {
		position: absolute;
		top: 0;
		right: 0;
	}
`;

const InputSectionMain = styled.div<{ type: string | undefined }>`
	width: 100%;
	${({ type }) =>
		type === "checkbox" &&
		`display: flex;
        align-items: center;
        justify-content: left;
        margin-top: 10px;
        `};
`;

const InputSectionInput = styled.input<{ type: string | undefined }>`
	${({ type }) =>
		type && type === "checkbox"
			? `width:fit-content;
            margin-right: 10px;`
			: `
    width:100%; 
    margin: 10px 0;
    font-size: 1rem;
	padding: 5px 7px;
	color: #262626;
    &::placeholder {
        color: #a5a5a5;
        font-weight: 300;
	}`};
	border: 1px solid #eee;
	border-radius: 2px;
	outline: none;
	background: none;
`;

const InputSectionTextArea = styled.textarea`
	width: 100%;
	border: 1px solid #eee;
	border-radius: 2px;
	outline: none;
	background: none;
	font-size: 1rem;
	padding: 5px 7px;
	margin: 10px 0;
	color: #262626;
	resize: vertical;
	&::placeholder {
		color: #a5a5a5;
		font-weight: 300;
	}
`;

const InputSectionDescriptionTitle = styled.p`
	font-size: 0.8rem;
	color: #8e8e8e;
	margin-bottom: 5px;
	font-weight: 700;
`;

const InputSectionDescription = styled.p<{ type: string | undefined }>`
	${({ type }) =>
		type === "checkbox"
			? `font-size: 0.9rem;
            font-weight: 500;
        color: #262626;`
			: `font-size: 0.7rem;
        color: #8e8e8e;
        span {
            margin-top: 5px;
            display: block;
        }`};
`;

interface EditFormInputProps {
	label: string;
	descriptionTitle?: string;
	description?: string;
	subDescription?: string;
	type?: string;
	textArea?: boolean;
}

const EditFormInput = ({
	label,
	descriptionTitle,
	description,
	subDescription,
	type,
	textArea
}: EditFormInputProps) => {
	return (
		<EditFormInputContainer>
			<InputSectionLabelContainer type={type}>
				<InputSectionLabel htmlFor={label}>{label}</InputSectionLabel>
			</InputSectionLabelContainer>
			<InputSectionMain type={type}>
				{textArea ? (
					<InputSectionTextArea
						placeholder={label}
						id={label}
						autoCapitalize="off"
						autoCorrect="off"
						autoComplete="off"
						rows={5}
					/>
				) : (
					<InputSectionInput
						type={type ? type : "text"}
						placeholder={label}
						name={label}
						id={label}
						autoCapitalize="off"
						autoCorrect="off"
						maxLength={50}
						autoComplete="off"
					/>
				)}

				{descriptionTitle && (
					<InputSectionDescriptionTitle>{descriptionTitle}</InputSectionDescriptionTitle>
				)}
				<InputSectionDescription type={type}>
					{description && description}
					{subDescription && <span>{subDescription}</span>}
				</InputSectionDescription>
			</InputSectionMain>
		</EditFormInputContainer>
	);
};

EditFormInput.propTypes = {
	label: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	subDescription: PropTypes.string
};

export default EditFormInput;