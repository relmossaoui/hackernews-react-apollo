
const { GraphQLServer } = require('graphql-yoga');

const { prisma } = require('./generated/prisma-client');

const Query         = require('./resolvers/Query')
const Mutation      = require('./resolvers/Mutation')
const Subscription  = require('./resolvers/Subscription')

const Link          = require('./resolvers/Link')
const User          = require('./resolvers/User')
const Vote          = require('./resolvers/Vote')


// GraphQL Resolvers
const resolvers = { Query, Mutation, Subscription, Link, User, Vote }

// GraphQL server
// This tells the server what API operations are accepted and how they should be resolved
const server = new GraphQLServer({
    typeDefs : './schema.graphql',
    resolvers,
    context: request => {
        return {
          ...request,
          prisma,
        }
    },
})

server.start(() => console.log(`Server is running on port :  4000 `))

