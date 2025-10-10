import prismaClient from "../../prisma";

interface CreateRequest {
    title: string;
    description: string;
    user_id: string;
    photo: string;
}

class CreatePostService {
    async execute({ title, description, user_id, photo }: CreateRequest) {
        const userAlreadyExists = await prismaClient.users.findFirst({
            where:{
                id: user_id
            },
            select:{
                username: true,
                photo: true
            }
        });
        if(!userAlreadyExists){
            throw new Error("User Não Existe")
        }
        const create = await prismaClient.posts.create({
            data: {
                title,
                description,
                photo,
                user_id,
                draft: false, 
                userName: userAlreadyExists.username,
                photo_user: userAlreadyExists.photo
            }
        });
        return create;
    }
}

export { CreatePostService };