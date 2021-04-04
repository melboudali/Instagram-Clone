import { useState } from "react";
import EditFormInput from "../../components/Edit/EditFormInput";
import SubmitButton from "../../components/Edit/SubmitButton";
import SettingsContainer from "../../containers/SettingsContainer";
import {
	useMeQuery,
	useEditPrivacyMutation,
	MeQuery,
	MeDocument,
	GetUserQuery,
	GetUserDocument
} from "../../generated/graphql";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

interface PrivacyAndSecurityProps {}

const PrivacyAndSecurity = ({}: PrivacyAndSecurityProps) => {
	const { data: meData } = useMeQuery();
	const [editPrivacy] = useEditPrivacyMutation();
	const [updated, setUpdated] = useState(false);

	const [formData, setFormData] = useState({
		"Private Account": meData?.me?.private as boolean,
		"Disable Account": meData?.me?.disabled as boolean
	});

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await editPrivacy({
				variables: {
					privateAccount: formData["Private Account"],
					disableAccount: formData["Disable Account"]
				},
				update: (cache, { data }) => {
					const existedMe = cache.readQuery<MeQuery>({
						query: MeDocument
					});
					if (existedMe?.me) {
						cache.writeQuery<MeQuery>({
							query: MeDocument,
							data: {
								...existedMe,
								me: {
									...existedMe.me,
									private: formData["Private Account"],
									disabled: formData["Disable Account"]
								}
							}
						});
					}

					const existedUser = cache.readQuery<GetUserQuery>({
						query: GetUserDocument,
						variables: { username: meData?.me?.username }
					});
					if (existedUser?.getUser.user) {
						cache.writeQuery<GetUserQuery>({
							query: GetUserDocument,
							data: {
								...existedUser,
								getUser: {
									...existedUser.getUser,
									user: {
										...existedUser.getUser.user,
										private: formData["Private Account"],
										disabled: formData["Disable Account"]
									}
								}
							}
						});
					}
				}
			});
			if (res.data?.editPrivacy.error?.message) {
				throw new Error(res.data.editPrivacy.error.message);
			}
			if (res.data?.editPrivacy.success) {
				setUpdated(true);
				setTimeout(() => setUpdated(false), 3000);
			}
		} catch (error) {
			setErrorMessage(error.message);
		}
		setLoading(false);
	};

	return (
		<SettingsContainer updated={updated}>
			<Helmet>
				<title>Privacy And Security</title>
				<meta name="title" content="Privacy And Security" />
				<meta property="og:title" content="Privacy And Security" />
				<meta property="twitter:title" content="Privacy And Security" />
			</Helmet>
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
				<SubmitButton loading={loading} width={"90px"}>
					Submit
				</SubmitButton>
			</form>
		</SettingsContainer>
	);
};

PrivacyAndSecurity.propTypes = {};

export default PrivacyAndSecurity;
