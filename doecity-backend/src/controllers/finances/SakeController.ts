import { Request, Response } from "express";
import { SakeService } from "../../services/finances/SakeService";

class SakeController {
    async handle(req: Request, res: Response) {
        try {
            const { value, title, description, user_id } = req.body;
            const sakeService = new SakeService();
            const sake = await sakeService.execute({
                value, title, description, user_id
            })
            return res.json(sake);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { SakeController };