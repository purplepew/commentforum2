export const createCommentQuery = ` 
    mutation ($content: String!, $authorId: ID!, $parentId: ID){
        createComment(content: $content, authorId: $authorId, parentId: $parentId){
            id
            content
            createdAt
            updatedAt
            author
        }
    }
`