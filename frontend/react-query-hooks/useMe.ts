import { useQuery, useQueryClient } from "react-query";
import { request, gql } from "graphql-request";

const endpoint = "http://localhost:4000/graphql";
// const variables = {
//   email
// };

export const meQuery = async (key, vars) => {
  return useQuery(key, async () => {
    const {
      [key]: { data },
    } = await request(
      endpoint,
      gql`
        query Me {
          me {
            error {
              message
            }
            user {
              _id
              username
              email
            }
          }
        }
      `,
      vars
    );
    return data;
  });
};

// export default function useMeQuery(key, vars) {
//   return
// }
