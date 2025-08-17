import { Request, Response } from "express";
import { AuthUserService } from "../../services/users/AuthUserService";

class AuthUserController {
    async handle(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const authService = new AuthUserService();
            const auth = await authService.execute({
                email, password
            })
            return res.json(auth);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { AuthUserController };