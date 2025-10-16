import prismaClient from "../../prisma";

interface SaldRequest {
    user_id: string,
}

class SaldService {
    async execute({ user_id }: SaldRequest) {
        const ongBalance = await prismaClient.users.findFirst({
            where: {
                id: user_id
            },
            select: {
                balance: true
            }
        })
        return ongBalance;
    }
}
export { SaldService };