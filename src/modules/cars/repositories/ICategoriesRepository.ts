import { Category } from "../infra/typeorm/entities/Category";


//  DTO => data transfer object = criar objeto para transerencia de dados entre uma classe e outra
interface ICreateCategoryDTO{
    name:string;
    description:string;
}


interface ICategoriesRepository{
findByName(name:string):Promise<Category>;
list(): Promise<Category[]>;
create({name, description}:ICreateCategoryDTO):Promise<void>;
}


export {ICategoriesRepository, ICreateCategoryDTO}