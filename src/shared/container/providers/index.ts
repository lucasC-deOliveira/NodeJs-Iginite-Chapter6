import {container} from "tsyringe"
import { IDateProvider } from "./dateProvider/IDateProvider"
import { DayjsDateProvider } from "./dateProvider/implementations/DayJsDateProvider"
import { IMailProvider } from "./mailProvider/IMailProvider"
import { EtherealMailProvider } from "./mailProvider/implemetations/EtherealMailProvider"




container.registerSingleton<IDateProvider>("DayjsDateProvider",DayjsDateProvider)

container.registerInstance<IMailProvider>("EtherealMailProvider",new EtherealMailProvider())