import { Request, Response } from "express";
import { CreateMessageService } from "../../services/messages/CreateMessageService";

class CreateMessageController {
    async handle(req: Request, res: Response) {
        try {
            const user_id = req.user_id;
            const { message, post_id, chat_id } = req.body;
            const createService = new CreateMessageService();
            const create = await createService.execute({
                user_id, message, post_id, chat_id
            })
            return res.json(create);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { CreateMessageController };