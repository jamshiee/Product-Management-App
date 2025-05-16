const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  ram: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    images: {
      type: [String], // array of image URLs or paths
      validate: [arrayLimit, "{PATH} exceeds the limit of 3"],
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    variants: {
      type: [variantSchema],
      required: true,
      validate: [(v) => v.length > 0, "Product must have at least one variant"],
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 3;
}

export default mongoose.model("Product", productSchema);
