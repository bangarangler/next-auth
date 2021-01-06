// import axios from "axios";
// import { useQuery, useQueryClient } from "react-query";
import { gql } from "graphql-request";
import { useGQLQuery } from "../react-query-hooks/useGQLQuery";
import { useSession } from "next-auth/client";
// import { useLazyGQLQuery } from "../react-query-hooks/useLazyGQLQuery";

// const endpoint = "http://localhost:4000/graphql";
// const variables = {
//   email: session.email,
// };

const ME_QUERY = gql`
  query Me {
    me {
      error {
        message
      }
      user {
        _id
        username
        email
      }
    }
  }
`;

export default function Me() {
  const [session, loading] = useSession();
  // const { status, data, error, isFetching } = meQuery();
  const { status, data, error, isFetching } = useGQLQuery(
    "me",
    ME_QUERY,
    session.email
  );

  if (loading) return <p>loading session...</p>;

  if (isFetching) return <div>FETCHING!!!</div>;

  if (error) return <div>Error: {error.message}</div>;
  if (status) {
    console.log("status", status);
    return <div>STATUS?</div>;
  }
  if (data) {
    console.log("data", data);
  }
  console.log("session", session);

  return <div>Me Component</div>;
}
