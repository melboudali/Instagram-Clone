import { useState, Fragment } from "react";
import Carousel from "../components/signin_signup/Carousel";
import FormINput from "../components/signin_signup/FormInput";
import Button from "../components/signin_signup/Button";
import Divider from "../components/signin_signup/Divider";
import GooglePlay from "../assets/images/e9cd846dc748.png";
import PlayStore from "../assets/images/180ae7a0bcf7.png";
import Footer from "../components/common/footer/Footer";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BackgroundImage from "../assets/images/43cc71bb1b43.png";
import Assets from "../assets/images/32f0a4f27407.png";
import onClickFunction from "../utils/onClick";
import { Helmet } from "react-helmet";

const SigninContainer = styled.section`
	display: flex;
	margin: 32px auto 0;
	flex-direction: row;
	flex-wrap: nowrap;
	flex-grow: 1;
	justify-content: center;
	max-width: 935px;
	padding-bottom: 32px;
`;

const SigninLeftComponent = styled.div`
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
	@media (max-width: 800px) {
		flex-basis: 0px;
		margin: 0;
	}
`;

const SigninRightComponent = styled.div`
	align-self: center;
	color: var(--textColorDarkGray);
	flex-grow: 1;
	margin-top: 12px;
	max-width: 350px;
	flex-basis: 454px;
`;

const SigninLoginContainer = styled.div`
	background-color: var(--whiteColor);
	border: 1px solid var(--borderColor);
	border-radius: 1px;
	margin: 0 0 10px;
	padding: 10px 0;
`;

const SigninLogo = styled.h1`
	margin: 22px auto 12px;
	background: url(${Assets});
	background-repeat: no-repeat;
	background-position: 0 -130px;
	height: 51px;
	width: 175px;
`;

const SigninFormContainer = styled.div`
	margin-bottom: 10px;
	max-width: 350px;
`;

const SigninForm = styled.form`
	display: flex;
	flex-direction: column;
`;

const SigninInputsContainer = styled.div`
	margin-top: 24px;
	flex: 0 0 auto;
	justify-content: flex-start;
`;

const SigninFBButtonContainer = styled.div`
	display: flex;
	margin: 8px 40px;
	justify-content: center;
`;

const SigninFBButton = styled.button`
	display: flex;
	font-weight: 600;
`;

const SigninFBLogo = styled.span`
	align-self: center;
	margin-right: 8px;
	background: url(${Assets});
	background-repeat: no-repeat;
	background-position: -414px -259px;
	height: 16px;
	width: 16px;
`;

const SigninButtonText = styled.span`
	color: var(--linkColor);
`;

const SigninErrorContainer = styled.div`
	margin: 10px 40px;
	p {
		color: var(--textErrorColor);
		font-size: 14px;
		line-height: 18px;
		text-align: center;
		margin: 0;
	}
`;

const SigninForgotPwdContainer = styled.div`
	text-align: center;
	margin: 12px 40px 0;
`;

const SigninForgotPwd = styled(Link)`
	color: var(--linkColorTwo);
	font-size: 12px;
	line-height: 14px;
`;

const SignupContainer = styled.div`
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

const SigninGetTheAppContainer = styled.div`
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

const SigninAppsButtons = styled.div`
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

	const loginFunction = async () => {
		if (!userName || !password) {
			setLoginError("Please fill in all fields!");
			return;
		}
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
			setLoginError("503 Service Unavailable");
			setLoginLoading(false);
		}
	};

	return (
		<Fragment>
			<Helmet>
				<title>Signin</title>
				<meta name="title" content="Signin" />
				<meta property="og:title" content="Signin" />
				<meta property="twitter:title" content="Signin" />
			</Helmet>
			<SigninContainer>
				<SigninLeftComponent>
					<Carousel />
				</SigninLeftComponent>
				<SigninRightComponent>
					<SigninLoginContainer>
						<SigninLogo />
						<SigninFormContainer>
							<SigninForm>
								<SigninInputsContainer>
									<FormINput
										labelText="Phone number, username, or email"
										required={true}
										maxlength={75}
										name="username"
										type="text"
										inputValue={userName}
										setInputValue={setUserName}
									/>
									<FormINput
										labelText="Password"
										required={true}
										name="password"
										type="password"
										inputValue={password}
										setInputValue={setPassword}
									/>
								</SigninInputsContainer>
								<Button active={!!userName && !!password} type="submit" loading={loginLoading} onClickFunction={loginFunction}>
									Log In
								</Button>
								<Divider />
								<SigninFBButtonContainer>
									<SigninFBButton type="button" onClick={onClickFunction}>
										<SigninFBLogo />
										<SigninButtonText>Log in with Facebook</SigninButtonText>
									</SigninFBButton>
								</SigninFBButtonContainer>
								{loginError && (
									<SigninErrorContainer>
										<p>{loginError}</p>
									</SigninErrorContainer>
								)}
							</SigninForm>
							<SigninForgotPwdContainer>
								<SigninForgotPwd to="/">Forgot password?</SigninForgotPwd>
							</SigninForgotPwdContainer>
						</SigninFormContainer>
					</SigninLoginContainer>
					<SigninLoginContainer>
						<SignupContainer>
							<p>
								Don't have an account?
								<SignupLink to="/accounts/emailsignup">
									<span>Sign up</span>
								</SignupLink>
							</p>
						</SignupContainer>
					</SigninLoginContainer>
					<SigninGetTheAppContainer>
						<p>Get the app.</p>
						<SigninAppsButtons>
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
						</SigninAppsButtons>
					</SigninGetTheAppContainer>
				</SigninRightComponent>
			</SigninContainer>
			<Footer />
		</Fragment>
	);
};

export default Signin;
