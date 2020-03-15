module.exports = {
    user(parent, args, context, info) {
        return context.prisma.vote({ id : parent.id }).user()
    },

    link(parent, args, context, info) {
        return context.prisma.vote({ id : parent.id }).link()
    },
}