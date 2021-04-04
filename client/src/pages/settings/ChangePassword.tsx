import { useState } from "react";
import EditFormInput from "../../components/Edit/EditFormInput";
import SubmitButton from "../../components/Edit/SubmitButton";
import SettingsContainer from "../../containers/SettingsContainer";
import { MeDocument, MeQuery, useChangePasswordMutation } from "../../generated/graphql";
import styled from "styled-components";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

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
			<Helmet>
				<title>Change Password</title>
				<meta name="title" content="Change Password" />
				<meta property="og:title" content="Change Password" />
				<meta property="twitter:title" content="Change Password" />
			</Helmet>
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
				<SubmitButton
					active={
						!!formData["Old Password"] && !!formData["New Password"] && !!formData["Confirm New Password"]
					}
					loading={loading}
					width="150px">
					Change Password
				</SubmitButton>
			</form>
			{errorMessage && <ErroMessage>{errorMessage}</ErroMessage>}
		</SettingsContainer>
	);
};

ChangePassword.propTypes = {};

export default ChangePassword;
