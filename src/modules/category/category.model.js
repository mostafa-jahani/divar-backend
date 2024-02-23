const { Schema, Types, model } = require("mongoose");

const CategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: false, index: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, required: false, ref: "Category" },
    parents: { type: [Types.ObjectId], required: false, ref: "Category", default: [] },
}, { toJSON: { virtuals: true }, versionKey: false, id: false });

CategorySchema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
});

function autoPopulate(next) {
    this.populate([{path: "children"}]);
    next();
}

CategorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate);

const CategoryModel = model("category", CategorySchema);

module.exports = CategoryModel;