import { Fragment, useState } from "react";
import Divider from "../components/signin_signup/Divider";
import FormINput from "../components/signin_signup/FormInput";
import Button from "../components/signin_signup/Button";
import GooglePlay from "../assets/images/e9cd846dc748.png";
import PlayStore from "../assets/images/180ae7a0bcf7.png";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import Footer from "../components/common/footer/Footer";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Assets from "../assets/images/32f0a4f27407.png";
import onClickFunction from "../utils/onClick";
import { Helmet } from "react-helmet";

const SignupContainer = styled.section`
	margin: 32px auto 0;
	max-width: 935px;
	padding-bottom: 32px;
`;

const SignupMain = styled.div`
	background-color: var(--whiteColor);
	border: 1px solid var(--borderColor);
	border-radius: 1px;
	margin: 0 0 10px;
	padding: 10px 0;
`;

const SignupLogo = styled.h1`
	margin: 22px auto 12px;
	background: url(${Assets});
	background-repeat: no-repeat;
	background-position: 0 -130px;
	height: 51px;
	width: 175px;
`;

const SignupFormContainer = styled.div`
	margin-bottom: 10px;
	max-width: 350px;
`;

const SignupForm = styled.form`
	display: flex;
	flex-direction: column;
`;

const SignupComponent = styled.div`
	color: var(--textColorDarkGray);
	margin-top: 12px;
	max-width: 350px;
	margin: 0 auto;
`;

const SignupTitle = styled.h2`
	color: var(--textColorGray);
	font-size: 17px;
	font-weight: 600;
	line-height: 20px;
	margin: 0 40px 10px;
	text-align: center;
`;

const SignupFBButtonContainer = styled.div`
	margin: 8px 40px;
`;

const SignupFBButton = styled.button`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	border: 1px solid transparent;
	background-color: var(--buttonLightBlue);
	border-radius: 4px;
	color: var(--whiteColor);
	font-weight: 600;
	padding: 5px 9px;
	text-align: center;
	text-overflow: ellipsis;
	user-select: none;
	width: 100%;
	span {
		align-self: center;
		background: url(${Assets});
		margin-right: 8px;
		background-position: -414px -300px;
		background-repeat: no-repeat;
		height: 16px;
		width: 16px;
	}
`;

const SignupErrorContainer = styled.div`
	margin: 10px 40px;
	p {
		color: var(--textErrorColor);
		font-size: 14px;
		line-height: 18px;
		text-align: center;
		margin: 0;
	}
`;

const SignupTerms = styled.p`
	color: var(--textColorGray);
	font-size: 12px;
	line-height: 16px;
	margin: 10px 40px;
	text-align: center;
`;

const SignupTermsLink = styled(Link)`
	color: var(--textColorGray);
	font-weight: 600;
	margin: 0px 3px;
`;

const LoginContainer = styled.div`
	margin: -3px 0 -4px;
	p {
		color: var(--textColorDarkGray);
		font-size: 14px;
		margin: 15px;
		text-align: center;
	}
`;

const LoginLink = styled(Link)`
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

const Signup = () => {
	const history = useHistory();
	const [login] = useRegisterMutation();

	const [email, setEmail] = useState("");
	const [fullName, setFullname] = useState("");
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [signupError, setSignupError] = useState<string | null>(null);

	const [signupLoading, setSignupLoading] = useState(false);

	const signupFunction = async () => {
		if (!email || !fullName || !userName || !password) {
			setSignupError("Please fill in all fields!");
			return;
		}

		setSignupError(null);
		setSignupLoading(true);
		try {
			const res = await login({
				variables: {
					registerInputs: { email, fullName, userName, password }
				},
				update: (cache, { data }) => {
					cache.writeQuery<MeQuery>({
						query: MeDocument,
						data: {
							__typename: "Query",
							me: data?.register.user
						}
					});
				}
			});
			if (res.data?.register.error) {
				setSignupError(res.data?.register.error.message);
			} else {
				history.push("/");
			}
		} catch (error) {
			setSignupError("503 Service Unavailable");
		}
		setSignupLoading(false);
	};

	return (
		<Fragment>
			<Helmet>
				<title>Signup</title>
				<meta name="title" content="Signup" />
				<meta property="og:title" content="Signup" />
				<meta property="twitter:title" content="Signup" />
			</Helmet>
			<SignupContainer>
				<SignupComponent>
					<SignupMain>
						<SignupLogo />
						<SignupFormContainer>
							<SignupForm>
								<SignupTitle>Sign up to see photos and videos from your friends.</SignupTitle>
								<SignupFBButtonContainer>
									<SignupFBButton type="button" onClick={onClickFunction}>
										<span></span>
										Log in with Facebook
									</SignupFBButton>
								</SignupFBButtonContainer>
								<Divider />
								<FormINput
									labelText="Mobile Number or Email"
									required={true}
									maxlength={75}
									name="email"
									type="text"
									inputValue={email}
									setInputValue={setEmail}
								/>
								<FormINput
									labelText="Full Name"
									required={true}
									maxlength={75}
									name="fullname"
									type="text"
									inputValue={fullName}
									setInputValue={setFullname}
								/>
								<FormINput
									labelText="Username"
									required={true}
									maxlength={75}
									name="username"
									type="text"
									inputValue={userName}
									setInputValue={setUsername}
								/>
								<FormINput labelText="Password" required={true} name="password" type="password" inputValue={password} setInputValue={setPassword} />
								<Button
									active={!!email && !!fullName && !!userName && !!password}
									type="submit"
									loading={signupLoading}
									onClickFunction={signupFunction}>
									Sign up
								</Button>
								{signupError && (
									<SignupErrorContainer>
										<p>{signupError}</p>
									</SignupErrorContainer>
								)}
								<SignupTerms>
									By signing up, you agree to our
									<SignupTermsLink target="_blank" to="https://help.instagram.com/581066165581870">
										Terms
									</SignupTermsLink>
									,
									<SignupTermsLink target="_blank" to="https://help.instagram.com/519522125107875">
										Data Policy
									</SignupTermsLink>
									and
									<SignupTermsLink target="_blank" to="/legal/cookies/">
										Cookies Policy
									</SignupTermsLink>
									.
								</SignupTerms>
							</SignupForm>
						</SignupFormContainer>
					</SignupMain>
					<SignupContainer>
						<LoginContainer>
							<p>
								Have an account?
								<LoginLink to="/">
									<span>Log in</span>
								</LoginLink>
							</p>
						</LoginContainer>
					</SignupContainer>
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
				</SignupComponent>
			</SignupContainer>
			<Footer />
		</Fragment>
	);
};

export default Signup;
