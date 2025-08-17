import prismaClient from "../../prisma";

interface EditRequest {
    user_id: string;
    post_id: string;
    title: string;
    description: string;
    photo: string;
}

class EditPostService {
    async execute({ user_id, post_id, title, description, photo }: EditRequest) {
        const update = await prismaClient.posts.update({
            where: {
                id: post_id,
                user_id
            },
            data: {
                title,
                description,
                photo
            }
        });
        if (!update) {
            return false;
        }
        return update;
    }
}

export { EditPostService };