import { Request, Response } from "express";
import { DetailUserService } from "../../services/users/DetailUserService";

class DetailUserController {
    async handle(req: Request, res: Response) {
        try {
            const { user_id } = req.body;
            const detailService = new DetailUserService();
            const detail = await detailService.execute({
                user_id: user_id
            })
            return res.json(detail);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }
    }
}

export { DetailUserController };