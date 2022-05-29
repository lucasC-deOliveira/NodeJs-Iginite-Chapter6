import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/user";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ProfileUserUseCase {

    constructor(
        @inject("UsersRepository")
    private usersRepository: IUserRepository ) {
    }

    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(id)
        return UserMap.toDTO(user);
    }

}

export { ProfileUserUseCase }