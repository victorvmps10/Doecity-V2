import { Request, Response } from "express";
import { EditUserService } from "../../services/users/EditUserService";


class EditUserController {
    async handle(req: Request, res: Response) {
        try {
            const {
                username,
                name,
                email,
                description,
            } = req.body;
            const editService = new EditUserService();
            console.log(req.user_id);
            const edit = await editService.execute({
                user_id: req.user_id,
                username,
                name,
                email,
                description,
            });
            return res.json(edit);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }



}

export { EditUserController };