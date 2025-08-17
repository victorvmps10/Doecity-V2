import prismaClient from "../../prisma";

interface CreateRequest {
    title: string;
    description: string;
    user_id: string;
    photo: string;
}

class CreatePostService {
    async execute({ title, description, user_id, photo }: CreateRequest) {
        const create = await prismaClient.posts.create({
            data: {
                title,
                description,
                photo,
                user_id
            }
        });
        return create;
    }
}

export { CreatePostService };