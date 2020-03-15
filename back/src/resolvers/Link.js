module.exports = {
    postedBy(parent, args, context) {
        return context.prisma.link({ id: parent.id}).postedBy()
    },

    votes(parent, args, context) {
        return context.prisma.link({ id: parent.id}).votes()
    }
}