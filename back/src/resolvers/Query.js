module.exports = {
    info : () => 'This is the API of a Hackernews Clone',
    feed : (parent, args, context) => context.prisma.links(),
    link : (parent, args, context) => context.prisma.link({
        id : args.id
    }) 
}