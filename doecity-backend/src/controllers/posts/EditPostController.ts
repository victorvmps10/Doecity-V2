import { Request, Response } from "express";
import { EditPostService } from "../../services/posts/EditPostService";


class EditPostController{
    async handle(req: Request, res: Response){
        const { user_id, post_id, title, description, photo } = req.body;
        const editService = new EditPostService();
        const editPost = await editService.execute({
            user_id, post_id, title, description, photo
        });
        return res.json(editPost);
    }
}

export { EditPostController };