import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvidets";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import {v4 as uuid} from "uuid"

@injectable()
class SendforgotPassowordMailUsecase{

    constructor(
        @inject("UsersRepository")
        private usersRepository:IUserRepository,
        @inject("UsersTokenRepository")
        private userTokenRepository:IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider:IDateProvider
    ){}

    async execute(email:string){
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError("User does not exists")
        }

        const token = uuid()

        const expires_date = this.dayjsDateProvider.addHours(3)

        await this.userTokenRepository.create({
            refresh_token:token,
            user_id: user.id,
            expires_date:expires_date 
        })
    }

}

export{
    SendforgotPassowordMailUsecase
}