import PropTypes from "prop-types";
import { useState } from "react";
import EditFormInput from "../components/Edit/EditFormInput";
import SettingsContainer from "../containers/SettingsContainer";

interface PrivacyAndSecurityProps {}

const PrivacyAndSecurity = ({}: PrivacyAndSecurityProps) => {
	const [formData, setFormData] = useState({
		"Private Account": true
	});
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Submit ...");
	};

	return (
		<SettingsContainer>
			<form onSubmit={onSubmit}>
				<EditFormInput
					type="checkbox"
					label="Private Account"
					description="When your account is private, only people you approve can see your photos and videos on Instagram. Your existing followers won't be affected."
					formData={formData}
					setFormData={setFormData}
					defaultChecked={formData["Private Account"]}
				/>
			</form>
		</SettingsContainer>
	);
};

PrivacyAndSecurity.propTypes = {};

export default PrivacyAndSecurity;
