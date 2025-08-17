import prismaClient from "../../prisma";

interface ListRequest {
    user_id: string;
}
class ListChatService {
    async execute({ user_id }: ListRequest) {

        const listDoador = await prismaClient.private_Chat.findMany({
            where: {
                doador_id: user_id
            }
        });
        if (!listDoador) {
            const listONG = await prismaClient.private_Chat.findMany({
                where: {
                    ong_id: user_id
                }
            });
            return listONG;
        }
        return listDoador;
    }
}

export { ListChatService };