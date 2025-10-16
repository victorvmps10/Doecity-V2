import { Request, Response } from "express";
import { SaldService } from "../../services/finances/SaldService";

class SaldController {
    async handle(req: Request, res: Response) {
        try {
            const { user_id } = req.query as {user_id: string};
            const saldService = new SaldService();
            const sald = await saldService.execute({
                user_id
            })
            return res.json(sald);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { SaldController };