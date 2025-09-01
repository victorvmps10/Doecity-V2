import prismaClient from '../../prisma';

interface DeleteRequest{
	id: string;
	user_id: string;
}
class DeleteMessageService{
async execute({id, user_id}: DeleteRequest){

const remove = await prismaClient.message.delete({
 where:{
	id,
	user_id
}
});
return {message: "Messagem deletada com sucesso"};
}
}

export {DeleteMessageService};