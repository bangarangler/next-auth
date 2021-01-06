import { gql_endpoint } from "../constants";

export async function fetchData(query, { variables } = {}) {
  const res = await fetch(gql_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    const { message } = json.errors[0] || "Error..";
    throw new Error(message);
  }

  return json.data;
}
