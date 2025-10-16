import prismaClient from "../../prisma";

class DiscoverUserService {
    async execute() {

        const user = await prismaClient.users.findMany({
            where:{
                isONG: true
            },
            select: {
                id: true,
                name: true,
                username: true,
                photo: true,
                posts: { 
                    take: 1,
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        photo: true,
                        created_at: true,
                    },
                },
            },
        });

        return user;
    }
}

export { DiscoverUserService };