import { Request, Response } from "express";
import { DepositService } from "../../services/finances/DepositService";

class DepositController {
    async handle(req: Request, res: Response) {
        try {
            const { value, title, description, user_id } = req.body;
            const depositService = new DepositService();
            const deposit = await depositService.execute({
                value, title, description, user_id
            })
            return res.json(deposit);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { DepositController };