import { Request, Response } from "express";
import { AddLikeService } from "../../services/posts/AddLikeService";

class AddLikeController{
    async handle(req: Request, res: Response){
        const { post_id } = req.body;
        const user_id = req.user_id;
        const addLikeService = new AddLikeService();
        const addLike = await addLikeService.execute({
            user_id, post_id
        });
        return res.json(addLike);
    }
}

export { AddLikeController };