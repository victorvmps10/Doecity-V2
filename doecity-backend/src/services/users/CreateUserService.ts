import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
interface CreateRequest {
    username: string;
    email: string;
    photo: string;
    category_id: string;
    password: string;
    isONG: boolean;
}
class CreateUserService {
    async execute({ username, email, password, isONG, category_id, photo }: CreateRequest) {
            const userAlreadyExists = await prismaClient.users.findFirst({
                where: {
                    email
                }
            })
            if (userAlreadyExists) {
                throw new Error("Usuario já existente!!!")
            }
            const passwordHash = await hash(password, 8);
            const user = await prismaClient.users.create({
                data: {
                    username,
                    name: username,
                    email,
                    password: passwordHash,
                    isONG,
                    category_id,
                    photo
                }
            })
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

export { CreateUserService };