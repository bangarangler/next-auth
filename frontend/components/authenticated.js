import { signOut } from "next-auth/client";
import axios from "axios";
import { useQuery } from "react-query";
// import { useMeQuery } from "../generated/graphql.tsx";
import { useSession } from "next-auth/client";

const fetchD = async () => {
  const { data } = await axios.get("http://localhost:3000/api/data");
  console.log("data", data);
  return data;
};

export default function Authenticated({ user }) {
  const [session, loading] = useSession();
  // const { status: meStatus, data: meData, error } = useMeQuery({
  // endpoint: "http://localhost:4000/graphql",
  // });
  // if (error) return <div>error: {error.message}</div>;
  // console.log("meStatus", meStatus);
  // console.log("meData", meData);
  // console.log("meData", meData);
  if (loading) return <p>loading session...</p>;
  console.log("session", session);
  const { data, status } = useQuery("dMessage", fetchD);

  const showM = (mData) => {
    console.log({ mData });
    return <div key={mData.message}>{mData.message}</div>;
  };

  return (
    <div>
      <p>You are authenticated {user.name ?? user.email}</p>
      <button onClick={signOut}>Sign out</button>
      <div>
        {/* test */}
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && <div>Error fetching message</div>}
        {status === "success" && <div>{showM(data)}</div>}
      </div>
    </div>
  );
}
