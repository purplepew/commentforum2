import { createCommentQuery } from "./mutation/comment";
import { getGoogleOAuthLinkQuery } from "./query/auth";
import { getAllCommentsQuery, getCommentByIdQuery } from "./query/comment";
import { CreateCommentResponse, GetCommentByIdResponse, GetCommentsResponse, GoogleOAuthLinkResponse } from "./types";

type ExtractVariables<T> = T extends { variables: object }
    ? T['variables']
    : never

export const customFetch = async <T>({
    headers,
    query,
    variables
}: {
    headers?: HeadersInit,
    query: string,
    variables?: ExtractVariables<T>
}): Promise<{ status: number; body: T }> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            })
        })

        const body = await res.json()

        if (body.errors) {
            throw body.errors[0]
        }

        return {
            status: res.status,
            body
        }

    } catch (error) {

        console.log({
            error,
            query
        })

        throw {
            error,
            query
        }
    }
}

export const getGoogleOAuthLink = async (): Promise<string> => {
    const res = await customFetch<GoogleOAuthLinkResponse>({
        query: getGoogleOAuthLinkQuery
    })
    return res.body.data.generateGoogleAuthLink
}

export const getAllComments = async () => {
    const res = await customFetch<GetCommentsResponse>({
        query: getAllCommentsQuery,
        variables: { productId: null }
    })

    return res.body.data.comments
}

export const getCommentById = async ({
    id
}: {
    id: string
}) => {
    const res = await customFetch<GetCommentByIdResponse>({
        query: getCommentByIdQuery,
        variables: {
            id
        }
    })
    
    return res.body.data.comment
}

export const createComment = async ({
    content = "cmedn5awt00007ikxzhqbb5i0", authorId, parentId
}: {
    content?: string,
    authorId: string,
    parentId: string | null
}) => {
    const res = await customFetch<CreateCommentResponse>({
        query: createCommentQuery,
        variables: {
            authorId,
            content,
            parentId
        }
    })

    return res.body.data.createComment
}