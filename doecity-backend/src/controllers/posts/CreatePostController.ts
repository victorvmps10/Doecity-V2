import { Request, Response } from "express";
import { CreatePostService } from "../../services/posts/CreatePostService";

class CreatePostController {
    async handle(req: Request, res: Response) {
        try {
            const { title, description } = req.body;
            const user_id = req.user_id;
            let photo = '';
            if (req.file) {
                photo = req.file.filename;
            }
            const createService = new CreatePostService();
            const create = await createService.execute({
                title, description, photo, user_id
            })
            return res.json(create);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { CreatePostController };