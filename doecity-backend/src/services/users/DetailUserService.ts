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
                    username: {
                        startsWith: username,
                        mode: 'insensitive'
                    },
                    isONG: true
                },
                select: {
                    id: true,
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
                id: true,
                name: true,
                username: true,
                email: true,
                description: true,
                created_at: true,
                update_at: true,
                photo: true,
                balance: true,
            }
        })

        return detail;
    }
}

export { DetailUserService };