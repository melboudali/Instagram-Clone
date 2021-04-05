import styled from "styled-components";
import PropTypes from "prop-types";

const EditFormInputContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 25px;
	@media (min-width: 800px) {
		flex-direction: row;
		justify-content: left;
	}
`;

const InputSectionLabelContainer = styled.div`
	@media (min-width: 800px) {
		position: relative;
		width: 160px;
		margin-right: 30px;
	}
`;

const InputSectionLabel = styled.label<{ type: string | undefined }>`
	font-size: 1rem;
	font-weight: 600;
	color: var(--textColorDarkGray);
	text-align: right;
	@media (min-width: 800px) {
		position: absolute;
		top: 0;
		right: 0;
		${({ type }) => type !== "checkbox" && "margin-top: 12px;"};
	}
`;

const InputSectionMain = styled.div<{ type: string | undefined }>`
	width: 100%;
	${({ type }) =>
		type === "checkbox" &&
		`display: flex;
        justify-content: left;
		margin-top: 10px;
		@media (min-width: 800px) {
			margin-top: 0;
		}
        `};
`;

const InputSectionInput = styled.input<{ type: string | undefined }>`
	${({ type }) =>
		type && type === "checkbox"
			? `width:fit-content;
            margin: 4px 10px 0 0;
			`
			: `
			width:100%; 
			margin: 6px 0 5px;
			padding: 10px 7px;
			color: var(--textColorDarkGray);
			&::placeholder {
				color: var(--borderDarkColor);
				font-weight: 300;
			}
			@media (min-width: 800px) {
				margin: 0 0 4px;
			}`};
	border: 2px solid #eee;
	border-radius: 5px;
	outline: none;
	background: none;
	&:focus {
		border: 2px solid #000;
	}
`;

const InputSectionTextArea = styled.textarea`
	width: 100%;
	border: 2px solid #eee;
	border-radius: 5px;
	outline: none;
	background: none;
	padding: 10px 7px;
	margin: 6px 0 5px;
	color: #262626;
	resize: vertical;
	&::placeholder {
		color: var(--borderDarkColor);
		font-weight: 300;
	}
	&:focus {
		border: 2px solid #000;
	}
	@media (min-width: 800px) {
		margin: 0 0 5px;
	}
`;

const InputSectionDescriptionTitle = styled.p`
	font-size: 0.8rem;
	color: var(--textColorGray);
	margin-bottom: 5px;
	font-weight: 700;
`;

const InputSectionDescription = styled.p<{ type: string | undefined }>`
	${({ type }) =>
		type === "checkbox"
			? `font-size: 0.9rem;
            font-weight: 500;
        	color: var(--textColorDarkGray);`
			: `font-size: 0.7rem;
        	color: var(--textColorGray);
       		span {
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
	formData: object;
	setFormData: Function;
	value?: string | number | null | undefined;
	defaultChecked?: boolean;
}

const EditFormInput = ({
	label,
	descriptionTitle,
	description,
	subDescription,
	type,
	textArea,
	formData,
	setFormData,
	value,
	defaultChecked
}: EditFormInputProps) => (
	<EditFormInputContainer>
		<InputSectionLabelContainer>
			<InputSectionLabel htmlFor={label} type={type}>
				{label}
			</InputSectionLabel>
		</InputSectionLabelContainer>
		<InputSectionMain type={type}>
			{textArea ? (
				<InputSectionTextArea
					placeholder={label}
					id={label}
					autoCapitalize="off"
					autoCorrect="off"
					autoComplete="off"
					maxLength={100}
					rows={5}
					value={value || ""}
					onChange={e =>
						setFormData({
							...formData,
							[label]: e.target.value
						})
					}
				/>
			) : (
				<InputSectionInput
					type={type ? type : "text"}
					placeholder={label}
					id={label}
					autoCapitalize="off"
					autoCorrect="off"
					maxLength={50}
					autoComplete="off"
					onChange={e =>
						setFormData({
							...formData,
							[label]: type === "checkbox" ? !defaultChecked : e.target.value
						})
					}
					{...(type === "checkbox" ? { defaultChecked: defaultChecked! } : { value: value || "" })}
				/>
			)}
			{descriptionTitle && <InputSectionDescriptionTitle>{descriptionTitle}</InputSectionDescriptionTitle>}
			<InputSectionDescription type={type}>
				{description && description}
				{subDescription && <span>{subDescription}</span>}
			</InputSectionDescription>
		</InputSectionMain>
	</EditFormInputContainer>
);

EditFormInput.propTypes = {
	label: PropTypes.string.isRequired,
	descriptionTitle: PropTypes.string,
	description: PropTypes.string,
	subDescription: PropTypes.string,
	type: PropTypes.string,
	textArea: PropTypes.bool,
	formData: PropTypes.object,
	setFormData: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	defaultChecked: PropTypes.bool
};

export default EditFormInput;
