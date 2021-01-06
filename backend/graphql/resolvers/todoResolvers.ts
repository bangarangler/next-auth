// import { ObjectID } from "mongodb";
import { ServerContext } from "../../ServerContext";
import {
  MutationAddTodoArgs,
  MutationResolvers,
  TodoRes,
  // QueryResolvers,
  // SubscriptionResolvers,
} from "../../codeGenBE";

interface Resolvers {
  // Query: QueryResolvers;
  Mutation: MutationResolvers;
  // Subscription: SubscriptionResolvers;
}

export const todoResolvers: Resolvers = {
  Mutation: {
    addTodo: async (
      _,
      { options }: MutationAddTodoArgs,
      { db }: ServerContext,
      ____
    ): Promise<TodoRes> => {
      console.log("AddTodo Route hit!");
      const { title, body } = options;
      console.log({ title });
      console.log({ body });
      try {
        if (!title) {
          return {
            errors: { source: "title", message: "Must enter a title" },
          };
        }
        if (!body) {
          return {
            errors: { source: "body", message: "Must enter a body" },
          };
        }
        if (body === "" || title === "") {
          return {
            errors: { source: "form", message: "Form Fields Can't be empty" },
          };
        }
        const todo = {
          title,
          body,
        };
        const todoRes = await db
          .db("jwtCookie")
          .collection("todos")
          .insertOne(todo);
        console.log("todoRes", todoRes);
        if (!todoRes) {
          return {
            errors: {
              source: "addingTodo",
              message: "Trouble Adding todo to database",
            },
          };
        }
        return { todo: todoRes.ops[0] };
      } catch (err) {
        console.log("err", err);
        return {
          errors: {
            source: "Server",
            message: "Something went wrong Internally",
          },
        };
      }
    },
  },
};