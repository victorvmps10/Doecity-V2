import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/categorys/CreateCategoryService";

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        try {
            const { name, description, photo } = req.body;
            const createService = new CreateCategoryService();
            const create = await createService.execute({
                name, description, photo
            })
            return res.json(create);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { CreateCategoryController };