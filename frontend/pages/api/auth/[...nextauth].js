import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
      // server: {
      //   port: 465,
      //   host: "smtp.gmail.com",
      //   secure: true,
      //   auth: {
      //     user: process.env.EMAIL_USERNAME,
      //     pass: process.env.EMAIL_PASSWORD,
      //   },
      server: {
        port: 587,
        host: "smtp.office365.com",
        // secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  database: {
    type: "mongodb",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    url: process.env.DATABASE_URL,
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    signIn: async (user, account, metadata) => {
      // *** GITHUB ***
      if (account.provider === "github") {
        user.accessToken = account.accessToken;
        return user;
        // *** EMAIL ***
      } else if (account.type === "email") {
        // does user exist in our db?

        // gql backend query returns true if they are in db else false
        const query = `
  query UserExist($email: String!) {
    userExist(email: $email)
  }
`;
        const variables = {
          // email user entered in form
          email: account.providerAccountId,
        };

        const userExistInDB = await fetch("http://localhost:4000/graphql", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ query, variables }),
        })
          .then((response) => response.json())
          .then((data) => {
            return data;
          })
          .catch((e) => {
            console.log(e);
          });

        // if user not in our db
        if (!userExistInDB.data.userExist) {
          // this will give a default not auth screen
          return false;
        }
        // this will proceed with next call back
        return true;
      }
      return true;
    },
    jwt: async (token, user, account) => {
      let userInfo = { ...token, ...account };
      if (user) {
        userInfo = { ...user, ...userInfo };
      }
      return userInfo;
    },
    session: async (session, token) => {
      // console.log("********************************");
      // console.log("session sess cb", session);
      // console.log("user sess cb", token);
      return { ...session, ...token };
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
