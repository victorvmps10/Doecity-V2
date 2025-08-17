import prismaClient from "../../prisma";

interface RemoveRequest {
   id: string;
}
class DeleteCategoryService {
    async execute({ id }: RemoveRequest) {
        const removeUsers = await prismaClient.users.updateMany({
            where:{
                category_id: id
            },
            data:{
                category_id: null
            }
        });
        const removeCategory = await prismaClient.category.delete({
            where:{
                id
            }
        });

        return {message: "Categoria deletado!!!"};
    }
}

export { DeleteCategoryService };