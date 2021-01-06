// import axios from "axios";
import React, { useReducer } from "react";
import { useMutation } from "react-query";
import { useSession } from "next-auth/client";
import { gql_endpoint } from "../constants";
import { addTodo } from "../react-query-hooks/useAddTodo";
import {
  useAddTodoMutation,
  AddTodoDocument,
  // AddTodoMutationVariables,
} from "../generated/graphql.tsx";

const reducer = (state, action) => {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return {
        ...state,
      };
  }
  // return state;
};

const initState = {
  todoTitle: "",
  todoBody: "",
};

export default function AddTodo() {
  const [session, loading] = useSession();
  const [state, dispatch] = useReducer(reducer, initState);
  const { todoTitle, todoBody } = state;

  // const dataSource = {
  //   endpoint: gql_endpoint,
  //   fetchParams: {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credintials: "include",
  //   },
  // };
  //

  if (loading) return <p>loading session...</p>;

  const vars = {
    options: { title: todoTitle, body: todoBody },
  };

  console.log("session", session);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit running.");
    console.log({ todoTitle });
    console.log({ todoBody });
    const data = await addTodo(vars);
    console.log("data from handleSubmit", data.todo);
    // mutate(AddTodoDocument, {
    //   variables: { options: { title: todoTitle, body: todoBody } },
    // });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="Todo Title">Todo Title</label>
      <input
        type="text"
        placeholder="Title ..."
        value={todoTitle}
        onChange={(e) =>
          dispatch({ type: "field", field: "todoTitle", value: e.target.value })
        }
      />
      <label htmlFor="Todo Body">Todo Body</label>
      <input
        type="text"
        placeholder="body ..."
        value={todoBody}
        onChange={(e) =>
          dispatch({ type: "field", field: "todoBody", value: e.target.value })
        }
      />
      <button>Add Todo</button>
    </form>
  );
}
