/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { withUrqlClient } from "next-urql";
import {
  useGetUserEmailQuery,
  useGetUserNameQuery,
  // useGetProfileIdQuery,
  // useGetProfileUsernameQuery,
} from "../../generated/graphql";

const HandleLogin = (UserObj: any): void => {
  // Check if this user has a profile linked to the db
  const { name, email } = UserObj;

  const [data] = useGetUserEmailQuery({
    variables: { email: email },
  });
  // const {data: userByName}  = useGetUserNameQuery({variables: {name: name}});

  console.log(data);

  // If the user has a profile in the db, set it to the account/user/profile context and return true

  /**
   * If the user does not have a profile in the db, create their profile in the database, set it to the context,
   * then return true and a way to signify it is a new profile so that the register-flow can be triggered.
   */

  // If there is a conflict finding or creating the profile return false.
}

export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(HandleLogin);