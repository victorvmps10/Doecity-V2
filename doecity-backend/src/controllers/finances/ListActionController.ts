import { Request, Response } from "express";
import { ListActionService } from "../../services/finances/ListActionService";


class ListActionController {
    async handle(req: Request, res: Response) {
        try {
            const { isONG, user_id, ong_id } = req.query as {
                isONG: string;
                user_id: string;
                ong_id: string;
            };;
            const listService = new ListActionService();
            const list = await listService.execute({
                user_id, ong_id, isONG: isONG === 'true' ? true : false
            })
            return res.json(list);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { ListActionController };