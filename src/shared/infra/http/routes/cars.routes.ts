


import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarimagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";

import {Router} from "express"
import multer from "multer";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

import uploadConfig from "@config/upload"


const carRoutes = Router();

const createCarController = new CreateCarController()

carRoutes.post("/", ensureAuthenticated,ensureAdmin,createCarController.handle)


const listAvailableCarsController = new ListAvailableCarsController();

carRoutes.get("/available",listAvailableCarsController.handle)


const createCarSpecificationController = new CreateCarSpecificationController()

carRoutes.post('/specifications/:id',ensureAuthenticated,createCarSpecificationController.handle)

const uploadCarimagesController = new UploadCarimagesController()


const uploadCarImages = multer(uploadConfig.upload("./tmp/cars"))

carRoutes.post("/images", ensureAuthenticated,ensureAdmin,uploadCarImages.array("images"),uploadCarimagesController.handle)  


export {carRoutes}