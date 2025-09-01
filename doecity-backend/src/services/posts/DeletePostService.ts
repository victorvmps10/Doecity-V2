import prismaClient from "../../prisma";

interface RemoveRequest {
    user_id: string;
    post_id: string;
}

class DeletePostService {
    async execute({ user_id, post_id }: RemoveRequest) {
        const removeLikes = await prismaClient.likes.deleteMany({
            where:{
                post_id
            }
        })
        const remove = await prismaClient.posts.delete({
            where: {
                id: post_id,
                user_id
            },
        });
        if (!remove) {
            return false;
        }
        return {message: "Post Deletado"};
    }
}

export { DeletePostService };