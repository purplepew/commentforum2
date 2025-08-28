import googleOAuth2Client from "@/lib/OAuthClient"; "@/lib/OAuthClient";
import prismaClient from "@/lib/prismaClient";
import { createGraphQLError } from "graphql-yoga";

const resolvers = {
    Query: {

        users: () => prismaClient.user.findMany({}),

        user: (_: unknown, args: { id: string }) => {
            return prismaClient.user.findFirst({
                where: { id: args.id },
                include: { comments: true }
            })
        },

        comments: async () => {
            try {
                const res = await prismaClient.comment.findMany({
                    where: { parentId: null },
                    include: { author: true, replies: true },
                })

                if (!Array.isArray(res)) {
                    return createGraphQLError("Database responded no array")
                }

                return res
            } catch (error) {
                return createGraphQLError("Internal Server Error + " + error)
            }
        },

        comment: async (_: unknown, args: {
            id: string
        }) => {
            try {

                if (!args.id) {
                    return createGraphQLError("No ID provided")
                }

                const res = await prismaClient.comment.findFirst({
                    where: {
                        id: args.id
                    },
                    include: { author: true, replies: true }
                })

                return res
            } catch (error) {
                return createGraphQLError("Internal Server Error + " + error)
            }
        },

        generateGoogleAuthLink: async () => {
            const url = googleOAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: ['openid', 'email', 'profile']
            });
            return url;
        },


    },

    Mutation: {

        createComment: (_: unknown, args: {
            content: string, authorId: string, parentId: string | null
        }) => {
            return prismaClient.comment.create({
                data: {
                    content: args.content,
                    authorId: args.authorId,
                    parentId: args.parentId
                },
                include: { author: true, parent: true }
            })
        },


    }
}

export default resolvers