import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendforgotPassowordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendforgotPassowordMailControllet";
import { Router } from "express";

const passwordRoutes = Router()


const sendforgotPassowordMailController = new SendforgotPassowordMailController()

passwordRoutes.post("/forgot",sendforgotPassowordMailController.handle)

const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post("/reset", resetPasswordUserController.handle)

export {passwordRoutes}