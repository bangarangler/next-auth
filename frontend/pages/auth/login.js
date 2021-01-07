// import React from "react";
// import { csrfToken, getProviders } from "next-auth/client";
// import {
//   MeDocument,
//   useMeQuery,
//   useUserExistQuery,
// } from "../../generated/graphql.tsx";
// import { gql_endpoint } from "../../constants.ts";

// const dataSource = {
//   endpoint: gql_endpoint,
//   fetchParams: {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credintials: "include",
//   },
// };

// const vars = {
//   email: session?.email ? session.email : "jack@test.com",
// };

// const { data, error, isFetching } = useUserExistQuery(dataSource, vars);

// export default function CustomLogin({ csrfToken, getProviders }) {
// const providers = getProviders();
//  import React from 'react'
import { providers, signIn, csrfToken } from "next-auth/client";

export default function SignIn({ providers, csrfToken }) {
  return (
    <>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email address
          <input type="text" id="email" name="email" />
        </label>
        {/* <button type="submit">Sign in with Email</button> */}
      </form>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  };
};
// console.log(getProviders);
// return (
//   <div>
//     {getProviders.email && (
//       <form method="post" action={getProviders.email.callbackUrl}>
//         <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
//         <label>
//           Email address
//           <input type="text" id="email" name="email" />
//         </label>
//         <button type="submit">Sign in with Email</button>
//       </form>
//     )}
//     {getProviders.github && (
//       <form method="post" action={getProviders.github.callbackUrl}>
//         <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
//         {/* <label> */}
//         {/*   Email address */}
//         {/*   <input type="text" id="email" name="email" /> */}
//         {/* </label> */}
//         <button type="submit">Sign in with GitHub</button>
//       </form>
//     )}
//   </div>
// );
// }

// CustomLogin.getInitialProps = async (context) => {
//   return {
//     csrfToken: await csrfToken(context),
//     getProviders: await getProviders(context),
//   };
// };
{
  /* <form method="post" action="/api/auth/signin/email">  */
}
{
  /* <input name="csrfToken" type="hidden" defaultValue={csrfToken} />  */
}
{
  /*   <label>  */
}
{
  /*     Email address  */
}
{
  /*     <input type="text" id="email" name="email" />  */
}
{
  /*   </label>  */
}
{
  /*   <button type="submit">Sign in with Email</button>  */
}
{
  /* </form>  */
}
