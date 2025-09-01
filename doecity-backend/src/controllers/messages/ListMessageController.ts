import { Request, Response } from "express";
import { ListMessageService } from "../../services/messages/ListMessageService";

class ListMessageController {
    async handle(req: Request, res: Response) {
        try {
            const {post_id, chat_id} = req.body;
            const listService = new ListMessageService();
            const list = await listService.execute({
                post_id, chat_id
            })
            return res.json(list);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { ListMessageController };