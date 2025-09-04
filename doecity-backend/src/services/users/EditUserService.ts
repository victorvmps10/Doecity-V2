import { compare } from "bcryptjs";
import prismaClient from "../../prisma";

interface EditRequest{
    user_id: string;
    name: string;
    username: string;
    email: string;
    description: string;
}

class EditUserService{
    async execute({
        user_id, name, username, email, description
    }: EditRequest){
        const userAlreadyExists = await prismaClient.users.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true
            }
        })
        if(!userAlreadyExists){
            throw new Error("Error Aplication FrontEnd!!!");
        }

        const updateUser = await prismaClient.users.update({
            where:{
                id: user_id
            },
            data:{
                name,
                username,
                email,
                description,
                update_at: new Date()
            }
        });
        return updateUser;
    }
}

export { EditUserService };