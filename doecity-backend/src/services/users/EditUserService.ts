import { compare } from "bcryptjs";
import prismaClient from "../../prisma";

interface EditRequest{
    user_id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    description: string;
    photo: string;
}

class EditUserService{
    async execute({
        user_id, name, username, email, password, description, photo
    }: EditRequest){
        const userAlreadyExists = await prismaClient.users.findFirst({
            where:{
                id: user_id
            },
            select:{
                password: true
            }
        })
        if(!userAlreadyExists){
            throw new Error("Error Aplication FrontEnd!!!");
        }
        const correctPassword = compare(password, userAlreadyExists.password);
        if(!correctPassword){
            throw new Error("Password Incorrect!!!");
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
                photo,
                update_at: new Date()
            }
        });
        return updateUser;
    }
}

export { EditUserService };