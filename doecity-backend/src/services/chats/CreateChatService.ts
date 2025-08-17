import prismaClient from "../../prisma";

interface CreateRequest {
    doador_id: string;
    ong_id: string;
}
class CreateChatService {
    async execute({ doador_id, ong_id }: CreateRequest) {
        const create = await prismaClient.private_Chat.create({
            data:{
                doador_id, ong_id
            }
        });
        return create;
    }
}

export { CreateChatService };