import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController"
import {Router} from "express"
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated"

const rentalRoutes = Router()


const crateRentalController = new CreateRentalController()

rentalRoutes.post("/", ensureAuthenticated, crateRentalController.handle)




export{rentalRoutes
}