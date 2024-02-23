const Controller = require('../../common/controller');
const CategoryMessage = require('./category.message');
const categoryService = require('./category.service');
const HttpCodes = require('http-codes');

class CategoryController extends Controller {

    #service;
    constructor() {
        super();
        this.#service = categoryService;
    }


    async create(req, res, next) {
        try {
            const { name, slug, icon, parent } = req.body;
            await this.#service.create({ name, slug, icon, parent });
            return res.status(HttpCodes.CREATED).json({
                message: CategoryMessage.Created
            })
        } catch (error) {
            next(error);
        }
    }


    async findAll(req, res, next) {
        try {
            const categories = await this.#service.findAll();
            return res.json(categories);
        } catch (error) {
            next(error);
        }
    }


}


module.exports = new CategoryController();