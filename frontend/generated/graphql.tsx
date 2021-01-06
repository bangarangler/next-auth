import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
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


export type GeneralError = {
  __typename?: 'GeneralError';
  message: Scalars['String'];
};

export type InputError = {
  __typename?: 'InputError';
  source: Scalars['String'];
  message: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
};

export type TodoRes = {
  __typename?: 'TodoRes';
  errors?: Maybe<InputError>;
  todo?: Maybe<Todo>;
};

export type TodosRes = {
  __typename?: 'TodosRes';
  error?: Maybe<GeneralError>;
  todos?: Maybe<Array<Maybe<Todo>>>;
};

export type AddTodoInput = {
  title: Scalars['String'];
  body: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: TodoRes;
  test?: Maybe<Scalars['String']>;
};


export type MutationAddTodoArgs = {
  options: AddTodoInput;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type MeResponse = {
  __typename?: 'MeResponse';
  error?: Maybe<GeneralError>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  me: MeResponse;
};


export type QueryMeArgs = {
  email?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  somethingChanged?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type TodoDataFragment = (
  { __typename?: 'Todo' }
  & Pick<Todo, '_id' | 'title' | 'body'>
);

export type UserInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'email'>
);

export type AddTodoMutationVariables = Exact<{
  options: AddTodoInput;
}>;


export type AddTodoMutation = (
  { __typename?: 'Mutation' }
  & { addTodo: (
    { __typename?: 'TodoRes' }
    & { errors?: Maybe<(
      { __typename?: 'InputError' }
      & Pick<InputError, 'source' | 'message'>
    )>, todo?: Maybe<(
      { __typename?: 'Todo' }
      & TodoDataFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{
  email?: Maybe<Scalars['String']>;
}>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'MeResponse' }
    & { error?: Maybe<(
      { __typename?: 'GeneralError' }
      & Pick<GeneralError, 'message'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & UserInfoFragment
    )> }
  ) }
);

export const TodoDataFragmentDoc = `
    fragment TodoData on Todo {
  _id
  title
  body
}
    `;
export const UserInfoFragmentDoc = `
    fragment UserInfo on User {
  _id
  username
  email
}
    `;
export const AddTodoDocument = `
    mutation AddTodo($options: AddTodoInput!) {
  addTodo(options: $options) {
    errors {
      source
      message
    }
    todo {
      ...TodoData
    }
  }
}
    ${TodoDataFragmentDoc}`;
export const useAddTodoMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit }, 
      options?: UseMutationOptions<AddTodoMutation, TError, AddTodoMutationVariables, TContext>
    ) => 
    useMutation<AddTodoMutation, TError, AddTodoMutationVariables, TContext>(
      (variables?: AddTodoMutationVariables) => fetcher<AddTodoMutation, AddTodoMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AddTodoDocument, variables)(),
      options
    );
export const MeDocument = `
    query Me($email: String) {
  me(email: $email) {
    error {
      message
    }
    user {
      ...UserInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit }, 
      variables?: MeQueryVariables, 
      options?: UseQueryOptions<MeQuery, TError, TData>
    ) => 
    useQuery<MeQuery, TError, TData>(
      ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MeDocument, variables),
      options
    );