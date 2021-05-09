import styled, { css, keyframes } from "styled-components";
import { useEffect, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import PropTypes from "prop-types";

const PhotoModalContainer = styled.main`
	background-color: rgba(0, 0, 0, 0.87);
	position: fixed;
	height: 100vh;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(1.5px);
`;

const ModalSlide = keyframes`
			0% {
				transform: scale(2)
			}
			100% {
				transform: scale(1);
			}
`;

const PhotoModalMain = styled.div`
	border-radius: 10px;
	width: 400px;
	height: auto;
	background-color: var(--backgroudColor);
	animation: ${ModalSlide} 0.2s ease-in-out;
`;

const SharedStyle = css`
	font-weight: 500;
	border-bottom: 1px solid var(--borderColor);
	width: 100%;
	text-align: center;
	padding: 20px 0;
`;

const PhotoModalTitle = styled.h1`
	color: var(--textColorDarkGray);
	font-size: 1.1rem;
	${SharedStyle}
`;

const ChangePhotoButton = styled.div`
	position: relative;
	font-size: 0.9rem;
	cursor: pointer;
	font-weight: 500;
	border-bottom: 1px solid var(--borderColor);
	width: 100%;
	text-align: center;
	padding: 20px 0;
	color: var(--buttonLightBlue);
`;

const FileInput = styled.input`
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	cursor: pointer;
`;

const RemovePhotoButton = styled.button`
	${SharedStyle}
	color: var(--textErrorColor);
	font-size: 0.9rem;
`;

const CancelButton = styled.button`
	color: var(--textColorDarkGray);
	width: 100%;
	text-align: center;
	padding: 20px 0;
	font-size: 0.9rem;
`;

interface PhotoModalProps {
	setOpenModal: (arg: boolean) => void;
	Scrollbar: (arg: "show" | "hide") => void;
	setFormData: Function;
	formData: object;
	setImageFile: Function;
	setUploadErroMessage: Function;
}

const PhotoModal = ({ setOpenModal, Scrollbar, setFormData, formData, setImageFile, setUploadErroMessage }: PhotoModalProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { clickOutside } = useClickOutside(ref);

	useEffect(() => {
		if (clickOutside) {
			Scrollbar("show");
			setOpenModal(false);
		}
	}, [clickOutside, setOpenModal, Scrollbar]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const Files = e.target.files;

		if (Files?.length === 1) {
			const FileType = Files[0].type;
			if (FileType === "image/jpeg" || FileType === "image/png") {
				if (FileReader) {
					const fr = new FileReader();
					fr.readAsDataURL(Files[0]);
					fr.onload = () => {
						setUploadErroMessage(null);
						setFormData({ ...formData, image_link: fr.result! });
						setImageFile(Files[0]);
						Scrollbar("show");
						setOpenModal(false);
					};
				}
			} else {
				setUploadErroMessage("We only accept 'jpg', 'jpeg', 'png' files !!");
			}
		} else {
			setUploadErroMessage("Too many files !!");
		}
	};

	const RemovePhoto = () => {
		setUploadErroMessage(null);
		setFormData({
			...formData,
			image_link:
				"https://res.cloudinary.com/elboudali/image/upload/v1615221365/Instagram-Clone/44884218_345707102882519_2446069589734326272_n_htmp8n.jpg"
		});
		setImageFile(null);
		Scrollbar("show");
		setOpenModal(false);
	};

	return (
		<PhotoModalContainer>
			<PhotoModalMain ref={ref}>
				<PhotoModalTitle>Change Profile Photo</PhotoModalTitle>
				<ChangePhotoButton>
					Upload Photo
					<FileInput type="file" title="Choose a file or drag it here." accept="image/jpeg,image/png" multiple onChange={onChange} />
				</ChangePhotoButton>
				<RemovePhotoButton type="button" onClick={RemovePhoto}>
					Remove Current Photo
				</RemovePhotoButton>
				<CancelButton
					type="button"
					onClick={() => {
						Scrollbar("show");
						setOpenModal(false);
					}}>
					Cancel
				</CancelButton>
			</PhotoModalMain>
		</PhotoModalContainer>
	);
};

PhotoModal.propTypes = {
	setOpenModal: PropTypes.func.isRequired,
	Scrollbar: PropTypes.func.isRequired,
	setFormData: PropTypes.func.isRequired,
	formData: PropTypes.object.isRequired,
	setImageFile: PropTypes.func.isRequired,
	setUploadErroMessage: PropTypes.func.isRequired
};

export default PhotoModal;
