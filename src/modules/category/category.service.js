const createHttpError = require('http-errors');
const Service = require('../../common/service');
const CategoryModel = require('./category.model');
const { isValidObjectId, Types } = require('mongoose');
const CategoryMessage = require('./category.message');
const slugify = require('slugify');
const {generateSlug} = require('persian-helpers')



class CategoryService extends Service {
    #model;
    constructor() {
        super();
        this.#model = CategoryModel;
    }


    async create(categoryDto) {
        if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
            const existCategory = await this.checkExistById(categoryDto.parent);
            categoryDto.parent = existCategory._id
            categoryDto.parents = [
                ... new Set(
                    ([existCategory._id.toString()].concat(
                        existCategory.parents.map(id => id.toString())
                    )).map(id => new Types.ObjectId(id))
                )
            ]
        }
        if(categoryDto?.slug) {
            categoryDto.slug = generateSlug(categoryDto.name, {to: "fa"});
            await this.alredyExistBySlug(categoryDto.slug);
        } else {
            categoryDto.slug = generateSlug(categoryDto.name, {to: "fa"});
            await this.alredyExistBySlug(categoryDto.slug);
        }
        const category = await this.#model.create(categoryDto);
        return category;
    }


    async checkExistById(id) {
        const category = await this.#model.findById(id);
        if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
        return category;
    }

    async checkExistBySlug(slug) {
        const category = await this.#model.findOne({slug});
        if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
        return category;
    }

    async alredyExistBySlug(slug) {
        const category = await this.#model.findOne({slug});
        if (category) throw new createHttpError.Conflict(CategoryMessage.AlredyExist);
        return null;
    }

    async findAll() {
        const categories = await this.#model.find({parent: {$exists: false}})
        return categories;
    }

}

module.exports = new CategoryService();