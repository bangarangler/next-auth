// import { ObjectID } from "mongodb";
import { ServerContext } from "../../ServerContext";
import {
  MeResponse,
  MutationResolvers,
  QueryResolvers,
  QueryMeArgs,
  SubscriptionResolvers,
  QueryUserExistArgs,
} from "../../codeGenBE";

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
  Subscription: SubscriptionResolvers;
}

const SOMETHING_CHANGED = "something_changed";

export const userResolvers: Resolvers = {
  Query: {
    me: async (
      _: any,
      { email }: QueryMeArgs,
      // { req, res, db, pubsub }: ServerContext
      { db, pubsub }: ServerContext
    ): Promise<MeResponse> => {
      console.log("me route hit");
      try {
        if (!email) {
          return {
            error: { message: "Sorry No Existing User with that Email" },
          };
        }
        const user = await db
          .db("jwtCookie")
          .collection("users")
          // .findOne({ _id: new ObjectID(sessionUser) });
          .findOne({ email });
        pubsub.publish(SOMETHING_CHANGED, {
          somethingChanged: "Hey here is the me response",
        });
        return { user };
      } catch (err) {
        return { error: { message: "Something went wrong Internally" } };
      }
    },
    userExist: async (
      _,
      { email }: QueryUserExistArgs,
      { db }: ServerContext
    ): Promise<boolean> => {
      try {
        const userExist = await db
          .db("jwtCookie")
          .collection("users")
          .findOne({ email });
        // console.log("userExist", userExist);
        if (!userExist) {
          return false;
        } else {
          return true;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
  Mutation: {
    test: async () => {
      return "TESTING";
    },
  },
  Subscription: {
    somethingChanged: {
      subscribe: (_: any, __: any, { connection }: any) => {
        console.log("connection from subscribe", connection);
        console.log("connection.context", connection.context);
        return connection.pubsub.asyncIterator(SOMETHING_CHANGED);
      },
    },
  },
};
