import { Request, Response } from "express";
import { DetailUserService } from "../../services/users/DetailUserService";

class DetailUserController {
    async handle(req: Request, res: Response) {
        try {
            const { user_id, Search, username } = req.query as { user_id?: string, Search?: string, username?: string };
            const detailService = new DetailUserService();
            let isSearch = true;
            if(Search=="false"){
                isSearch = false;
            }
            const detail = await detailService.execute({
                user_id, isSearch, username
            })
            return res.json(detail);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }
    }
}

export { DetailUserController };