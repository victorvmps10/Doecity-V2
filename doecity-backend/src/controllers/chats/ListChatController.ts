import { Request, Response } from "express";
import { ListChatService } from "../../services/chats/ListChatService";

class ListChatController {
    async handle(req: Request, res: Response) {
        try {
            const user_id = req.user_id;
            const listService = new ListChatService();
            const list = await listService.execute({
                user_id
            })
            return res.json(list);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { ListChatController };