const { Schema, Types, model } = require("mongoose");

const CategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, required: false, ref: "Category" },
    parents: { type: [Types.ObjectId], required: false, ref: "Category", default: [] },
}, {virtuals: true, versionKey: false, id: false});

CategorySchema.virtual("children", {
    ref: "Category",
    localField: "_id",
    foreignField: "parent"
});

const CategoryModel = model("category", CategorySchema);

module.exports = CategoryModel;