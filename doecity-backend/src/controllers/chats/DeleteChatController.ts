import { Request, Response } from "express";
import { DeleteChatService } from "../../services/chats/DeleteChatService";

class DeleteChatController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const removeService = new DeleteChatService();
            const remove = await removeService.execute({
                id
            })
            return res.json(remove);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { DeleteChatController };