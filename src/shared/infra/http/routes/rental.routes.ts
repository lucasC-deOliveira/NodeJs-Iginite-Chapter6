import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController"
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController"
import {Router} from "express"
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated"

const rentalRoutes = Router()


const createRentalController = new CreateRentalController()

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle)



const devolutionRentalController = new DevolutionRentalController()
rentalRoutes.post('/devolution/:id',ensureAuthenticated, devolutionRentalController.handle)




export{rentalRoutes
}