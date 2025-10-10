import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import fs from "fs";
import path from "path";

interface SetUserPhotoRequest {
    user_id: string;
    photo: string;
}

class SetUserPhotoService {
    async execute({
        user_id, photo
    }: SetUserPhotoRequest) {
        if (!photo) {
            throw new Error("Foto Invalida");
        }
        const userAlreadyExists = await prismaClient.users.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                photo: true
            }
        })
        if (!userAlreadyExists) {
            throw new Error("Error Aplication FrontEnd!!!");
        }
        if (userAlreadyExists.photo) {
            const oldFilePath = path.resolve(__dirname, "..", "..", "..", "images", userAlreadyExists.photo);
            if (fs.existsSync(oldFilePath)) {
                await fs.promises.unlink(oldFilePath);
                console.log("Foto antiga deletada:", userAlreadyExists.photo);
            }
        }
        const updateUser = await prismaClient.users.update({
            where: {
                id: user_id
            },
            data: {
                photo,
                update_at: new Date()
            },
            select:{
                photo: true
            }
        });
        const updatePhotoUserPost = await prismaClient.posts.updateMany({
            where: {
                user_id: user_id
            },
            data: {
                photo_user: updateUser.photo,
                update_at: new Date()
            }
        })
        return updateUser;
    }
}

export { SetUserPhotoService };