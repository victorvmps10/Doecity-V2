import prismaClient from '../../prisma';

interface ListRequest{
	post_id: string;
	chat_id: string;
}
class ListMessageService{
async execute({ post_id, chat_id }: ListRequest){
const messagesPost = await prismaClient.message.findMany({
	where:{
  		post_id
	}
});
if(!messagesPost){
const messagesChat = await prismaClient.message.findMany({
	where:{
  		chat_id 
	}
});
return messagesChat;
}
return messagesPost;
}
}

export { ListMessageService };