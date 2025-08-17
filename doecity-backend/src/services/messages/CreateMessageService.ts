import prismaClient from '../../prisma';

interface CreateRequest{
	user_id: string;
	message: string;
	post_id: string;
	chat_id: string;
}
class CreateMessageService{
async execute({user_id, message, post_id, chat_id}: CreateRequest){
const userInfo = await prismaClient.users.findFirst({
	where:{
  		id: user_id
	},
	select:{
	name: true
	}
});
const create = await prismaClient.message.create({
 data:{
	owner_name: userInfo.name,
	content: message,
    user_id,
	post_id,
	chat_id
}
});
return create;
}
}

export {CreateMessageService };