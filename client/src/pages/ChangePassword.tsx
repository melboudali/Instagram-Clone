import { useState } from "react";
import EditFormInput from "../components/Edit/EditFormInput";
import SubmitButton from "../components/Edit/SubmitButton";
import SettingsContainer from "../containers/SettingsContainer";
import { MeDocument, MeQuery, useChangePasswordMutation } from "../generated/graphql";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

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

const ErroMessage = styled.h1`
	color: var(--textErrorColor);
	font-weight: 500;
	font-size: 15px;
	text-align: center;
	@media (min-width: 800px) {
		text-align: left;
		margin-left: 157px;
	}
`;

interface ChangePasswordProps {}

const ChangePassword = ({}: ChangePasswordProps) => {
	const history = useHistory();
	const [changePassword] = useChangePasswordMutation();
	const [formData, setFormData] = useState({
		"Old Password": "",
		"New Password": "",
		"Confirm New Password": ""
	});
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage("");
		setLoading(true);
		if (formData["New Password"] === formData["Confirm New Password"]) {
			try {
				const res = await changePassword({
					variables: {
						newPassword: formData["New Password"],
						oldPassword: formData["Old Password"]
					},
					update: cache => {
						cache.writeQuery<MeQuery>({
							query: MeDocument,
							data: {
								__typename: "Query",
								me: null
							}
						});
						history.push("/");
					}
				});
				if (res.data?.changePassword.error?.message) {
					setErrorMessage(res.data?.changePassword.error?.message);
				}
			} catch (error) {
				setErrorMessage("503 Service Unavailable");
				setLoading(false);
			}
		} else {
			setErrorMessage("Your password and confirmation password do not match.");
			setLoading(false);
		}
	};
	return (
		<SettingsContainer>
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
							!!formData["Old Password"] &&
							!!formData["New Password"] &&
							!!formData["Confirm New Password"]
						}
						loading={loading}
						width="150px">
						Change Password
					</SubmitButton>
				</SubmitButtonSection>
			</form>
			{errorMessage && <ErroMessage>{errorMessage}</ErroMessage>}
		</SettingsContainer>
	);
};

ChangePassword.propTypes = {};

export default ChangePassword;
