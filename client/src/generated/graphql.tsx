import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
	DateTime: any;
	/** The `Upload` scalar type represents a file upload. */
	Upload: any;
};

export type Query = {
	__typename?: "Query";
	me?: Maybe<User_Response>;
	getUser: Response;
	suggestedUsers: Responses;
	getAllImages: Images;
	getUserImages: Images;
	getImage: Image_Res;
	getImageComments: Get_Comment;
};

export type QueryGetUserArgs = {
	currentUserId?: Maybe<Scalars["Int"]>;
	username: Scalars["String"];
};

export type QueryGetAllImagesArgs = {
	cursor?: Maybe<Scalars["String"]>;
	limit: Scalars["Int"];
};

export type QueryGetUserImagesArgs = {
	cursor?: Maybe<Scalars["String"]>;
	limit: Scalars["Int"];
	currentUserId?: Maybe<Scalars["Int"]>;
	isDisabled: Scalars["Boolean"];
	isPrivate: Scalars["Boolean"];
	userId: Scalars["Int"];
};

export type QueryGetImageArgs = {
	imageId: Scalars["String"];
};

export type QueryGetImageCommentsArgs = {
	imageId: Scalars["String"];
};

export type User_Response = {
	__typename?: "user_response";
	id: Scalars["Float"];
	username: Scalars["String"];
	fullname: Scalars["String"];
	email?: Maybe<Scalars["String"]>;
	phone_number?: Maybe<Scalars["Float"]>;
	gender?: Maybe<Scalars["String"]>;
	image_link: Scalars["String"];
	website?: Maybe<Scalars["String"]>;
	bio?: Maybe<Scalars["String"]>;
	private?: Maybe<Scalars["Boolean"]>;
	disabled?: Maybe<Scalars["Boolean"]>;
	recomended?: Maybe<Scalars["Boolean"]>;
	images_length?: Maybe<Scalars["Float"]>;
};

export type Response = {
	__typename?: "response";
	error?: Maybe<Error>;
	user?: Maybe<User_Response>;
};

export type Error = {
	__typename?: "error";
	message: Scalars["String"];
};

export type Responses = {
	__typename?: "responses";
	users: Array<User_Response>;
};

export type Images = {
	__typename?: "images";
	images: Array<Image_Data>;
	hasMore: Scalars["Boolean"];
};

export type Image_Data = {
	__typename?: "image_data";
	id: Scalars["String"];
	caption: Scalars["String"];
	image_url: Scalars["String"];
	userId: Scalars["Float"];
	created_at: Scalars["String"];
	updated_at: Scalars["String"];
	user: Image_Author;
	like?: Maybe<Array<Like>>;
};

export type Image_Author = {
	__typename?: "image_author";
	id: Scalars["Float"];
	username: Scalars["String"];
	image_link: Scalars["String"];
};

export type Like = {
	__typename?: "Like";
	userId: Scalars["Float"];
	imageId: Scalars["String"];
	user: Like_Author;
};

export type Like_Author = {
	__typename?: "like_author";
	username: Scalars["String"];
};

export type Image_Res = {
	__typename?: "image_res";
	image?: Maybe<Image_Data>;
	error?: Maybe<Image_Error>;
};

export type Image_Error = {
	__typename?: "image_error";
	message: Scalars["String"];
};

export type Get_Comment = {
	__typename?: "get_comment";
	error?: Maybe<Error_Res>;
	comment?: Maybe<Array<Comment_Res>>;
};

export type Error_Res = {
	__typename?: "error_res";
	message: Scalars["String"];
};

export type Comment_Res = {
	__typename?: "comment_res";
	id: Scalars["Float"];
	text: Scalars["String"];
	userId: Scalars["Float"];
	imageId: Scalars["String"];
	created_at: Scalars["DateTime"];
	updated_at: Scalars["String"];
	user: Comment_Author;
};

export type Comment_Author = {
	__typename?: "comment_author";
	id: Scalars["Float"];
	username: Scalars["String"];
};

export type Mutation = {
	__typename?: "Mutation";
	register: Response;
	login: Response;
	editUser: Response;
	changePassword: PasswordVerification;
	editPrivacy: PasswordVerification;
	logout: Scalars["Boolean"];
	uploadImage: Image_Upload_Response;
	insertComment: Insert_Comment;
	likeImage: Like_Image;
};

export type MutationRegisterArgs = {
	registerInputs: Register_Inputs;
};

export type MutationLoginArgs = {
	password: Scalars["String"];
	userNameOrEmail: Scalars["String"];
};

export type MutationEditUserArgs = {
	similarAccountSuggestions: Scalars["Boolean"];
	gender?: Maybe<Scalars["String"]>;
	phoneNumber?: Maybe<Scalars["Int"]>;
	email: Scalars["String"];
	bio?: Maybe<Scalars["String"]>;
	website?: Maybe<Scalars["String"]>;
	image_link: Scalars["String"];
	username: Scalars["String"];
	name: Scalars["String"];
	file?: Maybe<Scalars["Upload"]>;
};

export type MutationChangePasswordArgs = {
	newPassword: Scalars["String"];
	oldPassword: Scalars["String"];
};

export type MutationEditPrivacyArgs = {
	disableAccount: Scalars["Boolean"];
	privateAccount: Scalars["Boolean"];
};

export type MutationUploadImageArgs = {
	caption: Scalars["String"];
	file: Scalars["Upload"];
};

export type MutationInsertCommentArgs = {
	imageId: Scalars["String"];
	comment: Scalars["String"];
};

export type MutationLikeImageArgs = {
	imageId: Scalars["String"];
};

export type Register_Inputs = {
	userName: Scalars["String"];
	email: Scalars["String"];
	password: Scalars["String"];
	fullName: Scalars["String"];
};

export type PasswordVerification = {
	__typename?: "passwordVerification";
	success?: Maybe<SuccessMessage>;
	error?: Maybe<ErrorMessage>;
};

export type SuccessMessage = {
	__typename?: "successMessage";
	message?: Maybe<Scalars["String"]>;
};

export type ErrorMessage = {
	__typename?: "errorMessage";
	message?: Maybe<Scalars["String"]>;
};

export type Image_Upload_Response = {
	__typename?: "image_upload_response";
	image?: Maybe<Image_Data>;
	error?: Maybe<Image_Error>;
};

export type Insert_Comment = {
	__typename?: "insert_comment";
	inserted: Scalars["Boolean"];
	message?: Maybe<Scalars["String"]>;
	comment?: Maybe<Comment_Res>;
};

export type Like_Image = {
	__typename?: "like_image";
	liked: Scalars["Boolean"];
	message?: Maybe<Scalars["String"]>;
};

export type ErrorFragmentFragment = { __typename?: "error" } & Pick<Error, "message">;

export type ImageFragmentFragment = { __typename?: "image_data" } & Pick<Image_Data, "id" | "caption" | "image_url" | "created_at"> & {
		user: { __typename?: "image_author" } & Pick<Image_Author, "id" | "username" | "image_link">;
		like?: Maybe<Array<{ __typename?: "Like" } & { user: { __typename?: "like_author" } & Pick<Like_Author, "username"> }>>;
	};

export type UserFragmentFragment = { __typename?: "user_response" } & Pick<User_Response, "id" | "username" | "fullname" | "image_link">;

export type ChangePasswordMutationVariables = Exact<{
	newPassword: Scalars["String"];
	oldPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = { __typename?: "Mutation" } & {
	changePassword: { __typename?: "passwordVerification" } & {
		success?: Maybe<{ __typename?: "successMessage" } & Pick<SuccessMessage, "message">>;
		error?: Maybe<{ __typename?: "errorMessage" } & Pick<ErrorMessage, "message">>;
	};
};

export type EditPrivacyMutationVariables = Exact<{
	disableAccount: Scalars["Boolean"];
	privateAccount: Scalars["Boolean"];
}>;

export type EditPrivacyMutation = { __typename?: "Mutation" } & {
	editPrivacy: { __typename?: "passwordVerification" } & {
		success?: Maybe<{ __typename?: "successMessage" } & Pick<SuccessMessage, "message">>;
		error?: Maybe<{ __typename?: "errorMessage" } & Pick<ErrorMessage, "message">>;
	};
};

export type EditUserMutationVariables = Exact<{
	file?: Maybe<Scalars["Upload"]>;
	name: Scalars["String"];
	username: Scalars["String"];
	image_link: Scalars["String"];
	email: Scalars["String"];
	website?: Maybe<Scalars["String"]>;
	bio?: Maybe<Scalars["String"]>;
	phoneNumber?: Maybe<Scalars["Int"]>;
	gender?: Maybe<Scalars["String"]>;
	similarAccountSuggestions: Scalars["Boolean"];
}>;

export type EditUserMutation = { __typename?: "Mutation" } & {
	editUser: { __typename?: "response" } & {
		user?: Maybe<
			{ __typename?: "user_response" } & Pick<
				User_Response,
				"website" | "bio" | "email" | "phone_number" | "gender" | "recomended" | "disabled"
			> &
				UserFragmentFragment
		>;
		error?: Maybe<{ __typename?: "error" } & ErrorFragmentFragment>;
	};
};

export type GetUserQueryVariables = Exact<{
	username: Scalars["String"];
	currentUserId?: Maybe<Scalars["Int"]>;
}>;

export type GetUserQuery = { __typename?: "Query" } & {
	getUser: { __typename?: "response" } & {
		user?: Maybe<
			{ __typename?: "user_response" } & Pick<User_Response, "images_length" | "website" | "bio" | "private" | "disabled"> &
				UserFragmentFragment
		>;
		error?: Maybe<{ __typename?: "error" } & ErrorFragmentFragment>;
	};
};

export type InsertCommentMutationVariables = Exact<{
	imageId: Scalars["String"];
	comment: Scalars["String"];
}>;

export type InsertCommentMutation = { __typename?: "Mutation" } & {
	insertComment: { __typename?: "insert_comment" } & Pick<Insert_Comment, "inserted" | "message"> & {
			comment?: Maybe<
				{ __typename?: "comment_res" } & Pick<Comment_Res, "id" | "text" | "userId" | "imageId" | "created_at"> & {
						user: { __typename?: "comment_author" } & Pick<Comment_Author, "id" | "username">;
					}
			>;
		};
};

export type LikeImageMutationVariables = Exact<{
	imageId: Scalars["String"];
}>;

export type LikeImageMutation = { __typename?: "Mutation" } & {
	likeImage: { __typename?: "like_image" } & Pick<Like_Image, "liked" | "message">;
};

export type LoginMutationVariables = Exact<{
	userNameOrEmail: Scalars["String"];
	password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
	login: { __typename?: "response" } & {
		user?: Maybe<
			{ __typename?: "user_response" } & Pick<
				User_Response,
				"website" | "bio" | "private" | "email" | "phone_number" | "gender" | "recomended"
			> &
				UserFragmentFragment
		>;
		error?: Maybe<{ __typename?: "error" } & ErrorFragmentFragment>;
	};
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<Mutation, "logout">;

export type RegisterMutationVariables = Exact<{
	registerInputs: Register_Inputs;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
	register: { __typename?: "response" } & {
		user?: Maybe<
			{ __typename?: "user_response" } & Pick<
				User_Response,
				"website" | "bio" | "private" | "email" | "phone_number" | "gender" | "recomended"
			> &
				UserFragmentFragment
		>;
		error?: Maybe<{ __typename?: "error" } & ErrorFragmentFragment>;
	};
};

export type UploadImageMutationVariables = Exact<{
	file: Scalars["Upload"];
	caption: Scalars["String"];
}>;

export type UploadImageMutation = { __typename?: "Mutation" } & {
	uploadImage: { __typename?: "image_upload_response" } & {
		image?: Maybe<{ __typename?: "image_data" } & ImageFragmentFragment>;
		error?: Maybe<{ __typename?: "image_error" } & Pick<Image_Error, "message">>;
	};
};

export type GetAllImagesQueryVariables = Exact<{
	limit: Scalars["Int"];
	cursor?: Maybe<Scalars["String"]>;
}>;

export type GetAllImagesQuery = { __typename?: "Query" } & {
	getAllImages: { __typename?: "images" } & Pick<Images, "hasMore"> & {
			images: Array<{ __typename?: "image_data" } & ImageFragmentFragment>;
		};
};

export type GetImageCommentsQueryVariables = Exact<{
	imageId: Scalars["String"];
}>;

export type GetImageCommentsQuery = { __typename?: "Query" } & {
	getImageComments: { __typename?: "get_comment" } & {
		comment?: Maybe<
			Array<
				{ __typename?: "comment_res" } & Pick<Comment_Res, "id" | "text" | "imageId" | "created_at"> & {
						user: { __typename?: "comment_author" } & Pick<Comment_Author, "id" | "username">;
					}
			>
		>;
		error?: Maybe<{ __typename?: "error_res" } & Pick<Error_Res, "message">>;
	};
};

export type GetImageQueryVariables = Exact<{
	imageId: Scalars["String"];
}>;

export type GetImageQuery = { __typename?: "Query" } & {
	getImage: { __typename?: "image_res" } & {
		image?: Maybe<{ __typename?: "image_data" } & ImageFragmentFragment>;
		error?: Maybe<{ __typename?: "image_error" } & Pick<Image_Error, "message">>;
	};
};

export type GetSuggestedUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetSuggestedUsersQuery = { __typename?: "Query" } & {
	suggestedUsers: { __typename?: "responses" } & {
		users: Array<{ __typename?: "user_response" } & Pick<User_Response, "website" | "bio" | "private"> & UserFragmentFragment>;
	};
};

export type GetUserImagesQueryVariables = Exact<{
	userId: Scalars["Int"];
	isPrivate: Scalars["Boolean"];
	isDisabled: Scalars["Boolean"];
	currentUserId?: Maybe<Scalars["Int"]>;
	limit: Scalars["Int"];
	cursor?: Maybe<Scalars["String"]>;
}>;

export type GetUserImagesQuery = { __typename?: "Query" } & {
	getUserImages: { __typename?: "images" } & Pick<Images, "hasMore"> & {
			images: Array<{ __typename?: "image_data" } & ImageFragmentFragment>;
		};
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
	me?: Maybe<
		{ __typename?: "user_response" } & Pick<
			User_Response,
			"website" | "bio" | "private" | "email" | "phone_number" | "gender" | "recomended" | "disabled"
		> &
			UserFragmentFragment
	>;
};

export const ErrorFragmentFragmentDoc = gql`
	fragment errorFragment on error {
		message
	}
`;
export const ImageFragmentFragmentDoc = gql`
	fragment imageFragment on image_data {
		id
		caption
		image_url
		created_at
		user {
			id
			username
			image_link
		}
		like {
			user {
				username
			}
		}
	}
`;
export const UserFragmentFragmentDoc = gql`
	fragment userFragment on user_response {
		id
		username
		fullname
		image_link
	}
`;
export const ChangePasswordDocument = gql`
	mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
		changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {
			success {
				message
			}
			error {
				message
			}
		}
	}
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      oldPassword: // value for 'oldPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
	baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>
) {
	return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const EditPrivacyDocument = gql`
	mutation EditPrivacy($disableAccount: Boolean!, $privateAccount: Boolean!) {
		editPrivacy(disableAccount: $disableAccount, privateAccount: $privateAccount) {
			success {
				message
			}
			error {
				message
			}
		}
	}
`;
export type EditPrivacyMutationFn = Apollo.MutationFunction<EditPrivacyMutation, EditPrivacyMutationVariables>;

/**
 * __useEditPrivacyMutation__
 *
 * To run a mutation, you first call `useEditPrivacyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPrivacyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPrivacyMutation, { data, loading, error }] = useEditPrivacyMutation({
 *   variables: {
 *      disableAccount: // value for 'disableAccount'
 *      privateAccount: // value for 'privateAccount'
 *   },
 * });
 */
export function useEditPrivacyMutation(baseOptions?: Apollo.MutationHookOptions<EditPrivacyMutation, EditPrivacyMutationVariables>) {
	return Apollo.useMutation<EditPrivacyMutation, EditPrivacyMutationVariables>(EditPrivacyDocument, baseOptions);
}
export type EditPrivacyMutationHookResult = ReturnType<typeof useEditPrivacyMutation>;
export type EditPrivacyMutationResult = Apollo.MutationResult<EditPrivacyMutation>;
export type EditPrivacyMutationOptions = Apollo.BaseMutationOptions<EditPrivacyMutation, EditPrivacyMutationVariables>;
export const EditUserDocument = gql`
	mutation EditUser(
		$file: Upload
		$name: String!
		$username: String!
		$image_link: String!
		$email: String!
		$website: String
		$bio: String
		$phoneNumber: Int
		$gender: String
		$similarAccountSuggestions: Boolean!
	) {
		editUser(
			file: $file
			name: $name
			username: $username
			image_link: $image_link
			email: $email
			website: $website
			bio: $bio
			phoneNumber: $phoneNumber
			gender: $gender
			similarAccountSuggestions: $similarAccountSuggestions
		) {
			user {
				...userFragment
				website
				bio
				email
				phone_number
				gender
				recomended
				disabled
			}
			error {
				...errorFragment
			}
		}
	}
	${UserFragmentFragmentDoc}
	${ErrorFragmentFragmentDoc}
`;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      file: // value for 'file'
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      image_link: // value for 'image_link'
 *      email: // value for 'email'
 *      website: // value for 'website'
 *      bio: // value for 'bio'
 *      phoneNumber: // value for 'phoneNumber'
 *      gender: // value for 'gender'
 *      similarAccountSuggestions: // value for 'similarAccountSuggestions'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
	return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, baseOptions);
}
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const GetUserDocument = gql`
	query GetUser($username: String!, $currentUserId: Int) {
		getUser(username: $username, currentUserId: $currentUserId) {
			user {
				...userFragment
				images_length
				website
				bio
				private
				disabled
			}
			error {
				...errorFragment
			}
		}
	}
	${UserFragmentFragmentDoc}
	${ErrorFragmentFragmentDoc}
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *      currentUserId: // value for 'currentUserId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
	return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
}
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
	return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const InsertCommentDocument = gql`
	mutation InsertComment($imageId: String!, $comment: String!) {
		insertComment(imageId: $imageId, comment: $comment) {
			inserted
			message
			comment {
				id
				text
				userId
				imageId
				created_at
				user {
					id
					username
				}
			}
		}
	}
`;
export type InsertCommentMutationFn = Apollo.MutationFunction<InsertCommentMutation, InsertCommentMutationVariables>;

/**
 * __useInsertCommentMutation__
 *
 * To run a mutation, you first call `useInsertCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertCommentMutation, { data, loading, error }] = useInsertCommentMutation({
 *   variables: {
 *      imageId: // value for 'imageId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useInsertCommentMutation(baseOptions?: Apollo.MutationHookOptions<InsertCommentMutation, InsertCommentMutationVariables>) {
	return Apollo.useMutation<InsertCommentMutation, InsertCommentMutationVariables>(InsertCommentDocument, baseOptions);
}
export type InsertCommentMutationHookResult = ReturnType<typeof useInsertCommentMutation>;
export type InsertCommentMutationResult = Apollo.MutationResult<InsertCommentMutation>;
export type InsertCommentMutationOptions = Apollo.BaseMutationOptions<InsertCommentMutation, InsertCommentMutationVariables>;
export const LikeImageDocument = gql`
	mutation LikeImage($imageId: String!) {
		likeImage(imageId: $imageId) {
			liked
			message
		}
	}
`;
export type LikeImageMutationFn = Apollo.MutationFunction<LikeImageMutation, LikeImageMutationVariables>;

/**
 * __useLikeImageMutation__
 *
 * To run a mutation, you first call `useLikeImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeImageMutation, { data, loading, error }] = useLikeImageMutation({
 *   variables: {
 *      imageId: // value for 'imageId'
 *   },
 * });
 */
export function useLikeImageMutation(baseOptions?: Apollo.MutationHookOptions<LikeImageMutation, LikeImageMutationVariables>) {
	return Apollo.useMutation<LikeImageMutation, LikeImageMutationVariables>(LikeImageDocument, baseOptions);
}
export type LikeImageMutationHookResult = ReturnType<typeof useLikeImageMutation>;
export type LikeImageMutationResult = Apollo.MutationResult<LikeImageMutation>;
export type LikeImageMutationOptions = Apollo.BaseMutationOptions<LikeImageMutation, LikeImageMutationVariables>;
export const LoginDocument = gql`
	mutation Login($userNameOrEmail: String!, $password: String!) {
		login(userNameOrEmail: $userNameOrEmail, password: $password) {
			user {
				...userFragment
				website
				bio
				private
				email
				phone_number
				gender
				recomended
			}
			error {
				...errorFragment
			}
		}
	}
	${UserFragmentFragmentDoc}
	${ErrorFragmentFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userNameOrEmail: // value for 'userNameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
	return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
	mutation Logout {
		logout
	}
`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
	return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
	mutation Register($registerInputs: register_inputs!) {
		register(registerInputs: $registerInputs) {
			user {
				...userFragment
				website
				bio
				private
				email
				phone_number
				gender
				recomended
			}
			error {
				...errorFragment
			}
		}
	}
	${UserFragmentFragmentDoc}
	${ErrorFragmentFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInputs: // value for 'registerInputs'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
	return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UploadImageDocument = gql`
	mutation UploadImage($file: Upload!, $caption: String!) {
		uploadImage(file: $file, caption: $caption) {
			image {
				...imageFragment
			}
			error {
				message
			}
		}
	}
	${ImageFragmentFragmentDoc}
`;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *      caption: // value for 'caption'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
	return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, baseOptions);
}
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const GetAllImagesDocument = gql`
	query GetAllImages($limit: Int!, $cursor: String) {
		getAllImages(limit: $limit, cursor: $cursor) {
			hasMore
			images {
				...imageFragment
			}
		}
	}
	${ImageFragmentFragmentDoc}
`;

/**
 * __useGetAllImagesQuery__
 *
 * To run a query within a React component, call `useGetAllImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllImagesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAllImagesQuery(baseOptions: Apollo.QueryHookOptions<GetAllImagesQuery, GetAllImagesQueryVariables>) {
	return Apollo.useQuery<GetAllImagesQuery, GetAllImagesQueryVariables>(GetAllImagesDocument, baseOptions);
}
export function useGetAllImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllImagesQuery, GetAllImagesQueryVariables>) {
	return Apollo.useLazyQuery<GetAllImagesQuery, GetAllImagesQueryVariables>(GetAllImagesDocument, baseOptions);
}
export type GetAllImagesQueryHookResult = ReturnType<typeof useGetAllImagesQuery>;
export type GetAllImagesLazyQueryHookResult = ReturnType<typeof useGetAllImagesLazyQuery>;
export type GetAllImagesQueryResult = Apollo.QueryResult<GetAllImagesQuery, GetAllImagesQueryVariables>;
export const GetImageCommentsDocument = gql`
	query GetImageComments($imageId: String!) {
		getImageComments(imageId: $imageId) {
			comment {
				id
				text
				imageId
				created_at
				user {
					id
					username
				}
			}
			error {
				message
			}
		}
	}
`;

/**
 * __useGetImageCommentsQuery__
 *
 * To run a query within a React component, call `useGetImageCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImageCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImageCommentsQuery({
 *   variables: {
 *      imageId: // value for 'imageId'
 *   },
 * });
 */
export function useGetImageCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetImageCommentsQuery, GetImageCommentsQueryVariables>) {
	return Apollo.useQuery<GetImageCommentsQuery, GetImageCommentsQueryVariables>(GetImageCommentsDocument, baseOptions);
}
export function useGetImageCommentsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetImageCommentsQuery, GetImageCommentsQueryVariables>
) {
	return Apollo.useLazyQuery<GetImageCommentsQuery, GetImageCommentsQueryVariables>(GetImageCommentsDocument, baseOptions);
}
export type GetImageCommentsQueryHookResult = ReturnType<typeof useGetImageCommentsQuery>;
export type GetImageCommentsLazyQueryHookResult = ReturnType<typeof useGetImageCommentsLazyQuery>;
export type GetImageCommentsQueryResult = Apollo.QueryResult<GetImageCommentsQuery, GetImageCommentsQueryVariables>;
export const GetImageDocument = gql`
	query GetImage($imageId: String!) {
		getImage(imageId: $imageId) {
			image {
				...imageFragment
			}
			error {
				message
			}
		}
	}
	${ImageFragmentFragmentDoc}
`;

/**
 * __useGetImageQuery__
 *
 * To run a query within a React component, call `useGetImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImageQuery({
 *   variables: {
 *      imageId: // value for 'imageId'
 *   },
 * });
 */
export function useGetImageQuery(baseOptions: Apollo.QueryHookOptions<GetImageQuery, GetImageQueryVariables>) {
	return Apollo.useQuery<GetImageQuery, GetImageQueryVariables>(GetImageDocument, baseOptions);
}
export function useGetImageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetImageQuery, GetImageQueryVariables>) {
	return Apollo.useLazyQuery<GetImageQuery, GetImageQueryVariables>(GetImageDocument, baseOptions);
}
export type GetImageQueryHookResult = ReturnType<typeof useGetImageQuery>;
export type GetImageLazyQueryHookResult = ReturnType<typeof useGetImageLazyQuery>;
export type GetImageQueryResult = Apollo.QueryResult<GetImageQuery, GetImageQueryVariables>;
export const GetSuggestedUsersDocument = gql`
	query GetSuggestedUsers {
		suggestedUsers {
			users {
				...userFragment
				website
				bio
				private
			}
		}
	}
	${UserFragmentFragmentDoc}
`;

/**
 * __useGetSuggestedUsersQuery__
 *
 * To run a query within a React component, call `useGetSuggestedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSuggestedUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>) {
	return Apollo.useQuery<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>(GetSuggestedUsersDocument, baseOptions);
}
export function useGetSuggestedUsersLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>
) {
	return Apollo.useLazyQuery<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>(GetSuggestedUsersDocument, baseOptions);
}
export type GetSuggestedUsersQueryHookResult = ReturnType<typeof useGetSuggestedUsersQuery>;
export type GetSuggestedUsersLazyQueryHookResult = ReturnType<typeof useGetSuggestedUsersLazyQuery>;
export type GetSuggestedUsersQueryResult = Apollo.QueryResult<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>;
export const GetUserImagesDocument = gql`
	query GetUserImages($userId: Int!, $isPrivate: Boolean!, $isDisabled: Boolean!, $currentUserId: Int, $limit: Int!, $cursor: String) {
		getUserImages(
			userId: $userId
			isPrivate: $isPrivate
			isDisabled: $isDisabled
			currentUserId: $currentUserId
			limit: $limit
			cursor: $cursor
		) {
			hasMore
			images {
				...imageFragment
			}
		}
	}
	${ImageFragmentFragmentDoc}
`;

/**
 * __useGetUserImagesQuery__
 *
 * To run a query within a React component, call `useGetUserImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserImagesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      isPrivate: // value for 'isPrivate'
 *      isDisabled: // value for 'isDisabled'
 *      currentUserId: // value for 'currentUserId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetUserImagesQuery(baseOptions: Apollo.QueryHookOptions<GetUserImagesQuery, GetUserImagesQueryVariables>) {
	return Apollo.useQuery<GetUserImagesQuery, GetUserImagesQueryVariables>(GetUserImagesDocument, baseOptions);
}
export function useGetUserImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserImagesQuery, GetUserImagesQueryVariables>) {
	return Apollo.useLazyQuery<GetUserImagesQuery, GetUserImagesQueryVariables>(GetUserImagesDocument, baseOptions);
}
export type GetUserImagesQueryHookResult = ReturnType<typeof useGetUserImagesQuery>;
export type GetUserImagesLazyQueryHookResult = ReturnType<typeof useGetUserImagesLazyQuery>;
export type GetUserImagesQueryResult = Apollo.QueryResult<GetUserImagesQuery, GetUserImagesQueryVariables>;
export const MeDocument = gql`
	query Me {
		me {
			...userFragment
			website
			bio
			private
			email
			phone_number
			gender
			recomended
			disabled
		}
	}
	${UserFragmentFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
	return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
	return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
