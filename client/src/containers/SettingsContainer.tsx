import { Prompt } from "react-router";
import styled from "styled-components";
import EditSidebar from "../components/Edit/EditSidebar";
import { useMeQuery } from "../generated/graphql";
import Container from "./Container";
import PropTypes from "prop-types";

const SettingsContainerSection = styled.section`
	background-color: var(--whiteColor);
	border: 1px solid var(--borderColor);
	border-radius: 3px;
	margin: 30px 0 0;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;
	@media (min-width: 800px) {
		flex-direction: row;
	}
`;

const SettingsContainerMain = styled.main`
	padding: 20px;
	max-width: 800px;
	width: 100%;
`;

const UpdatedMessage = styled.div<{ updatedMessage: string }>`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 60px;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	align-items: center;
	padding: 0 30px;
	transform: ${({ updatedMessage }) => (updatedMessage ? "translateY(0)" : "translateY(60px)")};
	transition: all 0.3s ease-in-out;
	h1 {
		color: #eee;
		font-size: 0.9rem;
		font-weight: 500;
	}
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
	color: var(--textColorDarkGray);
`;

const ChangeProfilePhoto = styled.button`
	color: var(--buttonLightBlue);
	font-size: 0.9rem;
	font-weight: 500;
	margin-top: 5px;
`;

interface SettingsContainerProps {
	updatedMessage?: string;
	children: React.ReactNode;
	Scrollbar?: Function;
	setOpenModal?: Function;
	image_url?: string;
}

const SettingsContainer = ({ updatedMessage, children, Scrollbar, setOpenModal, image_url }: SettingsContainerProps) => {
	const { data } = useMeQuery();

	return (
		<Container>
			<Prompt message="You have unsaved changes, are you sure you want to leave?" />
			<SettingsContainerSection>
				<EditSidebar />
				<SettingsContainerMain>
					<ChangePhotoSection>
						<CurrentUserPhoto src={image_url ?? data?.me?.image_link} alt={data?.me?.username} />
						<UserNameAndChangeBtn>
							<UserNameTitle>{data?.me?.username}</UserNameTitle>
							{Scrollbar && setOpenModal && (
								<ChangeProfilePhoto
									type="button"
									onClick={() => {
										Scrollbar("hide");
										setOpenModal(true);
									}}>
									Change Profile Photo
								</ChangeProfilePhoto>
							)}
						</UserNameAndChangeBtn>
					</ChangePhotoSection>
					{children}
				</SettingsContainerMain>
			</SettingsContainerSection>
			<UpdatedMessage updatedMessage={updatedMessage!}>
				<h1>{updatedMessage}</h1>
			</UpdatedMessage>
		</Container>
	);
};

SettingsContainer.propTypes = {
	updated: PropTypes.bool,
	children: PropTypes.node.isRequired,
	Scrollbar: PropTypes.func,
	setOpenModal: PropTypes.func,
	image_url: PropTypes.string
};

export default SettingsContainer;
