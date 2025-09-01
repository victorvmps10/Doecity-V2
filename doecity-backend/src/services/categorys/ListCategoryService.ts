import prismaClient from "../../prisma";

interface ListRequest {
    id?: string;
}

class ListCategoryService {
    async execute({ id }: ListRequest) {
        if (!id) {
            const list = await prismaClient.category.findMany({});
            return list;
        }
        const list = await prismaClient.category.findFirst({
            where: {
                id
            }
        });

        return list;
    }
}

export { ListCategoryService };