import { Request, Response } from "express";
import { RemoveLikeService } from "../../services/posts/RemoveLikeService";

class RemoveLikeController{
    async handle(req: Request, res: Response){
        const { post_id } = req.body;
        const user_id = req.user_id;
        const removeLikeService = new RemoveLikeService();
        const removeLike = await removeLikeService.execute({
            user_id, post_id
        });
        return res.json(removeLike);
    }
}

export { RemoveLikeController };