import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from "dayjs"
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayJsDateProvider"
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvidets"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"



let createRentalUseCase: CreateRentalUseCase
let rentalsRepository: IRentalsRepository
let dayjsProvider : IDateProvider
let carsRepository:ICarsRepository

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1,"day").toDate()
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        rentalsRepository = new RentalsRepositoryInMemory()
        dayjsProvider = new DayjsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dayjsProvider, carsRepository)
    })

    it("should be able to create a new rental", async () => {

        const car = await carsRepository.create({
            name:"test",
            description:"test",
            daily_rate:1000,
            licence_plate:"fdksjafi",
            fine_amount:40,
            category_id:"1254",
            brand:"brand"

        })


        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")

    })


    it("should not be able to create a new rental if there is another open to the same user", async () => {

        const car = await carsRepository.create({
            name:"test",
            description:"test",
            daily_rate:1000,
            licence_plate:"fdksjafi",
            fine_amount:40,
            category_id:"1254",
            brand:"brand"

        })


        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });

        expect( createRentalUseCase.execute({
                user_id: "12345",
                car_id: "218dsa18",
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("There is a rental in progress for user!"))
    })


    it("should not be able to create a new rental if there is another open to the same car", async () => {

        const car = await carsRepository.create({
            name:"test",
            description:"test",
            daily_rate:1000,
            licence_plate:"fdksjafi",
            fine_amount:40,
            category_id:"1254",
            brand:"brand"

        })


        await createRentalUseCase.execute({
            user_id: "123f4d5",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });

        await expect(createRentalUseCase.execute({
                user_id: "1234dd5",
                car_id: car.id,
                expected_return_date: dayAdd24Hours
        })
        ).rejects.toEqual(new AppError("car is Unavailable"))

    })



    it("should not be able to create a new rental with invalid return time", async () => {

       await expect( createRentalUseCase.execute({
                user_id: "123f4d5",
                car_id: "21818",
                expected_return_date: dayjs().toDate()
            })
        ).rejects.toEqual(new AppError("invalid return time"))

    })
})
