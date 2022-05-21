import { SendforgotPassowordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendforgotPassowordMailControllet";
import { Router } from "express";

const passwordRoutes = Router()


const sendforgotPassowordMailController = new SendforgotPassowordMailController()

passwordRoutes.post("/forgot",sendforgotPassowordMailController.handle)

export {passwordRoutes}