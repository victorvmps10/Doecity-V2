import prismaClient from "../../prisma";

interface PublicRequest {
    post_id: string;
    user_id: string;
}

class PublicPostService {
    async execute({ post_id, user_id }: PublicRequest) {
        const publicPost = await prismaClient.posts.update({
            where: {
                id: post_id,
                user_id
            },
            data: {
                draft: false
            }
        });
        if (!publicPost) {
            return false;
        }
        return publicPost;
    }
}

export { PublicPostService };