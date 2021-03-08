import { useRef, useState, useEffect } from "react";
import { useUploadImageMutation } from "../../generated/graphql";
import Button from "../signin_signup/Button";
import styled, { keyframes } from "styled-components";
import { useMeQuery } from "../../generated/graphql";
import useClickOutside from "../../hooks/useClickOutside";
import PropTypes from "prop-types";

const ModalContainer = styled.div`
	background-color: rgba(0, 0, 0, 0.87);
	position: fixed;
	height: 100vh;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 2;
	backdrop-filter: blur(1.5px);
`;

const ModalSlide = keyframes`
			0% {
				transform: translate(-50%, -90%);
			}
			100% {
				transform: translate(-50%, -50%);
			}
`;

const ModalMain = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	width: 700px;
	min-height: 60px;
	background-color: var(--backgroudColor);
	animation: ${ModalSlide} 0.3s ease-in-out;
`;

const ModalClose = styled.button`
	cursor: pointer;
	padding: 0;
	background: 0 0;
	border: 0;
	outline: 0;
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 2;
	svg {
		stroke: var(--textColorGray);
	}
`;

const ModalImageContainer = styled.img`
	display: block;
	width: 300px;
	min-height: 300px;
	object-fit: cover;
	border-bottom-left-radius: 8px;
	border-top-left-radius: 8px;
`;

const ModalImageCaptionContainer = styled.div`
	flex: 1 1 100%;
	position: relative;
`;

const ModalTitle = styled.h1`
	font-weight: 600;
	font-size: 14px;
	color: var(--textColorDarkGray);
	text-align: center;
	padding: 10px 0 0 0;
	margin: 0;
`;

const ModalCaptionContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 0 20px;
`;

const ModalCaption = styled.div`
	display: flex;
`;

const ModalUserImage = styled.img`
	height: 35px;
	width: 35px;
	border-radius: 50%;
	object-fit: cover;
`;

const ModalCaptionArea = styled.textarea`
	height: 120px;
	background: none;
	border: 0;
	color: #262626;
	flex: 1 1 100%;
	outline: 0;
	padding: 0;
	resize: none;
	margin: 0 0 10px 10px;
`;

const ModalErrorMessage = styled.p`
	color: var(--textErrorColor);
	font-size: 14px;
	text-align: center;
	margin: 0;
`;

interface ModalProps {
	imageUri: string | null;
	imageFile: File | null;
	setOpenModal: (arg: boolean) => void;
	setUploadSuccessfulMessage: (arg: string | null) => void;
	Scrollbar: (arg: "show" | "hide") => void;
}

const Modal = ({
	imageFile,
	imageUri,
	setOpenModal,
	setUploadSuccessfulMessage,
	Scrollbar
}: ModalProps) => {
	const { data, error } = useMeQuery();
	const [uploadImageFunc] = useUploadImageMutation();

	const ref = useRef<HTMLDivElement>(null);
	const { clickOutside } = useClickOutside(ref);

	const [caption, setCaption] = useState("");
	const [uploadLoading, setUploadLoading] = useState(false);
	const [connectionError, setConnectionError] = useState(false);

	useEffect(() => {
		if (clickOutside) {
			Scrollbar("show");
			setOpenModal(false);
		}
	}, [clickOutside, setOpenModal, Scrollbar]);

	const closeModal = () => {
		setUploadLoading(false);
		setOpenModal(false);
		Scrollbar("show");
	};

	const UploadFile = async () => {
		if (connectionError) setConnectionError(false);
		setUploadLoading(true);
		if (imageFile) {
			try {
				const res = await uploadImageFunc({
					variables: { file: imageFile, caption: caption },
					update: cache => {
						cache.evict({ fieldName: "getAllImages" });
					}
				});
				if (res.data?.uploadImage) {
					setUploadSuccessfulMessage(`Image has been successfully uploaded!`);
					closeModal();
				} else {
					setConnectionError(true);
					setUploadSuccessfulMessage(null);
					closeModal();
				}
			} catch (error) {
				setConnectionError(true);
				setUploadLoading(false);
			}
		}
	};

	if (error) setConnectionError(true);

	return (
		<ModalContainer>
			<ModalMain ref={ref}>
				<ModalClose
					type="button"
					onClick={() => {
						setOpenModal(false);
						Scrollbar("show");
					}}>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</ModalClose>
				<ModalImageContainer src={imageUri!} alt="Uploaded Image" />
				<ModalImageCaptionContainer>
					<ModalTitle>New Post</ModalTitle>
					<ModalCaptionContainer>
						<ModalCaption>
							<ModalUserImage src={data?.me?.image_link} alt="profile" />
							<ModalCaptionArea
								placeholder="Write a caption..."
								autoComplete="off"
								autoCorrect="off"
								autoFocus
								value={caption}
								maxLength={200}
								onChange={e => setCaption(e.target.value)}
							/>
						</ModalCaption>
						<Button active={!!caption} loading={uploadLoading} type="button" onClickFunction={UploadFile}>
							Post
						</Button>
						{connectionError && <ModalErrorMessage>503 Service Unavailable</ModalErrorMessage>}
					</ModalCaptionContainer>
				</ModalImageCaptionContainer>
			</ModalMain>
		</ModalContainer>
	);
};

Modal.propTypes = {
	imageUri: PropTypes.string,
	imageFile: PropTypes.object,
	setOpenModal: PropTypes.func,
	setUploadSuccessfulMessage: PropTypes.func,
	Scrollbar: PropTypes.func
};

export default Modal;
