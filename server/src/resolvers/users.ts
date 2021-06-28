import { Resolver, Query, Arg } from "type-graphql";
import { Users } from "../db/entities/nextauth/Users";

@Resolver()
export class ProfileResolver {
  @Query(() => [Users], { nullable: true })
  getAllUsers(): Promise<Users[]> {
    return Users.find();
  }

  @Query(() => Users, { nullable: true })
  findUserName(
    @Arg("name", () => String) name: string
  ): Promise<Users | undefined> {
    return Users.findOne({ where: { name: name } });
  }

  @Query(() => Users)
  findUserEmail(
    @Arg("email", () => String) email: string
  ): Promise<Users | undefined> {
    return Users.findOne({ where: { email: email } });
  }

  @Query(() => Users)
  findUser(
    @Arg("name", () => String) name: string,
    @Arg("email", () => String) email: string,
  ): Promise<Users | undefined> {
    return Users.findOne({ where: { name: name, email: email} });
  }
}
