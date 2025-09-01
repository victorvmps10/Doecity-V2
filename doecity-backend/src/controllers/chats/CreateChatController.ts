import { Request, Response } from "express";
import { CreateChatService } from "../../services/chats/CreateChatService";

class CreateChatController {
    async handle(req: Request, res: Response) {
        try {
            const { ong_id, doador_id } = req.body;
            const createService = new CreateChatService();
            const create = await createService.execute({
                ong_id, doador_id
            })
            return res.json(create);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { CreateChatController };