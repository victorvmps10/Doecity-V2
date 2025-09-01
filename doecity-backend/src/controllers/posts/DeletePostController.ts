import { Request, Response } from "express";
import { DeletePostService } from "../../services/posts/DeletePostService";

class DeletePostController{
    async handle(req: Request, res: Response){
        const { post_id } = req.body;
        const user_id = req.user_id;
        const deleteService = new DeletePostService();
        const deletePost = await deleteService.execute({
            user_id, post_id
        });
        return res.json(deletePost);
    }
}

export { DeletePostController };