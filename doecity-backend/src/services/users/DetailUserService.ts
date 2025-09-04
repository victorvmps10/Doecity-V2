import prismaClient from "../../prisma";

interface DetailRequest {
    user_id?: string,
    username?: string;
    isSearch?: boolean,
}
class DetailUserService {
    async execute({ username, user_id, isSearch }: DetailRequest) {
        if (isSearch) {
            const search = await prismaClient.users.findMany({
                where: {
                    username:{
                        startsWith: username,
                        mode: 'insensitive'
                    },
                    isONG: true
                },
                select: {
                    name: true,
                    username: true,
                    photo: true
                }
            });
            return search;
        }
        const detail = await prismaClient.users.findFirst({
            where: {
                id: user_id
            },
            select: {
                name: true,
                username: true,
                email: true,
            }
        })

        return detail;
    }
}

export { DetailUserService };