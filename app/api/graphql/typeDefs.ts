const typeDefs = `
scalar DateTime

enum Role {
  USER
  ADMIN
}

type User {
  id: ID!
  name: String!
  email: String!
  role: Role!
  createdAt: DateTime!
  updatedAt: DateTime!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  content: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  author: User!
  parent: Comment
  replies: [Comment!]
}

type Query {
  users: [User!]
  user(id: ID!): User
  comments: [Comment!]
  comment(id: ID!): Comment

   generateGoogleAuthLink: String!
}

type Mutation {
  createUser(name: String!, email: String!, role: Role): User!
  createComment(content: String!, authorId: ID!, parentId: ID): Comment!
  updateComment(id: ID!, content: String!): Comment!
  deleteComment(id: ID!): Boolean!
}
`

export default typeDefs