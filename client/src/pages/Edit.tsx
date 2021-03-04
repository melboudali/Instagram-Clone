import { useState } from "react";
import Container from "../containers/Container";
import styled from "styled-components";
import EditFormInput from "../components/Edit/EditFormInput";
import Button from "../components/signin_signup/Button";
import PropTypes from "prop-types";
import { useMeQuery } from "../generated/graphql";

const EditContainer = styled.main`
	background-color: #fff;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
	margin: 30px 0 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	@media (min-width: 800px) {
		flex-direction: row;
	}
`;

const EditSideBar = styled.aside`
	padding: 20px 0;
	width: 100%;
	max-width: 200px;
`;

const EditMain = styled.main`
	padding: 20px;
	max-width: 800px;
	width: 100%;
`;

const ChangePhotoSection = styled.section`
	width: 100%;
	padding: 10px 0;
	display: flex;
	align-items: center;
	justify-content: left;
	margin-bottom: 20px;
	@media (min-width: 800px) {
		justify-content: center;
	}
`;

const CurrentUserPhoto = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	object-fit: cover;
	object-position: center;
`;

const UserNameAndChangeBtn = styled.div`
	margin-left: 10px;
`;

const UserNameTitle = styled.h1`
	font-size: 1.1rem;
	font-weight: 500;
	color: #262626;
`;

const ChangeProfilePhoto = styled.button`
	background: none;
	border: none;
	outline: none;
	color: #0095f6;
	font-size: 0.9rem;
	font-weight: 500;
	margin-top: 5px;
`;

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

const ButtonElement = styled.button<{ active: boolean }>`
	opacity: ${({ active }) => (active ? "1" : "0.3")};
	border: none;
	background-color: var(--buttonLightBlue);
	border-radius: 4px;
	color: #fff;
	font-weight: 600;
	font-size: 14px;
	padding: 8px 15px;
	width: 90px;
`;

const DisableAccount = styled.button`
	margin: 20px 0 0 0;
	padding: 0;
	border: none;
	outline: none;
	color: #0095f6;
	font-size: 0.9rem;
	font-weight: 600;
	@media (min-width: 800px) {
		margin: 0;
	}
`;

interface EditProps {}

const Edit = ({}: EditProps) => {
	const { data } = useMeQuery();

	const [formData, setFormData] = useState({
		Name: data?.me?.fullname,
		Username: data?.me?.username,
		Website: data?.me?.website,
		Bio: data?.me?.bio,
		Email: data?.me?.email,
		Gender: data?.me?.gender,
		"Phone Number": data?.me?.phone_number,
		"Similar Account Suggestions": data?.me?.recomended
	});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		console.log("Hello World");
	};

	const activeButton = !!(formData.Name && formData.Username && formData.Email);

	return (
		<Container>
			<EditContainer>
				{/* <EditSideBar>
					<h1>Hello World</h1>
				</EditSideBar> */}
				<EditMain>
					<ChangePhotoSection>
						<CurrentUserPhoto src={data?.me?.image_link} alt={data?.me?.username} />
						<UserNameAndChangeBtn>
							<UserNameTitle>{data?.me?.username}</UserNameTitle>
							<ChangeProfilePhoto>Change Profile Photo</ChangeProfilePhoto>
						</UserNameAndChangeBtn>
					</ChangePhotoSection>
					<form onSubmit={onSubmit}>
						<EditFormInput
							label="Name"
							description="Help people discover your account by using the name you're known by: either your full name,
								nickname, or business name."
							subDescription="You can only change your name twice within 14 days."
							formData={formData}
							setFormData={setFormData}
							value={formData.Name}
						/>
						<EditFormInput
							label="Username"
							description="In most cases, you'll be able to change your username back to top.dankest.memes for another
								14 days."
							formData={formData}
							setFormData={setFormData}
							value={formData.Username}
						/>
						<EditFormInput
							label="Website"
							formData={formData}
							setFormData={setFormData}
							value={formData.Website}
						/>
						<EditFormInput
							label="Bio"
							descriptionTitle="Personal Information"
							description="Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile."
							textArea
							formData={formData}
							setFormData={setFormData}
							value={formData.Bio}
						/>
						<EditFormInput
							label="Email"
							type="email"
							formData={formData}
							setFormData={setFormData}
							value={formData.Email}
						/>
						<EditFormInput
							label="Phone Number"
							type="tel"
							formData={formData}
							setFormData={setFormData}
							value={formData["Phone Number"]}
						/>
						<EditFormInput
							label="Gender"
							formData={formData}
							setFormData={setFormData}
							value={formData.Gender}
						/>
						<EditFormInput
							type="checkbox"
							label="Similar Account Suggestions"
							description="Include your account when recommending similar accounts people might want to follow."
							formData={formData}
							setFormData={setFormData}
							defaultChecked={formData["Similar Account Suggestions"]}
						/>
						<SubmitButtonSection>
							<ButtonElement active={activeButton} type="submit" disabled={!activeButton}>
								Submit
							</ButtonElement>
							<DisableAccount>Temporarily disable my account</DisableAccount>
						</SubmitButtonSection>
					</form>
				</EditMain>
			</EditContainer>
		</Container>
	);
};

Edit.propTypes = {};

export default Edit;
