import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    category: { type: String, required: true }, // <-- NOWE
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
)

export const Product = models.Product || model('Product', ProductSchema)
