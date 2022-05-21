import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositorInMemory";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendforgotPassowordMailUsecase } from "./SendForgotPasswordMailUseCase"


let sendForgotPasswordMailUseCase: SendforgotPassowordMailUsecase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let dataProvider: DayjsDateProvider;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {


    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory()
        dataProvider = new DayjsDateProvider()
        usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory()
        mailProvider = new MailProviderInMemory()
        sendForgotPasswordMailUseCase = new SendforgotPassowordMailUsecase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dataProvider,
            mailProvider
        )


    })

    it("Should be able to send a forgot password mail to user", async () => {

        const sendMail = jest.spyOn(mailProvider,"sendMail")

        await usersRepositoryInMemory.create({
            driver_license: "88027795",
            email:"zitfip@wo.uy",
            name:"Elva Larson",
            password:"1234"
        })
        await sendForgotPasswordMailUseCase.execute("zitfip@wo.uy")
        expect(sendMail).toHaveBeenCalled();
    })

    it("should not be able to send an email if user not exists",async ()=>{
        await expect(sendForgotPasswordMailUseCase.execute("haude@li.km")).rejects.toEqual(new AppError("User does not exists"))
    })

    it("should be able to create an user token", async () =>{
        const generatedTokenMail = jest.spyOn(usersTokenRepositoryInMemory,"create")

        await usersRepositoryInMemory.create({
            driver_license: "30946452",
            email:"jaj@giekuso.cy",
            name:"Stanley Hughes",
            password:"86126452"
        })

        await sendForgotPasswordMailUseCase.execute("jaj@giekuso.cy")

        expect(generatedTokenMail).toBeCalled()
    })
      
})