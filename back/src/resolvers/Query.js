module.exports = {
    info : () => 'This is the API of a Hackernews Clone',
    async feed(parent, args, context)  {
        let where = args.filter ? {
            OR: [
                { description_contains: args.filter },
                { url_contains: args.filter },
            ],
        } : {}
        let links = await context.prisma.links({ 
            where, 
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy
        })

        const count = await context.prisma
        .linksConnection({
          where,
        })
        .aggregate()
        .count()

        return { links, count }
    },
    
    link : (parent, args, context) => context.prisma.link({
        id : args.id
    }) 
}