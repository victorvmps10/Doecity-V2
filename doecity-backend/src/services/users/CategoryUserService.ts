import prismaClient from "../../prisma";

interface CategoryRequest {
    user_id: string;
    category_id: string;
}

class CategoryUserService {
    async execute({ user_id, category_id }: CategoryRequest) {
        const upd = prismaClient.users.update({
            where: {
                id: user_id
            }, data: {
                category_id
            }
        });
        return upd;
    }

}

export { CategoryUserService };