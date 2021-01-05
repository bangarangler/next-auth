import { signOut } from "next-auth/client";
import axios from "axios";
import { useQuery } from "react-query";

const fetchD = async () => {
  const { data } = await axios.get("http://localhost:3000/api/data");
  console.log("data", data);
  return data;
};

export default function Authenticated({ user }) {
  const { data, status } = useQuery("dMessage", fetchD);

  const showM = (mData) => {
    console.log({ mData });
    return <div key={mData.message}>{mData.message}</div>;
  };

  return (
    <div>
      <p>You are authenticated {user.email}</p>
      <button onClick={signOut}>Sign out</button>
      <div>
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && <div>Error fetching message</div>}
        {status === "success" && <div>{showM(data)}</div>}
      </div>
    </div>
  );
}
