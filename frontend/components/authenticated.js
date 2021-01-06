import { signOut } from "next-auth/client";
// import axios from "axios";
import { useSession } from "next-auth/client";
import { gql_endpoint } from "../constants.ts";
import { MeDocument, useMeQuery } from "../generated/graphql.tsx";

// const fetchD = async () => {
//   const { data } = await axios.get("http://localhost:3000/api/data");
//   console.log("data", data);
//   return data;
// };

export default function Authenticated({ user }) {
  const [session, loading] = useSession();
  // const { data, error, isFetching } = useMeQuery({
  //   endpoint: gql_endpoint,
  //   fetchParams: {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credintials: "include",
  //   },
  //   query: MeDocument,
  //   variables: { email: "jack@test.com" },
  // });
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

  const vars = {
    email: session?.email ? session.email : "jack@test.com",
  };
  const { data, error, isFetching } = useMeQuery(dataSource, vars);

  if (isFetching) {
    console.log("fetching from Authenticated");
    return <div>Fetching...</div>;
  }

  if (error) {
    console.log("error from Authenticated", error);
    return <div>Error, Something went wrong fetching user data</div>;
  }

  if (data) {
    console.log("data from authenticated", data);
    return <div>We have data</div>;
  }

  if (loading) return <p>loading session...</p>;

  console.log("session", session);

  // const showM = (mData) => {
  //   console.log({ mData });
  //   return <div key={mData.message}>{mData.message}</div>;
  // };

  return (
    <div>
      {/* <p>You are authenticated {user.name ?? user.email}</p> */}
      <button onClick={signOut}>Sign out</button>
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
