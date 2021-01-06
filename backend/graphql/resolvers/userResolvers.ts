// import { ObjectID } from "mongodb";
import { ServerContext } from "../../ServerContext";
// import bcrypt from "bcryptjs";
// import { verify, sign } from "jsonwebtoken";
import {
  // LoginResponse,
  MeResponse,
  MutationResolvers,
  QueryResolvers,
  QueryMeArgs,
  // RegisterResponse,
  SubscriptionResolvers,
  // Result,
  // Tokens,
  // User,
} from "../../codeGenBE";
// import { setTokens } from "../../auth/authTokens";
// import { setTokens } from "../../auth/authTokens";
// import { loginValidation } from "../../utils/loginValidation";
// import { registerValidation } from "../../utils/registerValidation";
// import { COOKIE_NAME } from "../../constants";
// import { sendEmail } from "../../utils/sendEmail";
// import { s2mConverter } from "../../utils/timeConverter";

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
        // will need this to check if we have Bearer
        // console.log("req", req.headers);

        // if email account / legacy signin

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
