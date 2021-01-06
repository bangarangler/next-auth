import { useSession } from "next-auth/client";
import { gql_endpoint } from "../constants";
import { useTodosQuery } from "../generated/graphql.tsx";
import Todo from "./Todo";

export default function Todos() {
  const [session, loading] = useSession();
  console.log("session from Todos", session);

  if (loading) {
    return <div>Loading Session...</div>;
  }

  const dataSource = {
    endpoint: gql_endpoint,
    fetchParams: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credintials: "include",
    },
  };

  const { data, error, isFetching } = useTodosQuery(dataSource);

  if (isFetching) {
    // console.log("fetching Todos");
    return <div>Fetching...</div>;
  }

  if (error) {
    console.log("error from Todos", error);
    return <div>Error, Something went wrong fetching todos</div>;
  }

  if (data) {
    // console.log("data from todos", data);
    // return <div>We have data</div>;
  }

  return (
    <>
      <div>Todos!</div>
      {data?.todos?.todos.map((todo: any) => {
        // return <div key={todo?._id}>{todo?.title}</div>;
        return <Todo key={todo._id} todo={todo} />;
      })}
    </>
  );
}
