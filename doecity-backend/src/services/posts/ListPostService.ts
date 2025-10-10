import prismaClient from "../../prisma";

interface ListRequest {
    user_id?: string;
}

class ListPostService {
    async execute({ user_id }: ListRequest) {
        const posts = await prismaClient.posts.findMany({
            where: {
                user_id,
                draft: false
            }
        });
        if (!user_id) {
            const postsMany = await prismaClient.posts.findMany({
                where: {
                    draft: false
                },
                orderBy: {
                    created_at: "desc"
                }
            });
            return postsMany;
        }
        return posts;
    }
}

export { ListPostService };