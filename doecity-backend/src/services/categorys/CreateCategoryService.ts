import prismaClient from "../../prisma";

interface CreateRequest {
    name: string;
    description: string;
    photo?: string;
}
class CreateCategoryService {
    async execute({ name, description, photo }: CreateRequest) {
        const category = await prismaClient.category.create({
            data: {
                name,
                description,
                image: photo
            }
        });

        return category;
    }
}

export { CreateCategoryService };