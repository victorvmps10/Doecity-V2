import { Request, Response } from "express";
import { CategoryUserService } from "../../services/users/CategoryUserService";

class CategoryUserController {
    async handle(req: Request, res: Response) {
        try {
            const { category_id } = req.body;
            const user_id = req.user_id;
            const categoryUserService = new CategoryUserService();
            const categoryUser = await categoryUserService.execute({
                user_id, category_id
            })
            return res.json(categoryUser);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }
    }
}

export { CategoryUserController };