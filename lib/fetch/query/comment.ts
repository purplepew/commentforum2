export const getAllCommentsQuery = `
   query{
        comments{
            id
            content
            createdAt
            updatedAt
            parentId
            author {
                name
                id
            }
            replies {
                id
                content
            }
        }
    }             
`

export const getCommentByIdQuery = `
    query ($id: ID!){
        comment(id: $id){
            id
            content
            createdAt
            updatedAt
            parentId
            author {
                name
                id
            }
            replies {
                id
                content
            }
        }
    }             
`