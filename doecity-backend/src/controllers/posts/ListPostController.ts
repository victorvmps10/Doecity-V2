import { Request, Response } from "express";
import { ListPostService } from "../../services/posts/ListPostService";


class ListPostController{
    async handle(req: Request, res: Response){
        const { user_id } = req.body;
        const listService = new ListPostService();
        const listPost = await listService.execute({
            user_id
        });
        return res.json(listPost);
    }
}

export { ListPostController };