import { inject, injectable } from "tsyringe"
import { IUserRepository } from "../../repositories/IUsersRepository"
import {compare} from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from "@shared/errors/AppError"


interface IRequest {
    email: string,
    password: string
}

interface IResponse{
    user: {
        name:string,
        email:string
    },
    token:string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) { }

    async execute({ email, password }: IRequest) : Promise<IResponse>{
        //user exists
        const user = await this.usersRepository.findByEmail(email)
        if(!user){
            throw new AppError("Email or password incorrect!")
        }
        // is wrong password
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new AppError("Email or password incorrect!")
        }

        //generate webtoken
        const token= sign({},"56adc43c44d0ca3e703caba325517545",{
            subject: user.id,
            expiresIn: "1d"
        })
        

        const tokenReturn:IResponse = {
            user:{
                name:user.name,
                email:user.email},
                token

        }

        return tokenReturn
        
    }
}

export { AuthenticateUserUseCase }