import prismaClient from "../../prisma";

interface DeleteRequest {
    id: string;
}
class DeleteChatService { 
    async execute({ id }: DeleteRequest) {

        const remove = await prismaClient.private_Chat.delete({
            where:{
                id
            }
        });
        return remove;
    }
}

export { DeleteChatService };