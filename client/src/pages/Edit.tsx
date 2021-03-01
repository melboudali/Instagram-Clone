import Container from "../containers/Container";
import styled from "styled-components";
import PropTypes from "prop-types";

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
	padding: 20px 0;
	max-width: 800px;
	width: 100%;
`;

const ChangePhotoSection = styled.section`
	width: 100%;
	padding: 10px 0;
	display: flex;
	align-items: center;
	justify-content: center;
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
				</EditMain>
			</EditContainer>
		</Container>
	);
};

Edit.propTypes = {};

export default Edit;
