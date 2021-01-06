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
      // const emailRes = await fetch("https://api/github.com/user/emails", {
      //   headers: {
      //     Authorization: `token ${account.accessToken}`,
      //   },
      // });
      // console.log("emailRes", emailRes);
      // const emails = await emailRes.json();
      // console.log("emails", emails);
      // const primaryEmail = emails.find((e) => e.primary).email;
      // console.log("primaryEmail", primaryEmail);

      // console.log("user", user);
      // console.log("account", account);
      // console.log("metadata", metadata);
      // user.accessToken = "FAKE_TOKEN";
      // return true;
      if (account.provider === "github") {
        user.accessToken = account.accessToken;
        // user.email = primaryEmail;
        // console.log("user from signin", user);
        return user;
      }
      return true;
      // return Promise.resolve(true);
    },
    jwt: async (token, user, account) => {
      // console.log("********************************");
      // console.log("account", account);
      // console.log("token jwt", token);
      // console.log("user from jwt", user);
      // console.log("jwt cb running");
      // console.log("token jwt cb", token);
      let userInfo = { ...token, ...account };
      if (user) {
        // console.log("user jwt cb before......", user);
        // user.accessToken = token.accessToken;
        // *WORKS*
        // user.accessToken = token.accessToken;
        // *stop WORKS*
        // console.log("user jwt cb after......", user);
        // console.log("token........ before", token);
        // token = { accessToken: user, ...token };
        // userInfo = { accessToken: account.accessToken, ...user, ...token };
        userInfo = { ...user, ...userInfo };
        // console.log("token........ after", token);
      }
      // console.log("userInfo", userInfo);
      return userInfo;
      // return Promise.resolve(token, user, account, profile, isNewUser);
    },
    session: async (session, token) => {
      console.log("********************************");
      console.log("session sess cb", session);
      console.log("user sess cb", token);
      // session.user = user;
      // session.accessToken = user.accessToken;
      // session.accessToken = token.accessToken;
      // console.log("session from sess cb", session);
      return { ...session, ...token };
      // return Promise.resolve(session, user);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
