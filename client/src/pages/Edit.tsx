import Container from "../containers/Container";
import styled from "styled-components";
import PropTypes from "prop-types";
import EditFormInput from "../components/Edit/EditFormInput";

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
	height: auto;
	border-radius: 50%;
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

const CheckboxTitle = styled.label`
	font-size: 1rem;
	font-weight: 600;
	color: #262626;
`;

const CheckboxContainer = styled.section`
	display: flex;
`;

interface EditProps {}

const Edit = ({}: EditProps) => {
	return (
		<Container>
			<EditContainer>
				{/* <EditSideBar>
					<h1>Hello World</h1>
				</EditSideBar> */}
				<EditMain>
					<ChangePhotoSection>
						<CurrentUserPhoto
							src="https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/90697931_210878426992352_3312660146001281024_n.jpg?tp=1&_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=7k-iLPsSxZ0AX8Ye1iE&oh=8ef418eca1569d9d3ebd82851008363e&oe=6067073F"
							alt="top.dankest.memes"
						/>
						<UserNameAndChangeBtn>
							<UserNameTitle>top.dankest.memes</UserNameTitle>
							<ChangeProfilePhoto>Change Profile Photo</ChangeProfilePhoto>
						</UserNameAndChangeBtn>
					</ChangePhotoSection>
					<EditFormInput
						label="Name"
						description="Help people discover your account by using the name you're known by: either your full name,
								nickname, or business name."
						subDescription="You can only change your name twice within 14 days."
					/>
					<EditFormInput
						label="Username"
						description="In most cases, you'll be able to change your username back to top.dankest.memes for another
								14 days."
					/>
					<EditFormInput label="Website" />
					<EditFormInput
						label="Bio"
						descriptionTitle="Personal Information"
						description="Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile."
						textArea
					/>
					<EditFormInput label="Email" type="email" />
					<EditFormInput label="Phone Number" type="tel" />
					<EditFormInput label="Gender" />
					<EditFormInput
						type="checkbox"
						label="Similar Account Suggestions"
						description="Include your account when recommending similar accounts people might want to follow."
					/>
				</EditMain>
			</EditContainer>
		</Container>
	);
};

Edit.propTypes = {};

export default Edit;
