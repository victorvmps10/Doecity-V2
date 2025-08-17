import { Request, Response } from "express";
import { ListCategoryService } from "../../services/categorys/ListCategoryService";


class ListCategoryController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const listService = new ListCategoryService;
            const list = await listService.execute({id});
            return res.json(list);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err)
        }
    }
}

export { ListCategoryController };