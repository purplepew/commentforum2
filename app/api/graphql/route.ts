import { createYoga, createSchema } from 'graphql-yoga';
import { type NextRequest } from 'next/server';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const yogaApp = createYoga<{
  req: NextRequest
}>({
  schema: createSchema({
    typeDefs,
    resolvers
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response } // Needed for Next.js edge runtime compatibility
});

export const GET = (req: NextRequest, ctx: any) => yogaApp.handleRequest(req, ctx);
export const POST = (req: NextRequest, ctx: any) => yogaApp.handleRequest(req, ctx);
