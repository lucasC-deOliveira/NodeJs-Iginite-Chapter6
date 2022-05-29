
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest{
    car_id:string;
    images_name: string[];
}


@injectable()
class UploadCarImagesUseCase{

    constructor(
        @inject("CarsImageRepository")
        private carsImagesRepository : ICarsImagesRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ){}

    async execute({car_id,images_name}:IRequest){
        images_name.map(async img =>{
            await this.carsImagesRepository.create(car_id, img)
            await this.storageProvider.save(img,"cars")
        })
    }

}


export{UploadCarImagesUseCase}