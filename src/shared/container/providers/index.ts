import {container} from "tsyringe"
import { IDateProvider } from "./dateProvider/IDateProvidets"
import { DayjsDateProvider } from "./dateProvider/implementations/DayJsDateProvider"




container.registerSingleton<IDateProvider>("DayjsDateProvider",DayjsDateProvider)