import {
  AddTodoMutation,
  AddTodoMutationVariables,
} from "../generated/graphql";
import { fetcher } from "./useFetcher";
export const useAddTodo = (dataSource, options, AddTodoMutation, variables) =>
  useMutation(
    (variables) =>
      fetcher(
        dataSource.endpoint,
        dataSource.fetchParams || {},
        AddTodoDocument,
        variables
      )(),
    options
  );

// working solution but not what we want
// import { fetchData } from "./useGQLQuery";
//
// export async function addTodo({ options }) {
//   const data = await fetchData(
//     `
//     mutation AddTodo($options: AddTodoInput!) {
//       addTodo(options: $options) {
//         errors {
//           source
//           message
//         }
//         todo {
//         _id
//         title
//         body
//         }
//       }
//     }
//       `,
//     { variables: { options } }
//   );
//   console.log("data", data);
//   return data?.addTodo;
// }
