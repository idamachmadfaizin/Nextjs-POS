import prisma from "@/lib/prisma";
import { DateTimeResolver } from "graphql-scalars";
// import { PrismaSelect } from "@paljs/plugins";
// import { GraphQLResolveInfo } from 'graphql';

export const resolvers = {
  // DateTime: DateTimeResolver,
  Query: {
    greetings: () => "This is the `greetings` field of the root `Query` type",
    tags: () => {
      return prisma.tag.findMany();
    },
    users: () => {
      return prisma.user.findMany();
    },
    // users: (
    //   _parent: unknown,
    //   _args: unknown,
    //   ctx: unknown,
    //   info: GraphQLResolveInfo,
    // ) => {
    //   const select = new PrismaSelect(info).value.select;
    //   return prisma.user.findMany({ select });
    // },
    user: (_: any, args: any) =>
      prisma.user.findUnique({
        where: { id: args.id },
      }),
  },
};
