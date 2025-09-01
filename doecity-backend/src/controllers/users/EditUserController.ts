import { Request, Response } from "express";
import { EditUserService } from "../../services/users/EditUserService";


class EditUserController {
    async handle(req: Request, res: Response) {
        try {
            const {
                username,
                name,
                email,
                password,
                description,
                photo
            } = req.body;
            const editService = new EditUserService();
            const edit = await editService.execute({
                user_id: req.user_id,
                username,
                name,
                email,
                password,
                description,
                photo
            });
            return res.json(edit);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }



}

export { EditUserController };