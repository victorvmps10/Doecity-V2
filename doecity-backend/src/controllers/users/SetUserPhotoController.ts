import { Request, Response } from "express";
import { SetUserPhotoService } from "../../services/users/SetUserPhotoService";



class SetUserPhotoController {
    async handle(req: Request, res: Response) {
        try {
            const {user_id} = req.body;
            let photo = '';
            if (req.file) {
                photo = req.file.filename;
            }
            const userPhotoService = new SetUserPhotoService();
            console.log(req.user_id);
            if (!req.user_id || !photo) {
                return res.status(400).json({ error: "Dados incompletos" });
            }
            const UserPhotoService = await userPhotoService.execute({
                user_id: user_id,
                photo
            });
            return res.json(UserPhotoService);
        } catch (err) {
            throw new Error("Erro na requisição/execução do serviço:" + err);
        }

    }



}

export { SetUserPhotoController };
