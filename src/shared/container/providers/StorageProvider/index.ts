import { container } from "tsyringe"
import { LocalStorageProvider } from "./implementations/LocalStarageProvider"
import { S3StorageProvider } from "./implementations/S3StorageProvider"
import { IStorageProvider } from "./IStorageProvider"




const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>("StorageProvider", diskStorage[process.env.disk])