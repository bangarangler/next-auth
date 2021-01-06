import { useQuery } from "react-query";
// import { GraphQLClient, request } from "graphql-request";
import { GraphQLClient } from "graphql-request";

export const useLazyGQLQuery = async (key, query, variables, config = {}) => {
  const endpoint = "http://localhost:4000/graphql";
  const headers = {
    headers: {
      authorization: `Bearer `,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async () => await graphQLClient.request(query, variables);

  // const fetchData = async () => await request(endpoint, query, variables)

  return ([getIt, gitItData] = useQuery(key, fetchData, config));
};
