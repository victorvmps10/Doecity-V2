import prismaClient from "../../prisma";

interface SakeRequest {
    value: number;
    title: string;
    description: string;
    user_id: string;
}

class SakeService {
    async execute({ value, title, description, user_id }: SakeRequest) {
        const action = true; //False -> Receber
        const user = await prismaClient.users.findFirst({
            where: {
                id: user_id
            },
            select: {
                balance: true
            }
        });
        if (user.balance >= value) {
            const deposit = await prismaClient.finances.create({
                data: {
                    action,
                    title,
                    value,
                    description,
                    user_id,
                }
            })
            const update = await prismaClient.users.update({
                where: {
                    id: user_id
                },
                data: {
                    balance: user.balance - value
                }
            })
            return deposit;
        }
        throw new Error("Sem saldo!!!");
    }
}

export { SakeService };