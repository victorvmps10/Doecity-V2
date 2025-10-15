import { Request, Response } from "express";
import { DepositService } from "../../services/finances/DepositService";
import { DonateService } from "../../services/finances/DonateService";

class DonateController {
    async handle(req: Request, res: Response) {
        try {
            const { value, title, description, user_id, ong_id } = req.body;
            const donateService = new DonateService();
            const donate = await donateService.execute({
                value, title, description, user_id, ong_id
            })
            return res.json(donate);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { DonateController };