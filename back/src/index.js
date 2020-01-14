
const { GraphQLServer } = require('graphql-yoga');

const { prisma } = require('./generated/prisma-client')

// GraphQL Resolvers
const resolvers = {
    Query : {
        info : () => 'This is the API of a Hackernews Clone',
        feed : (parent, args, context) => context.prisma.links(),
        link : (parent, args, context) => context.prisma.link({
            id : args.id
        }) 
    },

    Mutation : {
        post(parent, args, context) {

            return context.prisma.createLink({
                description : args.description,
                url: args.url
            })
        },

        updateLink(parent, args, context) {
            let data = {}

            if (args.url) data.url = args.url
            if (args.description) data.description = args.description

            return context.prisma.updateLink({data, where: { id: args.id}})
        },

        deleteLink(parent, args, context) {
            return context.prisma.deleteLink({id: args.id})
        }
    },

    // No need to definde resolvers for Link type fields (are trivials)
    Link : {

    }
}

// GraphQL server
// This tells the server what API operations are accepted and how they should be resolved
const server = new GraphQLServer({
    typeDefs : './schema.graphql',
    resolvers,
    context : { prisma }
})

server.start(() => console.log(`Server is running on port :  4000 `))

