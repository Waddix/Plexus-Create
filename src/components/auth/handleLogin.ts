import { Users } from '../../../server/src/db/entities/nextauth/Users'

export default function handleLogin(UserObj: Users): void{
  // Check if this user has a profile linked to the db

  // If the user has a profile in the db, set it to the account/user/profile context and return true

  /**
   * If the user does not have a profile in the db, create their profile in the database, set it to the context,
   * then return true and a way to signify it is a new profile so that the register-flow can be triggered.
   */

  // If there is a conflict finding or creating the profile return false.

  console.log('HANDLE LOGIN:', UserObj);
}
