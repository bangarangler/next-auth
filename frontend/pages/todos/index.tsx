import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";

const UnauthenticatedComponent = dynamic(
  () => import("../../components/unauthenticated")
);
const AddTodoComponent = dynamic(() => import("../../components/AddTodo"));

export default function Todos() {
  const [session, loading] = useSession();
  if (typeof window !== "undefined" && loading) return <p>Loading...</p>;

  if (!session) return <UnauthenticatedComponent />;

  console.log("session.user from Profile", session.user);

  return <AddTodoComponent />;
}
