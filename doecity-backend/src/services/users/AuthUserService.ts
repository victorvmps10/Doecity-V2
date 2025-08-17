import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}
class AuthUserService{
    async execute({email, password}: AuthRequest){
        const user = await prismaClient.users.findFirst({
            where: {
                email
            }
        })
        if(!user){
            throw new Error("Email/Senha Incorreta!!!");
        }
        const verifypassword = compare(
            user.password, 
            password
        );
        if(!verifypassword){
            throw new Error("Email/Senha Incorreta!!!");
        }
        const token = sign(
                    {
                        username: user.username,
                        email: user.email
                    },
                    process.env.JWT_SECRET,
                    {
                        subject: user.id,
                        expiresIn: '30d'
                    }
                )
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token: token
                };
    }
}

export { AuthUserService };