import { useState } from "react";
import EditFormInput from "../components/Edit/EditFormInput";
import SubmitButton from "../components/Edit/SubmitButton";
import SettingsContainer from "../containers/SettingsContainer";
import styled from "styled-components";
import PropTypes from "prop-types";

const SubmitButtonSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px 0;
	@media (min-width: 800px) {
		flex-direction: row;
		justify-content: space-between;
		margin-left: 157px;
	}
`;

interface ChangePasswordProps {}

const ChangePassword = ({}: ChangePasswordProps) => {
	const [formData, setFormData] = useState({
		"Old Password": "",
		"New Password": "",
		"Confirm New Password": ""
	});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("onSubmit Function");
	};
	return (
		<SettingsContainer updated={false}>
			<form onSubmit={onSubmit}>
				<EditFormInput
					label="Old Password"
					formData={formData}
					setFormData={setFormData}
					value={formData["Old Password"]}
					type="password"
				/>
				<EditFormInput
					label="New Password"
					formData={formData}
					setFormData={setFormData}
					value={formData["New Password"]}
					type="password"
				/>
				<EditFormInput
					label="Confirm New Password"
					formData={formData}
					setFormData={setFormData}
					value={formData["Confirm New Password"]}
					type="password"
				/>
				<SubmitButtonSection>
					<SubmitButton
						active={
							!!formData["Old Password"] && !!formData["New Password"] && !!formData["Old Password"]
						}
						loading={false}
						width="120px">
						Change Password
					</SubmitButton>
				</SubmitButtonSection>
			</form>
		</SettingsContainer>
	);
};

ChangePassword.propTypes = {};

export default ChangePassword;
