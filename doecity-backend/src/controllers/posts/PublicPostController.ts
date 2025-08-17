import { Request, Response } from "express";
import { PublicPostService } from "../../services/posts/PublicPostService";


class PublicPostController{
    async handle(req: Request, res: Response){
        const { post_id } = req.body;
        const user_id = req.user_id;
        const publicService = new PublicPostService();
        const publicPost = await publicService.execute({
            post_id, user_id
        });
        return res.json(publicPost);
    }
}

export { PublicPostController };