import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FromInputContainer = styled.div`
	margin: 0 40px 6px;
`;

const FromInputMain = styled.div`
	background: var(--backgroudColor);
	border: 1px solid var(--borderColor);
	border-radius: 3px;
	color: var(--textColorDarkGray);
	display: flex;
	flex-direction: row;
	font-size: 14px;
	position: relative;
	width: 100%;
	cursor: text;
`;

const Label = styled.label`
	display: flex;
	height: 36px;
	flex: 1 0 0;
	padding: 0;
	margin: 0;
	min-width: 0;
`;

const Span = styled.span<{ value: string }>`
	color: var(--textColorGray);
	font-size: 12px;
	height: 36px;
	left: 8px;
	line-height: 36px;
	position: absolute;
	right: 0;
	text-overflow: ellipsis;
	transform-origin: left;
	transition: transform ease-out 0.1s;

	${({ value }) => value.length > 0 && "transform: scale(.83333) translateY(-10px);"}
	transition: transform ease-out .1s,-webkit-transform ease-out .1s;
	user-select: none;
	cursor: text;
`;

const Input = styled.input<{ value: string }>`
	background: var(--backgroudColor);
	border: none;
	flex: 1 0 auto;
	margin: 0;
	text-overflow: ellipsis;
	border-radius: 3px;
	${({ value }) =>
		value.length > 0
			? "font-size: 12px; padding: 14px 8px 2px;"
			: "font-size: 16px; padding: 9px 8px 7px;"};
	cursor: text;
`;

const ShowButton = styled.button`
	background: none;
	color: var(--textColorDarkGray);
	border: none;
	cursor: pointer;
	font-weight: 600;
	padding: 9px 4px;
	text-align: center;
	height: 100%;
	text-transform: capitalize;
`;

interface FormInputProps {
	labelText: string;
	required: boolean;
	maxlength?: number;
	name: string;
	type: string;
	inputValue: string;
	setInputValue: Function;
}

const FromInput = ({
	labelText,
	required,
	maxlength,
	name,
	type,
	inputValue,
	setInputValue
}: FormInputProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onChangeFunction = (e: React.ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const value = e.target.value;
		setInputValue(value);
	};

	const onClickFunction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	return (
		<FromInputContainer>
			<FromInputMain>
				<Label>
					<Span value={inputValue}>{labelText}</Span>
					<Input
						aria-label={labelText}
						required={required}
						aria-required={required}
						autoCapitalize="off"
						autoCorrect="off"
						maxLength={maxlength}
						name={name}
						type={type === "password" && showPassword ? "text" : type}
						value={inputValue}
						autoComplete="off"
						onChange={onChangeFunction}
					/>
					{type === "password" && inputValue.length > 0 && (
						<ShowButton type="button" onClick={onClickFunction}>
							{showPassword ? "hide" : "show"}
						</ShowButton>
					)}
				</Label>
			</FromInputMain>
		</FromInputContainer>
	);
};

FromInput.propTypes = {
	labelText: PropTypes.string.isRequired,
	required: PropTypes.bool.isRequired,
	maxlength: PropTypes.number,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	inputValue: PropTypes.string.isRequired,
	setInputValue: PropTypes.func.isRequired
};

export default FromInput;
