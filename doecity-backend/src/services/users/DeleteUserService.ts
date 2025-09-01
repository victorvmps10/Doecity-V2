import prismaClient from "../../prisma";

interface DeleteRequest {
    user_id: string;
}
class DeleteUserService {
    async execute({ user_id }: DeleteRequest) {
        const remove = await prismaClient.users.delete({
            where:{
                id: user_id
            },
        });
        return "Removido com sucesso";
    }
}

export { DeleteUserService };