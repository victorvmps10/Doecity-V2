import prismaClient from "../../prisma";

interface DetailRequest{
    user_id: string

}
class DetailUserService{
    async execute({user_id}: DetailRequest){
        const detail = await prismaClient.users.findFirst({
            where:{
                id: user_id
            }
        })

        return detail;
    }
}

export { DetailUserService };