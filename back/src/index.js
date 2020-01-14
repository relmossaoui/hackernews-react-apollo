
const { GraphQLServer } = require('graphql-yoga');

const { prisma } = require('./generated/prisma-client')

// GraphQL Resolvers
const resolvers = {
    Query : {
        info : () => 'This is the API of a Hackernews Clone',
        feed : () => prisma.links(),
        link : (parent, args) => prisma.link({
            id : args.id
        }) 
    },

    Mutation : {
        post(parent, args) {

            return prisma.createLink({
                description : args.description,
                url: args.url
            })
        },

        async updateLink(parent, args) {
            let data = {}

            if (args.url) data.url = args.url
            if (args.description) data.description = args.description

            return prisma.updateLink({data, where: { id: args.id}})
        },

        deleteLink(parent, args) {
            return prisma.deleteLink({id: args.id})
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
    resolvers
})

server.start(() => console.log(`Server is running on port :  4000 `))

