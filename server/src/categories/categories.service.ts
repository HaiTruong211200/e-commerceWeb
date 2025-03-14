import { Injectable } from '@nestjs/common';
import { Category } from './schema/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {CreateCategoryDto} from './dto/category.dto';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel(Category.name)
        private CategoriesModule: Model<Category>
    ) {}

    async create(createCategoryDto:  CreateCategoryDto) {
        try {
            const {name, gender} = createCategoryDto;
            
            console.log("name: ", name, gender);
            const category = await this.CategoriesModule.create({name, gender})
            console.log("category: ", category);
            return {
                message: "Created a new category!",
                _id: category._id,
                category: category
            }
        }
        catch(err) {
            console.error("ERROR CREATING Category: ", err);
            throw new Error("Failed to create new category!!");
        }
    }
}
