import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middlewares/EnsureAdmin";



const specificationsRoutes = Router();

const createSpecificationController= new CreateSpecificationController()


specificationsRoutes.post('/',ensureAuthenticated,ensureAdmin,createSpecificationController.handle)

export{specificationsRoutes}