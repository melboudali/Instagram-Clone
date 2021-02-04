import { useState, Fragment, useEffect } from "react";
import {
	Container,
	LeftComponent,
	RightComponent,
	LoginContainer,
	Logo,
	FormContainer,
	Form,
	InputsContainer,
	FBButtonContainer,
	FBButton,
	FBLogo,
	ButtonText,
	ErrorContainer,
	ForgotPwd,
	ForgotPwdContainer,
	Signup,
	SignupLink,
	GetTheAppContainer,
	AppsButtons
} from "./Signin.style";
import Carousel from "../components/layouts/Carousel";
import FormINput from "../components/layouts/FormInput";
import Button from "../components/layouts/Button";
import Divider from "../components/layouts/Divider";
import GooglePlay from "../assets/images/e9cd846dc748.png";
import PlayStore from "../assets/images/180ae7a0bcf7.png";
import Footer from "../components/layouts/Footer";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

const Signin = () => {
	const [login] = useLoginMutation();

	const [userName, setUserName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loginLoading, setLoginLoading] = useState<boolean>(false);
	const [loginError, setLoginError] = useState<string | null>(null);
	const [ConnectionError, setConnectionError] = useState<boolean>(false);

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
