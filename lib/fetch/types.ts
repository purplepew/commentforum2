type GraphQLError = {
    message: string;
    locations?: { line: number; column: number }[];
    path?: (string | number)[];
    extensions?: Record<string, unknown>;
};

export type IUser = {
    id: string,
    name: string,
    email: string,
    role: "USER" | "ADMIN",
    createdAt: Date,
    updatedAt: Date
}

export type IComment = {
    id: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    replies: IReplies,
    author: IUser,
    parentId: string | null
}

export type IReplies = {
    id: string,
    content: string
}[]

export type GoogleOAuthLinkResponse = {
    data: {
        generateGoogleAuthLink: string
    }
}

export type GetCommentsResponse = {
    data: {
        comments: IComment[]
    },
    variables: {
        productId: string | null
    }
}

export type GetCommentByIdResponse = {
    data: {
        comment: IComment
    },
    variables: {
        id: string
    }
} 

export type CreateCommentResponse = {
    data: {
        createComment: IComment
    },
    variables: {
        authorId: string,
        content: string
        parentId: string | null
    }
} 