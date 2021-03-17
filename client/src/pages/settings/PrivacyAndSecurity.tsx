import PropTypes from "prop-types";
import { useRef, useState } from "react";
import EditFormInput from "../../components/Edit/EditFormInput";
import SubmitButton from "../../components/Edit/SubmitButton";
import SettingsContainer from "../../containers/SettingsContainer";
import { useMeQuery } from "../../generated/graphql";

interface PrivacyAndSecurityProps {}

const PrivacyAndSecurity = ({}: PrivacyAndSecurityProps) => {
	const { data } = useMeQuery();

	const [formData, setFormData] = useState({
		"Private Account": data?.me?.private as boolean,
		"Disable Account": data?.me?.disabled as boolean
	});
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
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
				<EditFormInput
					type="checkbox"
					label="Disable Account"
					description="When your account is disabled, you can still login but no one can see it."
					formData={formData}
					setFormData={setFormData}
					defaultChecked={formData["Disable Account"]}
				/>
			</form>
			<SubmitButton loading={loading} width={"90px"}>
				Submit
			</SubmitButton>
		</SettingsContainer>
	);
};

PrivacyAndSecurity.propTypes = {};

export default PrivacyAndSecurity;
