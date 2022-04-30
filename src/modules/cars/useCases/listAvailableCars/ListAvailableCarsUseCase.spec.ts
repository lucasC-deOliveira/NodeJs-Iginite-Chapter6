import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("list Cars", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository)

    })

    it("should be able to list all available cars", async () => {

        const car = await carsRepository.create({
            name: "Ferrari",
            description: "F250",
            daily_rate: 1000,
            licence_plate: "DEF-12056",
            fine_amount: 100,
            brand: "Fer",
            category_id: "86d90827-d4cb-4d3a-9e77-8f849389a00e"
        })

        const cars = await listAvailableCarsUseCase.execute({})


        expect(cars).toEqual([car])


    })


    it("should be able to list all avilable cars by brand", async () => {
        const car = await carsRepository.create({
            name: "Ferrari",
            description: "F250",
            daily_rate: 1000,
            licence_plate: "DEF-12056",
            fine_amount: 100,
            brand: "car_brand_test",
            category_id: "86d90827-d4cb-4d3a-9e77-8f849389a00e"
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "car_brand_test"
        })


        expect(cars).toEqual([car])

    })


    it("should be able to list all avilable cars by name", async () => {
        const car = await carsRepository.create({
            name: "car_name_test",
            description: "F250",
            daily_rate: 1000,
            licence_plate: "DEF-12056",
            fine_amount: 100,
            brand: "car_brand_test",
            category_id: "86d90827-d4cb-4d3a-9e77-8f849389a00e"
        })

        const cars = await listAvailableCarsUseCase.execute({
            name: "car_name_test"
        })


        expect(cars).toEqual([car])

    })

    
    it("should be able to list all avilable cars by category id", async () => {
        const car = await carsRepository.create({
            name: "car_name_test",
            description: "F250",
            daily_rate: 1000,
            licence_plate: "DEF-12056",
            fine_amount: 100,
            brand: "car_brand_test",
            category_id: "categorytest"
        })

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "categorytest"
        })


        expect(cars).toEqual([car])

    })
})