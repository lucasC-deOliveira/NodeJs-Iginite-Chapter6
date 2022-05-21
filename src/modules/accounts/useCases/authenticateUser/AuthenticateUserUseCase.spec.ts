
import { AppError } from "@shared/errors/AppError";

import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositorInMemory";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayJsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory:UsersTokensRepositoryInMemory
let createUserUseCase: CreateUserUseCase;
let dateProvider:IDateProvider

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);

    })


    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "user Test",
            email: "user@test.com",
            driver_license: "00123",
            password: "1234"
        }

        await createUserUseCase.execute(user);

        await usersRepositoryInMemory.findByEmail(user.email)



        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })



        expect(result).toHaveProperty("token");

    });


    it("should not be able to authenticate an nonexistent user", async () => {
        await expect(authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            })).rejects.toEqual(new AppError("Email or password incorrect!"))
       
    });

    it("should not be able to authenticate with incorrect password", async () => {
       
        const user: ICreateUserDTO = {
            driver_license: "9999",
            email: "user@user.com",
            password: "1234",
            name: "User test"
        }

        await createUserUseCase.execute(user)
        await expect( authenticateUserUseCase.execute({
                email: user.email,
                password: "2533"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"))
    })
})