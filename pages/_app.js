import "reflect-metadata";
import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
//
// export default MyApp
