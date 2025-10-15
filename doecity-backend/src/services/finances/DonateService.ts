import prismaClient from "../../prisma";

interface DonateRequest {
    value: number;
    title?: string;
    description?: string;
    user_id: string;
    ong_id: string;
}

class DonateService {
    async execute({ value, title, description, user_id, ong_id }: DonateRequest) {
        const action = false; //False -> Receber
        const deposit = await prismaClient.finances.create({
            data: {
                action,
                title,
                value,
                description,
                user_id,
                ong_id
            }
        })
        const user = await prismaClient.users.findFirst({
            where: {
                id: user_id
            },
            select: {
                balance: true
            }
        });
        const ong = await prismaClient.users.findFirst({
            where: {
                id: ong_id
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
                balance: user.balance - value
            }
        })
        const updateONG = await prismaClient.users.update({
            where: {
                id: user_id
            },
            data: {
                balance: user.balance + value
            }
        });
        return deposit;
    }
}

export { DonateService };