import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendforgotPassowordMailUsecase } from "./SendForgotPasswordMailUseCase";


class SendforgotPassowordMailController{
    async handle(request:Request, response:Response):Promise<Response>{

        const {email} = request.body

        const sendforgotPassowordMailUsecase = container.resolve(SendforgotPassowordMailUsecase)

        await sendforgotPassowordMailUsecase.execute(email)

        throw new Error('not yet')
    }
}

export {SendforgotPassowordMailController}