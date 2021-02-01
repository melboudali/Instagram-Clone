import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getUser: UserResponse;
  suggestedUsers: UsersResponse;
  getAllImages: PaginatedImages;
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryGetAllImagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  fullname: Scalars['String'];
  website: Scalars['String'];
  bio: Scalars['String'];
  phone_number: Scalars['Float'];
  image_link: Scalars['String'];
  verified: Scalars['Boolean'];
  private: Scalars['Boolean'];
  images?: Maybe<Array<Image>>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  caption: Scalars['String'];
  image_url: Scalars['String'];
  likes: Scalars['Float'];
  like_status?: Maybe<Scalars['Boolean']>;
  user_id: Scalars['Float'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
  user: User;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  message: Scalars['String'];
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  users?: Maybe<Array<User>>;
};

export type PaginatedImages = {
  __typename?: 'PaginatedImages';
  images: Array<Image>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  uploadImage: UploadImageResponse;
};


export type MutationRegisterArgs = {
  registerInputs: RegisterInputs;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  userNameOrEmail: Scalars['String'];
};


export type MutationUploadImageArgs = {
  caption: Scalars['String'];
  file: Scalars['Upload'];
};

export type RegisterInputs = {
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  fullName: Scalars['String'];
};

export type UploadImageResponse = {
  __typename?: 'UploadImageResponse';
  image?: Maybe<Image>;
  error?: Maybe<ErrorField>;
};

export type ErrorField = {
  __typename?: 'ErrorField';
  field: Scalars['String'];
  message: Scalars['String'];
};


export type UserErrorFragmentFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'message'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'fullname' | 'website' | 'bio' | 'phone_number' | 'image_link' | 'private' | 'verified' | 'created_at' | 'updated_at'>
);

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & { images?: Maybe<Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'caption' | 'image_url' | 'likes' | 'like_status' | 'user_id' | 'created_at' | 'updated_at'>
      )>> }
      & UserFragmentFragment
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & UserErrorFragmentFragment
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  userNameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & UserErrorFragmentFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  registerInputs: RegisterInputs;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & UserErrorFragmentFragment
    )> }
  ) }
);

export type UploadImageMutationVariables = Exact<{
  file: Scalars['Upload'];
  caption: Scalars['String'];
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & { uploadImage: (
    { __typename?: 'UploadImageResponse' }
    & { image?: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'caption' | 'image_url' | 'likes' | 'like_status' | 'user_id' | 'created_at' | 'updated_at'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'image_link'>
      ) }
    )>, error?: Maybe<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'field' | 'message'>
    )> }
  ) }
);

export type GetAllImagesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetAllImagesQuery = (
  { __typename?: 'Query' }
  & { getAllImages: (
    { __typename?: 'PaginatedImages' }
    & Pick<PaginatedImages, 'hasMore'>
    & { images: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'caption' | 'image_url' | 'likes' | 'like_status' | 'user_id' | 'created_at' | 'updated_at'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'image_link'>
      ) }
    )> }
  ) }
);

export type GetSuggestedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuggestedUsersQuery = (
  { __typename?: 'Query' }
  & { suggestedUsers: (
    { __typename?: 'UsersResponse' }
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'image_link'>
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export const UserErrorFragmentFragmentDoc = gql`
    fragment userErrorFragment on FieldError {
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment userFragment on User {
  id
  username
  email
  fullname
  website
  bio
  phone_number
  image_link
  private
  verified
  created_at
  updated_at
}
    `;
export const GetUserDocument = gql`
    query GetUser($username: String!) {
  getUser(username: $username) {
    user {
      ...userFragment
      images {
        id
        caption
        image_url
        likes
        like_status
        user_id
        created_at
        updated_at
      }
    }
    error {
      ...userErrorFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${UserErrorFragmentFragmentDoc}`;

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
export const LoginDocument = gql`
    mutation Login($userNameOrEmail: String!, $password: String!) {
  login(userNameOrEmail: $userNameOrEmail, password: $password) {
    user {
      ...userFragment
    }
    error {
      ...userErrorFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${UserErrorFragmentFragmentDoc}`;
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
    mutation Register($registerInputs: registerInputs!) {
  register(registerInputs: $registerInputs) {
    user {
      ...userFragment
    }
    error {
      ...userErrorFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${UserErrorFragmentFragmentDoc}`;
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
      id
      caption
      image_url
      likes
      like_status
      user_id
      created_at
      updated_at
      user {
        id
        username
        image_link
      }
    }
    error {
      field
      message
    }
  }
}
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
      id
      caption
      image_url
      likes
      like_status
      user_id
      created_at
      updated_at
      user {
        id
        username
        image_link
      }
    }
  }
}
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
export const GetSuggestedUsersDocument = gql`
    query GetSuggestedUsers {
  suggestedUsers {
    users {
      id
      username
      image_link
    }
  }
}
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
export function useGetSuggestedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>) {
          return Apollo.useLazyQuery<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>(GetSuggestedUsersDocument, baseOptions);
        }
export type GetSuggestedUsersQueryHookResult = ReturnType<typeof useGetSuggestedUsersQuery>;
export type GetSuggestedUsersLazyQueryHookResult = ReturnType<typeof useGetSuggestedUsersLazyQuery>;
export type GetSuggestedUsersQueryResult = Apollo.QueryResult<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;

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