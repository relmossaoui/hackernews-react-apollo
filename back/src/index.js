
const { GraphQLServer } = require('graphql-yoga');

let { links } = require('./mock')

// GraphQL Resolvers
let idCount = links.length;
const resolvers = {
    Query : {
        info : () => 'This is the API of a Hackernews Clone',
        feed : () => links,
        link : (parent, args) => links.find(link => link.id === args.id)
    },

    Mutation : {
        post(parent, args) {
            const link = {
                id: `link-${idCount++}`,
                description : args.description,
                url: args.url
            }

            links.push(link)

            return link
        },

        updateLink(parent, args) {
            let link = links.find(link => link.id === args.id)

            if (!link) return null

            if (args.url) link.url = args.url
            if (args.description) link.description = args.description

            return link
        },

        deleteLink(parent, args) {
            let index = links.findIndex(link => link.id === args.id);
            let link = null;
            if (index > -1) {
                link = links[index]
                links.splice(index, 1)
            }

            return link
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

