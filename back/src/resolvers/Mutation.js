const APP_SECRET = "jwt_secret"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
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
    },

    async signup(parent, { email, password, name }, context) {
        password = await bcrypt.hash(password, 10)

        let user = await context.prisma.createUser({ email, password, name })

        let token = jwt.sign({ userId : user.id }, APP_SECRET)

        return { user, token }
    },

    async login(parent, { email, password }, context) {
        let user = await context.prisma.user({ email })

        if (!user) { throw new Error('no such user found') } 

        let valid = await bcrypt.compare(password, user.password)

        if (!valid) throw Error('password incorrect')

        let token = jwt.sign({ userId : user.id }, APP_SECRET)

        return { user, token }
    },
}