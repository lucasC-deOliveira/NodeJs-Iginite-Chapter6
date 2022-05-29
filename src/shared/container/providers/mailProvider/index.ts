import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implemetations/EtherealMailProvider";
import { SESMailProvider } from "./implemetations/SESMailProvider";



const mailprovider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider)
}


container.registerInstance<IMailProvider>("MailProvider",mailprovider[process.env.MAIL_PROVIDER])

