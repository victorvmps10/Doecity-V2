import prismaClient from "../../prisma";

interface DepositRequest {
    value: number;
    title?: string;
    description?: string;
    user_id: string;
}

class DepositService {
    async execute({ value, title, description, user_id }: DepositRequest) {
        const action = false; //False -> Receber
        const deposit = await prismaClient.finances.create({
            data: {
                action,
                title,
                value,
                description,
                user_id
            }
        })
        const user = await prismaClient.users.findFirst({
            where: {
                id: user_id
            },
            select: {
                balance: true
            }
        })
        const update = await prismaClient.users.update({
            where: {
                id: user_id
            },
            data: {
                balance: user.balance + value
            }
        })
        return deposit;
    }
}

export { DepositService };