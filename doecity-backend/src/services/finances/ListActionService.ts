import prismaClient from "../../prisma";

interface ListActionRequest {
    user_id?: string;
    ong_id?: string;
    isONG: boolean;
}

class ListActionService {
    async execute({ user_id, ong_id, isONG }: ListActionRequest) {
        if (isONG) {
            const list = await prismaClient.finances.findMany({
                where: {
                    OR: [
                        { ong_id: ong_id },
                        { user_id: ong_id }
                    ]
                },
                orderBy: {
                    created_at: 'desc'
                }
            })
            return list;
        } else {
            const list = await prismaClient.finances.findMany({
                where: {
                    OR: [
                        { ong_id: user_id },
                        { user_id: user_id }
                    ]
                },
                orderBy: {
                    created_at: 'desc'
                }
            })
            return list;
        }

    }
}

export { ListActionService };