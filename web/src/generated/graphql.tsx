import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  message: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type HelloOkay = {
  __typename?: 'HelloOkay';
  hello: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Chat;
  deleteMessage: Scalars['Boolean'];
  login: UserResponse;
  register: UserResponse;
  updateMessage?: Maybe<Chat>;
};


export type MutationCreateMessageArgs = {
  message: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserRegisterInput;
};


export type MutationUpdateMessageArgs = {
  id: Scalars['Float'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  message?: Maybe<Chat>;
  messages: Array<Chat>;
};


export type QueryMessageArgs = {
  id: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subsHello: HelloOkay;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string } | null | undefined };

export type HelloOkaySubscriptionVariables = Exact<{ [key: string]: never; }>;


export type HelloOkaySubscription = { __typename?: 'Subscription', subsHello: { __typename?: 'HelloOkay', hello: string } };


export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
  }
}
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const HelloOkayDocument = gql`
    subscription HelloOkay {
  subsHello {
    hello
  }
}
    `;

/**
 * __useHelloOkaySubscription__
 *
 * To run a query within a React component, call `useHelloOkaySubscription` and pass it any options that fit your needs.
 * When your component renders, `useHelloOkaySubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloOkaySubscription({
 *   variables: {
 *   },
 * });
 */
export function useHelloOkaySubscription(baseOptions?: Apollo.SubscriptionHookOptions<HelloOkaySubscription, HelloOkaySubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<HelloOkaySubscription, HelloOkaySubscriptionVariables>(HelloOkayDocument, options);
      }
export type HelloOkaySubscriptionHookResult = ReturnType<typeof useHelloOkaySubscription>;
export type HelloOkaySubscriptionResult = Apollo.SubscriptionResult<HelloOkaySubscription>;