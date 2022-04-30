import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from "dayjs"
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayJsDateProvider"
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvidets"



let createRentalUseCase: CreateRentalUseCase
let rentalsRepository: IRentalsRepository
let dayjsProvider : IDateProvider

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1,"day").toDate()
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory()
        dayjsProvider = new DayjsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dayjsProvider)
    })

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "21818",
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")

    })


    it("should not be able to create a new rental if there is another open to the same user", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "218fds18",
                expected_return_date: dayAdd24Hours
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "218dsa18",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError)
    })


    it("should not be able to create a new rental if there is another open to the same car", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123f4d5",
                car_id: "21818",
                expected_return_date: dayAdd24Hours
            });

            await createRentalUseCase.execute({
                user_id: "1234dd5",
                car_id: "21818",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError)

    })



    it("should not be able to create a new rental with invalid return time", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123f4d5",
                car_id: "21818",
                expected_return_date: dayjs().toDate()
            });

            
        }).rejects.toBeInstanceOf(AppError)

    })
})
