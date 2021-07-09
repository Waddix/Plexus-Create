/* eslint-disable import/no-anonymous-default-export */
// import {
//   Resolver,
//   Query,
//   Arg,
//   Mutation,
//   Field,
//   InputType,
//   Int,
// } from "type-graphql";
// import { Settings } from "../db/entities/Settings";

// @InputType()
// class SettingsInput {
//   @Field(() => Int)
//   id: number;

//   @Field(() => Int)
//   profile_id: number;

//   @Field(() => Boolean)
//   dyslexic_font: boolean;

//   @Field(() => Boolean)
//   darkMode: boolean;

//   @Field(() => String)
//   colorScheme: string;
// }

// @Resolver()
// export class SettingsResolver {
//   @Query(() => Settings)
//   settingLookup(
//     @Arg("id", () => Int) id: number
//   ): Promise<Settings | undefined> {
//     return Settings.findOne(id, {
//       // relations: ["profile_id"],
//     });
//   }

//   @Query(() => Settings)
//   findProfileID(
//     @Arg("profile_id", () => Int) profile_id: number
//   ): Promise<Settings | undefined> {
//     return Settings.findOne(profile_id, {
//       // relations: ["profile_id"],
//     });
//   }

//   @Mutation(() => Settings)
//   async createSettings(@Arg("input") input: SettingsInput): Promise<Settings> {
//     return await Settings.create({ ...input }).save();
//   }

//   @Mutation(() => Settings)
//   async updateSettings(
//     @Arg("settingsInput") settingsInput: SettingsInput
//   ): Promise<Settings | undefined> {
//     const settings = await Settings.findOne({
//       where: { id: settingsInput.id },
//       // relations: ["profile_id"],
//     });

//     if (settings) {
//       settings.dyslexic_font = settingsInput.dyslexic_font;
//       settings.darkMode = settingsInput.darkMode;
//       settings.colorScheme = settingsInput.colorScheme;

//       return await Settings.save(settings);
//     } else {
//       return settings;
//     }
//   }
// }

export default {};
