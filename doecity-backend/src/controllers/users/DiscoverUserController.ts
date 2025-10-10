import { Request, Response } from "express";
import { DiscoverUserService } from "../../services/users/DiscoverUserService";

class DiscoverUserController {
    async handle(req: Request, res: Response) {
        try {
            const discoverService = new DiscoverUserService();
            const discover = await discoverService.execute();
            return res.json(discover);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { DiscoverUserController };