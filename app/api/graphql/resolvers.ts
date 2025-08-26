import googleOAuth2Client from "@/lib/OAuthClient"; "@/lib/OAuthClient";
import prismaClient from "@/lib/prismaClient";

const resolvers = {
    Query: {

        users: () => prismaClient.user.findMany({}),

        user: (_: unknown, args: { id: string }) => {
            return prismaClient.user.findFirst({
                where: { id: args.id },
                include: { comments: true }
            })
        },

        comments: () => {
            return prismaClient.comment.findMany({
                where: { parentId: null },
                include: {
                    author: true,
                    replies: true
                },
            })
        },

        comment: (_: unknown, args: {
            id: string
        }) => {
            return prismaClient.comment.findFirst({
                where: {
                    id: args.id
                },
                include: { author: true, replies: true, parent: true }
            })
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