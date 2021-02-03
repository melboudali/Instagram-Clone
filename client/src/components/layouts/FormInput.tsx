import { useState } from "react";
import { Main, InputContainer, Label, Span, Input, ShowButton } from "./FormInput.style";
import PropTypes from "prop-types";

type FormInputProps = {
	LabelText: string;
	Required: boolean;
	Maxlength?: number;
	Name: string;
	Type: string;
	inputValue: string;
	setInputValue: Function;
};

const FromInput = ({
	LabelText,
	Required,
	Maxlength,
	Name,
	Type,
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
		<Main>
			<InputContainer>
				<Label>
					<Span value={inputValue}>{LabelText}</Span>
					<Input
						aria-label={LabelText}
						aria-required={Required}
						autoCapitalize="off"
						autoCorrect="off"
						maxLength={Maxlength}
						name={Name}
						type={Type === "password" && showPassword ? "text" : Type}
						value={inputValue}
						autoComplete="off"
						onChange={onChangeFunction}
					/>
					{Type === "password" && inputValue.length > 0 && (
						<ShowButton type="button" onClick={onClickFunction}>
							{showPassword ? "hide" : "show"}
						</ShowButton>
					)}
				</Label>
			</InputContainer>
		</Main>
	);
};

FromInput.propTypes = {
	LabelText: PropTypes.string.isRequired,
	Required: PropTypes.bool.isRequired,
	Maxlength: PropTypes.number,
	Name: PropTypes.string.isRequired,
	Type: PropTypes.string.isRequired,
	inputValue: PropTypes.string.isRequired,
	setInputValue: PropTypes.func.isRequired
};

export default FromInput;
