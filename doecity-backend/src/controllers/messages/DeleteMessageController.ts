import { Request, Response } from "express";
import { DeleteMessageService } from "../../services/messages/DeleteMessageService";

class DeleteMessageController {
    async handle(req: Request, res: Response) {
        try {
            const user_id = req.user_id;
            const { id } = req.body;
            const removeService = new DeleteMessageService();
            const remove = await removeService.execute({
                id, user_id
            })
            return res.json(remove);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { DeleteMessageController };