import mongoose from "mongoose";

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
      type: [String]
    },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
    variants: {
      type: [variantSchema],
      required: true,
      validate: [(v) => v.length > 0, "Product must have at least one variant"],
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 3;
}

export default mongoose.model("Product", productSchema);
