import {Router} from "express";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import uploadConfig from "@config/upload"
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

const uploadAvatar = multer(uploadConfig)

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar", ensureAuthenticated ,uploadAvatar.single("avatar"),updateUserAvatarController.handle)

usersRoutes.get('/profile',ensureAuthenticated,profileUserController.handle)

export {usersRoutes}