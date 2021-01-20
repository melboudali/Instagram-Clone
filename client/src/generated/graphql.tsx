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
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  userName: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  website: Scalars['String'];
  bio: Scalars['String'];
  phoneNumber: Scalars['Float'];
  gender: Scalars['String'];
  imageUrl: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  message: Scalars['String'];
};

export type RegisterInputs = {
  userName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  fullName: Scalars['String'];
};

export type UploadImageResponse = {
  __typename?: 'UploadImageResponse';
  imageData?: Maybe<Image>;
  error?: Maybe<ErrorField>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['Float'];
  title: Scalars['String'];
  likes: Scalars['Float'];
  url: Scalars['String'];
  likeStatu?: Maybe<Scalars['Int']>;
  userId: Scalars['Float'];
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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
  & Pick<User, 'id' | 'userName' | 'email' | 'fullName' | 'website' | 'bio' | 'phoneNumber' | 'gender' | 'imageUrl' | 'createdAt' | 'updatedAt'>
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
    & { imageData?: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'title' | 'likes' | 'url' | 'likeStatu' | 'userId' | 'createdAt' | 'updatedAt'>
    )>, error?: Maybe<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'field' | 'message'>
    )> }
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
  userName
  email
  fullName
  website
  bio
  phoneNumber
  gender
  imageUrl
  createdAt
  updatedAt
}
    `;
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
    imageData {
      id
      title
      likes
      url
      likeStatu
      userId
      createdAt
      updatedAt
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