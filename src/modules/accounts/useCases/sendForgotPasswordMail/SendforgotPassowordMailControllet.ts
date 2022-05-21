import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendforgotPassowordMailUsecase } from "./SendForgotPasswordMailUseCase";


class SendforgotPassowordMailController{
    async handle(request:Request, response:Response):Promise<Response>{

        const {email} = request.body

        const sendforgotPassowordMailUsecase = container.resolve(SendforgotPassowordMailUsecase)

        await sendforgotPassowordMailUsecase.execute(email)

     return response.send()
    }
}

export {SendforgotPassowordMailController}