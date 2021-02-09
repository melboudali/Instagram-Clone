import { useState, Fragment } from "react";
import Carousel from "../components/Signin_Signup/Carousel";
import FormINput from "../components/Signin_Signup/FormInput";
import Button from "../components/Signin_Signup/Button";
import Divider from "../components/Signin_Signup/Divider";
import GooglePlay from "../assets/images/e9cd846dc748.png";
import PlayStore from "../assets/images/180ae7a0bcf7.png";
import Footer from "../components/Common/Footer/Footer";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BackgroundImage from "../assets/images/43cc71bb1b43.png";
import Assets from "../assets/images/32f0a4f27407.png";
import { lessThan768px } from "../config/MediaQueries";

const Container = styled.section`
	display: flex;
	margin: 32px auto 0;
	flex-direction: row;
	flex-wrap: nowrap;
	flex-grow: 1;
	justify-content: center;
	max-width: 935px;
	padding-bottom: 32px;
`;

const LeftComponent = styled.div`
	position: relative;
	background: url("${BackgroundImage}");
	background-repeat: no-repeat;
	background-position: 0 0;
	background-size: 454px 618px;
	margin-left: -35px;
	margin-right: -15px;
	flex-basis: 454px;
	height: 618px;
	overflow: hidden;
	${lessThan768px} {
		flex-basis: 0px;
		margin: 0;
	}
`;

const RightComponent = styled.div`
	align-self: center;
	color: var(--textColorDarkGray);
	flex-grow: 1;
	margin-top: 12px;
	max-width: 350px;
	flex-basis: 454px;
`;

const LoginContainer = styled.div`
	background-color: #fff;
	border: 1px solid var(--borderColor);
	border-radius: 1px;
	margin: 0 0 10px;
	padding: 10px 0;
`;

const Logo = styled.h1`
	margin: 22px auto 12px;
	background: url(${Assets});
	background-repeat: no-repeat;
	background-position: 0 -130px;
	height: 51px;
	width: 175px;
`;

const FormContainer = styled.div`
	margin-bottom: 10px;
	max-width: 350px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const InputsContainer = styled.div`
	margin-top: 24px;
	flex: 0 0 auto;
	justify-content: flex-start;
`;

const FBButtonContainer = styled.div`
	display: flex;
	margin: 8px 40px;
	justify-content: center;
`;

const FBButton = styled.button`
	display: flex;
	cursor: pointer;
	font-weight: 600;
	border: none;
	outline: none;
	background: none;
`;

const FBLogo = styled.span`
	align-self: center;
	margin-right: 8px;
	background: url(${Assets});
	background-repeat: no-repeat;
	background-position: -414px -259px;
	height: 16px;
	width: 16px;
`;

const ButtonText = styled.span`
	color: var(--linkColor);
`;

const ErrorContainer = styled.div`
	margin: 10px 40px;
	p {
		color: var(--textErrorColor);
		font-size: 14px;
		line-height: 18px;
		text-align: center;
		margin: 0;
	}
`;

const ForgotPwdContainer = styled.div`
	text-align: center;
	margin: 12px 40px 0;
`;

const ForgotPwd = styled(Link)`
	color: var(--linkColorTwo);
	font-size: 12px;
	line-height: 14px;
`;

const Signup = styled.div`
	margin: -3px 0 -4px;
	p {
		color: var(--textColorDarkGray);
		font-size: 14px;
		margin: 15px;
		text-align: center;
	}
`;

const SignupLink = styled(Link)`
	span {
		font-weight: 600;
		color: var(--buttonLightBlue);
		margin-left: 5px;
	}
`;

const GetTheAppContainer = styled.div`
	position: relative;
	overflow: auto;
	text-align: center;
	p {
		color: var(--textColorDarkGray);
		font-size: 14px;
		line-height: 18px;
		margin: 10px 20px;
	}
`;

const AppsButtons = styled.div`
	display: inline-flex;
	margin: 10px 0;
	a {
		&:nth-child(1) {
			margin-right: 8px;
		}
		img {
			height: 40px;
		}
	}
`;

const Signin = () => {
	const [login] = useLoginMutation();

	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [loginLoading, setLoginLoading] = useState(false);
	const [loginError, setLoginError] = useState<string | null>(null);
	const [ConnectionError, setConnectionError] = useState(false);

	const loginFunction = async () => {
		setLoginLoading(true);
		setLoginError(null);
		try {
			const res = await login({
				variables: {
					userNameOrEmail: userName,
					password
				},
				update: (cache, { data }) => {
					cache.writeQuery<MeQuery>({
						query: MeDocument,
						data: {
							__typename: "Query",
							me: data?.login.user
						}
					});
				}
			});
			if (res.data?.login.error) {
				setLoginError(res.data?.login.error.message);
				setLoginLoading(false);
			}
			if (res.data?.login.user) {
				setLoginLoading(false);
			}
		} catch (error) {
			setConnectionError(true);
		}
	};

	if (ConnectionError)
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
					height: "100vh"
				}}>
				<h1 style={{ alignSelf: "center", color: "#747474" }}>503 Service Unavailable</h1>
			</div>
		);

	return (
		<Fragment>
			<Container>
				<LeftComponent>
					<Carousel />
				</LeftComponent>
				<RightComponent>
					<LoginContainer>
						<Logo />
						<FormContainer>
							<Form>
								<InputsContainer>
									<FormINput
										LabelText="Phone number, username, or email"
										Required={true}
										Maxlength={75}
										Name="username"
										Type="text"
										inputValue={userName}
										setInputValue={setUserName}
									/>
									<FormINput
										LabelText="Password"
										Required={true}
										Name="password"
										Type="password"
										inputValue={password}
										setInputValue={setPassword}
									/>
								</InputsContainer>
								<Button
									active={userName.length > 0 && password.length > 0}
									loading={loginLoading}
									onClickFunction={loginFunction}
									type="submit">
									Log In
								</Button>
								<Divider />
								<FBButtonContainer>
									<FBButton type="button" onClick={e => e.preventDefault()}>
										<FBLogo />
										<ButtonText>Log in with Facebook</ButtonText>
									</FBButton>
								</FBButtonContainer>
								{loginError && (
									<ErrorContainer>
										<p>{loginError}</p>
									</ErrorContainer>
								)}
							</Form>
							<ForgotPwdContainer>
								<ForgotPwd to="/">Forgot password?</ForgotPwd>
							</ForgotPwdContainer>
						</FormContainer>
					</LoginContainer>
					<LoginContainer>
						<Signup>
							<p>
								Don't have an account?
								<SignupLink to="/accounts/emailsignup">
									<span>Sign up</span>
								</SignupLink>
							</p>
						</Signup>
					</LoginContainer>
					<GetTheAppContainer>
						<p>Get the app.</p>
						<AppsButtons>
							<a
								target="_blank"
								rel="noreferrer"
								href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo">
								<img src={PlayStore} alt='Available on the App Store"' />
							</a>
							<a
								target="_blank"
								rel="noreferrer"
								href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D12078F57-18AD-43B5-B18B-9B5D69598FA1%26utm_content%3Dlo%26utm_medium%3Dbadge">
								<img src={GooglePlay} alt="Available on Google Play" />
							</a>
						</AppsButtons>
					</GetTheAppContainer>
				</RightComponent>
			</Container>
			<Footer />
		</Fragment>
	);
};

export default Signin;
