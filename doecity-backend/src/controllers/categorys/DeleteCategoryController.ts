import { Request, Response } from "express";
import { DeleteUserService } from "../../services/users/DeleteUserService";
import { DeleteCategoryService } from "../../services/categorys/DeleteCategoryService";


class DeleteCategoryController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const deleteService = new DeleteCategoryService();
            const remove = await deleteService.execute({
                id
            });

            return res.json(remove);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { DeleteCategoryController };