import prismaClient from "../../prisma";

interface RemoveRequest {
    post_id: string;
    user_id: string;
}

class RemoveLikeService {
    async execute({ post_id, user_id }: RemoveRequest) {
        const likeAlreadyExists = await prismaClient.likes.findFirst({
            where: {
                post_id,
                user_id
            }
        });
        const postInfo = await prismaClient.posts.findFirst({
            where: {
                id: post_id
            }
        });
        if (!likeAlreadyExists) {
            throw new Error("Like não existe!!!");
        }
        const likeMinus = postInfo.likesCount - 1;
        const ID_LIKE = likeAlreadyExists.id;
        const removeLikeLink = await prismaClient.likes.delete({
           where:{
            id: ID_LIKE
           }
        });
        const likeRemove = await prismaClient.posts.update({
            where: {
                id: post_id
            },
            data: {
                likesCount: likeMinus
            }
        });
        return {message: 'like removido!!!'};
    }
}

export { RemoveLikeService };