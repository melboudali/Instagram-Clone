import { useRef, useState } from "react";
import Container from "../containers/Container";
import styled, { keyframes } from "styled-components";
import EditFormInput from "../components/Edit/EditFormInput";
import {
	GetAllImagesDocument,
	GetAllImagesQuery,
	GetUserDocument,
	GetUserQuery,
	MeDocument,
	MeQuery,
	useEditUserMutation,
	useMeQuery
} from "../generated/graphql";
import PhotoModalMain from "../components/Edit/PhotoModal";
import PropTypes from "prop-types";
import EditSidebar from "../components/Edit/EditSidebar";

const EditContainer = styled.main`
	background-color: #fff;
	border: 1px solid #dbdbdb;
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

const UpdatedMessage = styled.div<{ updated: boolean }>`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 60px;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	align-items: center;
	padding: 0 30px;
	transform: ${({ updated }) => (updated ? "translateY(0)" : "translateY(60px)")};
	transition: all 0.3s ease-in-out;
	h1 {
		color: #eee;
		font-size: 0.9rem;
		font-weight: 500;
	}
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
	cursor: pointer;
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
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
`;

const IGCoreSpinnerSpin8 = keyframes`
	0% {
		transform: rotate(180deg);
	}
	to {
		transform: rotate(540deg);
	}
`;

const LoadingContainer = styled.div`
	height: 18px;
	width: 18px;
	svg {
		animation: ${IGCoreSpinnerSpin8} 0.8s steps(8) infinite;
	}
`;

const DisableAccount = styled.button`
	margin: 20px 0 0 0;
	padding: 0;
	border: none;
	outline: none;
	color: #0095f6;
	font-size: 0.9rem;
	font-weight: 600;
	cursor: pointer;
	@media (min-width: 800px) {
		margin: 0;
	}
`;

interface EditProps {}

const Edit = ({}: EditProps) => {
	const { data } = useMeQuery();
	const [editUser] = useEditUserMutation();

	const [formData, setFormData] = useState({
		Name: data?.me?.fullname,
		Username: data?.me?.username,
		image_link: data?.me?.image_link,
		Website: data?.me?.website,
		Bio: data?.me?.bio,
		Email: data?.me?.email,
		Gender: data?.me?.gender,
		"Phone Number": data?.me?.phone_number,
		"Similar Account Suggestions": data?.me?.recomended!
	});
	const [loading, setLoading] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadErrorMessage, setUploadErroMessage] = useState<string | null>(null);

	const Scrollbar = (arg: "show" | "hide") => {
		arg === "show"
			? (document.documentElement.style.overflowY = "visible")
			: (document.documentElement.style.overflowY = "hidden");
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await editUser({
				variables: {
					file: imageFile,
					name: formData.Name!,
					username: formData.Username!,
					image_link: formData.image_link!,
					email: formData.Email!,
					website: formData.Website,
					bio: formData.Bio,
					phoneNumber: Number(formData["Phone Number"]),
					gender: formData.Gender,
					similarAccountSuggestions: formData["Similar Account Suggestions"]
				},
				update: (cache, { data }) => {
					cache.writeQuery<MeQuery>({
						query: MeDocument,
						data: {
							__typename: "Query",
							me: data?.editUser.user!
						}
					});

					const existedImages = cache.readQuery<GetAllImagesQuery>({
						query: GetAllImagesDocument,
						variables: { limit: 3, cursor: null }
					});
					if (existedImages) {
						const newImages = existedImages.getAllImages.images.map(image => {
							if (image.user.username === formData.Username) {
								return {
									...image,
									user: {
										...image.user,
										username: data?.editUser.user?.username!,
										image_link: data?.editUser.user?.image_link!
									}
								};
							}
							return image;
						});
						cache.writeQuery<GetAllImagesQuery>({
							query: GetAllImagesDocument,
							data: {
								__typename: existedImages.__typename,
								getAllImages: {
									__typename: existedImages.getAllImages.__typename,
									hasMore: existedImages.getAllImages.hasMore,
									images: newImages
								}
							}
						});
					}

					const existedUser = cache.readQuery<GetUserQuery>({
						query: GetUserDocument,
						variables: { username: formData.Username }
					});
					if (existedUser) {
						cache.writeQuery<GetUserQuery>({
							query: GetUserDocument,
							data: {
								__typename: existedUser.__typename,
								getUser: {
									__typename: existedUser.getUser.__typename,
									user: {
										__typename: existedUser.getUser.user?.__typename,
										id: existedUser.getUser.user?.id!,
										username: formData.Username!,
										fullname: formData.Name!,
										website: formData.Website,
										bio: formData.Bio,
										image_link: data?.editUser.user?.image_link || existedUser.getUser.user?.image_link!,
										images_length: existedUser.getUser.user?.images_length,
										private: existedUser.getUser.user?.private!,
										recomended: formData["Similar Account Suggestions"]
									},
									error: {
										__typename: existedUser.getUser.error?.__typename,
										message: existedUser.getUser.error?.message!
									}
								}
							}
						});
					}
					return;
				}
			});
			if (res.data?.editUser.error) {
				console.log("Mutation Error");
			}
			if (res.data?.editUser.user) {
				setUpdated(true);
				setTimeout(() => setUpdated(false), 3000);
			}
		} catch (error) {
			console.log("503 Service Unavailable");
		}
		setLoading(false);
	};

	const activeButton = !!(formData.Name && formData.Username && formData.Email);

	return (
		<Container>
			<EditContainer>
				{openModal && (
					<PhotoModalMain
						Scrollbar={Scrollbar}
						setOpenModal={setOpenModal}
						setFormData={setFormData}
						formData={formData}
						setImageFile={setImageFile}
						setUploadErroMessage={setUploadErroMessage}
					/>
				)}
				<EditSidebar />
				<EditMain>
					<ChangePhotoSection>
						<CurrentUserPhoto src={formData.image_link} alt={data?.me?.username} />
						<UserNameAndChangeBtn>
							<UserNameTitle>{data?.me?.username}</UserNameTitle>
							<ChangeProfilePhoto
								type="button"
								onClick={() => {
									Scrollbar("hide");
									setOpenModal(true);
								}}>
								Change Profile Photo
							</ChangeProfilePhoto>
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
							type="url"
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
							type="number"
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
								{loading ? (
									<LoadingContainer>
										<svg aria-label="Loading..." viewBox="0 0 100 100">
											<rect
												fill="#fafafa"
												height="10"
												opacity="0"
												rx="5"
												ry="5"
												transform="rotate(-90 50 50)"
												width="28"
												x="67"
												y="45"></rect>
											<rect
												fill="#fafafa"
												height="10"
												opacity="0.125"
												rx="5"
												ry="5"
												transform="rotate(-45 50 50)"
												width="28"
												x="67"
												y="45"></rect>
											<rect
												fill="#fafafa"
												height="10"
												opacity="0.25"
												rx="5"
												ry="5"
												transform="rotate(0 50 50)"
												width="28"
												x="67"
												y="45"></rect>
											<rect
												fill="#fafafa"
												height="10"
												opacity="0.375"
												rx="5"
												ry="5"
												transform="rotate(45 50 50)"
												width="28"
												x="67"
												y="45"></rect>
											<rect
												fill="#fafafa"
												height="10"
												opacity="0.5"
												rx="5"
												ry="5"
												transform="rotate(90 50 50)"
												width="28"
												x="67"
												y="45"></rect>
											<rect
												fill="#fafafa"
												height="10"
												opacity="0.625"
												rx="5"
												ry="5"
												transform="rotate(135 50 50)"
												width="28"
												x="67"
												y="45"></rect>
											<rect
												fill="#fafafa"
												height="10"
												opacity="0.75"
												rx="5"
												ry="5"
												transform="rotate(180 50 50)"
												width="28"
												x="67"
												y="45"></rect>
											<rect
												fill="#fafafa"
												height="10"
												opacity="0.875"
												rx="5"
												ry="5"
												transform="rotate(225 50 50)"
												width="28"
												x="67"
												y="45"></rect>
										</svg>
									</LoadingContainer>
								) : (
									"Submit"
								)}
							</ButtonElement>
							<DisableAccount>Temporarily disable my account</DisableAccount>
						</SubmitButtonSection>
					</form>
				</EditMain>
			</EditContainer>
			<UpdatedMessage updated={updated}>
				<h1>Profile saved.</h1>
			</UpdatedMessage>
		</Container>
	);
};

Edit.propTypes = {};

export default Edit;
