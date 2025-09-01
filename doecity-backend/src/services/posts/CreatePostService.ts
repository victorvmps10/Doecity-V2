import prismaClient from "../../prisma";

interface CreateRequest {
    title: string;
    description: string;
    user_id: string;
    photo: string;
    draft: boolean;
}

class CreatePostService {
    async execute({ title, description, user_id, photo, draft }: CreateRequest) {
        const userName = await prismaClient.users.findFirst({
            where:{
                id: user_id
            },
            select:{
                name: true
            }
        });

        const create = await prismaClient.posts.create({
            data: {
                title,
                description,
                photo,
                user_id,
                draft, 
                userName: userName.name
            }
        });
        return create;
    }
}

export { CreatePostService };