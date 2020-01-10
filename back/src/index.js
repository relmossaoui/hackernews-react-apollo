
const { GraphQLServer } = require('graphql-yoga');

let { links } = require('./mock')

// GraphQL Schema
const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!
    }

    type Mutation {
        post(url: String!, description: String!): Link!
    }

    type Link {
        id : ID!
        description: String!
        url: String!
    }
`

// GraphQL Resolvers
let idCount = links.length;
const resolvers = {
    Query : {
        info : () => 'null',
        feed : () => links
    },

    Mutation : {
        post(parent, args) {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }

            links.push(link)

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
    typeDefs,
    resolvers
})

server.start(() => console.log(`Server is running on port :  4000 `))

