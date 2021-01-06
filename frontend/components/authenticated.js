import { signOut } from "next-auth/client";
// import axios from "axios";
// import { useQuery, useQueryClient } from "react-query";
import { useSession } from "next-auth/client";
// import {gql} from "graphql-request";
// import {useGQLQuery} from "../react-query-hooks/useGQLQuery";
import Me from "./Me";
// import { useLazyGQLQuery } from "../react-query-hooks/useLazyGQLQuery";

// const endpoint = "http://localhost:4000/graphql";
// const variables = {
//   email: session.email,
// };

// const ME_QUERY = gql`
//   query Me {
//     me {
//       error {
//         message
//       }
//       user {
//         _id
//         username
//         email
//       }
//     }
//   }
// `;

// const fetchD = async () => {
//   const { data } = await axios.get("http://localhost:3000/api/data");
//   console.log("data", data);
//   return data;
// };

export default function Authenticated({ user }) {
  const [session, loading] = useSession();
  // const { status, data, error, isFetching } = meQuery();
  // const { status, data, error, isFetching } = useGQLQuery("me", ME_QUERY, {
  //   variables: session.email,
  // });
  // const [getMe, meInfo] = useLazyGQLQuery("me", ME_QUERY, {
  //   variables: session.email,
  // });

  if (loading) return <p>loading session...</p>;

  // if (isFetching) return <div>FETCHING!!!</div>;

  // if (error) return <div>Error: {error.message}</div>;
  // if (status) {
  //   console.log("status", status);
  //   return <div>STATUS?</div>;
  // }
  // if (data) {
  //   console.log("data", data);
  // }
  console.log("session", session);
  // const { data, status } = useQuery("dMessage", fetchD);

  // const showM = (mData) => {
  //   console.log({ mData });
  //   return <div key={mData.message}>{mData.message}</div>;
  // };

  return (
    <div>
      {/* <p>You are authenticated {user.name ?? user.email}</p> */}
      <button onClick={signOut}>Sign out</button>
      {session?.email && <Me />}
      {/* <div> */}
      test
      {/* <button onClick={() => getMe()}>Get Me</button> */}
      {/*   {status === "loading" && <div>Loading...</div>} */}
      {/*   {status === "error" && <div>Error fetching message</div>} */}
      {/*   {status === "success" && <div>{showM(data)}</div>} */}
      {/* </div> */}
    </div>
  );
}
