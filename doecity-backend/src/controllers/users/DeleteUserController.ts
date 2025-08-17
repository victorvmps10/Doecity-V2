import { Request, Response } from "express";
import { DeleteUserService } from "../../services/users/DeleteUserService";


class DeleteUserController {
    async handle(req: Request, res: Response) {
        try {
            const user_id = req.user_id;
            const deleteService = new DeleteUserService();
            const remove = await deleteService.execute({
                user_id
            });

            return res.json(remove);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { DeleteUserController };