import prismaClient from "../../prisma";

interface AddRequest {
    post_id: string;
    user_id: string;
}

class AddLikeService {
    async execute({ post_id, user_id }: AddRequest) {
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
        if (likeAlreadyExists) {
            throw new Error("Like já existe!!!");
        }
        const likePlus = postInfo.likesCount + 1;
        const createLikeLink = await prismaClient.likes.create({
            data: {
                post_id,
                user_id
            }
        });
        const likeAdd = await prismaClient.posts.update({
            where: {
                id: post_id
            },
            data: {
                likesCount: likePlus
            }
        });
        return createLikeLink;
    }
}

export { AddLikeService };