import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        try {
            const { username, email, password, ONG, category_id } = req.body;
            const createService = new CreateUserService();
            let isONG = false
            if(ONG=='true') {
              isONG = true
            } 
            let photo = '';
            if (req.file) {
                photo = req.file.filename;
            }
            const create = await createService.execute({
                username, email, password, isONG, category_id, photo
            })
            return res.json(create);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }
}

export { CreateUserController };