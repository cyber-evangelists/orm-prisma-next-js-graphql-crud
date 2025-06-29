import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import {prisma} from "../../prisma/db"
import { PrismaClient } from "@prisma/client";
import {typeDefs} from "@/graphql/schema"
import {resolvers} from "@/graphql/resolvers";

export type Context = {
    prisma: PrismaClient;
}

const apolloServer = new ApolloServer<Context>({
    typeDefs,
    resolvers
});

export default startServerAndCreateNextHandler(apolloServer, {
    context: async (req, res) => ({req, res, prisma})
})