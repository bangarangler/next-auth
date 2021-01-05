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
      // console.log("account", account);
      // user.accessToken = "FAKE_TOKEN";
      // return true;
      if (account.provider === "github") {
        user.accessToken = account.accessToken;
        console.log("user from signin", user);
        return user;
      }
      return true;
      // return Promise.resolve(true);
    },
    jwt: async (token, user) => {
      // console.log("jwt cb running");
      console.log("token jwt cb", token);
      if (user) {
        // console.log("user jwt cb before......", user);
        user.accessToken = token.accessToken;
        // console.log("user jwt cb after......", user);
        console.log("token........ before", token);
        token = { accessToken: user, ...token };
        console.log("token........ after", token);
      }
      console.log("token", token);
      return token;
      // return Promise.resolve(token, user, account, profile, isNewUser);
    },
    session: async (session, user) => {
      // console.log("session sess cb", session);
      // console.log("user sess cb", user);
      // session.user = user;
      session.accessToken = user.accessToken;
      console.log("session from sess cb", session);
      return session;
      // return Promise.resolve(session, user);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
