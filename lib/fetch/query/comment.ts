export const getAllCommentsQuery = `
   query{
        comments{
            id
            content
            createdAt
            updatedAt
            author {
                name
                id
            }
            parent {
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
            author {
                name
                id
            }
            parent {
                id
            }
            replies {
                id
                content
            }
        }
    }             
`