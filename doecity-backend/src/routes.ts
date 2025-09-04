import { Router } from "express";
import multer from "multer";
import uploadConfig from './config/multer';

import { isAutenticated } from "./middlewares/isAutenticated";
import { isONG } from "./middlewares/isONG";

import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";
import { EditUserController } from "./controllers/users/EditUserController";
import { DetailUserController } from "./controllers/users/DetailUserController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { CategoryUserController } from "./controllers/users/CategoryUserController";

import { CreateCategoryController } from "./controllers/categorys/CreateCategoryController";
import { DeleteCategoryController } from "./controllers/categorys/DeleteCategoryController";
import { ListCategoryController } from "./controllers/categorys/ListCategoryController";

import { CreatePostController } from "./controllers/posts/CreatePostController";
import { EditPostController } from "./controllers/posts/EditPostController";
import { ListPostController } from "./controllers/posts/ListPostController";
import { PublicPostController } from "./controllers/posts/PublicPostController";
import { DeletePostController } from "./controllers/posts/DeletePostController";

import { AddLikeController } from "./controllers/posts/AddLikeController";
import { RemoveLikeController } from "./controllers/posts/RemoveLikeController";

import { CreateChatController } from "./controllers/chats/CreateChatController";
import { DeleteChatController } from "./controllers/chats/DeleteChatController";
import { ListChatController } from "./controllers/chats/ListChatController";

import { CreateMessageController } from "./controllers/messages/CreateMessageController";
import { DeleteMessageController } from "./controllers/messages/DeleteMessageController";
import { ListMessageController } from "./controllers/messages/ListMessageController";



const router = Router();

const upload = multer(uploadConfig.upload("./images"));

// -- ROTAS DE USUARIO 

router.post('/users/create', upload.single('file'), new CreateUserController().handle);
router.post('/users/auth', new AuthUserController().handle);
router.put('/users/category', isAutenticated, new CategoryUserController().handle);
router.get('/users/detail', isAutenticated, new DetailUserController().handle);
router.put('/users/edit', isAutenticated, new EditUserController().handle);
router.delete('/users/delete', isAutenticated, new DeleteUserController().handle);
// -- ROTAS DE CATEGORY

router.post('/category/create', isAutenticated, upload.single('file'), new CreateCategoryController().handle);
router.delete('/category/delete', new DeleteCategoryController().handle);
router.get('/category/list', new ListCategoryController().handle);

// -- ROTAS DE FINANCES

// -- ROTAS DE POSTS

router.post('/posts/create', isAutenticated, isONG, upload.single('file'), new CreatePostController().handle);
router.put('/posts/edit', isAutenticated, isONG, upload.single('file'), new EditPostController().handle);
router.delete('/posts/delete', isAutenticated, new DeletePostController().handle);
router.get('/posts/list', isAutenticated, new ListPostController().handle);
router.put('/posts/public', isAutenticated, isONG, new PublicPostController().handle);

// -- ROTAS DE LIKE

router.post('/like/add', isAutenticated, new AddLikeController().handle);
router.delete('/like/remove', isAutenticated, new RemoveLikeController().handle);

// -- ROTAS DE CHAT

router.post('/chat/create', isAutenticated, new CreateChatController().handle);
router.delete('/chat/delete', isAutenticated, new DeleteChatController().handle);
router.get('/chat/list', isAutenticated, new ListChatController().handle);

// -- ROTAS DE MESSAGE

router.post('/message/create', isAutenticated, new CreateMessageController().handle);
router.delete('/message/delete', isAutenticated, new DeleteMessageController().handle);
router.get('/message/list', isAutenticated, new ListMessageController().handle);

export {router};