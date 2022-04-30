import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/AppError";

import { hash } from "bcryptjs"



@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUserRepository) { }

    async execute({
        name,
        email,
        driver_license,
        password
    }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.userRepository.findByEmail(email)

        if(userAlreadyExists){
            throw new AppError("User Already Exist")
        }

        const passwordHash= await hash(password, 8)

        await this.userRepository.create({
            name,
            email,
            driver_license,
            password:passwordHash
        })
    }

}

export { CreateUserUseCase }